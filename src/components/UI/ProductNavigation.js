import React, {useState} from 'react'
import userStyles from '../../styles/ProductNavigationStyles'
import classNames from "classnames";
import Icon from "@material-ui/core/Icon";
import {Link} from "react-router-dom";
import Badge from "@material-ui/core/Badge";


import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import TvIcon from '@material-ui/icons/Tv';
import HeadsetIcon from '@material-ui/icons/Headset';
import LaptopIcon from '@material-ui/icons/Laptop';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import LanguageIcon from '@material-ui/icons/Language';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CreditCardIcon from '@material-ui/icons/CreditCard';

import OvenIcon from '../../image/oven.png'
import FryingPanIcon from '../../image/fryingPan.png'
import CleanerIcon from '../../image/cleaner.png'
import LipStickIcon from '../../image/lipstick.png'
import cooker from '../../image/cooker.png'


const ProductNavigation = props => {
    const classes = userStyles();
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const options = [
        'Phone - Tablet',
        'Electronic Refrigeration',
        'Accessories - Digital Equipment',
        'Laptop - IT equipment',
        'Camera Video Recording',
        'Electric Appliances',
        'House Item',
        'Consumer goods, Food',
        'Toys, Mother and Baby',
        'Beauty - Health',
        'Fashion - Accessories',
        'Sport - Picnic',
        'MotorCycles, Cars and Bicycle',
        'International goods',
        'Books, VPP & Gifts',
        'Voucher - Services - Scratch Cards'
    ];
    const optionsIcon = [
        <PhoneAndroidIcon className={classes.item}/>,
        <TvIcon className={classes.item}/>,
        <HeadsetIcon className={classes.item}/>,
        <Badge color="secondary" badgeContent={<span style={{fontSize: "0.8em", padding: "0.2em"}}>new</span>}>
            <LaptopIcon className={classes.item}/>
        </Badge>,
        <CameraAltIcon className={classes.item}/>,
        <img src={OvenIcon} style={{width: "1.5em"}} alt={"oven"}/>,
        <img src={FryingPanIcon} style={{width: "1.5em"}} alt={"oven"}/>,
        <img src={CleanerIcon} style={{width: "1.5em"}} alt={"oven"}/>,
        <Icon className="fas fa-prescription-bottle"/>,
        <img src={LipStickIcon} style={{width: "1.5em"}} alt={"oven"}/>,
        <Icon className="fas fa-tshirt" style={{marginLeft: "-.2em", paddingRight: "1em"}}/>,
        <SportsSoccerIcon className={classes.item}/>,
        <Badge color="secondary" badgeContent={<WhatshotIcon style={{width: "0.6em"}}/>}>
            <MotorcycleIcon className={classes.item}/>,
        </Badge>,
        <LanguageIcon className={classes.item}/>,
        <MenuBookIcon className={classes.item}/>,
        <CreditCardIcon className={classes.item}/>
    ];
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setToggleDrawer(true)
    };

    return (
        <div className={ classNames(classes.root, classes.sectionDesktop3,{
            [classes.resize]: toggleDrawer,
        })}
             style={{...props.style}}

             onMouseLeave={
                 ()=>{setToggleDrawer(false);
                     typeof props.toggleDrawer === "function" && props.toggleDrawer();
                 }}
        >
            <Grid container>
                <Grid item xs={ toggleDrawer ? 3 : 12} style={{margin: 0}}>
                    <List component="nav" aria-label="main mailbox folders" style={{margin: 0}}>
                        {options.map((option, index) => (
                            <ListItem
                                style={{marginTop: 0, marginBottom: 0, paddingTop:"1.8%", paddingBottom: "1.8%", alignItems: 'center'}}
                                key={option}
                                button
                                selected={index === selectedIndex}
                                // onClick={event => handleMenuItemClick(event, index)
                                onMouseEnter={event => handleMenuItemClick(event, index)
                                }
                            >
                                <ListItemIcon style={{marginTop: 0, marginBottom: 0, paddingTop:0, paddingBottom: 0}} >
                                    {optionsIcon[index]}
                                </ListItemIcon>
                                <ListItemText primary={option} primaryTypographyProps={{variant: "inherit"}}
                                              style={{marginTop: '1%', marginBottom: 0, paddingTop:0, paddingBottom: 0}} className={classes.item2}/>
                            </ListItem>
                        ))}
                    </List>

                </Grid>
                <Grid item xs={9} className={classNames(classes.leftDrawer, {
                    [classes.showDrawer]:  toggleDrawer
                }) }>
                    <Grid container>
                        <Grid item xs={3}>
                            <div className={classes.category2}>Trends</div>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> {options[selectedIndex]}</Link></p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Iphone </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Samsung </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Vsmart </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Sony </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> LG </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> {options[selectedIndex]}</Link></p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Iphone </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Samsung </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Vsmart </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Sony </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> LG </Link> </p>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classes.category2}>Top selling</div>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Toshiba </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Hitachi </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Asus </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Xiaomi </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> HTC </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Ifruit </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> {options[selectedIndex]}</Link></p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Iphone </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Samsung </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Vsmart </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Sony </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> LG </Link> </p>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classes.category2}>Best of 2020</div>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Shirts </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> T-shirt </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Jeans </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Shocks </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Sneakers </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Hats </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> {options[selectedIndex]}</Link></p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Iphone </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Samsung </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Vsmart </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> Sony </Link> </p>
                            <p className={classes.category2item}><Link className={classes.removeDefaultLink} to={"#"}> LG </Link> </p>
                        </Grid>
                        <Grid item xs={3} >
                            <Link className={classes.removeDefaultLink} to={"#"}>
                                <img src={cooker} style={{width: "10em", marginTop: "10%"}} alt={"oven"}/>,
                            </Link>
                        </Grid>
                        <section className={classes.items}>
                        </section>
                    </Grid>
                </Grid>

            </Grid>
        </div>

    )
};


export default ProductNavigation;
