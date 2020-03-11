import ItemContainer from "../ItemContainer";
import Card from "../Card";
import BottleWarmer from "../../../image/bottoleWarmer.jpg";
import React from "react";


const ProductsViewed = (props) => {
    return (
        <div style={{width: '100%'}}>
            <ItemContainer
                space={4}
                title={'PRODUCTS YOU HAVE LOOKED FOR'}
            >
                <Card
                    type={'default'}
                    price={990000}
                    discount={62}
                    title={"Sanity multifunctional bottle warmer"}
                    image={BottleWarmer}
                />
                <Card
                    type={'default'}
                    price={990000}
                    discount={62}
                    title={"Sanity multifunctional bottle warmer"}
                    image={BottleWarmer}
                />
                <Card
                    type={'default'}
                    price={990000}
                    discount={62}
                    title={"Sanity multifunctional bottle warmer"}
                    image={BottleWarmer}
                />
            </ItemContainer>
        </div>
    )
};

export default ProductsViewed
