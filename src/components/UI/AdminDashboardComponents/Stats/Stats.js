import React, {useEffect, useState} from 'react'
import userStyles from "../styles/AllUsersStyles";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../../Card";
import NoPhoto from "../../../../image/nophoto.png";
import ReactLoading from 'react-loading';

import * as statsActions from '../../../../store/actions/statsActions'
import ShopStats from "./ShopStats";
import UserStats from "./UserStats";
import ProductStats from "./ProductStats";



const Stats = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state.products.products);
    const topProducts = useSelector(state => state.stats.topProducts);  // all users

    useEffect(()=>{
        dispatch(statsActions.getTopSoldProducts())
    },[]);

    const getProductDetails = (id)=>  allProducts.find((prod=> prod._id === id));

    return(
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3}>
                {allProducts !== null ? <>
                    <Grid item xs={4} md={4} lg={4} className={classes.card} style={{marginTop: '2em'}}>
                        <UserStats fullwidth noLoading/>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} className={classes.card} style={{marginTop: '2em'}}>
                        <ProductStats noLoading/>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4} className={classes.card} style={{marginTop: '2em'}}>
                        <ShopStats noLoading/>
                    </Grid>
                    <Grid item xs={12} style={{fontSize: "1.5em", marginLeft: '1em', fontWeight: 600}}>
                        Top Sold Products
                    </Grid></> :
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading3}/>
                }
                {topProducts !== null && allProducts!== null && topProducts.length >0 ?
                    topProducts.map((product, index)=>
                    {
                        let prod = getProductDetails(product._id);
                        return (
                            <Grid item xs={4} md={4} lg={3} style={{margin: 0}} key={index}>
                                <ProductCard
                                    style={{backgroundImage: `linear-gradient(60deg, #EEEEEE, #DDDDDD)`, height: '30em'}}
                                    key={prod.id}
                                    id={prod.id}
                                    type={'review'}
                                    price={prod.price}
                                    discount={prod.discount !== undefined ? prod.discount : 0}
                                    title={prod.name}
                                    image={prod.photo === "no-photo.jpg" ? NoPhoto : `${process.env.REACT_APP_API}/uploads/${prod.photo}`}
                                    rating={prod.averageRating}
                                    link={true}
                                    count={product.count}
                                />
                            </Grid>
                        )
                    }):null
                }
                {
                    topProducts === null &&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading3}/>
                }
            </Grid>
        </div>
        )
};


export default Stats
