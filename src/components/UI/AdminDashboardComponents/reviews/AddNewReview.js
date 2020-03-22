import React, {useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Button from '../CustomButtons/Button'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import {useDispatch, useSelector} from "react-redux";
import {message} from "antd";
import * as reviewActions from "../../../../store/actions/reviewActions";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
        display: 'block !important',
        color: 'inherit',
        fontSize: 'inherit'
    }

}));


const AddANewReview = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();

    const allProducts = useSelector(state => state.products.products);
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState(3);
    const [text, setText] = useState("");
    const [hover, setHover] = useState(-1);

    const [currentProduct, setCurrentProduct] = useState("");


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

    useEffect(()=>{
        ValidatorForm.addValidationRule('isProductInputEmpty', (value) => value.length > 0);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Creating review!", 0);
        let review = {
            title,
            rating,
            text,
        };

        dispatch( await reviewActions.addNewReview(review, currentProduct));

        setTimeout(msg, 1);

        setIsLoading(false);
        setTitle("");
        setRating(null);
        setText("");
    };


    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3}>
                <Grid item xs={10} sm={10} md={8} lg={6}>
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
                                    <FormControl>
                                        <Autocomplete
                                            id="country-select-demo"
                                            options={allProducts || []}
                                            classes={{
                                                option: classes.option,
                                            }}
                                            style={{width: '100%'}}
                                            noOptionsText={`No product with that name or id`}
                                            onChange={(e, value)=> {
                                                setCurrentProduct(value !== null ? value._id : "")
                                            }}
                                            getOptionLabel={option => option.name+ "  " + option._id}
                                            autoHighlight
                                            renderOption={(option, state) => (
                                                <p style={{
                                                    padding: "0.1em",
                                                    margin: "0",
                                                    width: "300",
                                                    height: "100% !important",
                                                    color: '#000',
                                                    overflowX: "hidden"
                                                }}>
                                                    {option.name}<br/>
                                                    {option._id}
                                                </p>
                                            )}
                                            renderInput={params => (
                                                <TextValidator
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    value={currentProduct}
                                                    label="Comment's Product name or id"
                                                    style={{margin: 8}}
                                                    placeholder="Enter comment product's name or id"
                                                    margin="normal"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    inputProps= {{
                                                        ...params.inputProps,
                                                    }}
                                                    variant="standard"
                                                    validators={["isProductInputEmpty"]}
                                                    errorMessages={["Enter comment product's name or id"]}
                                                />
                                            )}
                                        />
                                    </FormControl>

                                    <Button color="tiki" type={'submit'} style={{marginTop: '1em'}}
                                            disabled={isLoading}>
                                        Create Review
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


export default AddANewReview
