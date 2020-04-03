import React, {useEffect, useState} from 'react'
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

import tikiNotFound from '../../../image/tiki-not-found-pgae.png'
import {useDispatch, useSelector} from "react-redux";
import * as reviewActions from "../../../store/actions/reviewActions";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import FormControl from "@material-ui/core/FormControl";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Moment2 from "react-moment";
import Card from "../Card";
import noPhoto from '../../../image/nophoto.png'
import {message} from "antd";


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
        padding: '3em',
        marginTop: '0.6em',
        marginBottom: '0.5em',
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.14)",
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
    "@global .MuiRating-decimal .MuiRating-label": {
        display: "inline"
    }

}));

const NoReviews = () => {
    const classes = userStyles();

    return (
        <>
            <div className={classes.title}>My comment</div>
            <div className={classes.grid}>
                <section style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column'
                }}>
                    <img src={tikiNotFound} alt=""/><br/>
                    <p>Write a review on the product you have used to provide information useful to everyone</p>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}

                    >
                        Continue shopping
                    </Button>
                </section>
            </div>
        </>
    )
};


const Review = ({review}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const product = useSelector(state => state.products.products.find(product => product.id === review.product.id));
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(review.text);
    const [title, setTitle] = useState(review.title);
    const [rating, setRating] = useState(review.rating);
    const [isLoading, setIsLoading] = useState(false);



    const handleUpdateReview = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Updating review!", 0);
        const review_ = {text, title, rating};
        await dispatch(reviewActions.updateReviewById(review_, review._id, product.id, user.id));
        setTimeout(msg, 1);
        setIsEditing(false);
        setIsLoading(false)
    };

    const handleDeleteReview = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Deleting review!", 0);
        await dispatch(reviewActions.deleteReviewById(review._id, product.id, user.id));
        setTimeout(msg, 1);
        setIsLoading(false)
    };


    return (
        <>

            <ValidatorForm onSubmit={handleUpdateReview}>
                <FormGroup>
                    <div>
                        <Grid container style={{padding: '1em'}}>
                            <Grid item xs={4}>
                                {product !== null &&
                                <Card
                                    link={true}
                                    key={product.id}
                                    id={product.id}
                                    type={'default'}
                                    price={product.price}
                                    discount={product.discount}
                                    title={product.name}
                                    image={product.photo === "no-photo.jpg" ? noPhoto : `${process.env.REACT_APP_API}/uploads/${product.photo}`}
                                />
                                }
                            </Grid>

                            <Grid item xs={8} style={{textAlign: 'left'}}>
                            <span>
                              <div style={{marginBottom: '0', display: 'flex', alignItems: "center", justifyContent: 'space-between'}}>
                                  {isEditing ?
                                      <Rating
                                          name="hover-feedback"
                                          size={'large'}
                                          style={{display: 'inline-flex'}}
                                          value={rating}
                                          precision={0.5}
                                          onChange={(e, newValue) => {
                                              newValue > 0.5 && setRating(newValue)
                                          }}
                                      /> :
                                      <Rating
                                          name="read-only"
                                          value={review.rating}
                                          style={{marginTop: '0.5em'}}
                                          readOnly
                                          precision={0.5}
                                      />}
                                  {isEditing ?
                                      <FormControl>

                                          <TextValidator
                                              size="small"
                                              label="Title"
                                              style={{marginLeft: '2em', marginRight: "4em", paddingRight: '2em'}}
                                              placeholder="Enter you comment title"
                                              value={title}
                                              margin="normal"
                                              fullWidth
                                              InputLabelProps={{
                                                  shrink: true,
                                              }}
                                              onChange={(e) => {
                                                  setTitle(e.target.value)
                                              }}
                                              variant="standard"
                                              validators={["required"]}
                                              errorMessages={["Enter your comment title"]}
                                          />
                                      </FormControl>
                                      :
                                      <span style={{fontWeight: 600, marginRight: '10em'}}>{review.title}</span>
                                  }
                            </div>
                            </span>
                                <p style={{color: '#22B345', fontSize: '0.75em'}}>
                                    Bought from Tiki
                                </p>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                                    {isEditing ?
                                        <FormControl>

                                            <TextareaAutosize aria-label="empty textarea" rowsMin={3}
                                                              placeholder="Write your comment here..."
                                                              onChange={(e) => setText(e.target.value)} value={text}
                                                              required
                                                              style={{borderColor: '#303F9F', width: "300px"}}/>
                                        </FormControl>
                                        : <p>{review.text}</p>

                                    }

                                    <>
                                        {
                                            isEditing ?
                                                <FormControl>

                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size={"small"}
                                                        type={'submit'}
                                                        startIcon={<SaveIcon/>}
                                                        style={{marginLeft: '3em'}}
                                                        disabled={isLoading}

                                                    >
                                                        Save
                                                    </Button>
                                                </FormControl>
                                                :
                                                <FormControl>

                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size={"small"}
                                                        component={"div"}
                                                        startIcon={<EditIcon/>}
                                                        style={{marginLeft: '3em'}}
                                                        disabled={isLoading}
                                                        onClick={() => setIsEditing(true)}
                                                    >
                                                        Edit
                                                    </Button>
                                                </FormControl>
                                        }
                                        <FormControl>

                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                component={"div"}
                                                size={"small"}
                                                style={{marginLeft: '2em'}}
                                                startIcon={<DeleteIcon/>}
                                                disabled={isLoading}
                                                onClick={handleDeleteReview}
                                            >
                                                Delete
                                            </Button>
                                        </FormControl>
                                    </>
                                </div>

                                <p style={{fontSize: '0.7em', color: 'gray'}}>
                                    Commented <Moment2 fromNow>{review.createdAt}</Moment2>

                                </p>
                            </Grid>

                        </Grid>
                    </div>
                </FormGroup>
            </ValidatorForm>
        </>
    )
};

const Reviews = ({reviews}) => {
    const classes = userStyles();
    return (
        <>
            <div className={classes.title}>My comments</div>
            <div className={classes.grid}>
                {reviews !== null && reviews.length > 0 && reviews.map((review, index) => (
                    <Review review={review} key={index}/>
                ))}
            </div>
        </>
    )
};

const MyComment = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const reviews = useSelector(state => state.reviews.userReviews);

    useEffect(() => {
        dispatch(reviewActions.getAllUserReviews(user.id))
    }, [user.id]);


    return (
        <div style={{width: '100%'}}>
            {reviews !== null && reviews.length > 0 ?
                <Reviews reviews={reviews}/>
                : <NoReviews/>

            }

        </div>
    )
};

export default MyComment
