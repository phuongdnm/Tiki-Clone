import React, {useEffect, useState} from 'react'
import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";

import {useSelector} from "react-redux";
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
import Fab from "@material-ui/core/Fab";
import UpdateAProductForm from "./UpdateAProductForm";
import NoPhoto from "../../../../image/nophoto.png";
import ProductCard from "../../Card";
import ReactLoading from 'react-loading';




const UpdateAProduct = (props) => {
    const classes = userStyles();

    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");
    const [showProductCard, setShowProductCard] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);




    const allProducts = useSelector(state => state.products.products);  // all users
    const [products_, setProducts_] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);


    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allProducts !== null && setTimeout(() => {
            setProducts_(allProducts);
            setFirstLoad(false)
        }, 750);
    }
    useEffect(()=>{
        setTimeout(()=>setProducts_(allProducts), 1000)
    }, [allProducts]);


    const handleFilter = (filter, option) => {
        switch (filter) {
            case "id":
                return option._id;
            case "name":
                return option.name;
            case "price":
                return option.price.toString() ;
            default:
                return ""
        }
    };

    const handleSearch = () => {
        setIsLoading(true);
        if (inputText.length > 0) {
            switch (filterOptions) {
                case "id":
                    setProducts_(allProducts.filter(product => product._id === inputText));
                    setIsLoading(false);
                    return;
                case "name":
                    setProducts_(allProducts.filter(product => product.name === inputText));
                    setIsLoading(false);
                    return;
                case "price":
                    setProducts_(allProducts.filter(product => product.price.toString() === inputText));
                    setIsLoading(false);
                    return;
                default:
                    return ""
            }

        }
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={6} md={4} lg={3} style={{margin: 0}}>
                    <Button color="transparent" onClick={()=>{setProducts_(allProducts)}} className={classes.title}>
                        Find Product to Update</Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            id="oijnemo"
                            freeSolo
                            style={{width: 300}}
                            options={allProducts}
                            classes={{
                                option: classes.option,
                            }}
                            noOptionsText={`No user with that ${filterOptions}`}
                            getOptionLabel={option => handleFilter(filterOptions, option)}
                            autoHighlight
                            renderOption={(option, state) =>
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
                            }
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
                                        placeholder: `Search user by ${filterOptions}`,
                                        inputProps: {
                                            ...params.inputProps,
                                        }
                                    }}
                                />
                            )}
                        />
                        <Button color="white" aria-label="edit" justIcon round
                                style={{marginBottom: 0, marginLeft: '0.5em', marginRight: '2em'}}
                                onClick={handleSearch}>
                            <Search/>
                        </Button>
                        <div tabIndex={0}
                             onBlur={(event)=> {!event.currentTarget.contains(event.relatedTarget) && setToggleList(false)}}>
                        <Button color="white" className={classes.title} onClick={() => setToggleList(val => !val)}>
                            Search by {filterOptions} {toggleList ? <ExpandLess style={{marginLeft: '0.5em'}}/> :
                            <ExpandMore style={{marginLeft: '0.5em'}}/>}
                        </Button>
                        <List component="nav" aria-label="filter options"
                              className={classNames(classes.listStyle, {[classes.showList]: toggleList})}
                              style={{marginTop: "0.5em", left: '85%'}}
                        >
                            <ListItem button onClick={() => {
                                setFilterOptions("id");
                                setToggleList(val => !val)
                            }} selected={"id" === filterOptions}>
                                <ListItemText primary="Id"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("name");
                                setToggleList(val => !val)
                            }} selected={"name" === filterOptions}>
                                <ListItemText primary="Name"/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                setFilterOptions("price");
                                setToggleList(val => !val)
                            }} selected={"price" === filterOptions}>
                                <ListItemText primary="Price"/>
                            </ListItem>
                        </List>
                        </div>

                    </section>
                </Grid>

            </Grid>
            <Grid container>
                {products_ !== null && products_.length > 0 && !showProductCard ?
                    products_.map((product, index) => (
                        <Grid item xs={4} md={3} lg={3} style={{margin: 0}} key={index}>
                            <ProductCard
                                onClick={()=> {setCurrentProduct(product); setShowProductCard(val => !val)}}
                                style={{backgroundColor: 'rgba(256, 256, 256, 0.2)', height: '30em'}}
                                key={product.id}
                                id={product.id}
                                type={'review'}
                                price={product.price}
                                discount={product.discount !== undefined ? product.discount : 0}
                                title={product.name}
                                image={product.photo === "no-photo.jpg" ? NoPhoto : `${process.env.REACT_APP_API}/uploads/${product.photo}`}
                                rating={product.averageRating}
                                link={false}
                            />

                        </Grid>
                    )) : null}

                {showProductCard &&

                <Fab aria-label="add" style={{marginTop: '3em',  marginLeft: '5em'}}
                     onClick={() => setShowProductCard(val => !val)}>
                    <ArrowBackIcon/>
                </Fab>
                }
                {products_ !== null && products_.length > 0 && showProductCard ?
                    <Grid item xs={10} md={11} lg={8} style={{margin: "2em"}}>

                        <UpdateAProductForm product={currentProduct} setShowProductCard={setShowProductCard}/>
                    </Grid> : null
                }
                {
                    (products_ === null || isLoading )&&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading3}/>
                }
            </Grid>
        </div>

    )
};

export default UpdateAProduct
