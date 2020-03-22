import React, {useState} from 'react'
import {Progress} from 'reactstrap';
import Countdown from "react-countdown-now";
import Rating from '@material-ui/lab/Rating';
import Ripples from 'react-ripples'

import 'bootstrap/dist/css/bootstrap.min.css';
import TikiNow from '../../image/tiki-now.png'
import DealTag from '../../image/dealTag.png'
import userStyles from '../../styles/CardStyles'
import WhatshotIcon from "@material-ui/icons/Whatshot";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TikiArrow from '../../image/tikiArrow.png'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {Link} from "react-router-dom";
import classNames from "classnames";
import {useSelector} from "react-redux";


const Card = (props) => {
    const classes = userStyles();
    const reviews = useSelector(state => state.reviews.allReviews);
    const [amount, setAmount] = useState(props.quantity !== undefined ? props.quantity : null);


    const discounted_price =  (props.price - (parseFloat(props.price) * ((parseFloat(props.discount)) / 100))).toFixed(2);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const getProductReviewLength = () => {
        let reviewsLength = 0;
        reviews !== null && reviews.length > 0 && reviews.filter(review => {
            if (review.product.id === props.id) {
                reviewsLength++
            }
            return null
        });
        return reviewsLength
    };
    // Renderer callback with condition
    const renderer = ({days, hours, minutes, seconds, completed}) => {
        if (completed) {
            // Render a completed state
            return <span>Offer is over!</span>;
        } else {
            if (days !== 0) {
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
        <Ripples>
            <Link to={props.link !== undefined && props.link !== false ? `/${props.title}/${props.id}` : "#"}
                  className={classes.removeLinkStyle}>
                <div className={classes.container} style={{height: '25em'}} onClick={props.onClick !== undefined ? props.onClick : undefined}>
                    <div>
                        <img src={props.image} alt="product " width={"100%"} style={{borderRadius: '3px', maxHeight: '18em', minHeight: '14em'}}/> <br/>

                    </div>
                    <div>
                        <Grid container style={{marginBottom: '0.5em'}}>
                            <Grid item xs={3} md={4} lg={4} style={{margin: 0, marginTop: '0.1em'}}>
                                <div>
                                    <img src={TikiNow} alt="tikinow" width={"70%"}/> <span className={classes.divider}>|</span>
                                </div>
                            </Grid>
                            <Grid item xs={9} md={8} lg={8} style={{margin: 0}}>
                                <span className={classes.title}>{props.title}</span>
                            </Grid>
                        </Grid>
                        {props.discount !== undefined && props.discount > 0 ?
                            <>
                                <p style={{marginBottom: 0}}><span
                                    style={{fontWeight: 500}}>{numberWithCommas(discounted_price)} VND</span>
                                    <span className={classes.discount}>-{props.discount}%</span></p>
                                <p className={classes.price}><s>{numberWithCommas(props.price)} </s>VND</p>
                            </> :
                            <>
                                <p style={{marginBottom: 0}}><span
                                    style={{fontWeight: 500}}>{numberWithCommas(props.price)} VND</span>
                                </p>
                            </>
                        }
                    </div>
                </div>
            </Link>
        </Ripples>;

    const type2 =
        <Ripples>
            <Link to={props.link !== undefined && props.link !== false ? `/${props.title}/${props.id}` : "#"}
                  className={classes.removeLinkStyle}>

                <div className={classes.container}  style={{height: '26em'}} onClick={props.onClick !== undefined ? props.onClick : undefined}>
                    <div>
                        {props.discount !== undefined && props.discount > 0 ?
                            <>
                                <img src={DealTag} alt="deal tag " width={"38vw"}
                                     style={{position: 'absolute'}}/>
                                <span style={{
                                    fontWeight: 'bold',
                                    position: 'absolute',
                                    marginTop: '1vh',
                                    marginLeft: '0.28vw',
                                    fontSize: '0.85em',
                                    color: 'white'
                                }}>-{props.discount}%</span>
                            </>
                            : null
                        }

                        <img src={props.image} alt="product" width={"100%"}
                             style={{borderRadius: '3px', maxHeight: '18em', minHeight: '14em'}}/> <br/>
                    </div>
                    <div>
                        <Grid container style={{marginBottom: '0.5em'}}>
                            <Grid item xs={3} md={4} lg={4} style={{margin: 0, marginTop: '0.1em'}}>
                                <div>
                                    <img src={TikiNow} alt="tikinow" width={"70%"}/> <span className={classes.divider}>|</span>
                                </div>
                            </Grid>
                            <Grid item xs={9} md={8} lg={8} style={{margin: 0}}>
                                <span className={classes.title}>{props.title}</span>
                            </Grid>
                        </Grid>
                        {props.discount !== undefined && props.discount > 0 ?
                            <p style={{marginBottom: 0}}>
                                <span style={{fontWeight: 500}}>VND {numberWithCommas(discounted_price)}</span>
                                <span className={classes.discount}>VND <s>{numberWithCommas(props.price)} </s></span>
                            </p> :
                            <p style={{marginBottom: 0}}>
                                <span style={{fontWeight: 500}}>VND {numberWithCommas(props.price)}</span>
                            </p>
                        }

                        <Progress value={!isNaN(props.sold) ? props.sold : 50}
                                  className={classes.progress}>
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
                    </div>

                </div>
            </Link>
        </Ripples>;
    const type3 =
        <Ripples>
            <Link to={props.link !== undefined && props.link !== false ? `/${props.title}/${props.id}` : "#"}
                  className={classes.removeLinkStyle}>

                <div className={classes.container} onClick={props.onClick !== undefined ? props.onClick : undefined}
                     style={{...props.style}}>
                    <div>
                        <img src={props.image} alt="product" width={"100%"}
                             style={{borderRadius: '3px', maxHeight: '18em', minHeight: '12em'}}/> <br/>
                    </div>
                    <div>
                        {props.count !== undefined && <p style={{marginBottom: 0, fontWeight: 500, fontSize: '0.8em', color: '#26BC4E'}}>Amount ordered {props.count}</p>}
                        <Grid container style={{marginBottom: '0.5em'}}>
                            <Grid item xs={3} md={4} lg={4} style={{margin: 0, marginTop: '0.1em'}}>
                                <div>
                                    <img src={TikiNow} alt="tikinow" width={"70%"}/> <span className={classes.divider}>|</span>
                                </div>
                            </Grid>
                            <Grid item xs={9} md={8} lg={8} style={{margin: 0}}>
                                <span className={classes.title}>{props.title}</span>
                            </Grid>
                        </Grid>

                        {props.discount !== undefined && props.discount > 0 ?
                            <>
                                <p style={{marginBottom: 0}}><span
                                    style={{fontWeight: 500}}>{numberWithCommas(discounted_price)} VND</span>
                                    <span className={classes.discount}> -{props.discount}%</span></p>
                                <p className={classes.price} style={{marginBottom: 0}}>
                                    <s>{numberWithCommas(props.price)} </s>VND
                                </p>
                            </> :
                            <>
                                <p style={{marginBottom: 0}}><span
                                    style={{fontWeight: 500}}>{numberWithCommas(props.price)} VND</span></p>
                            </>
                        }

                        <p>
                            <IconButton aria-label="" color="inherit" style={{
                                paddingLeft: 0,
                                paddingRight: 0,
                                paddingTop: '0.1em',
                                paddingBottom: '0.1em',
                                color: '#26BC4E'
                            }}>
                                <Icon className={"fas fa-angle-double-right"}
                                      style={{paddingLeft: 0, paddingRight: 0, fontSize: '1.25vw'}}/>
                            </IconButton>
                            <span style={{fontWeight: 500, fontSize: '0.8em', color: '#26BC4E'}}>Fast delivery 2h</span>
                        </p>
                        <div style={{marginBottom: '0.2rem'}}>
                            <Rating name="half-rating-read" defaultValue={props.rating !== undefined ? props.rating : 3}
                                    precision={0.5} readOnly size="small"
                                    style={{width: '60%', margin: 0, fontSize: '0.9rem'}}/>
                            <p className={classes.title} style={{
                                width: '40%',
                                marginBottom: '2em',
                                display: 'inline-block'
                            }}> ({getProductReviewLength()} reviews)</p>
                        </div>
                    </div>
                </div>
            </Link>
        </Ripples>;

    const type4 =

        <div className={classNames(classes.grid, classes.removeLinkStyle)} style={{...props.style}}
             onClick={props.onClick !== undefined ? props.onClick : undefined}>
            <Paper className={classes.paper} elevation={0}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Ripples>

                            <Link to={props.link !== undefined && props.link !== false ? `/${props.title}/${props.id}` : "#"}
                                  className={classes.removeLinkStyle}>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src={props.image}/>
                                </ButtonBase>
                            </Link>
                        </Ripples>

                    </Grid>
                    <Grid item xs={12} sm container spacing={2}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    <Link to={props.link !== undefined && props.link !== false ? `/${props.title}/${props.id}` : "#"}
                                          className={classes.removeLinkStyle}>
                                        <img src={TikiNow} alt={"tikinow"}/> | {props.name}
                                    </Link>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    <img src={TikiArrow} className={classes.tikiArrow}
                                         alt={"tiki arrow "}/> Ship in 2h
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Sold by {props.soldBy}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button size="small" color="secondary"
                                        onClick={props.deleteItem !== undefined && props.deleteItem}>Remove</Button>
                                <Button size="small" color="primary">Buy later</Button>

                            </Grid>
                        </Grid>
                        <Grid item>
                            {discounted_price !== "NaN" ?
                                <>

                                    <Typography variant="subtitle1"
                                                style={{textAlign: "right"}}><strong>{discounted_price}đ</strong></Typography>
                                    <Typography variant="subtitle2">
                                        <span className={classes.priceOrigin}>
                                          {props.price.toFixed(2)}đ
                                      </span>
                                        | -{props.discount}%
                                    </Typography>
                                </>
                                :
                                <Typography variant="subtitle1"
                                            style={{
                                                textAlign: "right",
                                                marginTop: '1em'
                                            }}><strong>{props.price.toFixed(2)}đ</strong></Typography>
                            }

                        </Grid>
                    </Grid>
                    <Grid item>
                        <Button onClick={(e) => {
                            props.removeItem !== undefined && props.removeItem();
                            setAmount(amt => amt - 1)
                        }} style={{fontSize: '2em', marginRight: '0.3em'}} color="secondary">-</Button>
                        <TextField variant="outlined"
                                   style={{borderRadius: 0, width: '3.3em', margin: '0.3', textAlign: 'center'}}
                                   value={amount}
                                   onChange={(e) => setAmount(e.target.value)} disabled/>
                        <Button onClick={(e) => {
                            props.addItem !== undefined && props.addItem();
                            setAmount(amt => amt + 1)
                        }} style={{fontSize: '2em', marginLeft: '0.3em'}} color="primary">+</Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    const handleCardType = (type) => {
        switch (type) {
            case "default":
                return type1;
            case 'deal':
                return type2;
            case 'review':
                return type3;
            case 'cart':
                return type4;
            default:
                return type1;
        }
    };
    return (
        <>
            {handleCardType(props.type)}
        </>
    )
};

export default Card
