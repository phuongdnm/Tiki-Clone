import React, {useEffect, useState} from 'react'
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


import {AccessTime, Search} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CardBody from "../Card/CardBody";
import Fab from "@material-ui/core/Fab";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardFooter from "../Card/CardFooter";
import {Timeline} from "rsuite";
import {message} from "antd";
import UpdateOrderForm from "./UpdateOrderForm";
import ReactLoading from 'react-loading';




const OrderCard = ({order, handleDeleteOrder, setCurrentOrder, isLoading, toggleOrderUpdateForm})=>{  // modified
    const classes = userStyles();
    const [shopsLastUpdated, setShopsLastUpdated] = useState(Date.now());
    const pickRandGradient = ()=>{
        let grads = [{x: "#26B7FF", y: "#5C8BC3"},{x: "#69AAEE", y: "#5C8BC3"},{x: "#69AAEE", y: "#0E4677"},{x: "#3064A7", y: "#5C8BC3"},];
        let rand = grads[Math.floor(Math.random() * grads.length)];
        return `${rand.x}, ${rand.y}`
    };
    const transformCurrentStateToNum = (currentState)=>{
        if(currentState === "Ordered Successfully") return  6;
        if(currentState === "Tiki Received") return  5;
        if(currentState === "Getting Product") return  4;
        if(currentState === "Packing") return  3;
        if(currentState === "Shipping")  return 2;
        if(currentState === "Delivered") return  1;
    };
    const OrderTimeLine = ({createdAt, currentState})=> {
        // console.log(`currstate is`);
        // console.log(currentState);
        return(
            <Timeline align={"left"}>
                <Timeline.Item className={classes.oldTimeItem}>
                    <p>{Moment2(createdAt).format('MMMM DD,YYYY')}</p>
                    <p> Ordered Successfully</p>
                </Timeline.Item>
                {currentState <= 6 &&
                <Timeline.Item className={classNames(classes.oldTimeItem, {[classes.newTimeItem]: currentState === 6}) }>
                    <>
                        <p>{Moment2(createdAt).format('MMMM DD,YYYY')}</p>
                        < p> Your order started processing</p></>

                </Timeline.Item>
                }
                {currentState <= 5 &&
                <Timeline.Item  className={classNames(classes.oldTimeItem, {[classes.newTimeItem]: currentState === 5})}>
                    <p>
                        <Moment format="MMMM DD,YYYY" add={{ days: 5 }}>
                            {createdAt}
                        </Moment>
                    </p>
                    <p>Tiki received you order</p>
                </Timeline.Item>
                }
                {currentState <= 4 &&
                <Timeline.Item className={classNames(classes.oldTimeItem, {[classes.newTimeItem]: currentState === 4})}>
                    <p><Moment format="MMMM DD,YYYY" add={{ days: 5 }}>
                        {createdAt}
                    </Moment></p>
                    <p>Getting product from warehouse</p>
                </Timeline.Item>
                }
                {currentState <= 3 &&
                <Timeline.Item className={classNames(classes.oldTimeItem, {[classes.newTimeItem]: currentState === 3})}>
                    <p><Moment format="MMMM DD,YYYY" add={{ days: 5 }}>
                        {createdAt}
                    </Moment></p>
                    <p>Packing product</p>
                </Timeline.Item>
                }
                {currentState <= 2 &&
                <Timeline.Item className={classNames(classes.oldTimeItem, {[classes.newTimeItem]: currentState === 2})}>
                    <p><Moment format="MMMM DD,YYYY" add={{ days: 5 }}>
                        {createdAt}
                    </Moment></p>
                    <p>Shipping product</p>
                </Timeline.Item>
                }
                {currentState <= 1 &&
                <Timeline.Item className={classNames(classes.oldTimeItem, {[classes.newTimeItem]: currentState === 1})}>
                    <p><Moment format="MMMM DD,YYYY" add={{ days: 5 }}>
                        {createdAt}
                    </Moment></p>
                    <p>Delivered product</p>
                </Timeline.Item>
                }

            </Timeline>
        )
    };
    return(
        <Card chart className={classes.addCursor} >
            <CardHeader color="success" style={{backgroundImage: `linear-gradient(40deg, ${pickRandGradient()})`, textAlign: 'center'}} >
                <p style={{fontSize: '1.4em'}}>Ordered by {order.user.name} from {order.shop.name}</p>
                <OrderTimeLine createdAt={order.createdAt} currentState={transformCurrentStateToNum(order.currentState) }/>


            </CardHeader>
            <CardBody>
                <h6 style={{fontSize: '1.3em'}}>Product Ordered - {order.product.name}</h6>
                <p className={classes.successText} style={{marginTop: '0.5em', fontSize: '1.1em', fontWeight: 600}}>Total Price - {order.total}</p>
                <p className={classes.cardTitle} style={{marginTop: '0.5em', fontSize: '1em'}}>Quantity ordered - {order.quantity}</p>
                <p style={{fontSize: '0.9em'}}>Address - {order.address}</p>
                <p style={{marginTop: '0.5em', fontSize: '0.9em'}}>Contact is - {order.phone}</p>
                <p style={{marginTop: '0.5em', fontSize: '0.9em'}}>Order Id is - {order._id}</p>
                <Grid container spacing={1} style={{marginTop: '1em'}}>
                    <Grid item xs={4} md={4} lg={5} style={{margin: 0}}>
                        <Button color="tiki"  style={{width: '90%', marginRight:"0.2em"}} onClick={()=>{setCurrentOrder(order); toggleOrderUpdateForm(val => !val)}}>Update Order</Button>
                    </Grid><Grid item xs={4} md={4} lg={5} style={{margin: 0}}>
                        <Button color="danger" style={{width: '90%'}} disabled={isLoading} onClick={handleDeleteOrder}>Delete Order</Button>
                    </Grid>
                </Grid>

            </CardBody>
            <CardFooter chart>
                <div className={classes.stats}>
                    <AccessTime/>
                    <Moment fromNow style={{textTransform: "capitalize"}}>{shopsLastUpdated}</Moment>
                </div>
            </CardFooter>
        </Card>
    )
};

const UpdateOrDeleteOrder = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const [filterOptions, setFilterOptions] = useState("id");
    const [filterOptions2, setFilterOptions2] = useState("Ordered Successfully");
    const [toggleList, setToggleList] = useState(false);
    const [toggleList2, setToggleList2] = useState(false);
    const [inputText, setInputText] = useState("");
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);


    const allOrders = useSelector(state => state.orders.allOrders);  // all users
    const [orders_, setOrders_] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);


    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        setTimeout(() => {
            setOrders_(allOrders);
            setFirstLoad(false)
        }, 750);
    }
    useEffect(() => {
        setTimeout(() => setOrders_(allOrders), 1000)
    }, [allOrders]);


    const handleFilter = (filter, option) => {
        switch (filter) {
            case "id":
                return option._id;
            case "productName":
                return option.product.name;
            case "price":
                return option.total.toString();
            case "quantity":
                return option.quantity.toString();
            default:
                return ""
        }
    };

    const handleSearch = (isSearchByCurrentState, filterOptions2) => {
        setIsLoading(true);
        if (isSearchByCurrentState === true) {
            switch (filterOptions2) {
                case "Ordered Successfully":
                    setOrders_(allOrders.filter(order => order.currentState === "Ordered Successfully"));
                    setIsLoading(false);
                    return ;
                case "Tiki Received":
                    setOrders_(allOrders.filter(order => order.currentState === "Tiki Received"));
                    setIsLoading(false);
                    return ;
                case "Getting Product":
                    setOrders_(allOrders.filter(order => order.currentState === "Getting Product"));
                    setIsLoading(false);
                    return ;
                case "Packing":
                    setOrders_(allOrders.filter(order => order.currentState === "Packing"));
                    setIsLoading(false);
                    return ;
                case "Shipping":
                    setOrders_(allOrders.filter(order => order.currentState === "Shipping"));
                    setIsLoading(false);
                    return ;
                case "Delivered":
                    setOrders_(allOrders.filter(order => order.currentState === "Packing"));
                    setIsLoading(false);
                    return ;
                default:
                    return orders_;
            }
        }
        else if (inputText.length > 0) {
            switch (filterOptions) {
                case "id":
                    setOrders_(allOrders.filter(order => order._id === inputText));
                    setIsLoading(false);
                    return ;
                case "productName":
                    setOrders_(allOrders.filter(order => order.product.name === inputText));
                    setIsLoading(false);
                    return ;
                case "price":
                    setOrders_(allOrders.filter(order => order.total.toString() === inputText));
                    setIsLoading(false);
                    return ;
                case "quantity":
                    setOrders_(allOrders.filter(order => order.quantity.toString() === inputText));
                    setIsLoading(false);
                    return ;
                default:
                    return ""
            }
        }
    };

    const handleDeleteOrder = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Deleting Order!", 0);
        await dispatch(orderActions.deleteOrderById(currentOrder._id));
        setTimeout(msg, 1);
        setIsLoading(false)
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={2} md={2} lg={1} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-start'}}>

                    <Button color="transparent" onClick={() => {
                        setOrders_(allOrders)
                    }} className={classes.title2} size={"sm"} style={{marginLeft: 0, fontSize:'0.8em !important', marginTop: '1.5em', marginRight: '2em'}}>
                        Find Order to Update or Delete</Button>
                    </section>
                </Grid>
                <Grid item xs={10} md={10} lg={11} style={{margin: 0}}>

                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            id="country-select-demo"
                            freeSolo
                            style={{width: 250, marginLeft: 0}}
                            options={allOrders}
                            classes={{
                                option: classes.option,
                            }}
                            noOptionsText={`No user with that ${filterOptions}`}
                            getOptionLabel={option => handleFilter(filterOptions, option)}
                            autoHighlight
                            renderOption={(option, state) =>
                                <p style={{
                                    padding: "0.5em",
                                    margin: "0",
                                    width: 250,
                                    height: "100% !important",
                                    color: '#000',
                                    overflowX: "hidden"
                                }} onClick={(e) => {
                                    setInputText(e.target.textContent)
                                }}>
                                    {console.log(`inputtext is`)}
                                    {console.log(inputText)}
                                    {handleFilter(filterOptions, option)}
                                </p>
                            }
                            renderInput={params => (
                                <CustomInput
                                    formControlProps={{
                                        className: classes.search
                                    }}
                                    inputProps={{
                                        onChange: (e) => {
                                            setInputText(e.target.value);
                                            console.log(inputText);
                                        },
                                        // console.log(`val is: ${inputText}`)},
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
                                style={{marginBottom: 0, marginLeft: '0.5em'}}
                                onClick={()=>handleSearch(false)}>
                            <Search/>
                        </Button>
                        <div tabIndex={0}
                             onBlur={(event)=> {!event.currentTarget.contains(event.relatedTarget) && setToggleList(false)}}>
                        <Button color="white" size={'sm'} className={classes.title2} onClick={() => setToggleList(val => !val)}>
                            Search by {filterOptions} {toggleList ? <ExpandLess style={{marginLeft: '0.5em'}}/> :
                            <ExpandMore style={{marginLeft: '0.5em'}}/>}

                        </Button>
                        <List component="nav" aria-label="filter options"
                              style={{left: "65%", marginTop: '1em'}}
                              className={classNames(classes.listStyle, {[classes.showList]: toggleList})}>
                            <ListItem button onClick={() => {
                                setFilterOptions("id");
                                setToggleList(val => !val)
                            }} selected={"id" === filterOptions}>
                                <ListItemText primary="Id"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("productName");
                                setToggleList(val => !val)
                            }} selected={"productName" === filterOptions}>
                                <ListItemText primary="Product Name"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("price");
                                setToggleList(val => !val)
                            }} selected={"price" === filterOptions}>
                                <ListItemText primary="Price"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("quantity");
                                setToggleList(val => !val)
                            }} selected={"quantity" === filterOptions}>
                                <ListItemText primary="Product Quantity"/>
                            </ListItem>
                        </List>
                        </div>
                        <div tabIndex={0}
                             onBlur={(event)=> {!event.currentTarget.contains(event.relatedTarget) && setToggleList2(false)}}>
                    <Button color="white" size={'sm'} className={classes.title2} onClick={() => setToggleList2(val => !val)}>
                        Filter by {filterOptions2} {toggleList2 ? <ExpandLess style={{marginLeft: '0.5em'}}/> :
                        <ExpandMore style={{marginLeft: '0.5em'}}/>}
                    </Button>


                        <List component="nav" aria-label="filter options2"
                              className={classNames(classes.listStyle, {[classes.showList]: toggleList2})}
                              style={{marginTop: '1em'}}

                        >

                            <ListItem button onClick={() => {
                                setFilterOptions2("Ordered Successfully");
                                setToggleList2(val => !val);
                               handleSearch(true,"Ordered Successfully" )
                            }} selected={"Ordered Successfully" === filterOptions2}>
                                <ListItemText primary="Ordered Successfully"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions2("Tiki Received");
                                setToggleList2(val => !val);
                                handleSearch(true,"Tiki Received" )
                            }} selected={"Tiki Received" === filterOptions2}>
                                <ListItemText primary="Tiki Received"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions2("Getting Product");
                                setToggleList2(val => !val);
                                handleSearch(true,"Getting Product" )
                            }} selected={"Getting Product" === filterOptions2}>
                                <ListItemText primary="Getting Product"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions2("Packing");
                                setToggleList2(val => !val);
                                handleSearch(true,"Packing" )
                            }} selected={"Packing" === filterOptions2}>
                                <ListItemText primary="Packing"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions2("Shipping");
                                setToggleList2(val => !val);
                                handleSearch(true,"Shipping" )
                            }} selected={"Shipping" === filterOptions2}>
                                <ListItemText primary="Shipping"/>
                            </ListItem> <ListItem button onClick={() => {
                                setFilterOptions2("Delivered");
                                setToggleList2(val => !val);
                                 handleSearch(true,"Delivered" )
                        }} selected={"Delivered" === filterOptions2}>
                                <ListItemText primary="Delivered"/>
                            </ListItem>
                        </List>
                        </div>
                            </section>
                </Grid>

                {/*</Grid>*/}

            </Grid>
            <Grid container spacing={2} style={{marginLeft: '0.5em'}}>
                {orders_ !== null && orders_.length > 0 && !showUpdateForm ?
                    orders_.map((order, index) => (
                        <Grid item xs={6} md={4} lg={4} style={{margin: 0}} key={index}>
                            <OrderCard order={order} setCurrentOrder={setCurrentOrder} toggleOrderUpdateForm={setShowUpdateForm} isLoading={isLoading} handleDeleteOrder={handleDeleteOrder}/>
                        </Grid>
                    )) : null}
                {orders_ !== null && orders_.length === 0 &&    // if search result is empty
                <Grid item xs={10} md={10} lg={12} style={{margin: 0}}>
                    <section style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        width: '100%',
                        height: '100%'
                    }}>
                        <p style={{
                            padding: '10% auto',
                            fontSize: "3em",
                            fontWeight: 600,
                            textAlign: 'center',
                            marginTop: '2em',
                            color: "rgba(149, 149, 149, 1)"
                        }}>No orders found with "{filterOptions2}".</p>
                    </section>
                </Grid>
                }
                {
                    (orders_ === null || loading) &&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading}/>
                }
                {showUpdateForm &&
                <Fab aria-label="add" style={{marginTop: '1em', marginLeft: '5em'}}
                     onClick={() => setShowUpdateForm(val => !val)}>
                    <ArrowBackIcon/>
                </Fab>
                }

                {orders_ !== null && orders_.length > 0 && showUpdateForm ?
                    <Grid item xs={6} md={6} lg={7} style={{margin: "2em", marginTop: '0'}}>
                        <UpdateOrderForm order={currentOrder} setShowUpdateForm={setShowUpdateForm}/>
                    </Grid> : null
                }
            </Grid>
        </div>

    )
};

export default UpdateOrDeleteOrder
