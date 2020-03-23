import React, {useEffect, useState} from 'react'
import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";
import Moment2 from 'moment';

import * as shopActions from "../../../../store/actions/shopActions";
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
import CardBody from "../Card/CardBody";
import Fab from "@material-ui/core/Fab";
import {message} from "antd";
import ReactLoading from 'react-loading';
import {ShopCard} from "./ShopCard2";






const DeleteAShop = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");
    const [showShopCard, setShowShopCard] = useState(false);
    const [currentShop, setCurrentShop] = useState(null);


    const allShops = useSelector(state => state.shops.shops);


    const allUsers = useSelector(state => state.users.users);  // all users


    const [shops_, setShops_] = useState([]); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allShops !== null && setTimeout(() => {
            setShops_(allShops);
            setFirstLoad(false)
        }, 1000);
    }

    useEffect(()=>{
        setTimeout(()=>setShops_(allShops), 1000)
    }, [allShops]);

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
                    return setShops_(allShops.filter(shop => shop._id === inputText));
                case "name":
                    return setShops_(allShops.filter(shop => shop.name === inputText));
                default:
                    return ""
            }

        }
    };

    const handleDeleteShop = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Deleting shop!", 0);
        await dispatch(shopActions.deleteShopById(currentShop._id));
        setTimeout(msg, 1);
        setShowShopCard(val => !val);
        setIsLoading(false)
    };
    const ShopCardDelete = ({handleDeleteShop, shop}) => {
        const user = allUsers.find(user => user._id === shop.user);

        return(
            allShops!== null && currentShop !== null && user.name !== null ?
                // setCurrentUserProfile(allUsers.find(user => user._id === currentUserId));
                <Card plain >

                    <CardHeader plain color="danger">
                        <h4 className={classes.cardTitleWhite}>Delete {shop.name}</h4>
                        <p className={classes.cardCategoryWhite}>This actions cannot be reversed</p>
                    </CardHeader>
                    <CardBody>

                        <p className={classes.pCardTitle}  style={{display: "flex", justifyContent: "space-between"}}> <span>Owned By</span> <span>Owner Id</span></p>
                        <p className={classes.pCardContent} style={{display: "flex", justifyContent: "space-between"}}><span>{user.name}</span> <span>{shop.user}</span></p><br/>

                        <p className={classes.pCardTitle}>Description </p>
                        <p className={classes.pCardContent}>{shop.description}</p><br/>

                        <p className={classes.pCardTitle}  style={{display: "flex", justifyContent: "space-between"}}> <span>No of Products in shop</span> <span>Phone</span></p>
                        <p className={classes.pCardContent} style={{display: "flex", justifyContent: "space-between"}}><span>{shop.products.length}</span> <span>{shop.phone}</span></p><br/>

                        <p className={classes.pCardTitle}>Address </p>
                        <p className={classes.pCardContent}>{shop.address}</p><br/>


                        <p className={classes.pCardTitle}>Created at </p>
                        <p className={classes.pCardContent}>{Moment2(shop.createdAt !== null && shop.createdAt).format('MMMM DD YYYY,  h:mm:ss a')}</p>

                    </CardBody>
                    <CardFooter>
                        <Button color="danger" style={{width: "100%"}} disabled={isLoading} onClick={handleDeleteShop}>Delete Product</Button>
                    </CardFooter>
                </Card>: null
        )
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={6} md={4} lg={3} style={{margin: 0}}>
                    <Button color="transparent" href="#" className={classes.title}>
                        Find Shop to Delete</Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            id="country-select-demo"

                            freeSolo
                            style={{width: 300}}
                            options={allShops}
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
                        </List>
                        </div>

                    </section>
                </Grid>

            </Grid>
            <Grid container spacing={2} style={{marginLeft: '0.5em'}}>
                {shops_ !== null && shops_.length > 0 && !showShopCard ?
                    shops_.map((shop, index) => (
                        <Grid item xs={6} md={4} lg={4} style={{margin: 0}} key={index}>
                            <ShopCard shop={shop} setCurrentShop={setCurrentShop} toggleShop={setShowShopCard}/>

                        </Grid>
                    )) : null}
                {showShopCard &&
                <Fab aria-label="add" style={{marginLeft: '5em', marginTop: '4em'}}
                     onClick={() => setShowShopCard(val => !val)}>
                    <ArrowBackIcon/>
                </Fab>
                }

                {shops_ !== null && shops_.length > 0 && showShopCard ?
                    <Grid item xs={10} md={8} lg={7} style={{margin: "2em", marginLeft: '8vw'}}>
                        <ShopCardDelete shop={currentShop} handleDeleteShop={handleDeleteShop}/>
                    </Grid> : null
                }
                {
                    shops_ === null &&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading3}/>
                }
            </Grid>
        </div>

    )
};

export default DeleteAShop
