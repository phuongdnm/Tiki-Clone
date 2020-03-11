import React, {useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import userStyles from "../../styles/AccountDashboardStyles";


import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import RoomIcon from '@material-ui/icons/Room';
import EventNoteIcon from '@material-ui/icons/EventNote';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CommentIcon from '@material-ui/icons/Comment';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import tikiNow from '../../image/tiki-now2.png'
import tikixu from '../../image/tikixu.svg';
import bookcare from '../../image/bookcare.svg'
import avatar from '../../image/avatar.png'

import MenuBookIcon from "@material-ui/icons/MenuBook";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountInformation from "./AccountDashboardComponents/AccountInformation";
import MyNotice from "./AccountDashboardComponents/MyNotice";
import OrderManagement from "./AccountDashboardComponents/OrderManagement";
import Address from "./AccountDashboardComponents/Address";
import BillingInformation from "./AccountDashboardComponents/BillingInformation";
import ReviewProductPurchased from "./AccountDashboardComponents/ReviewProductPurchased";
import ProductsViewed from "./AccountDashboardComponents/ProductsViewed";
import FavoriteProducts from "./AccountDashboardComponents/FavoriteProducts";
import ProductsToBuyLater from "./AccountDashboardComponents/ProductsToBuyLater";
import MyComment from "./AccountDashboardComponents/MyComment";
import QuestionAndAnswer from "./AccountDashboardComponents/QuestionAndAnswer";
import InformationTikiNow from "./AccountDashboardComponents/InformationTikiNow";
import MyTikiXuManager from "./AccountDashboardComponents/MyTikiXuManager";
import MyBookCare from "./AccountDashboardComponents/MyBookCare";
import {useSelector} from "react-redux";


const AccountDashBoard = (props)=> {
    const classes = userStyles();
    const [selectedIndex, setSelectedIndex] = useState(props.index ? props.index : 0);

    const user = useSelector(state => state.auth.userData);



    useEffect(()=>{
        setSelectedIndex(props.index)
    }, [props.index]);
    const options = [
        'Account Information',
        'My notice',
        'Order Management',
        'Address',
        'Billing Information',
        'Review Products purchased',
        'Products you have viewed',
        'Favorite products',
        'Product to buy later',
        'My comment',
        'Question an answer',
        'Information TikiNOW',
        'My Tiki Xu manager',
        'My book care'
    ];
    const optionsIcon = [
        <PersonIcon className={classes.item}/>,
        <NotificationsIcon className={classes.item}/>,
        <MenuBookIcon className={classes.item}/>,
        <RoomIcon className={classes.item}/>,
        <CreditCardIcon className={classes.item}/>,
        <EventNoteIcon className={classes.item}/>,
        <VisibilityIcon className={classes.item}/>,
        <FavoriteIcon className={classes.item}/>,
        <ShoppingCartIcon className={classes.item}/>,
        <CommentIcon className={classes.item}/>,
        <QuestionAnswerIcon className={classes.item}/>,
        <img src={tikiNow} style={{width: "1.5em"}} alt={"oven"}/>,
        <img src={tikixu} style={{width: "1.5em"}} alt={"tiki xu"}/>,
        <img src={bookcare} style={{width: "1.5em"}} alt={"bookcare"}/>,

    ];
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        // setToggleDrawer(true)
    };
    const renderMenuItemComponent = ()=>{
        switch (selectedIndex) {
            case 0:
                return <AccountInformation/>;
            case 1:
                return <MyNotice/>;
            case 2:
                return <OrderManagement/>;
            case 3:
                return <Address/>;
            case 4:
                return <BillingInformation/>;
            case 5:
                return <ReviewProductPurchased/>;
            case 6:
                return <ProductsViewed/>;
            case 7:
                return <FavoriteProducts/>;
            case 8:
                return <ProductsToBuyLater/>;
            case 9:
                return <MyComment/>;
            case 10:
                return <QuestionAndAnswer/>;
            case 11:
                return <InformationTikiNow/>;
            case 12:
                return <MyTikiXuManager/>;
            case 13:
                return <MyBookCare/>;
            default: return <p>default</p>
        }
    };
    return (
        <div style={{width: '80%', marginBottom: '2em', zIndex: '0'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '6em'}} spacing={5}>
                <Grid item xs={3} style={{margin: 0}}>
                    <section style={{display: 'flex', justifyContent: 'start', marginLeft: '0.5em'}} >
                        <img src={avatar} style={{width: "3em", display: "inline-block", marginRight: "1em", borderRadius: "50%"}} alt={"oven"}/>
                        <p style={{display: 'inline-block', fontSize: '0.8em', marginBottom: 0, paddingTop: '1em'}}><span>Account of</span> <br/> <span style={{fontWeight: 600, fontSize: '1.2em'}}>{user.name}</span> </p>
                    </section>

                    <List component="nav" aria-label="main mailbox folders" style={{margin: 0}}>
                        {options.map((option, index) => (
                            <ListItem
                                style={{marginTop: 0, marginBottom: 0, paddingTop:"1.51%", paddingBottom: "1.51%", alignItems: 'center'}}
                                key={option}
                                button
                                selected={index === selectedIndex}
                                onClick={event => handleMenuItemClick(event, index)
                                    // onMouseEnter={event => handleMenuItemClick(event, index)
                                }
                            >
                                <ListItemIcon style={{marginTop: 0, marginBottom: 0, paddingTop:0, paddingBottom: 0}} >
                                    {optionsIcon[index]}
                                </ListItemIcon>
                                <ListItemText primary={option} primaryTypographyProps={{variant: "inherit"}}
                                              style={{marginTop: 0, marginBottom: 0, paddingTop:0, paddingBottom: 0}} className={classes.item2}/>
                            </ListItem>
                        ))}
                    </List>

                </Grid>
                <Grid item xs={9} >
                    <Grid container>
                        {renderMenuItemComponent()}
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
};

export default AccountDashBoard

