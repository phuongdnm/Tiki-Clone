import React, {useState} from 'react'
import userStyles from "../styles/AllUsersStyles";
import Moment from 'react-moment';
import 'rsuite/dist/styles/rsuite-default.css';
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardIcon from "../Card/CardIcon";

import {Accessibility, Update} from "@material-ui/icons";

import Fab from "@material-ui/core/Fab";
import CardFooter from "../Card/CardFooter";
import Button from "../CustomButtons/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import classNames from "classnames";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {OrderCard} from "./OrderCard";
import ReactLoading from 'react-loading';
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import OrderStats from "../Stats/OrderStats";




const AllOrders = (props) => {
    const classes = userStyles();
    const allOrders = useSelector(state => state.orders.allOrders);  // all users
    const [orders, setOrders] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);


    const [ordersLastUpdated, setOrdersLastUpdated] = useState(Date.now());
    const [toggleList, setToggleList] = useState(false);
    const [toggleSortOrder, setToggleSortOrder] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [filterOptions, setFilterOptions] = useState("createdAt");


    if(firstLoad){
        // users wouldn't have been set so we use settimeout
        allOrders !== null && setTimeout(()=>{setOrders(allOrders); setFirstLoad(false);}, 1000);
    }


    const handleFilter = (sortDescending, filterOptions) => {
        setIsLoading(true);
        let orders_ = orders;
        if (sortDescending) {
            switch (filterOptions) {
                case "createdAt":
                    orders_ !== null && orders_.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
                    setOrders(orders_);
                    setIsLoading(false);
                    return ;
                case "currentState":
                    // first convert current state in order to number so we can sort by current state
                    orders_ !== null && orders_.forEach((order, index) => {
                        if (order.currentState === "Ordered Successfully") return orders_[index].currentState = 6;
                        if (order.currentState === "Tiki Received") return orders_[index].currentState = 5;
                        if (order.currentState === "Getting Product") return orders_[index].currentState = 4;
                        if (order.currentState === "Packing") return orders_[index].currentState = 3;
                        if (order.currentState === "Shipping") return orders_[index].currentState = 2;
                        if (order.currentState === "Delivered") return orders_[index].currentState = 1;
                    });
                    // second sort orders array where currentState is represented with numbers
                    orders_ !== null && orders_.sort((a, b) => a.currentState > b.currentState ? -1 : 1);

                    orders_ !== null && orders_.forEach((order, index) => {
                        if (order.currentState === 6) return orders_[index].currentState = "Ordered Successfully";
                        if (order.currentState === 5) return orders_[index].currentState = "Tiki Received";
                        if (order.currentState === 4) return orders_[index].currentState = "Getting Product";
                        if (order.currentState === 3) return orders_[index].currentState = "Packing";
                        if (order.currentState === 2) return orders_[index].currentState = "Shipping";
                        if (order.currentState === 1) return orders_[index].currentState = "Delivered";
                    });
                    setOrders(orders_);
                    setIsLoading(false);
                    return;
                case "price":
                    orders_ !== null && orders_.sort((a, b) => a.total > b.total ? -1 : 1);
                    setOrders(orders_);
                    setIsLoading(false);
                    return;
                case "quantity":
                    orders_ !== null && orders_.sort((a, b) => a.quantity > b.quantity ? -1 : 1);
                    setOrders(orders_);
                    setIsLoading(false);
                    return;
                default:
                    return orders;
            }
        } else{
        switch (filterOptions) {
            case "createdAt":
                orders_ !== null && orders_.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
                setOrders(orders_);
                setIsLoading(false);
                return ;
            case "currentState":
                // first convert current state in order to number so we can sort by current state
                orders_ !== null && orders_.forEach((order, index) => {
                    if (order.currentState === "Ordered Successfully") return orders_[index].currentState = 6;
                    if (order.currentState === "Tiki Received") return orders_[index].currentState = 5;
                    if (order.currentState === "Getting Product") return orders_[index].currentState = 4;
                    if (order.currentState === "Packing") return orders_[index].currentState = 3;
                    if (order.currentState === "Shipping") return orders_[index].currentState = 2;
                    if (order.currentState === "Delivered") return orders_[index].currentState = 1;
                });
                // second sort orders array where currentState is represented with numbers
                orders_ !== null && orders_.sort((a, b) => a.currentState > b.currentState ? 1 : -1);

                orders_ !== null && orders_.forEach((order, index) => {
                    if (order.currentState === 6) return orders_[index].currentState = "Ordered Successfully";
                    if (order.currentState === 5) return orders_[index].currentState = "Tiki Received";
                    if (order.currentState === 4) return orders_[index].currentState = "Getting Product";
                    if (order.currentState === 3) return orders_[index].currentState = "Packing";
                    if (order.currentState === 2) return orders_[index].currentState = "Shipping";
                    if (order.currentState === 1) return orders_[index].currentState = "Delivered";
                });
                setOrders(orders_);
                setIsLoading(false);
                return;
            case "price":
                orders_ !== null && orders_.sort((a, b) => a.total > b.total ? 1 : -1);
                setOrders(orders_);
                setIsLoading(false);
                return ;
            case "quantity":
                orders_ !== null && orders_.sort((a, b) => a.quantity > b.quantity ? 1 : -1);
                setOrders(orders_);
                setIsLoading(false);
                return ;
            default:
                return orders;
        }
    }};


    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} >
                <Grid item xs={3} md={3} lg={3} className={classes.card}>
                    <Card onClick={() => handleFilter(false)}>
                        <CardHeader color="tiki" stats icon>
                            <CardIcon color="tiki">
                                <Accessibility/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Total Orders</p>
                            <h3 className={classes.cardTitle}>{allOrders !== null && allOrders.length}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update/>
                                <Moment fromNow style={{textTransform: "capitalize"}}>{ordersLastUpdated}</Moment>
                            </div>
                        </CardFooter>
                    </Card>
                    <section style={{display: "flex", alignItems: 'center'}} >
                        <div tabIndex={0}
                             onBlur={(event)=> {!event.currentTarget.contains(event.relatedTarget) && setToggleList(false)}}>
                        <Button color="white" className={classes.title} onClick={() => setToggleList(val => !val)}
                                style={{marginLeft: "0 !important", width: "100%"}}
                        >
                            Sort by {filterOptions} {toggleList ? <ExpandLess style={{marginLeft: '0.5em'}}/> :
                            <ExpandMore style={{marginLeft: '0.5em'}}/>}
                        </Button>
                        <List component="nav" aria-label="filter options"
                              className={classNames(classes.listStyle, {[classes.showList]: toggleList})}
                              style={{marginTop: '1em'}}
                        >
                            <ListItem button onClick={() => {
                                setFilterOptions("createdAt");
                                setToggleList(val => !val)
                                handleFilter(false,"createdAt")
                            }} selected={"createdAt" === filterOptions}>
                                <ListItemText primary="Time created"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("currentState");
                                setToggleList(val => !val)
                                handleFilter(false,"currentState")
                            }} selected={"currentState" === filterOptions}>
                                <ListItemText primary="Current Order State"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("price");
                                setToggleList(val => !val)
                                handleFilter(false, "price")
                            }} selected={"price" === filterOptions}>
                                <ListItemText primary="Price"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("quantity");
                                setToggleList(val => !val)
                                handleFilter(false,"quantity")
                            }} selected={"quantity" === filterOptions}>
                                <ListItemText primary="Order quantity"/>
                            </ListItem>
                        </List>
                        </div>
                    </section>
                    <Fab aria-label="add" color={"secondary"} style={{marginTop: '1.5em', marginLeft: '5.5em'}}
                         onClick={() => {setToggleSortOrder(val => {handleFilter(val, filterOptions ); return !val})}}>
                        {toggleSortOrder ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>}
                    </Fab>
                </Grid>
                <Grid item xs={9} md={9} lg={9} className={classes.card} style={{marginTop: '2em'}} >
                    <OrderStats/>
                </Grid>
            </Grid>
            <Grid container spacing={1} style={{marginLeft: '0.5em'}}>

                {orders !== null && orders.length > 0 ?
                    orders.map((order, index) => (
                        <Grid item xs={6} md={6} lg={4} style={{margin: 0}} key={index}>
                            <OrderCard order={order}/>

                        </Grid>
                    )) : null
                }
                {
                    (orders === null || isLoading )&&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading3}/>
                }
            </Grid>
        </div>

    )
};

export default AllOrders;
