import React from 'react';
import {makeStyles, createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import Button from '@material-ui/core/Button'
import noProductsLogo from '../../image/no_products_logo.png'
import Card from '../UI/Card'
import noPhoto from '../../image/nophoto.png'
import BottleWarmer from '../../image/bottoleWarmer.jpg'
import * as cartActions from '../../store/actions/cartActions'


import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        // padding: "0 10%",
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: '2%',
        marginBottom: '2%',
        padding: '4em',
        paddingTop: '2em',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)"
    },
    removeLink:{
        textDecoration: "none !important",
        color: "inherit !important" ,
    },
    cartLabel: {
        marginTop: '20px'
    },
    feePaper: {
        marginTop: 52
    },
    boxFee: {
        padding: "5%"
    }
}));

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const paperStyle = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                textAlign: "left",

            },
        }

    }
});

const CartPage = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();


    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartTotalAmountDiscounted = useSelector(state => state.cart.totalAmount_discounted);
    const cartItems = useSelector(state => {
            // transform the object of object to array of object
            const transformedCartItems = [];
            for (let key in state.cart.items) {
                transformedCartItems.push({
                    productId: key,
                    productTitle: state.cart.items[key].productTitle,
                    productPrice: state.cart.items[key].productPrice,
                    discountedPrice: state.cart.items[key].discountedPrice,
                    product: state.cart.items[key].product,
                    quantity: state.cart.items[key].quantity,
                    sum_discounted: state.cart.items[key].sum_discounted,
                    sum: state.cart.items[key].sum,
                })
            }
            return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
        }
    );


    const itemList = cartItems.map((item, index) => {
        return (
            <Card
                key={index}
                style={{marginTop: '4em'}}
                type={'cart'}
                link={true}
                name={item.product.name}
                id={item.product.id}
                title={item.product.name}
                image={item.product.photo === "no-photo.jpg" ? noPhoto : `${process.env.REACT_APP_API}/uploads/${item.product.photo}`}
                soldBy={item.product.shop.name}
                price={item.product.price}
                discount={item.product.discount}
                // discountedPrice={40003}
                quantity={item.quantity}
                addItem={() => {
                    dispatch(cartActions.addToCart(item.product))
                }}
                removeItem={() => {
                    dispatch(cartActions.removeFromCart(item.productId))
                }}
                deleteItem={() => {
                    dispatch(cartActions.deleteFromCart(item.productId))
                }}
            />
        )
    });

    const total = () => {
        return (
            <div style={{paddingBottom: '1em'}}>
                <span>Total fee:</span>
                <div className="amount"
                     style={{float: "right", display: "flex", flexDirection: "column", textAlign: "right"}}>
                    {cartTotalAmountDiscounted !== null && !isNaN(cartTotalAmountDiscounted) && cartTotalAmountDiscounted > 0?
                        <>
                            <strong style={{fontSize: "22px", color: "red", float: "right"}}>
                                { numberWithCommas(cartTotalAmountDiscounted.toFixed(2)) }
                            </strong>
                            <small>(Included VAT)</small>
                        </>:
                        <>
                            <strong style={{fontSize: "22px", color: "red", float: "right"}}>
                                { numberWithCommas(cartTotalAmount.toFixed(2)) }
                            </strong>
                            <small>(Included VAT)</small>
                        </>
                    }

                </div>
            </div>

        )

    };
    const CartSection = () => {
        if (!cartItems.length) {
            return (
                <Grid container className={classes.root} alignItems="center" >
                    <Grid item xs={12} >
                        <h5 className={classes.cartLabel}>Your cart ({props.amount} products)</h5>
                        <Paper className={classes.paper} elevation={0}  square style={{textAlign: 'center'}}>
                            <img src={noProductsLogo} alt={'not product logo'}/>
                            <p>No products in your cart yet!</p>
                            <Button variant="contained" color="primary"><Link to={'/'} onClick={e => e.stopPropagation()}className={classes.removeLink}>Continue shopping</Link> </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <h5 className={classes.cartLabel}>Good deals</h5>
                        <Paper className={classes.paper} elevation={0}  square>
                            {/* <Carousel autoPlay="true" animation="slide" interval={4000}>

						</Carousel> */}
                            <Card
                                type={'default'}
                                price={990000}
                                discount={62}
                                title={"Sanity multifunctional bottle warmer"}
                                image={BottleWarmer}
                            >
                                <Button>Buy now</Button>

                            </Card>
                            <Card
                                type={'deal'}
                                price={990000}
                                discount={62}
                                title={"Sanity multifunctional bottle warmer"}
                                image={BottleWarmer}
                                sold={90}
                                hot={true}
                                timeInMilliSec={5 * 10000}   // 50 seconds
                            /> <Card
                            type={'deal'}
                            price={990000}
                            discount={62}
                            title={"Sanity multifunctional bottle warmer"}
                            image={BottleWarmer}
                            sold={90}
                            hot={true}
                            timeInMilliSec={5 * 10000}   // 50 seconds
                        /> <Card
                            type={'deal'}
                            price={990000}
                            discount={62}
                            title={"Sanity multifunctional bottle warmer"}
                            image={BottleWarmer}
                            sold={90}
                            hot={true}
                            timeInMilliSec={5 * 10000}   // 50 seconds
                        />


                        </Paper>
                    </Grid>
                </Grid>
            )
        }
        return (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={9}>
                    <h5 className={classes.cartLabel}>Your cart</h5>
                    <MuiThemeProvider theme={paperStyle}>
                        <Paper className={classes.paper} elevation={0} square>
                            {itemList}
                        </Paper>
                    </MuiThemeProvider>
                </Grid>
                <Grid item xs={3}>
                    <Paper elevation={0} variant='outlined' square className={classes.feePaper}>
                        <div className={classes.boxFee}>
                            <p className={classes.listInfoPrice} style={{margin: 0}}>
                                {console.log(cartTotalAmountDiscounted)}
                                {cartTotalAmountDiscounted !== null && !isNaN(cartTotalAmountDiscounted) && cartTotalAmountDiscounted > 0?
                                    <>
                                        <span>Original Price: </span>
                                        <strong style={{float: "right"}}>{  numberWithCommas(cartTotalAmount.toFixed(2))}</strong><br/>
                                        <span>Discounted Price: </span>
                                        <strong style={{float: "right"}}>{ numberWithCommas(cartTotalAmountDiscounted.toFixed(2))}</strong>
                                    </>:
                                    <>
                                        <span>Price: </span>
                                        <strong style={{float: "right"}}>{  numberWithCommas(cartTotalAmount.toFixed(2))}</strong>
                                    </>
                                }

                            </p>
                        </div>
                        <div className={classes.boxFee} style={{marginBottom: "5%"}}>
                            {total()}
                        </div>
                    </Paper>
                    <Button fullWidth variant="contained" color="secondary" 
                            style={{marginTop: 10}}>Order</Button>
                </Grid>
            </Grid>
        )
    };

    return (
        <div>
            <NavBar/>
            <div className="body" style={{marginBottom: "20%"}}>
                {CartSection()}
            </div>
            <Footer/>
        </div>
    )

};

export default CartPage
