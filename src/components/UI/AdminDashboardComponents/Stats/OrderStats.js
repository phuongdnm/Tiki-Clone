import React, {useState} from 'react'
import userStyles from "../styles/FindAUserStyles";
import {useSelector} from "react-redux";
import ChartistGraph from "react-chartist";
import Chartist from 'chartist'


import Grid from "@material-ui/core/Grid";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import './material-dashboard-react.css'
import Moment2 from "moment";
import {AccessTime, ArrowUpward} from "@material-ui/icons";
import Moment from "react-moment";
import ReactLoading from 'react-loading';


const OrderStats = (props) => {
    const classes = userStyles();
    const allOrders = useSelector(state => state.orders.allOrders);  // all orders

    const [orderChart, setOrderChart] = useState(null);
    const [orderChartStatus, setOrderChartStatus] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);
    const [orderLastUpdated, setOrderLastUpdated] = useState(Date.now());


    const convertDateToDay = () => {

        // Get last 6 days + today and put it in an array
        const Last7days = [];
        const NUM_OF_DAYS = 6; // get last 6 days + today array.
        for (let i = NUM_OF_DAYS; i > -1; i--) {
            let date = Moment2().subtract(i, 'd').format('ddd');
            Last7days.push(date);
        }

        let Last7daysOrdersCount = [0, 0, 0, 0, 0, 0, 0];
        const dateFrom = Moment2().subtract(8, 'd').format('YYYY-MM-DD');    // get time 7 days ago
        allOrders !== null && allOrders.forEach((order, index) => {
            if (Moment2(order.createdAt)    // if order is from the last 7 days
                .isAfter(dateFrom, 'day')) {
                const day = Moment2(order.createdAt).format('ddd'); // the day the review was created
                switch (day) {
                    case "Mon":
                        // if day is "mon" then increase the count of reviews on mon, but we don't know wha index mon is going to be since
                        // we got the last seven days and push it to an array, so we find the index
                        Last7daysOrdersCount[Last7days.findIndex(val => val === "Mon")]++;
                        return;
                    case "Tue":
                        Last7daysOrdersCount[Last7days.findIndex(val => val === "Tue")]++;
                        return;
                    case "Wed":
                        Last7daysOrdersCount[Last7days.findIndex(val => val === "Wed")]++;
                        return;
                    case "Thu":
                        Last7daysOrdersCount[Last7days.findIndex(val => val === "Thu")]++;
                        return;
                    case "Fri":
                        Last7daysOrdersCount[Last7days.findIndex(val => val === "Fri")]++;
                        return;
                    case "Sat":
                        Last7daysOrdersCount[Last7days.findIndex(val => val === "Sat")]++;
                        return;
                    case "Sun":
                        Last7daysOrdersCount[Last7days.findIndex(val => val === "Sun")]++;
                        return;
                }
            }
        });

        const delays = 80, durations = 500;
        const orderChart_ = {
            data: {
                labels: Last7days,
                series: [Last7daysOrdersCount]
            },
            options: {
                lineSmooth: Chartist.Interpolation.cardinal({
                    tension: 0
                }),
                low: 0,
                high: 15, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            // for animation
            animation: {
                draw: function (data) {
                    if (data.type === "line" || data.type === "area") {
                        data.element.animate({
                            d: {
                                begin: 600,
                                dur: 700,
                                from: data.path
                                    .clone()
                                    .scale(1, 0)
                                    .translate(0, data.chartRect.height())
                                    .stringify(),
                                to: data.path.clone().stringify(),
                                easing: Chartist.Svg.Easing.easeOutQuint
                            }
                        });
                    } else if (data.type === "point") {
                        data.element.animate({
                            opacity: {
                                begin: (data.index + 1) * delays,
                                dur: durations,
                                from: 0,
                                to: 1,
                                easing: "ease"
                            }
                        });
                    }
                }
            }
        };
        setOrderChart(orderChart_);

    };

    const calculateCurrentStatusData = () => {
        let Last7daysOrderStatusLabel = ["Ordered Successfully", "Tiki Received", "Getting Product", "Packing", "Shipping", "Delivered"];
        let Last7daysOrderStatus = [0, 0, 0, 0, 0, 0];
        const dateFrom = Moment2().subtract(8, 'd').format('YYYY-MM-DD');    // get time 7 days ago
        allOrders !== null && allOrders.forEach((order, index) => {
            if (Moment2(order.createdAt)    // if reviews is from the last 7 days
                .isAfter(dateFrom, 'day')) {
                const OrderState = order.currentState;
                switch (OrderState) {
                    case "Ordered Successfully":
                        Last7daysOrderStatus[Last7daysOrderStatusLabel.findIndex(val => val === "Ordered Successfully")]++;
                        return;
                    case "Tiki Received":
                        Last7daysOrderStatus[Last7daysOrderStatusLabel.findIndex(val => val === "Tiki Received")]++;
                        return;
                    case "Getting Product":
                        Last7daysOrderStatus[Last7daysOrderStatusLabel.findIndex(val => val === "Getting Product")]++;
                        return;
                    case "Packing":
                        Last7daysOrderStatus[Last7daysOrderStatusLabel.findIndex(val => val === "Packing")]++;
                        return;
                    case "Shipping":
                        Last7daysOrderStatus[Last7daysOrderStatusLabel.findIndex(val => val === "Shipping")]++;
                        return;
                    case "Delivered":
                        Last7daysOrderStatus[Last7daysOrderStatusLabel.findIndex(val => val === "Delivered")]++;
                        return;
                }
            }
        });

        const delays2 = 80, durations2 = 500;
        const orderChart_ = {
            data: {
                labels: Last7daysOrderStatusLabel,
                series: [{
                    value: Last7daysOrderStatus[0],
                    name: 'Ordered Successfully',
                    className: 'one',
                    meta: 'Meta One'
                }, {
                    value:  Last7daysOrderStatus[1],
                    name: 'Tiki Received',
                    className: 'two',
                    meta: 'Meta'
                }, {
                    value:  Last7daysOrderStatus[2],
                    name: 'Getting Product',
                    className: 'three',
                    meta: 'Meta'
                }, {
                    value:  Last7daysOrderStatus[3],
                    name: 'Packing',
                    className: 'four',
                    meta: 'Meta'
                }, {
                    value:  Last7daysOrderStatus[4],
                    name: 'Shipping',
                    className: 'five',
                    meta: 'Meta'
                }, {
                    value:  Last7daysOrderStatus[5],
                    name: 'Delivered',
                    className: 'six',
                    meta: 'Meta'
                }]
            },
            options: {
                height: 200,
                donut: true,
                donutWidth: 15,

                chartMargin: '50',
                chartPadding: 33,

                labelOffset: 30,
                labelDirection: 'explode',
            },
            animation: {
                draw: function(data) {
                    if(data.type === 'slice') {
                        // Get the total path length in order to use for dash array animation
                        let pathLength = data.element._node.getTotalLength();

                        // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                        data.element.attr({
                            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                        });

                        // Create animation definition while also assigning an ID to the animation for later sync usage
                        let animationDefinition = {
                            'stroke-dashoffset': {
                                id: 'anim' + data.index,
                                dur: 1000,
                                from: -pathLength + 'px',
                                to:  '0px',
                                easing: Chartist.Svg.Easing.easeOutQuint,
                                // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                                fill: 'freeze'
                            }
                        };

                        // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                        if(data.index !== 0) {
                            animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
                        }

                        // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                        data.element.attr({
                            'stroke-dashoffset': -pathLength + 'px'
                        });

                        // We can't use guided mode as the animations need to rely on setting begin manually
                        // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                        data.element.animate(animationDefinition, false);
                    }
                }
            }
        };

        setOrderChartStatus(orderChart_);
    };

    if (firstLoad) {
        allOrders !== null && setTimeout(() => {
            convertDateToDay();
            calculateCurrentStatusData();
            setFirstLoad(false)
        }, 1500)

    }


    return (
        <div style={{width: '100%'}}>
            <Grid container spacing={3}>
                {
                    orderChart === null &&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'5%'} height={'5%'}
                                  className={classes.loading2}/>
                }
                <Grid item xs={5} className={classes.card}>
                    {orderChart !== null &&
                    <Card chart onClick={convertDateToDay}>
                        <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={orderChart.data}
                                type="Line"
                                options={orderChart.options}
                                listener={orderChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Daily Orders</h4>
                            <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory}/> {orderChart.data.series[0].slice(-1)[0]}
                </span>{" "}
                                increase in today's orders.
                            </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime/>
                                <Moment fromNow style={{textTransform: "capitalize"}}>{orderLastUpdated}</Moment>

                            </div>
                        </CardFooter>
                    </Card>
                    }
                </Grid>
                <Grid item xs={7} className={classes.card}>

                    {orderChartStatus !== null &&
                    <Card chart onClick={calculateCurrentStatusData}>
                        <CardHeader color="tiki">
                            <ChartistGraph
                                className="ct-chart"
                                data={orderChartStatus.data}
                                type="Pie"
                                options={orderChartStatus.options}
                                donut={true}
                                // responsiveOptions={orderChartStatus.responsiveOptions}
                                listener={orderChartStatus.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Current Status</h4>
                            <p className={classes.cardCategory}>Orders current status in the last 7 days</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime/>
                                <Moment fromNow style={{textTransform: "capitalize"}}>{orderLastUpdated}</Moment>

                            </div>
                        </CardFooter>
                    </Card>
                    }
                </Grid>
            </Grid>
        </div>

    )
};

export default OrderStats
