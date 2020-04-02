import React, {useState} from 'react'
import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";
import Moment2 from 'moment';

import * as productActions from "../../../../store/actions/productActions";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from '../CustomButtons/Button'
import CustomInput from "../CustomInput/CustomInput";
import Card from "../Card/Card";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardHeader from "../Card/CardHeader";
import CardFooter from "../Card/CardFooter";

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
import {message} from "antd";
import NoPhoto from "../../../../image/nophoto.png";
import ProductCard from "../../Card";
import ReactLoading from 'react-loading';


const DeleteAProduct = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");
    const [showProductCard, setShowProductCard] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [loading, setLoading] = useState(false);


    const allProducts = useSelector(state => state.products.products);  // all users


    const allUsers = useSelector(state => state.users.users);  // all users


    const [products_, setProducts_] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allProducts !== null && setTimeout(() => {
            setProducts_(allProducts);
            setFirstLoad(false)
        }, 1000);
    }

    const handleFilter = (filter, option) => {
        switch (filter) {
            case "id":
                return option._id;
            case "name":
                return option.name;
            case "price":
                return option.price.toString();
            default:
                return ""
        }
    };

    const handleSearch = () => {
        setLoading(true);
        if (inputText.length > 0) {
            switch (filterOptions) {
                case "id":
                    setProducts_(allProducts.filter(product => product._id === inputText));
                    setLoading(false);
                    return;
                case "name":
                    setProducts_(allProducts.filter(product => product.name === inputText));
                    setLoading(false);
                    return;
                case "price":
                    setProducts_(allProducts.filter(product => product.price.toString() === inputText));
                    setLoading(false);
                    return;
                default:
                    return ""
            }

        }
    };

    const handleDeleteProduct = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Deleting product!", 0);
        await dispatch(productActions.deleteProductById( currentProduct._id));
        setTimeout(msg, 1);
        setProducts_(allProducts.filter(user => user._id !== currentProduct._id));
        setShowProductCard(val => !val);
        setIsLoading(false)
    };
    const ProductCardDelete = ({handleDeleteProduct, product}) => {
        const user = allUsers.find(user => user._id === product.user);

        return(
            allProducts!== null && currentProduct !== null && user.name !== null ?
                <Card plain >

                    <CardHeader plain color="danger">
                        <h4 className={classes.cardTitleWhite}>Delete {product.name}</h4>
                        <p className={classes.cardCategoryWhite}>From {product.shop.name}</p>
                    </CardHeader>
                    <CardBody>
                        {product.photo !== "no-photo.jpg" &&
                        <CardAvatar profile  style={{marginTop: '2em', marginBottom: '1em'}}>
                            <a href="#" onClick={e => e.preventDefault()}>
                                <img src={`${process.env.REACT_APP_API}/uploads/${product.photo}`} alt="..."/>
                            </a>
                        </CardAvatar>
                        }

                        <p className={classes.pCardTitle}  style={{display: "flex", justifyContent: "space-between"}}> <span>Owned By</span> <span>Owner Id</span></p>
                        <p className={classes.pCardContent} style={{display: "flex", justifyContent: "space-between"}}><span>{user.name}</span> <span>{product.user}</span></p><br/>

                        <p className={classes.pCardTitle}  style={{display: "flex", justifyContent: "space-between"}}> <span>Price</span> <span>Discount</span></p>
                        <p className={classes.pCardContent} style={{display: "flex", justifyContent: "space-between"}}><span>{product.price} VND</span> <span>{product.discount !== undefined ? product.discount : 0}%</span></p><br/>

                        <p className={classes.pCardTitle} style={{display: "flex", justifyContent: "space-between"}}><span>Weight</span> <span>Branch</span></p>
                        <p className={classes.pCardContent} style={{display: "flex", justifyContent: "space-between"}}><span>{product.weight}</span> <span>{product.branch}</span></p><br/>


                        <p className={classes.pCardTitle}>Description </p>
                        <p className={classes.pCardContent}>{product.description}</p><br/>

                        <p className={classes.pCardTitle}>Categories</p>
                        <p className={classes.pCardContent}>{product.category.map((cat, index)=> <span key={index}>{cat}, </span>)}</p><br/>

                        <p className={classes.pCardTitle}>Colors</p>
                        <p className={classes.pCardContent}>{product.colors.map((color, index)=> <span key={index}>{color}, </span>)}</p><br/>

                        <p className={classes.pCardTitle}>Specifications</p>
                        <p className={classes.pCardContent}>{product.specs.split(',').map((spec, index)=> <span key={index}>{spec} <br/> </span>)}</p><br/>

                        <p className={classes.pCardTitle}>Shop Id </p>
                        <p className={classes.pCardContent}>{product.shop.id}</p>

                        <p className={classes.pCardTitle}>Product Id </p>
                        <p className={classes.pCardContent}>{product.id}</p>

                        <p className={classes.pCardTitle}>Created at </p>
                        <p className={classes.pCardContent}>{Moment2(product.createdAt !== null && product.createdAt).format('MMMM DD YYYY,  h:mm:ss a')}</p>

                    </CardBody>
                    <CardFooter>
                        <Button color="danger" style={{width: "100%"}} disabled={isLoading} onClick={handleDeleteProduct}>Delete Product</Button>
                    </CardFooter>
                </Card>: null
        )
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={6} md={4} lg={3} style={{margin: 0}}>
                    <Button color="transparent" onClick={()=> handleSearch()} className={classes.title}>
                        Find Product to Delete</Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>

                        <Autocomplete
                            id="country-select-demo"

                            freeSolo
                            style={{width: 300}}
                            options={allProducts}
                            classes={{
                                option: classes.option,
                            }}
                            noOptionsText={`No user with that ${filterOptions}`}
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
                                  style={{marginTop:"0.5em", left: '85%'}}
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
                                style={{backgroundColor: 'rgba(256, 256, 256, 0.2)', height: '30em'}}
                                onClick={()=> {setCurrentProduct(product); setShowProductCard(val => !val)}}
                                key={product.id}
                                id={product.id}
                                type={'review'}
                                slug={product.slug}
                                price={product.price}
                                discount={product.discount !== undefined ? product.discount : null}
                                title={product.name}
                                image={product.photo === "no-photo.jpg" ? NoPhoto : `${process.env.REACT_APP_API}/uploads/${product.photo}`}
                                rating={product.averageRating}
                                link={false}
                            />
                        </Grid>
                    )) : null}
                {showProductCard &&
                <Fab aria-label="add" style={{marginLeft: '5em', marginTop: '4em'}}
                     onClick={() => setShowProductCard(val => !val)}>
                    <ArrowBackIcon/>
                </Fab>
                }

                {products_ !== null && products_.length > 0 && showProductCard ?
                    <Grid item xs={10} md={8} lg={7} style={{margin: "2em", marginLeft: '8vw'}}>
                        <ProductCardDelete product={currentProduct} handleDeleteProduct={handleDeleteProduct}/>
                    </Grid> : null
                }
                {
                    (products_ === null || loading )&&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading3}/>
                }
            </Grid>
        </div>

    )
};

export default DeleteAProduct
