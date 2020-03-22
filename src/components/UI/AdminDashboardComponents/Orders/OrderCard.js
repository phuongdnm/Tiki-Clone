import userStyles from "../styles/FindAUserStyles";
import Card from "../Card/Card";
import CardAvatar from "../Card/CardAvatar";
import CardBody from "../Card/CardBody";
import Rating from "@material-ui/lab/Rating";
import Moment2 from "moment";
import React, {useState} from "react";
import {Timeline} from "rsuite";
import classNames from "classnames";
import Moment from "react-moment";
import CardHeader from "../Card/CardHeader";
import CardFooter from "../Card/CardFooter";
import {AccessTime} from "@material-ui/icons";

// export const OrderCard = ({review, getUser})=>{
//     const classes = userStyles();
//     const user = getUser();
//
//     const pickRandBackground = () => {
//         let bgs = ['https://i.imgur.com/w5tX1Pn.jpg', 'https://i.imgur.com/uDYejhJ.jpg', "https://images.unsplash.com/photo-1505015390928-f9e55218544f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80", "https://images.unsplash.com/photo-1507984211203-76701d7bb120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80", "https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"];
//         return bgs[Math.floor(Math.random() * bgs.length)]
//     };
//     return(
//         <Card profile style={{textAlign: 'left'}}>
//             <CardAvatar profile>
//                 <a href="#" onClick={e => e.preventDefault()}>
//                     <img src={pickRandBackground()} alt="..." />
//                 </a>
//             </CardAvatar>
//             <CardBody profile>
//                 <h6 className={classes.cardCategory}>{user.name !== undefined && user.name}</h6>
//                 <h4 className={classes.cardTitle}>{review.title}</h4>
//                 <p className={classes.description}>{review.text}</p>
//                 <Rating
//                     style={{marginTop: '0.75em', marginBottom: '0.75em'}}
//                     name="read-only"
//                     value={review.rating}
//                     readOnly
//                     precision={0.5}
//                 />
//                 <p style={{color: '#999999', fontSize: '0.9em'}}>Created -  {Moment2(review.createdAt !== null && review.createdAt).format('MMMM DD YYYY,  h:mm:ss a')}</p>
//                 <p style={{color: '#999999', fontSize: '0.9em'}}>Reviewed product -  {review.product.name}</p>
//                 <p style={{color: '#999999', fontSize: '0.9em'}}>Product id - {review.product._id} </p>
//                 <p style={{color: '#999999', fontSize: '0.9em'}}>Review id - {review._id}</p>
//
//             </CardBody>
//         </Card>
//     )
// };

export const OrderCard = ({order})=>{
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

