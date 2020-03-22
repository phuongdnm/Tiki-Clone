import React, {useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import userStyles from "../../styles/AdminDashboardStyles";

import PersonIcon from '@material-ui/icons/Person';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HeadsetIcon from '@material-ui/icons/Headset';
import StorefrontIcon from '@material-ui/icons/Storefront';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ChatIcon from '@material-ui/icons/Chat';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Dashboard from "@material-ui/icons/Dashboard";
import uuid from 'react-uuid'

import Collapse from "@material-ui/core/Collapse";
import AllUsers from "./AdminDashboardComponents/User/AllUsers";
import FindAUser from "./AdminDashboardComponents/User/FindAUser";
import AddNewUser from "./AdminDashboardComponents/User/AddNewUser";
import UpdateUser from "./AdminDashboardComponents/User/UpdateUser";
import DeleteUser from "./AdminDashboardComponents/User/DeleteUser";
import AllProducts from "./AdminDashboardComponents/Products/AllProducts";
import ProductsOfShop from "./AdminDashboardComponents/Products/ProductsOfShop";
import FindAProduct from "./AdminDashboardComponents/Products/FindAProduct";
import AllShops from "./AdminDashboardComponents/Shops/AllShops";
import FindAShop from "./AdminDashboardComponents/Shops/FindAShop";
import AllOrders from "./AdminDashboardComponents/Orders/AllOrders";
import OrdersOfShop from "./AdminDashboardComponents/Orders/OrdersOfShop";
import FindAShopOrders from "./AdminDashboardComponents/Orders/FindAShopOrders";
import AllReviews from "./AdminDashboardComponents/reviews/AllReviews";
import ReviewOfProduct from "./AdminDashboardComponents/reviews/ReviewOfProduct";
import FindAReview from "./AdminDashboardComponents/reviews/FindAReview";
import AddANewProduct from "./AdminDashboardComponents/Products/AddANewProduct";
import UpdateAProduct from "./AdminDashboardComponents/Products/UpdateAProduct";
import DeleteAProduct from "./AdminDashboardComponents/Products/DeleteAProduct";
import AddANewShop from "./AdminDashboardComponents/Shops/AddANewShop";
import UpdateAShop from "./AdminDashboardComponents/Shops/UpdateAShop";
import DeleteAShop from "./AdminDashboardComponents/Shops/DeleteAShop";
import UpdateOrDeleteOrder from "./AdminDashboardComponents/Orders/UpdateOrDeleteOrder";
import AddNewOrder from "./AdminDashboardComponents/Orders/AddNewOrder";
import AddANewReview from "./AdminDashboardComponents/reviews/AddNewReview";
import UpdateOrDeleteReview from "./AdminDashboardComponents/reviews/UpdateOrDeleteReview";
import Stats from "./AdminDashboardComponents/Stats/Stats";




const AdminDashBoard = (props) => {
    const classes = userStyles();
    const [selectedIndex, setSelectedIndex] = useState(props.index !== undefined ? props.index : 0);


    const [userMenu, setUserMenu] = useState(false);
    const [productMenu, setProductMenu] = useState(false);
    const [shopMenu, setShopMenu] = useState(false);
    const [orderMenu, setOrderMenu] = useState(false);
    const [reviewMenu, setReviewMenu] = useState(false);


    useEffect(() => {
        setSelectedIndex(props.index)
    }, [props.index]);
    const options = [
        'Statistics',
        'Users',
        'Products',
        'Shops',
        'Orders',
        'Review',
    ];
    const optionsIcon = [
        <EqualizerIcon className={classes.item}/>,
        <PersonIcon className={classes.item}/>,
        <HeadsetIcon className={classes.item}/>,
        <StorefrontIcon className={classes.item}/>,
        <LocalShippingIcon className={classes.item}/>,
        <ChatIcon className={classes.item}/>,
    ];
    const optionsSubItems = [
        [],
        ["View all users", "Get user a Info", "Add a new user", "Update a user", "Delete a user"],
        ["View all products", "Get product of a shop", "Get a product by id", "Create a new Product", "Update a Product", " Delete a product"],
        ["View all shops", "Get a shop by id", "Create a new shop", "Update a shop", "Delete a shop"],
        ["View all orders", "Get all orders of a shop", "Get a shop by id", "Add a new order", "Update an order", "Delete an order"],
        ["View all reviews", "Get all reviews of a product", "Get a review by id", "Add a new review", "Update a review", "Delete a review"],
    ];
    const optionsSubMenuItemsIcon = [
        [],
        [<PeopleOutlineIcon className={classes.item}/>, <InfoIcon className={classes.item}/>,
            <AddIcon className={classes.item}/>, <UpdateIcon className={classes.item}/>,
            <DeleteIcon className={classes.item}/>,],
        [<PhoneIphoneIcon className={classes.item}/>, <InfoIcon className={classes.item}/>,
            <InfoIcon className={classes.item}/>, <AddIcon className={classes.item}/>,
            <UpdateIcon className={classes.item}/>, <DeleteIcon className={classes.item}/>,],
        [<LocalMallIcon className={classes.item}/>, <InfoIcon className={classes.item}/>,
            <AddIcon className={classes.item}/>, <UpdateIcon className={classes.item}/>,
            <DeleteIcon className={classes.item}/>,],
        [<CardTravelIcon className={classes.item}/>, <InfoIcon className={classes.item}/>,
            <InfoIcon className={classes.item}/>, <AddIcon className={classes.item}/>,
            <UpdateIcon className={classes.item}/>, <DeleteIcon className={classes.item}/>,],
        [<RateReviewIcon className={classes.item}/>, <InfoIcon className={classes.item}/>,
            <InfoIcon className={classes.item}/>, <AddIcon className={classes.item}/>,
            <UpdateIcon className={classes.item}/>, <DeleteIcon className={classes.item}/>,],
    ];
    const optionsMenuToggleVariable = [null, userMenu, productMenu, shopMenu, orderMenu, reviewMenu];
    const optionsMenuToggleVariableSetter = [null, setUserMenu, setProductMenu, setShopMenu, setOrderMenu, setReviewMenu];
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    const handleToggle = (event, index) => {
        optionsMenuToggleVariableSetter[index](val => !val)
    };

    const renderMenuItems = () => {
        let counter = 0;
        return options.map((option, index) => {
                if (optionsSubItems[index].length > 0) {
                    counter++;
                    return <section key={uuid()}>
                        <ListItem
                            style={{
                                marginTop: 0,
                                marginBottom: 0,
                                paddingTop: "1.51%",
                                paddingBottom: "1.51%",
                                alignItems: 'center'
                            }}
                            button
                            // selected={index === selectedIndex}
                            onClick={event => handleToggle(event, index)}
                        >
                            <ListItemIcon style={{marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0}}>
                                {optionsIcon[index]}
                            </ListItemIcon>
                            <ListItemText primary={option} primaryTypographyProps={{variant: "inherit"}}
                                          style={{
                                              marginTop: 0,
                                              marginBottom: 0,
                                              paddingTop: "0.5em",
                                              paddingBottom: "0.5em"
                                          }}
                                          className={classes.item2}/>
                            {optionsMenuToggleVariable[index] ? <ExpandLess className={classes.item}/> :
                                <ExpandMore className={classes.item}/>}
                        </ListItem>


                        <Collapse in={optionsMenuToggleVariable[index]} timeout={"auto"} unmountOnExit className={classes.drop}>
                            <List component="div" disablePadding >
                                {optionsSubItems[index].map((item, index_) => {
                                    counter++;
                                    let temp = counter;
                                    return (
                                        <ListItem button className={classes.subItem} key={uuid()}
                                                  onClick={event => handleMenuItemClick(event, temp)}
                                                  selected={temp === selectedIndex}>
                                            <ListItemIcon>
                                                {optionsSubMenuItemsIcon[index][index_]}
                                            </ListItemIcon>
                                            <ListItemText primary={item} primaryTypographyProps={{variant: "inherit"}}
                                                          style={{
                                                              marginTop: 0,
                                                              marginBottom: 0,
                                                              paddingTop: 0,
                                                              paddingBottom: 0
                                                          }}
                                                          className={classes.item2}/>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </Collapse>
                    </section>;
                } else {
                    counter++;
                    let temp = counter;
                    return <ListItem
                        style={{
                            marginTop: 0,
                            marginBottom: 0,
                            paddingTop: "1.51%",
                            paddingBottom: "1.51%",
                            alignItems: 'center'
                        }}
                        key={uuid()}
                        button
                        selected={temp === selectedIndex}
                        onClick={event => handleMenuItemClick(event, temp)
                        }
                    >
                        <ListItemIcon style={{marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0}}>
                            {optionsIcon[index]}
                        </ListItemIcon>
                        <ListItemText primary={option} primaryTypographyProps={{variant: "inherit"}}
                                      style={{marginTop: 0, marginBottom: 0, paddingTop: "0.5em", paddingBottom: "0.5em"}}
                                      className={classes.item2}/>
                    </ListItem>
                }
            }
        )
    };
    const renderMenuItemComponent = () => {
        switch (selectedIndex) {
            case 1:
                return <Stats/>;
            case 2:
                return null;
            case 3:
                return <AllUsers/>;
            case 4:
                return <FindAUser/>;
            case 5:
                return <AddNewUser/>;
            case 6:
                return <UpdateUser/>;
            case 7:
                return <DeleteUser/>;
            case 8:
                return null;
            case 9:
                return <AllProducts/>;
            case 10:
                return <ProductsOfShop/>;
            case 11:
                return <FindAProduct/>;
            case 12:
                return <AddANewProduct/>;
            case 13:
                return <UpdateAProduct/>;
            case 14:
                return <DeleteAProduct/>;
            case 15:
                return null;
            case 16:
                return <AllShops/>;
            case 17:
                return <FindAShop/>;
            case 18:
                return <AddANewShop/>;
            case 19:
                return <UpdateAShop/>;
            case 20:
                return <DeleteAShop/>;
            case 21:
                return null;
            case 22:
                return <AllOrders/>;
            case 23:
                return <OrdersOfShop/>;
            case 24:
                return <FindAShopOrders/>;
            case 25:
                return <AddNewOrder/>;
            case 26:
                return <UpdateOrDeleteOrder/>;
            case 27:
                return <UpdateOrDeleteOrder/>;
            case 28:
                return null;
            case 29:
                return <AllReviews/>;
            case 30:
                return <ReviewOfProduct/>;
            case 31:
                return <FindAReview/>;
            case 32:
                return <AddANewReview/>;
            case 33:
                return <UpdateOrDeleteReview/>;
            case 34:
                return <UpdateOrDeleteReview/>;
            default:
                return <p>default</p>
        }
    };
    return (
        <div style={{width: '95%', marginBottom: '2em', zIndex: '-1'}}>
            <Grid container spacing={5}>
                <Grid item xs={3} className={classes.sideBar}>
                    <section style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        marginLeft: '0.5em',
                        marginBottom: '1.5em'
                    }}>
                        <Dashboard className={classes.item} style={{fontSize: '2.2em', marginRight: '0.3em'}}/>
                        <p style={{display: 'inline-block', fontSize: '0.8em', marginBottom: 0}}>
                            <span style={{fontWeight: 600, fontSize: '1.7em', color: "#fff"}}>Admin Dashboard</span></p>
                    </section>
                    <hr style={{background: "rgba(256, 256, 256, 0.5)"}}/>
                    <List component="nav" aria-label="main mailbox folders" style={{margin: 0}}>
                        {renderMenuItems()}
                    </List>

                </Grid>
                <Grid item xs={9} style={{padding: 0}}>
                    <Grid container style={{marginBottom: '1em'}}>
                        {renderMenuItemComponent()}
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
};

export default AdminDashBoard

