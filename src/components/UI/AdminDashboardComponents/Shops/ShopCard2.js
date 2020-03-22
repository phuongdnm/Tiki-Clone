import userStyles from "../styles/FindAUserStyles";
import React, {useState} from "react";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import TodayIcon from "@material-ui/icons/Today";
import Moment2 from "moment";
import CardBody from "../Card/CardBody";
import {AccessTime, ArrowUpward} from "@material-ui/icons";
import CardFooter from "../Card/CardFooter";
import Moment from "react-moment";

export const ShopCard = ({shop, setCurrentShop, toggleShop})=>{
    const classes = userStyles();
    const [shopsLastUpdated, setShopsLastUpdated] = useState(Date.now());
    const pickRandGradient = ()=>{
        let grads = [{x: "#26B7FF", y: "#5C8BC3"},{x: "#69AAEE", y: "#5C8BC3"},{x: "#69AAEE", y: "#0E4677"},{x: "#3064A7", y: "#5C8BC3"},];
        let rand = grads[Math.floor(Math.random() * grads.length)];
        return `${rand.x}, ${rand.y}`
    };
    return(
        <Card chart className={classes.addCursor} onClick={()=> {toggleShop(val => !val); setCurrentShop(shop)}}>
            <CardHeader color="success" style={{backgroundImage: `linear-gradient(40deg, ${pickRandGradient()})`, textAlign: 'center'}} >
                <p style={{fontSize: '1.4em'}}>{shop.name}</p>
                <p style={{fontSize: '0.e9m'}}>{shop.description}</p>
                <p style={{fontSize: '0.8em'}}><TodayIcon style={{fontSize: '1.1em'}}/> {Moment2(shop.createdAt).format('MMMM DD, YYYY')}</p>

            </CardHeader>
            <CardBody>
                <h4 className={classes.cardTitle}>{shop.address}</h4>
                <div className={classes.cardCategory}>
                                        <span className={classes.successText}>
                                          <ArrowUpward className={classes.upArrowCardCategory}/> {shop.products.length}
                                        </span>{" "}
                    product{shop.products.length > 1 ? "s": null }  in shop
                    {shop.products.length > 0 &&
                    <p style={{marginTop: '0.3em', fontSize: '1.1em'}}>Best selling product: <br/> <span
                        style={{fontWeight: 600}}>{shop.products[0].name}</span></p>
                    }
                    <p style={{marginTop: '1em'}}>Contact is {shop.phone}</p>
                    <p style={{marginTop: '0.3em'}}>ShopId is {shop._id}</p>
                </div>
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
