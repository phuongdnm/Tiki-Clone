import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Button from '../CustomButtons/Button'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import {useDispatch} from "react-redux";
import {message} from "antd";
import * as reviewActions from "../../../../store/actions/reviewActions";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import '@progress/kendo-theme-default/dist/all.css';
import InputLabel from "@material-ui/core/InputLabel";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";





const userStyles = makeStyles(() => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    "@global button:focus": {
        outline: "none !important"
    },
    "@global .MuiRating-label ": {
        display: 'block !important'
    }

}));


const UpdateReviewForm= ({review, setShowUpdateForm}) => {
    const classes = userStyles();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(review.title);
    const [rating, setRating] = useState(review.rating);
    const [text, setText] = useState(review.text);
    const [hover, setHover] = useState(-1);



    const [isLoading, setIsLoading] = useState(false);

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Updating review!", 0);
        let review_ = {
            title,
            rating,
            text,
        };

        dispatch( await reviewActions.updateReviewById(review_, review._id));

        setTimeout(msg, 1);

        setShowUpdateForm(val => !val);
        setIsLoading(false);
        setTitle("");
        setRating(null);
        setText("");
    };


    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3}>
                <Grid item xs={12} sm={12} md={8}>
                    <Card style={{marginLeft: '13vw'}}>
                        <CardHeader color="tiki">
                            <h4 className={classes.cardTitleWhite}>Add Review</h4>
                            <p className={classes.cardCategoryWhite}>Create a new review for a product</p>
                        </CardHeader>
                        <CardBody>
                            <ValidatorForm onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormControl>
                                        <TextValidator
                                            size="small"
                                            label="Title"
                                            placeholder="Enter you comment title"
                                            value={title}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={(e)=>setTitle(e.target.value)}
                                            variant="standard"
                                            validators={["required"]}
                                            errorMessages={["Enter your comment title"]}
                                        />
                                    </FormControl>
                                    <InputLabel htmlFor="my-input2" style={{marginTop: '1em', fontSize: '0.8em'}}>Rating</InputLabel>

                                    <FormControl>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '1em'}}>

                                            <Rating
                                                name="hover-feedback"
                                                size={'large'}
                                                style={{display: 'inline-flex'}}
                                                value={rating}
                                                precision={0.5}
                                                onChange={(e, newValue) => {newValue > 0.5 && setRating(newValue)}}
                                                onChangeActive={(event, newHover) => {
                                                    setHover(newHover);
                                                }}
                                            />
                                            <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>

                                        </div>
                                    </FormControl>

                                    <FormControl fullWidth={true}>

                                        <TextareaAutosize aria-label="empty textarea" rowsMin={3} placeholder="Write your comment here..."
                                                          width="420px" onChange={(e)=> setText(e.target.value)} value={text} required style={{borderColor: '#189EFF'}}/>
                                    </FormControl>
                                    <Button color="tiki" type={'submit'} style={{marginTop: '1em'}}
                                            disabled={isLoading}>
                                        Update Review
                                    </Button>
                                </FormGroup>
                            </ValidatorForm>
                        </CardBody>
                    </Card>
                </Grid>

            </Grid>
        </div>

    )
};


export default UpdateReviewForm
