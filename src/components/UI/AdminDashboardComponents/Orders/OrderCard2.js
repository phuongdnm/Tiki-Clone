import userStyles from "../styles/FindAUserStyles";
import React, {useState} from "react";
import {Timeline} from "rsuite";
import Moment2 from "moment";
import classNames from "classnames";
import Moment from "react-moment";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import {AccessTime} from "@material-ui/icons";

export const OrderCard = ({order, getShop, getProduct, getUser})=>{
    const classes = userStyles();
    const user = getUser();
    const shop = getShop();
    const product = getProduct();
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
                <p style={{fontSize: '1.4em'}}>Ordered by {user.name} from <br/>  {shop.name}</p>
                <OrderTimeLine createdAt={order.createdAt} currentState={transformCurrentStateToNum(order.currentState) }/>
            </CardHeader>
            <CardBody>
                <h6 style={{fontSize: '1.3em'}}>Product Ordered - {product.name}</h6>
                <p className={classes.successText} style={{marginTop: '0.5em', fontSize: '1.1em', fontWeight: 500}}>Price - {product.price}</p>
                <p className={classes.successText} style={{marginTop: '0.5em', fontSize: '1.1em', fontWeight: 600}}>Total Price - {order.total}</p>
                <p className={classes.cardTitle} style={{marginTop: '0.5em', fontSize: '1em'}}>Quantity ordered - {order.quantity}</p>
                <p style={{fontSize: '0.9em'}}>Address - {order.address}</p>
                <p style={{marginTop: '0.5em', fontSize: '0.9em'}}>Contact is - {order.phone}</p>
                <p style={{marginTop: '0.5em', fontSize: '0.9em'}}>Order Id is - {order._id}</p>
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
