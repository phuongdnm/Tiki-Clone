import React, {useEffect, useState} from 'react'
import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";
import Moment2 from "moment";
import ReactLoading from 'react-loading';


import * as reviewActions from "../../../../store/actions/reviewActions";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from '../CustomButtons/Button'
import CustomInput from "../CustomInput/CustomInput";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import {Search} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CardAvatar from "../Card/CardAvatar";
import CardBody from "../Card/CardBody";
import Fab from "@material-ui/core/Fab";
import Card from "../Card/Card";
import {message} from "antd";
import Rating from "@material-ui/lab/Rating";
import UpdateReviewForm from "./UpdateReviewForm";



const ReviewCard = ({review, getUser, handleDeleteReview, setCurrentReview, isLoading, toggleReviewUpdateForm})=>{
    const classes = userStyles();
    const user = getUser();
    const pickRandBackground = () => {
        let bgs = ['https://i.imgur.com/w5tX1Pn.jpg', 'https://i.imgur.com/uDYejhJ.jpg', "https://images.unsplash.com/photo-1505015390928-f9e55218544f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80", "https://images.unsplash.com/photo-1507984211203-76701d7bb120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80", "https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"];
        return bgs[Math.floor(Math.random() * bgs.length)]
    };
    return(
        <Card profile style={{textAlign: 'left'}}>
            <CardAvatar profile>
                <a href="#" onClick={e => e.preventDefault()}>
                    <img src={pickRandBackground()} alt="..." />
                </a>
            </CardAvatar>
            <CardBody profile>
                <h6 className={classes.cardCategory}>{user.name !== undefined && user.name}</h6>
                <h4 className={classes.cardTitle}>{review.title}</h4>
                <p className={classes.description}>{review.text}</p>
                <Rating
                    style={{marginTop: '0.75em', marginBottom: '0.75em'}}
                    name="read-only"
                    value={review.rating}
                    readOnly
                    precision={0.5}
                />
                <p style={{color: '#999999', fontSize: '0.9em'}}>Created -  {Moment2(review.createdAt !== null && review.createdAt).format('MMMM DD YYYY,  h:mm:ss a')}</p>
                <p style={{color: '#999999', fontSize: '0.9em'}}>Reviewed product -  {review.product.name}</p>
                <p style={{color: '#999999', fontSize: '0.9em'}}>Product id - {review.product._id} </p>
                <p style={{color: '#999999', fontSize: '0.9em'}}>Review id - {review._id}</p>
                <Grid container style={{marginTop: '1em'}} direction={"row"} justify={"space-between"} alignItems={'center'}>
                    <Button color="tiki"  size={'sm'} onClick={()=>{setCurrentReview(review); toggleReviewUpdateForm(val => !val)}}>Update Review</Button>
                    <Button color="danger" size={'sm'} disabled={isLoading} onClick={(e)=>handleDeleteReview(e,review)}>Delete Review</Button>
                </Grid>

            </CardBody>
        </Card>
    )
};

const UpdateOrDeleteReview = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const [filterOptions, setFilterOptions] = useState("id");
    const [filterOptions2, setFilterOptions2] = useState(null);
    const [toggleList, setToggleList] = useState(false);
    const [toggleList2, setToggleList2] = useState(false);
    const [inputText, setInputText] = useState("");
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    const [isLoading, setIsLoading] = useState(false);



    const allReviews = useSelector(state => state.reviews.allReviews);  // all users
    const allUsers = useSelector(state => state.users.users);  // all users
    const [reviews_, setReviews_] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);


    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        setTimeout(() => {
            setReviews_(allReviews);
            setFirstLoad(false)
        }, 750);
    }
    useEffect(() => {
        setTimeout(() => setReviews_(allReviews), 1000)
    }, [allReviews]);


    const handleFilter = (filter, option) => {
        switch (filter) {
            case "id":
                return option._id;
            case "productName":
                return option.product.name;
            case "text":
                return option.text;
            case "username":
                const name = allUsers.find(user=> user._id === option.user).name;
                return name !== undefined ? name + " " + option.user : option.user;
            default:
                return ""
        }
    };

    const handleSearch = (isSearchByRating, rating) => {
        if (isSearchByRating === true) {
            switch (rating) {
                case 1:
                    return setReviews_(allReviews.filter(review => review.rating === 1));
                case 2:
                    return setReviews_(allReviews.filter(review => review.rating === 2));
                case 3:
                    return setReviews_(allReviews.filter(review => review.rating === 3));
                case 4:
                    return setReviews_(allReviews.filter(review => review.rating === 4));
                case 5:
                    return setReviews_(allReviews.filter(review => review.rating === 5));
                default:
                    return reviews_;
            }
        } else if (inputText.length > 0) {
            switch (filterOptions) {
                case "id":
                    return setReviews_(allReviews.filter(review => review._id === inputText));
                case "productName":
                    return setReviews_(allReviews.filter(review => review._id === inputText));
                case "text":
                    return setReviews_(allReviews.filter(review => review._id === inputText));
                case "username":
                    return setReviews_(allReviews.filter(review=>review.user === inputText));
                default:
                    return ""
            }
        }
    };

    const handleDeleteReview = async (e, currentReview)=>{
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Deleting Review!", 0);
        await dispatch(reviewActions.deleteReviewById(currentReview._id));
        setTimeout(msg, 1);
        setIsLoading(false)
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={2} md={2} lg={1} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-start'}}>

                    <Button color="transparent" size={"sm"} onClick={() => {
                        setReviews_(allReviews)
                    }} className={classes.title2} style={{marginLeft: 0,  fontSize:'0.8em !important', marginTop: '1.5em'}}>
                        Find Review to Update or Delete</Button>
                    </section>
                </Grid>
                <Grid item xs={10} md={10} lg={11} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            id="country-select-demo"
                            freeSolo
                            style={{width: 290}}
                            options={allReviews || []}
                            classes={{
                                option: classes.option,
                            }}
                            onChange={(e, value)=> {
                                // return user id if filter option is by username
                                filterOptions === "username" ? setInputText( e.target.textContent.split(" ").slice(-1)[0]  )
                                : setInputText(value !== null ? value._id : "")
                            }}
                            noOptionsText={`No user with that ${filterOptions}`}
                            getOptionLabel={option => handleFilter(filterOptions, option)}
                            autoHighlight
                            renderOption={(option, state) =>
                                <p style={{
                                    padding: "0.5em",
                                    margin: "0",
                                    width: 290,
                                    height: "100% !important",
                                    color: '#000',
                                    overflowX: "hidden"
                                }} >
                                    {handleFilter(filterOptions, option)}
                                </p>
                            }
                            renderInput={params => (
                                <CustomInput
                                    formControlProps={{
                                        className: classes.search
                                    }}
                                    inputProps={{
                                        value:inputText,
                                        ...params,
                                        placeholder: `Search user by ${filterOptions}`,
                                        inputProps: {
                                            ...params.inputProps,
                                        }
                                    }}
                                />
                            )}
                        />

                        <Button color="white" aria-label="edit" justIcon round
                                style={{marginBottom: 0, marginLeft: '0.5em'}}
                                onClick={()=>handleSearch(false)}>
                            <Search/>
                        </Button>
                        <div tabIndex={0}
                             onBlur={(event)=> {!event.currentTarget.contains(event.relatedTarget) && setToggleList(false)}}>

                        <Button color="white" className={classes.title2} onClick={() => setToggleList(val => !val)}
                                >
                            Search by {filterOptions} {toggleList ? <ExpandLess style={{marginLeft: '0.5em'}}/> :
                            <ExpandMore style={{marginLeft: '0.5em'}}/>}
                        </Button>
                        <List component="nav" aria-label="filter options"

                              style={{right: '18em', marginTop: '1em'}}
                              className={classNames(classes.listStyle, {[classes.showList]: toggleList})}>
                            <ListItem button onClick={() => {
                                setFilterOptions("id");
                                setToggleList(val => !val)
                            }} selected={"id" === filterOptions}>
                                <ListItemText primary="Id"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("productName");
                                setToggleList(val => !val)
                            }} selected={"productName" === filterOptions}>
                                <ListItemText primary="Product Name"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("text");
                                setToggleList(val => !val)
                            }} selected={"text" === filterOptions}>
                                <ListItemText primary="Review text"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("username");
                                setToggleList(val => !val)
                            }} selected={"username" === filterOptions}>
                                <ListItemText primary="Username/id"/>
                            </ListItem>
                        </List>
                        </div>
                        <div tabIndex={0}
                             onBlur={(event)=> {!event.currentTarget.contains(event.relatedTarget) && setToggleList2(false)}}>
                        <Button color="white" className={classes.title2} onClick={() => setToggleList2(val => !val)}>
                            Filter by {filterOptions2} star {toggleList2 ? <ExpandLess style={{marginLeft: '0.5em'}}/> :
                            <ExpandMore style={{marginLeft: '0.5em'}}/>}
                        </Button>
                        <List component="nav" aria-label="filter options2"
                              className={classNames(classes.listStyle, {[classes.showList]: toggleList2})}
                              style={{right: '4em', marginTop: '4.5em'}}

                        >
                            <ListItem button onClick={() => {
                                setFilterOptions2(1);
                                setToggleList2(val => !val);
                                handleSearch(true, 1)
                            }} selected={1 === filterOptions2}>
                                <ListItemText primary="One Star"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions2(2);
                                setToggleList2(val => !val);
                                handleSearch(true, 2)
                            }} selected={2 === filterOptions2}>
                                <ListItemText primary="Two Star"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions2(3);
                                setToggleList2(val => !val);
                                handleSearch(true, 3)
                            }} selected={3 === filterOptions2}>
                                <ListItemText primary="Three Star"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions2(4);
                                setToggleList2(val => !val);
                                handleSearch(true, 4)
                            }} selected={4 === filterOptions2}>
                                <ListItemText primary="Four star"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions2(5);
                                setToggleList2(val => !val);
                                handleSearch(true, 5)
                            }} selected={5 === filterOptions2}>
                                <ListItemText primary="Five Star"/>
                            </ListItem>
                        </List>
                        </div>

                    </section>
                </Grid>

            </Grid>
            <Grid container spacing={2} style={{marginLeft: '0.5em',  marginTop: '1em'}}>
                {reviews_ !== null && reviews_.length > 0 && !showUpdateForm ?
                    reviews_.map((review, index) => (
                        <Grid item xs={6} md={4} lg={4} style={{margin: 0}} key={index}>
                            <ReviewCard isLoading={isLoading} review={review} getUser={()=>allUsers.find(user=> user._id === review.user)} setCurrentReview={setCurrentReview} handleDeleteReview={handleDeleteReview} toggleReviewUpdateForm={setShowUpdateForm}/>
                        </Grid>
                    )) : null}

                {reviews_ !== null && reviews_.length === 0 && !firstLoad &&  // if search result is empty
                <Grid item xs={10} md={10} lg={12} style={{margin: 0}}>
                    <section style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        width: '100%',
                        height: '100%'
                    }}>
                        <p style={{
                            padding: '10% auto',
                            fontSize: "3em",
                            fontWeight: 600,
                            textAlign: 'center',
                            marginTop: '2em',
                            color: "rgba(149, 149, 149, 1)"
                        }}>No reviews found with "{filterOptions2}" star rating.</p>
                    </section>
                </Grid>
                }
                {showUpdateForm &&
                <Fab aria-label="add" style={{marginTop: '1em', marginLeft: '5em'}}
                     onClick={() => setShowUpdateForm(val => !val)}>
                    <ArrowBackIcon/>
                </Fab>
                }

                {reviews_ !== null && reviews_.length > 0 && showUpdateForm ?
                    <Grid item xs={6} md={6} lg={7} style={{margin: "2em", marginTop: '0'}}>
                        <UpdateReviewForm review={currentReview} setShowUpdateForm={setShowUpdateForm}/>
                    </Grid> : null
                }
                {
                   reviews_ === null &&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading3}/>
                }
            </Grid>
        </div>

    )
};

export default UpdateOrDeleteReview
