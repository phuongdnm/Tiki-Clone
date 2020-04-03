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
import ProductCard from "../../Card";
import {ShopCard} from "./ShopCard2";


const FindAShop = (props) => {
    const classes = userStyles();
    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");

    const [toggleShop, setToggleShop] = useState(false);
    const [currentShop, setCurrentShop] = useState(null);


    const allShops = useSelector(state => state.shops.shops);  // all users
    const [shops, setShops] = useState([]); // to update users that are rendered


    const handleFilter = (filter, option) => {
        switch (filter) {
            case "id":
                return option._id;
            case "name":
                return option.name;
            default:
                return ""
        }
    };

    const handleSearch = () => {
        if (inputText.length > 0) {
            switch (filterOptions) {
                case "id":
                    return setShops(allShops.filter(shop => shop._id === inputText));
                case "name":
                    return setShops(allShops.filter(shop => shop.name === inputText));
                default:
                    return ""
            }

        }
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={6} md={4} lg={3} style={{margin: 0}}>
                    <Button color="transparent" href="#" className={classes.title}>
                        Find A Shop</Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            id="edemo"
                            freeSolo
                            style={{width: 300}}
                            options={allShops}
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
                                  style={{marginTop: "0.5em", left: "85%"}}
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
                            </List>
                        </div>
                    </section>
                </Grid>

            </Grid>
            <Grid container>
                {shops !== null && shops.length  > 0 && !toggleShop?
                    shops.map((shop, index) => (
                        <Grid item xs={6} md={4} lg={3} style={{margin: 0,  marginLeft: '1em'}} key={index}>
                            <ShopCard shop={shop} setCurrentShop={setCurrentShop} toggleShop={setToggleShop}/>
                        </Grid>
                    )) : null
                }
                {(shops === null || shops.length <= 0) && !toggleShop &&
                <Grid item xs={10} md={10} lg={12} style={{margin: 0}}>
                    <section style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        width: '100%',
                        height: '100%'
                    }}>
                        <p style={{
                            fontSize: "3em",
                            fontWeight: 600,
                            textAlign: 'center',
                            marginTop: '2em',
                            color: "rgba(149, 149, 149, 1)"
                        }}>Search for a shop by Id or name.</p>
                    </section>
                </Grid>
                }
                {currentShop !== null && toggleShop &&
                currentShop.products.map((product, index) => (
                    <Grid item xs={6} md={4} lg={3} style={{margin: 0, marginLeft: '1em'}} key={index}>
                        <ProductCard
                            style={{backgroundImage: `linear-gradient(60deg, #EEEEEE, #DDDDDD)`, height: '23em'}}
                            key={product.id}
                            id={product.id}
                            slug={product.slug}
                            type={'review'}
                            price={product.price}
                            discount={product.discount !== undefined ? product.discount : 0}
                            title={product.name}
                            image={product.photo === "no-photo.jpg" ? NoPhoto : `${process.env.REACT_APP_API}/uploads/${product.photo}`}
                            rating={product.averageRating}
                            link={true}
                        />
                    </Grid>
                ))
                }

            </Grid>
        </div>

    )
};

export default FindAShop
