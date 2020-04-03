import React, {useEffect, useState} from 'react'
import Button from "@material-ui/core/Button";
import tikiNotFound from '../../../image/tiki-not-found-pgae.png'
import {useDispatch, useSelector} from "react-redux";
import * as orderActions from '../../../store/actions/orderActions'
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import CardHeader from "../AdminDashboardComponents/Card/CardHeader";
import CardBody from "../AdminDashboardComponents/Card/CardBody";
import Moment2 from "moment";
import {Timeline} from "rsuite";
import {Link} from "react-router-dom";
import Ripples from "react-ripples";


const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#ff9100',
        borderColor: '#ff9100',
        "&:focus": {
            outline: "none"
        },
        color: 'rgba(0,0,0,0.8)',

        fontSize: '0.7em',
        margin: 0,
        marginLeft: '1em',
        marginRight: '0.5em',
        marginTop: '2em',
        marginBottom: '1em'
    },
    input: {
        height: '1em !important'
    },
    title: {
        fontSize: '1.1em',
        fontWeight: 400,
        marginBottom: '0.3em',
        color: 'rgba(0,0,0,0.8)',
    },
    grid: {
        padding: '0',
        marginTop: '0.5em',
        marginBottom: '0.5em',
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.14)",
    },
    grid2: {
        padding: '2em',
        marginTop: '1em',
        marginBottom: '1.5em',
        backgroundColor: 'white',
        borderRadius: '3px',
        fontWeight: 600,
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.07)",
    },
    boldGreen: {
        fontWeight: 600,
        color: "#00A86B"
    },
    priceText: {
        color: "#FF2800",
        marginTop: '0.5em',
        fontSize: '1.1em',
        fontWeight: 600
    },
    removeLinkStyles: {
        textDecoration: 'none !important'
    },
    "@global .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded": {
        top: '45% !important',
        left: '70% !important'
    },
    "@global .MuiButton-containedSecondary:hover": {
        border: "1px solid #ff9100",
        backgroundColor: "rgba(255, 145, 0, 0)"
    },

}));


const OrderManagement = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.user.id);
    const myOrders = useSelector(state => state.orders.myOrders);
    const allProduct = useSelector(state => state.products.products);

    useEffect(() => {
        dispatch(orderActions.getOrdersByUserId(userId))
    }, []);

    const OrderStep = ({myOrder}) => {
        const QontoConnector = withStyles({
            alternativeLabel: {
                top: 10,
                left: 'calc(-50% + 16px)',
                right: 'calc(50% + 16px)',
            },
            active: {
                '& $line': {
                    borderColor: '#189EFF',
                },
            },
            completed: {
                '& $line': {
                    borderColor: '#189EFF',
                },
            },
            line: {
                borderColor: '#eaeaf0',
                borderTopWidth: 3,
                borderRadius: 1,
            },
        })(StepConnector);
        const useQontoStepIconStyles = makeStyles({
            root: {
                color: '#eaeaf0',
                display: 'flex',
                height: 22,
                alignItems: 'center',
            },
            active: {
                color: '#189EFF',
            },
            circle: {
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: 'currentColor',
            },
            completed: {
                color: '#189EFF',
                zIndex: 1,
                fontSize: 18,
            },
        });

        function QontoStepIcon(props) {
            const classes = useQontoStepIconStyles();
            const {active, completed} = props;

            return (
                <div
                    className={clsx(classes.root, {
                        [classes.active]: active,
                    })}
                >
                    {completed ? <Check className={classes.completed}/> : <div className={classes.circle}/>}
                </div>
            );
        }

        QontoStepIcon.propTypes = {
            active: PropTypes.bool,
            completed: PropTypes.bool,
        };
        const getCurrentState = () => {
            if (myOrder.currentState === "Delivered") return 5;
            if (myOrder.currentState === "Shipping") return 4;
            if (myOrder.currentState === "Packing") return 3;
            if (myOrder.currentState === "Getting Product") return 2;
            if (myOrder.currentState === "Tiki Received") return 1;
            if (myOrder.currentState === "Ordered Successfully") return 0;
        };
        const [activeStep, setActiveStep] = useState(getCurrentState());

        const steps = ["Ordered Successfully", "Tiki Received", "Getting Product", "Packing", "Shipping", "Delivered"];

        return (
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector/>}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        )
    };
    const OrderCard = ({myOrder}) => {
        const getProductById = (productId) => {
            return allProduct.find(product => product._id === productId)
        };

        const product = getProductById(myOrder.product._id);

        const {shop, total, quantity, phone, address, _id, createdAt} = myOrder;
        return (
            <div className={classes.grid2}>
                <OrderStep myOrder={myOrder}/>
                <p style={{fontSize: '1.4em', marginBottom: '0.5em', textAlign: 'center'}}>You ordered
                    <Link to={`/${product.slug}/${product._id}`} className={classes.removeLinkStyles}>
                        <span className={classes.boldGreen}> {product.name}</span> </Link>
                    from <span
                        className={classes.boldGreen}>{shop.name}</span></p>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Original Product Price - <span className={classes.priceText}>{product.price}đ</span></p>
                    <p>Total Price(discounted) - <span className={classes.priceText}>{total.toFixed(2)}đ</span></p>
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p>Quantity ordered
                        - {quantity}</p>
                    <p style={{marginTop: '0.5em'}}>Contact is - {phone}</p>
                </div>
                <p >Address - {address}</p>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <p className={classes.boldGreen} style={{marginTop: '1.5em'}}> Order made on {Moment2(createdAt).format('MMMM DD YYYY, h:mm:ss a')}</p>
                    <p style={{marginTop: '1.5em'}}>Order Id is - {_id}</p>
                </div>


            </div>
        )
    };


    return (
        <div style={{width: '100%'}}>
            <div className={classes.title}>My Order</div>
            {(myOrders !== null && myOrders.length > 0) && (allProduct !== null && allProduct.length > 0) ?
                <div>
                    {myOrders.map((order, index) => (
                        <OrderCard myOrder={order} key={index}/>
                    ))}
                </div>
                :
                <div style={{width: '80%'}}>
                    <div className={classes.grid}>
                        <section style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            flexDirection: 'column'
                        }}>
                            <img src={tikiNotFound} alt=""/><br/>
                            <p>You have no orders</p>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}

                            >
                                Continue shopping
                            </Button>
                        </section>
                    </div>
                </div>
            }

        </div>


    )
};

export default OrderManagement
