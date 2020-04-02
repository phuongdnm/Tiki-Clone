import React, { useState} from 'react'
import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";
import Moment2 from "moment";
import Moment from "react-moment";

import * as orderActions from "../../../../store/actions/orderActions";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from '../CustomButtons/Button'
import CustomInput from "../CustomInput/CustomInput";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {Search} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Fab from "@material-ui/core/Fab";
import {OrderCard} from "./OrderCard2";
import ReactLoading from 'react-loading';
import {ShopCard} from "../Shops/ShopCard";




const FindAShopOrders = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [toggleShop, setToggleShop] = useState(false);
    const [inputText, setInputText] = useState("");
    const [firstLoad, setFirstLoad] = useState(true);


    const allShops = useSelector(state => state.shops.shops);  // all users
    const allProduct = useSelector(state => state.products.products);
    const allUsers = useSelector(state => state.users.users);

    const [shops, setShops] = useState(null);
    const currentOrders = useSelector(state => state.orders.allShopOrders);

    const [loading, setLoading] = useState(false);

    if(firstLoad){
        // users wouldn't have been set so we use settimeout
        setTimeout(()=>{setShops(allShops); setFirstLoad(false)}, 1000);
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

    const handleSearch = () => {
        setLoading(true);
        if (inputText.length > 0) {
            switch (filterOptions) {
                case "id":
                    allShops !== null && setShops(allShops.filter(shop => shop._id === inputText));
                    setLoading(false);
                    return shops;
                case "name":
                    setShops(allShops.filter(shop => shop.name === inputText));
                    setLoading(false);
                    return shops;
                default:
                    setShops(allShops);
                    return shops;
            }

        }
    };
    const getShopById = (shopId)=>{
        return allShops.find(shop => shop._id === shopId)
    };
    const getProductById = (productId)=>{
        return allProduct.find(product=> product._id === productId)
    };
    const getUserById = (userId)=>{
        return allUsers.find(user => user._id === userId)
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={6} md={4} lg={3} style={{margin: 0}}>
                    <Button color="transparent" href="#" className={classes.title}>
                        Find A Shop</Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            id="emo"
                            autoComplete={false}
                            freeSolo
                            style={{width: 300}}
                            options={allShops}
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
                                        placeholder: `Search user by ${filterOptions}`,
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
                              className={classNames(classes.listStyle, {[classes.showList]: toggleList})}
                              style={{marginTop: '1em', left: '85%'}}
                        >

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



            <Grid container spacing={2} style={{marginLeft: '0.5em'}}>
                {shops !== null && shops.length > 0 && !toggleShop?
                    shops.map((shop, index) => (
                        <Grid item xs={6} md={4} lg={4} style={{margin: 0}} key={index}>
                            <ShopCard shop={shop} setCurrentOrders={()=> dispatch(orderActions.getAllOrdersOfAShop(shop._id))} toggleShop={setToggleShop}/>
                        </Grid>
                    )) : null
                }
                {toggleShop &&
                <Fab aria-label="add" style={{marginTop: '3em', marginLeft: '3em', marginRight: '1em'}}
                     onClick={() => setToggleShop(val => !val)}>
                    <ArrowBackIcon/>
                </Fab>
                }
                {((shops ===null || loading) || (toggleShop && currentOrders===null)) &&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading}/>
                }
                {currentOrders !== null && currentOrders.length > 0 && toggleShop ?
                    currentOrders.map((order, index) => (
                        <Grid item xs={6} md={6} lg={4} style={{margin: 0}} key={index}>
                            <OrderCard order={order} getShop={()=> getShopById(order.shop)} getProduct={()=> getProductById(order.product)} getUser={()=> getUserById(order.user)}/>
                        </Grid>
                    )) : null
                }
            </Grid>
        </div>

    )
};

export default FindAShopOrders
