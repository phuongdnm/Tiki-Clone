import React, {useState} from 'react'
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
import NoPhoto from "../../../../image/nophoto.png";
import ReactLoading from 'react-loading';
import ProductCard from "../../Card";

const FindAProduct = (props) => {
    const classes = userStyles();
    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const allProducts = useSelector(state => state.products.products);  // all users
    const [products, setProducts] = useState([]); // to update users that are rendered


    const handleFilter = (filter, option) => {
        switch (filter) {
            case "id":
                return option._id;
            case "name":
                return option.name;
            case "price":
                return option.price.toString() ;
            case "rating":
                return option.averageRating.toString() ;
            default:
                return ""
        }
    };

    const handleSearch = () => {
        if (inputText.length > 0) {
            setIsLoading(true);
            switch (filterOptions) {
                case "id":
                    setProducts(allProducts.filter(product => product._id === inputText));
                    setIsLoading(false);
                    return ;
                case "name":
                    setProducts(allProducts.filter(product => product.name === inputText));
                    setIsLoading(false);
                    return ;
                case "price":
                    setProducts(allProducts.filter(product => product.price.toString() === inputText));
                    setIsLoading(false);
                    return ;
                case "rating":
                    setProducts(allProducts.filter(product => product.averageRating.toString() === inputText));
                    setIsLoading(false);
                    return ;
                default:
                    return ""
            }

        }
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={6} md={4} lg={3} style={{margin: 0}}>
                    <Button color="transparent"  className={classes.title}>
                        Find A Product</Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            id="dnskct-demo"
                            freeSolo
                            style={{width: 300}}
                            options={allProducts}
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
                                        // console.log(`val is: ${inputText}`)},
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
                                  style={{marginTop: "0.5em", left:"85%"}}
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
                                <ListItem button onClick={() => {
                                    setFilterOptions("rating");
                                    setToggleList(val => !val)
                                }} selected={"rating" === filterOptions}>
                                    <ListItemText primary="Rating"/>
                                </ListItem>
                            </List>
                        </div>

                    </section>
                </Grid>

            </Grid>
            <Grid container>
                {products !== null && products.length > 0 ?
                    products.map((product, index) => (
                        <Grid item xs={6} md={4} lg={3} style={{margin: 0}} key={index}>
                            <ProductCard
                                style={{backgroundColor: 'rgba(256, 256, 256, 0.2)', height: '30em'}}
                                key={product.id}
                                id={product.id}
                                type={'review'}
                                slug={product.slug}
                                price={product.price}
                                discount={product.discount !== undefined ? product.discount : 0}
                                title={product.name}
                                image={product.photo === "no-photo.jpg" ? NoPhoto : `${process.env.REACT_APP_API}/uploads/${product.photo}`}
                                rating={product.averageRating}
                                link={true}
                            />
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
                            }}>Search for a product by Id or name.</p>
                        </section>
                    </Grid>
                }
                {
                    isLoading &&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading3}/>
                }
            </Grid>
        </div>

    )
};

export default FindAProduct
