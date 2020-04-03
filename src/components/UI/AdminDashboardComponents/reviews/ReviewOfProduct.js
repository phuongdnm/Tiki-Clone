import React, {useState} from 'react'

import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";

import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from '../CustomButtons/Button'
import CustomInput from "../CustomInput/CustomInput";

import {Search} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import NoPhoto from "../../../../image/nophoto.png";
import ProductCard from "../../Card";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {ReviewCard} from "./ReviewCard";
import ReactLoading from 'react-loading';





const ReviewOfProduct = (props) => {
    const classes = userStyles();
    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");
    const [firstLoad, setFirstLoad] = useState(true);
    const [toggleProduct, setToggleProduct] = useState(false);
    const [loading, setLoading] = useState(true);

    const [currentProductReviews, setCurrentProductReviews] = useState([]);
    const [products, setProducts] = useState([]);
    // const currentProductReviews = useSelector(state => state.orders.allShopOrders);


    const allReviews = useSelector(state => state.reviews.allReviews);
    const allShops = useSelector(state => state.shops.shops);
    const allProduct = useSelector(state => state.products.products);
    const allUsers = useSelector(state => state.users.users);


    if(firstLoad){
        // setLoading(true);
        setTimeout(()=>{setProducts(allProduct); setFirstLoad(false); setLoading(false)}, 1000);
    }



    const handleFilter = (filter, option) => {
        switch (filter) {
            case "id":
                return option._id;
            case "name":
                return option.name;
            default:
                return ""
        }
    };

    const handleSearch = async () => {
        if (inputText.length > 0) {
            setLoading(true);
            switch (filterOptions) {
                case "id":
                    setProducts(allProduct.filter(product => product._id === inputText));
                    setLoading(false);
                    return;
                case "name":
                    setProducts(allProduct.filter(product => product.name === inputText));
                    setLoading(false);
                    return;
                default:
                    return ""
            }

        }
    };

    const handleProductClick = (prodId)=>{
        setCurrentProductReviews(allReviews.filter(review => review.product._id === prodId))
    };
    const getReviewOwner = (userId)=>{
        return allUsers.find(user =>user._id === userId)
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={6} md={4} lg={3} style={{margin: 0}}>
                    <Button color="transparent" onClick={()=> {setProducts(allProduct); setToggleProduct(true)}} className={classes.title}>
                        Find Reviews of a Product</Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            autoComplete={false}
                            id="lect-demo"
                            freeSolo
                            style={{width: 300}}
                            options={allProduct || []}
                            classes={{
                                option: classes.option,
                            }}
                            noOptionsText={`No shop with that ${filterOptions}`}
                            getOptionLabel={option => handleFilter(filterOptions, option)}
                            autoHighlight
                            renderOption={(option, state) => (
                                <p style={{
                                    padding: "0.5em",
                                    margin: "0",
                                    width: 300,
                                    height: "100% !important",
                                    color: '#000',
                                    overflowX: "hidden"
                                }} onClick={(e) => {
                                    setInputText(e.target.textContent)
                                }}>
                                    {handleFilter(filterOptions, option)}
                                </p>
                            )}
                            renderInput={params => (
                                <CustomInput
                                    formControlProps={{
                                        className: classes.search
                                    }}
                                    inputProps={{
                                        onChange: (e) => {
                                            setInputText(e.target.value);
                                        },
                                        ...params,
                                        placeholder: `Search product by ${filterOptions}`,
                                        inputProps: {
                                            ...params.inputProps,
                                        }
                                    }}
                                />
                            )}
                        />
                        <Button color="white" aria-label="edit" justIcon round
                                style={{marginBottom: 0, marginLeft: '0.5em', marginRight: '2em'}}
                                onClick={handleSearch}>
                            <Search/>
                        </Button>
                        <div tabIndex={0}
                             onBlur={(event)=> {!event.currentTarget.contains(event.relatedTarget) && setToggleList(false)}}>
                            <Button color="white" className={classes.title} onClick={() => setToggleList(val => !val)}>
                                Search by {filterOptions} {toggleList ? <ExpandLess style={{marginLeft: '0.5em'}}/> :
                                <ExpandMore style={{marginLeft: '0.5em'}}/>}
                            </Button>
                                <List component="nav" aria-label="filter options"
                                  className={classNames(classes.listStyle, {[classes.showList]: toggleList})}>
                                <ListItem button onClick={() => {
                                    setFilterOptions("id");
                                    setToggleList(val => !val)
                                }} selected={"id" === filterOptions}>
                                    <ListItemText primary="Id"/>
                                </ListItem>
                                <ListItem button onClick={() => {
                                    setFilterOptions("name");
                                    setToggleList(val => !val)
                                }} selected={"name" === filterOptions}>
                                    <ListItemText primary="Name"/>
                                </ListItem>
                            </List>
                        </div>
                    </section>
                </Grid>

            </Grid>
            <Grid container spacing={1} style={{marginLeft: '0.5em', marginBottom: "1em"}}>
                {products !== null && products !== undefined  && products.length > 0 && !toggleProduct ?
                    products.map((product, index) => (
                        <Grid item xs={6} md={4} lg={3} style={{margin: 0}} key={index}>
                            <ProductCard
                                onClick={()=> {setToggleProduct(val => !val); handleProductClick(product.id)}}
                                style={{backgroundColor: 'rgba(256, 256, 256, 0.2)', height: '30em'}}
                                key={product.id}
                                id={product.id}
                                type={'review'}
                                price={product.price}
                                discount={product.discount !== undefined ? product.discount : 0}
                                title={product.name}
                                image={product.photo === "no-photo.jpg" ? NoPhoto : `${process.env.REACT_APP_API}/uploads/${product.photo}`}
                                rating={product.averageRating}
                                link={false}
                            />
                        </Grid>
                    )) :null
                }
                {
                    loading &&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading}/>
                }
                {toggleProduct &&
                <Grid item xs={12} md={12} lg={12} style={{margin: 0}}>

                <Fab aria-label="add" style={{marginTop: '3em', marginLeft: '2em', marginRight: '2em'}}
                     onClick={() => setToggleProduct(val => !val)}>
                    <ArrowBackIcon/>
                </Fab> </Grid>
                }
                {currentProductReviews !== null && currentProductReviews.length > 0 && toggleProduct?
                    currentProductReviews.map((review, index) => (
                        <Grid item xs={6} md={4} lg={4} style={{margin: 0}} key={index} >
                            <ReviewCard review={review} getUser={()=>getReviewOwner(review.user)}/>
                        </Grid>
                    )) : null
                }
            </Grid>
        </div>

    )
};

export default ReviewOfProduct
