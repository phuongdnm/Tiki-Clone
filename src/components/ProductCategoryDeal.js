import React from 'react'
import {Link} from "react-router-dom";
import userStyles from '../styles/ProductCategoryDealStyles'
import Grid from "@material-ui/core/Grid";
import Carousel from 'react-material-ui-carousel'


import ProductDeal1 from '../image/productDealImage1.png'
import ProductDeal2 from '../image/productDealImage2.png'
import ProductDeal3 from '../image/productDealImage3.png'
import ProductDeal4 from '../image/productDealImage4.png'
import ProductDeal5 from '../image/productDealImage5.png'
import ProductDeal7 from '../image/productDealImage7.png'
import ProductDeal8 from '../image/productDealImage8.png'
import ProductDeal9 from '../image/productDealImage9.png'
import ProductDeal10 from '../image/productDealImage10.png'
import ProductDeal11 from '../image/productDealImage11.png'
import ProductDeal12 from '../image/productDealImage12.png'


const ProductCategoryDeal = props => {
    const classes = userStyles();

    return (
            <Grid container className={classes.container}>
                <Grid item xs={8}>
                    <Grid item xs={12}>
                        <Carousel interval={3000} >
                            <Link to={"#"}><img src={ProductDeal1} alt="" className={classes.largeProduct}/></Link>
                            <Link to={"#"}><img src={ProductDeal11} alt="" className={classes.largeProduct}/></Link>
                            <Link to={"#"}><img src={ProductDeal12} alt="" className={classes.largeProduct}/></Link>

                        </Carousel>
                    </Grid>
                    <Grid container  xs={12}>
                        <Grid item xs={6}>
                            <Link to={"#"}><img src={ProductDeal7} alt="" className={classes.mediumProduct}/></Link>

                        </Grid>
                        <Grid  item xs={6}>
                            <Link to={"#"}><img src={ProductDeal10} alt=""  className={classes.mediumProduct}/></Link>

                        </Grid>

                    </Grid>
                </Grid>
                <Grid container xs={4}>
                    <Grid item xs={6}>
                        <Link to={"#"}><img src={ProductDeal4} alt=""  className={classes.smallProduct}/></Link>

                    </Grid>
                    <Grid item xs={6}>
                        <Link to={"#"}><img src={ProductDeal5} alt="" className={classes.smallProduct}/></Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to={"#"}><img src={ProductDeal2} alt="" className={classes.smallProduct}/></Link>

                    </Grid>
                    <Grid item xs={6}>
                        <Link to={"#"}><img src={ProductDeal3} alt="" className={classes.smallProduct}/></Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Link to={"#"}><img src={ProductDeal8} alt="" className={classes.smallProduct}/></Link>

                    </Grid>
                    <Grid item xs={6}>
                        <Link to={"#"}><img src={ProductDeal9} alt="" className={classes.smallProduct}/></Link>
                    </Grid>
                </Grid>

            </Grid>
    )
};


export default ProductCategoryDeal;
