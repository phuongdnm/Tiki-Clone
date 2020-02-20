import React from 'react'
import NavBar from "../layout/NavBar";
import ProductCategoryDeal from "../ProductCategoryDeal";
import ProductNavigation from "../ProductNavigation";
import Footer from '../layout/Footer';
import Card from "../Card";
import ProductDeal from "../ProductDeal";
import BottleWarmer from '../../image/bottoleWarmer.jpg'
import InterestedProducts from "../InterestedProducts";
import HotKeyword from "../HotKeyword";
import ItemContainer from "../ItemContainer";


const HomePage = (props) => {
    return (
        <div style={{width: "100%", height: "100%", backgroundColor: "#F4F4F4"}}>
            <NavBar/>
            <ProductNavigation/>
            <ProductCategoryDeal/>
            <ProductDeal/>

            {/*Item container takes a list of products as an array*/}
            <ItemContainer
                title={'PRODUCTS YOU HAVE LOOKED FOR'}
                items={[
                    <Card
                        type={'default'}
                        price={990000}
                        discount={62}
                        title={"Sanity multifunctional bottle warmer"}
                        image={BottleWarmer}
                    />,
                    <Card
                        type={'default'}
                        price={990000}
                        discount={62}
                        title={"Sanity multifunctional bottle warmer"}
                        image={BottleWarmer}
                    />,
                    <Card
                        type={'default'}
                        price={990000}
                        discount={62}
                        title={"Sanity multifunctional bottle warmer"}
                        image={BottleWarmer}
                    />
                ]}
            />
            <ItemContainer
                // no title will show a tiki deal title
                items={[
                    //{/*There are 3 types of card default, deal and review. Each card has a props you need to pass to it*/}
                    <Card
                        type={'deal'}
                        price={990000}
                        discount={62}
                        title={"Sanity multifunctional bottle warmer"}
                        image={BottleWarmer}
                        sold={90}
                        hot={true}
                        timeInMilliSec={5 * 10000}   // 50 seconds
                    />,
                    <Card
                        type={'deal'}
                        price={990000}
                        discount={62}
                        title={"Sanity multifunctional bottle warmer"}
                        image={BottleWarmer}
                        sold={90}
                        hot={true}
                        timeInMilliSec={5 * 10000}   // 50 seconds
                    />,
                    <Card
                        type={'deal'}
                        price={990000}
                        discount={62}
                        title={"Sanity multifunctional bottle warmer"}
                        image={BottleWarmer}
                        sold={90}
                        hot={true}
                        timeInMilliSec={5 * 10000}   // 50 seconds
                    />,
                ]}
            />

            <InterestedProducts/>
            <HotKeyword/>

            <ItemContainer
                title={"PRIVACY FOR YOU"}
                items={[
                    <Card
                        type={'review'}
                        price={990000}
                        discount={62}
                        title={"Sanity bottle multifunctional warmer"}
                        image={BottleWarmer}
                        rating={4}
                        review={5}
                    />,
                    <Card
                        type={'review'}
                        price={990000}
                        discount={62}
                        title={"Sanity bottle multifunctional warmer"}
                        image={BottleWarmer}
                        rating={4}
                        review={5}
                    />,
                    <Card
                        type={'review'}
                        price={990000}
                        discount={62}
                        title={"Sanity bottle multifunctional warmer"}
                        image={BottleWarmer}
                        rating={4}
                        review={5}
                    />,
                ]}
            />
            <Footer/>

        </div>
    )
}

export default HomePage

