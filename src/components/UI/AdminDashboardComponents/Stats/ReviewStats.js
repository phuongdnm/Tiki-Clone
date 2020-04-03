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



const ReviewStats = (props) => {
    const classes = userStyles();
    const allReviews = useSelector(state => state.reviews.allReviews);  // all reviews

    const [reviewChart, setReviewChart] = useState(null);
    const [reviewChartRating, setReviewChartRating] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);
    const [reviewLastUpdated, setReviewLastUpdated] = useState(Date.now());


    const convertDateToDay = () => {

        // Get last 6 days + today and put it in an array
        const Last7days = [];
        const NUM_OF_DAYS = 6; // get last 6 days + today array.
        for (let i = NUM_OF_DAYS; i > -1; i--) {
            let date = Moment2().subtract(i, 'd').format('ddd');
            Last7days.push(date);
        }

        let Last7daysReviewCount = [0, 0, 0, 0, 0, 0, 0];
        const dateFrom = Moment2().subtract(8, 'd').format('YYYY-MM-DD');    // get time 7 days ago
        allReviews !== null && allReviews.forEach((review, index) => {
            if (Moment2(review.createdAt)    // if reviews is from the last 7 days
                .isAfter(dateFrom, 'day')) {
                const day = Moment2(review.createdAt).format('ddd'); // the day the review was created
                switch (day) {
                    case "Mon":
                        // if day is "mon" then increase the count of reviews on mon, but we don't know wha index mon is going to be since
                        // we got the last seven days and push it to an array, so we find the index
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Mon")]++;
                        return;
                    case "Tue":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Tue")]++;
                        return;
                    case "Wed":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Wed")]++;
                        return;
                    case "Thu":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Thu")]++;
                        return;
                    case "Fri":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Fri")]++;
                        return;
                    case "Sat":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Sat")]++;
                        return;
                    case "Sun":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Sun")]++;
                        return;
                }
            }
        });

        const delays = 80, durations = 500;
        const reviewChart_ = {
            data: {
                labels: Last7days,
                series: [Last7daysReviewCount]
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
        setReviewChart(reviewChart_);
    };

    const calculateRatingData = () => {

        // Get last 6 days + today and put it in an array
        const Last7days = [];
        const NUM_OF_DAYS = 6; // get last 6 days + today array.
        for (let i = NUM_OF_DAYS; i > -1; i--) {
            let date = Moment2().subtract(i, 'd').format('ddd');
            Last7days.push(date);
        }

        let Last7daysReviewCount = [[], [], [], [], [], [], []];
        let Last7daysReviewCountRatingAverage = [];
        const dateFrom = Moment2().subtract(8, 'd').format('YYYY-MM-DD');    // get time 7 days ago
        allReviews !== null && allReviews.forEach((review, index) => {
            if (Moment2(review.createdAt)    // if reviews is from the last 7 days
                .isAfter(dateFrom, 'day')) {
                const day = Moment2(review.createdAt).format('ddd'); // the day the review was created
                switch (day) {
                    case "Mon":
                        // if day is "mon" then increase the count of reviews on mon, but we don't know wha index mon is going to be since
                        // we got the last seven days and push it to an array, so we find the index
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Mon")].push(review.rating);
                        return;
                    case "Tue":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Tue")].push(review.rating);
                        return;
                    case "Wed":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Wed")].push(review.rating);
                        return;
                    case "Thu":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Thu")].push(review.rating);
                        return;
                    case "Fri":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Fri")].push(review.rating);
                        return;
                    case "Sat":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Sat")].push(review.rating);
                        return;
                    case "Sun":
                        Last7daysReviewCount[Last7days.findIndex(val => val === "Sun")].push(review.rating);
                        return;
                }
            }
        });
        Last7daysReviewCount.forEach((ratingArray, index) => {
            Last7daysReviewCountRatingAverage.push(
                ratingArray.reduce((total, num) => total + num, 0) / ratingArray.length
            )
        });

        const delays2 = 80, durations2 = 500;
        const reviewChart_ = {
            data: {
                labels: Last7days,
                series: [Last7daysReviewCountRatingAverage]
            },
            options: {
                axisX: {
                    showGrid: false
                },
                low: 0,
                high: 5,
                chartPadding: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: 0
                }
            },
            responsiveOptions: [
                [
                    "screen and (max-width: 640px)",
                    {
                        seriesBarDistance: 5,
                        axisX: {
                            labelInterpolationFnc: function(value) {
                                return value[0];
                            }
                        }
                    }
                ]
            ],
            animation: {
                draw: function(data) {
                    if (data.type === "bar") {
                        data.element.animate({
                            opacity: {
                                begin: (data.index + 1) * delays2,
                                dur: durations2,
                                from: 0,
                                to: 1,
                                easing: "ease"
                            }
                        });
                    }
                }
            }
        };
        setReviewChartRating(reviewChart_);
    };

    if (firstLoad) {
        allReviews !== null && setTimeout(() => {
            convertDateToDay();
            calculateRatingData();
            setFirstLoad(false)
        }, 2000)
    }


    return (
        <div style={{width: '100%'}}>
            <Grid container spacing={3}>
                {
                    reviewChart === null &&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'5%'} height={'5%'} className={classes.loading2}/>
                }
                <Grid item xs={6} className={classes.card}>
                    {reviewChart !== null &&
                    <Card chart onClick={convertDateToDay}>
                        <CardHeader color="success">
                            <ChartistGraph
                                className="ct-chart"
                                data={reviewChart.data}
                                type="Line"
                                options={reviewChart.options}
                                listener={reviewChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Daily Reviews</h4>
                            <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory}/> {reviewChart.data.series[0].slice(-1)[0]}
                </span>{" "}
                                increase in today's reviews.
                            </p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime/>
                                <Moment fromNow style={{textTransform: "capitalize"}}>{reviewLastUpdated}</Moment>

                            </div>
                        </CardFooter>
                    </Card>
                    }
                </Grid>
                <Grid item xs={6} className={classes.card}>

                    {reviewChartRating !== null &&
                    <Card chart onClick={calculateRatingData}>
                        <CardHeader color="warning">
                            <ChartistGraph
                                className="ct-chart"
                                data={reviewChartRating.data}
                                type="Bar"
                                options={reviewChartRating.options}
                                responsiveOptions={reviewChartRating.responsiveOptions}
                                listener={reviewChartRating.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Ratings</h4>
                            <p className={classes.cardCategory}>Average rating last 7 days</p>
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                <AccessTime/>
                                <Moment fromNow style={{textTransform: "capitalize"}}>{reviewLastUpdated}</Moment>

                            </div>
                        </CardFooter>
                    </Card>
                    }
                </Grid>
            </Grid>
        </div>

)
};

export default ReviewStats
