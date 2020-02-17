import React, {useState, useEffect} from 'react'
import {Progress} from 'reactstrap';
import Countdown from "react-countdown-now";
import Rating from '@material-ui/lab/Rating';
import Ripples from 'react-ripples'

import 'bootstrap/dist/css/bootstrap.min.css';
import TikiNow from '../image/tiki-now.png'
import DealTag from '../image/dealTag.png'
import userStyles from '../styles/CardStyles'
import WhatshotIcon from "@material-ui/icons/Whatshot";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";


const Card = (props) => {
    const classes = userStyles();

    const discounted_price = props.price - ((parseInt(props.price) * parseInt(props.discount)) / 100);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    // Renderer callback with condition
    const renderer = ({days, hours, minutes, seconds, completed}) => {
        if (completed) {
            // Render a completed state
            return <span>Offer is over!</span>;
        } else {
            if(days !== 0){
                return <span>{days} days {hours}:{minutes}:{seconds}</span>;
            }
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };


    if (props.time !== undefined) {
        // startTimer()
    }

    const type1 =
        <div className={classes.container}>
            <img src={props.image} alt="an image" width={"100%"} style={{borderRadius: '3px'}}/> <br/>
            <img src={TikiNow} alt="an image" width={"25%"}/> <span className={classes.divider}>|</span>
            <span className={classes.title}>{props.title}</span>
            <p style={{marginBottom: 0}}><span style={{fontWeight: 500}}>{numberWithCommas(discounted_price)}</span>
                <span className={classes.discount}> VND-{props.discount}%</span></p>
            <p className={classes.price}><s>{numberWithCommas(props.price)} </s>VND</p>
        </div>;

    const type2 =
        <div className={classes.container}>
            <img src={DealTag} alt="an image" width={"38vw"} style={{position: 'absolute', marginTop: '1.5em'}}/>
            <span style={{
                fontWeight: 'bold',
                position: 'absolute',
                marginTop: '3.3vh',
                marginLeft: '0.28vw',
                fontSize: '0.85em',
                color: 'white'
            }}>-{props.discount}%</span><br/>
            <img src={props.image} alt="an image" width={"100%"} style={{borderRadius: '3px'}}/> <br/>
            <img src={TikiNow} alt="an image" width={"25%"}/> <span className={classes.divider}>|</span>
            <span className={classes.title} >{props.title}</span>
            <p style={{marginBottom: 0}}>
                <span style={{fontWeight: 500}}>VND {numberWithCommas(discounted_price)}</span>
                <span className={classes.discount}>VND <s>{numberWithCommas(props.price)} </s></span>
            </p>

            <Progress value={!isNaN(props.sold) ? props.sold : 50} color={"#FD752E"} className={classes.progress}>
                {!isNaN(props.sold) &&
                <span> {!!props.hot &&
                <WhatshotIcon style={{color: "white", fontSize: '1.3em', paddingBottom: '0.2em'}}/>}
                    Sold {props.sold}</span>
                }
            </Progress>
            {props.timeInMilliSec &&
                <span className={classes.timer}>
                    <Countdown
                        date={Date.now() + props.timeInMilliSec}
                        renderer={renderer}
                    />
                </span>
            }
        </div>;
    const type3 =
        <div className={classes.container}>
            <img src={props.image} alt="an image" width={"100%"} style={{borderRadius: '3px'}}/> <br/>
            <img src={TikiNow} alt="an image" width={"25%"}/> <span className={classes.divider}>|</span>
            <span className={classes.title}>{props.title}</span>
            <p style={{marginBottom: 0}}><span style={{fontWeight: 500}}>{numberWithCommas(discounted_price)} VND</span>
                <span className={classes.discount}> -{props.discount}%</span></p>
            <p className={classes.price} style={{marginBottom: 0}}><s>{numberWithCommas(props.price)} </s>VND</p>
            <p>
                <IconButton aria-label="" color="inherit" style={{paddingLeft: 0, paddingRight: 0, paddingTop: '0.1em', paddingBottom: '0.1em', color: '#26BC4E'}}>
                    <Icon className={"fas fa-angle-double-right"} style={{paddingLeft: 0, paddingRight: 0, fontSize: '1.25vw'}}/>
                </IconButton>
                <span style={{fontWeight: 500, fontSize: '0.8em', color:'#26BC4E'}}>Fast delivery 2h</span>
            </p>
            <p style={{marginBottom: '0.2rem'}} >
                <Rating name="half-rating-read" defaultValue={!isNaN(props.rating) ? props.rating : 3} precision={0.5} readOnly size="small" style={{width: '60%', margin:0, fontSize: '0.9rem'}} />
                <p className={classes.title} style={{width: '40%', marginBottom: '2em', display: 'inline-block'}}>  ({props.review} reviews)</p>
            </p>




        </div>;

    const handleCardType = (type) => {
        switch (type) {
            case "default":
                return type1;
            case 'deal':
                return type2;
            case 'review':
                return type3;
            default:
                return type1;
        }
    };
    return (
        <Ripples>
            {handleCardType(props.type)}
        </Ripples>
    )
};

export default Card
