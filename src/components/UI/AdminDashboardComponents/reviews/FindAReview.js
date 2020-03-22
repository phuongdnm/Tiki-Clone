import React, { useState} from 'react'
import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from '../CustomButtons/Button'
import CustomInput from "../CustomInput/CustomInput";
import {Search} from "@material-ui/icons";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import {ReviewCard} from "./ReviewCard";


const FindAReview = (props) => {
    const classes = userStyles();
    const [filterOptions, setFilterOptions] = useState("id");
    const [filterOptions2, setFilterOptions2] = useState(null);
    const [toggleList2, setToggleList2] = useState(false);

    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");


    const allReviews = useSelector(state => state.reviews.allReviews);  // all reviews
    const allUsers = useSelector(state => state.users.users);  // all users
    const [reviews, setReviews] = useState([]); // to update users that are rendered


    const handleFilter = (filter, option) => {
        switch (filter) {
            case "id":
                return option._id;
            case "title":
                return option.title;
            case "rating":
                return option.rating.toString() ;
            default:
                return ""
        }
    };

    const handleSearch = (isSearchByRating, rating) => {
        if (isSearchByRating === true) {

            switch (rating) {
                case 1:
                    return setReviews(allReviews.filter(review => review.rating === 1));
                case 2:
                    return setReviews(allReviews.filter(review => review.rating === 2));
                case 3:
                    return setReviews(allReviews.filter(review => review.rating === 3));
                case 4:
                    return setReviews(allReviews.filter(review => review.rating === 4));
                case 5:
                    return setReviews(allReviews.filter(review => review.rating === 5));
                default:
                    return reviews;
            }
        }else if (inputText.length > 0) {
            switch (filterOptions) {
                case "id":
                    return setReviews(allReviews.filter(review => review._id === inputText));
                case "title":
                    return setReviews(allReviews.filter(review => review.title === inputText));
                case "rating":
                    return setReviews(allReviews.filter(review => review.rating.toString() === inputText));
                default:
                    return ""
            }

        }
    };
    const getReviewOwner = (userId)=>{
        return allUsers.find(user =>user._id === userId)
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={6} md={4} lg={3} style={{margin: 0}}>
                    <Button color="transparent" href="#" className={classes.title}>
                        Find A Review</Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            id="cedmo"
                            autoComplete={false}
                            // autocomplete={"off"}
                            freeSolo
                            style={{width: 300}}
                            options={allReviews || []}
                            classes={{
                                option: classes.option,
                            }}
                            noOptionsText={`No shop with that ${filterOptions}`}
                            getOptionLabel={option => handleFilter(filterOptions, option)}
                            autoHighlight
                            renderOption={(option, state) => (
                                <p style={{
                                    padding: "0.5em",
                                    margin: "0",
                                    width: 300,
                                    height: "100% !important",
                                    color: '#000',
                                    overflowX: "hidden"
                                }} onClick={(e) => {
                                    setInputText(e.target.textContent)
                                }}>
                                    {handleFilter(filterOptions, option)}
                                </p>
                            )}
                            renderInput={params => (
                                <CustomInput
                                    formControlProps={{
                                        className: classes.search
                                    }}
                                    inputProps={{
                                        onChange: (e) => {
                                            setInputText(e.target.value);
                                        },
                                        ...params,
                                        placeholder: `Search shop by ${filterOptions}`,
                                        inputProps: {
                                            ...params.inputProps,
                                        }
                                    }}
                                />
                            )}
                        />
                        <Button color="white" aria-label="edit" justIcon round
                                style={{marginBottom: 0, marginLeft: '0.5em', marginRight: '2em'}}
                                onClick={()=>handleSearch(false)}>
                            <Search/>
                        </Button>
                        <div tabIndex={0}
                             onBlur={(event)=> {!event.currentTarget.contains(event.relatedTarget) && setToggleList(false)}}>
                        <Button color="white" className={classes.title2} onClick={() => setToggleList(val => !val)}>
                            Search by {filterOptions} {toggleList ? <ExpandLess style={{marginLeft: '0.5em'}}/> :
                            <ExpandMore style={{marginLeft: '0.5em'}}/>}

                        </Button>
                        <List component="nav" aria-label="filter options"
                              className={classNames(classes.listStyle, {[classes.showList]: toggleList})}
                              style={{right: '17em', marginTop: '1em'}}
                        >
                            <ListItem button onClick={() => {
                                setFilterOptions("id");
                                setToggleList(val => !val)
                            }} selected={"id" === filterOptions}>
                                <ListItemText primary="Id"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("title");
                                setToggleList(val => !val)
                            }} selected={"title" === filterOptions}>
                                <ListItemText primary="Review Title"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("rating");
                                setToggleList(val => !val)
                            }} selected={"rating" === filterOptions}>
                                <ListItemText primary="Rating"/>
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
                                  style={{right: '3.5em', marginTop: '0.5em'}}

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
            <Grid container style={{marginLeft: '2em', marginTop: '2em'}}>
                {reviews !== null && reviews.length > 0 ?
                    reviews.map((review, index) => (
                        <Grid item xs={6} md={4} lg={4} style={{margin: 0}} key={index}>
                            <ReviewCard review={review} getUser={()=>getReviewOwner(review.user)}/>
                        </Grid>
                    )) :
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
                            }}>Search for a review by Id or title.</p>
                        </section>
                    </Grid>
                }
            </Grid>
        </div>

    )
};

export default FindAReview
