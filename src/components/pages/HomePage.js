import React from 'react'
import NavBar from "../layout/NavBar";
import ProductCategoryDeal from "../UI/ProductCategoryDeal";
import ProductNavigation from "../UI/ProductNavigation";
import Footer from '../layout/Footer';
import Card from "../UI/Card";
import ProductDeal from "../UI/ProductDeal";
import BottleWarmer from '../../image/bottoleWarmer.jpg'
import InterestedProducts from "../UI/InterestedProducts";
import HotKeyword from "../UI/HotKeyword";
import ItemContainer from "../UI/ItemContainer";
import {useSelector, useDispatch} from "react-redux";
import * as cartActions from '../../store/actions/cartActions'
import * as errorActions from '../../store/actions/errorActions'
import {message} from "antd";
import "antd/dist/antd.css";


const HomePage = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    // const errors = useSelector(state => state.errors);
    // const [errors_, setErrors_] = useState([]);
    const errors = useSelector(state => {
            // transform the object of object to array of object
            const transformedErrors = [];
            for (let key in state.errors) {
                transformedErrors.push(state.errors[key])
            }
            return transformedErrors
        }
    );

    if (errors.length > 0 ) {
        errors.map((error)=>{
            message.error(error);
            return null;
        });
        dispatch(errorActions.clearErrors())
    }




    return (
        <div style={{width: "100%", height: "100%", backgroundColor: "#F4F4F4"}}>
            <NavBar {...props}/>
            <ProductNavigation/>
            <ProductCategoryDeal/>
            <ProductDeal/>
            {/*Item container takes a list of products as an array*/}
            <ItemContainer
                title={'PRODUCTS YOU HAVE LOOKED FOR'}
            >
                <Card
                    type={'default'}
                    price={990000}
                    discount={62}
                    title={"Sanity multifunctional bottle warmer"}
                    image={BottleWarmer}
                    link={false}
                />
                <Card
                    type={'default'}
                    price={990000}
                    title={"Sanity multifunctional bottle warmer"}
                    image={BottleWarmer}
                    link={false}

                />
                <Card
                    type={'default'}
                    price={990000}
                    discount={62}
                    title={"Sanity multifunctional bottle warmer"}
                    image={BottleWarmer}
                    link={false}
                />
            </ItemContainer>
            <ItemContainer
                // no title will show a tiki deal title
                //{/*There are 3 types of card default, deal and review. Each card has a props you need to pass to it*/}
            >
                <Card
                    type={'deal'}
                    price={990000}
                    discount={62}
                    title={"Sanity multifunctional bottle warmer"}
                    image={BottleWarmer}
                    sold={90}
                    hot={true}
                    timeInMilliSec={5 * 10000}   // 50 seconds
                    link={false}
                />
                <Card
                    type={'deal'}
                    price={990000}
                    title={"Sanity multifunctional bottle warmer"}
                    image={BottleWarmer}
                    sold={90}
                    hot={true}
                    timeInMilliSec={5 * 10000}   // 50 seconds
                    link={false}
                />
                <Card
                    type={'deal'}
                    price={990000}
                    discount={62}
                    title={"Sanity multifunctional bottle warmer"}
                    image={BottleWarmer}
                    sold={90}
                    hot={true}
                    timeInMilliSec={5 * 10000}   // 50 seconds
                    link={false}
                />
            </ItemContainer>

            <InterestedProducts/>
            <HotKeyword/>

            <ItemContainer
                title={"PRIVACY FOR YOU"}
            >
                {products !== null && products.map((prod, index) => (
                    <>
                        <Card
                            onClick={()=> dispatch(cartActions.addToCart(prod))}
                            key={prod.id}
                            id={prod.id}
                            type={'review'}
                            price={prod.price}
                            discount={prod.discount}
                            title={prod.name}
                            image={prod.photo === "no-photo.jpg" ? BottleWarmer : `http://34.87.156.245/uploads/${prod.photo}`}
                            rating={prod.averageRating}
                        />
                        <div onClick={()=>dispatch(cartActions.removeFromCart(prod.id))}>ds</div>

                    </>

                ))}
            </ItemContainer>
            <ItemContainer
                title={"ALL PRODUCTS FROM DB"}
            >
                {products !== null && products.map((prod, index) => (
                    <Card
                        key={prod.id}
                        id={prod.id}
                        type={'review'}
                        price={prod.price}
                        discount={prod.discount !== undefined ? prod.discount : 0}
                        title={prod.name}
                        image={prod.photo === "no-photo.jpg" ? BottleWarmer : `http://34.87.156.245/uploads/${prod.photo}`}
                        rating={prod.averageRating}
                        link={true}
                    />

                ))}
            </ItemContainer>
            <Footer/>

        </div>
    )
}

export default HomePage

