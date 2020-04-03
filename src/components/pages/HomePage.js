import React, {useEffect, useState} from "react";
import NavBar from "../layout/NavBar";
import ProductCategoryDeal from "../UI/ProductCategoryDeal";
import ProductNavigation from "../UI/ProductNavigation";
import Footer from "../layout/Footer";
import Card from "../UI/Card";
import ProductDeal from "../UI/ProductDeal";
import BottleWarmer from "../../image/bottoleWarmer.jpg";
import InterestedProducts from "../UI/InterestedProducts";
import HotKeyword from "../UI/HotKeyword";
import ItemContainer from "../UI/ItemContainer";
import { useSelector, useDispatch } from "react-redux";
import * as errorActions from "../../store/actions/errorActions";
import { message } from "antd";
import "antd/dist/antd.css";

Array.prototype.shuffle = function(){
    let input = this;

    for (let i = input.length - 1; i >= 0; i--) {

        let randomIndex = Math.floor(Math.random() * (i + 1));
        let itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
};

const HomePage = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const [productsWithDiscount, setProductsWithDiscount] = useState([]);
    const [seeMoreDiscountedProd, setSeeMoreDiscountedProd] = useState(10);
    const [loadingDisProd, setLoadingDisProd] = useState(false);
    const [seeMoreProd, setSeeMoreProd] = useState(20);
    const [loadingProd, setLoadingProd] = useState(false);

    const getProductsWithDiscount = async ()=>{
        if (products === null) return;
        const filtered =  await products.filter(product => product.discount !== undefined);
        setProductsWithDiscount(filtered.shuffle())
    };
    // const errors = useSelector(state => state.errors);
    // const [errors_, setErrors_] = useState([]);
    const errors = useSelector(state => {
        // transform the object of object to array of object
        const transformedErrors = [];
        for (let key in state.errors) {
            transformedErrors.push(state.errors[key]);
        }
        return transformedErrors;
    });

    if (errors.length > 0) {
        errors.map(error => {
            message.error(error);
            return null;
        });
        dispatch(errorActions.clearErrors());
    }

    useEffect(()=>{
        setTimeout(()=>getProductsWithDiscount(), 1000);
    },[products]);

    const renderDiscountedProd = ()=>{
        return productsWithDiscount.length > 0 &&
            productsWithDiscount.map((prod, index) => (
                prod.discount !== undefined && index < seeMoreDiscountedProd &&
                <Card
                    key={index}
                    type={"deal"}
                    id={prod.id}
                    slug={prod.slug}
                    price={prod.price}
                    discount={prod.discount}
                    title={prod.name}
                    image={ prod.photo === "no-photo.jpg"
                        ? BottleWarmer
                        : `${process.env.REACT_APP_API}/uploads/${prod.photo}`}
                    sold={Math.floor(Math.random() * 50) + 50}  // picking random num since this feature isn't implemented yet
                    hot={true}
                    timeInMilliSec={(Math.floor(Math.random() * 10)+2) * 100000} // 50 seconds
                    link={true}
                />
            ));
    };

    const renderProd = ()=>{

        return products !== null&&
            products.map((prod, index) => (
                index < seeMoreProd &&
                <Card
                    key={prod.id}
                    id={prod.id}
                    type={"review"}
                    slug={prod.slug}
                    price={prod.price}
                    discount={prod.discount !== undefined ? prod.discount : 0}
                    title={prod.name}
                    image={
                        prod.photo === "no-photo.jpg"
                            ? BottleWarmer
                            : `${process.env.REACT_APP_API}/uploads/${prod.photo}`
                    }
                    rating={prod.averageRating}
                    link={true}
                />
            ))
    };

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "#F4F4F4" }}>
            <NavBar {...props} />
            <div style={{margin: '0 8%'}}>
                <ProductNavigation />
                <ProductCategoryDeal />
                <ProductDeal />
            </div>

            {/*Item container takes a list of products as an array*/}
            <div style={{ margin: "0 5%" }}>
                <ItemContainer title={"PRODUCTS YOU HAVE LOOKED FOR"}>
                    <Card
                        type={"default"}
                        price={990000}
                        discount={62}
                        title={"Sanity multifunctional bottle warmer"}
                        image={BottleWarmer}
                        link={false}
                    />
                    <Card
                        type={"default"}
                        price={990000}
                        title={"Sanity multifunctional bottle warmer"}
                        image={BottleWarmer}
                        link={false}
                    />
                    <Card
                        type={"default"}
                        price={990000}
                        discount={62}
                        title={"Sanity multifunctional bottle warmer"}
                        image={BottleWarmer}
                        link={false}
                    />
                </ItemContainer>
                <ItemContainer
                    seeMore={() => {
                        setSeeMoreDiscountedProd(val => val + 10);
                        setLoadingDisProd(true);
                        setTimeout(() => setLoadingDisProd(false), 500)
                    }}
                    loading={loadingDisProd}
                    // no title will show a tiki deal title
                    //{/*There are 3 types of card default, deal and review. Each card has a props you need to pass to it*/}
                >
                    {renderDiscountedProd()}
                </ItemContainer>

                <InterestedProducts />
                <HotKeyword />
                {products !== null &&
                <ItemContainer
                    title={"Recommended for you"}
                    seeMore={() => {
                        setSeeMoreProd(val => val + 10);
                        setLoadingProd(true);
                        setTimeout(() => setLoadingProd(false), 500)
                    }}
                    loading={loadingProd}
                >
                    {renderProd()}
                </ItemContainer>
                }
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;

