import React, {useEffect, useState} from 'react'
import userStyles from "../styles/FindAUserStyles";
import classNames from "classnames";

import { useSelector} from "react-redux";
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
import UpdateAShopForm from "./UpdateAShopForm";
import {ShopCard} from "./ShopCard2";




const UpdateAShop = (props) => {
    const classes = userStyles();

    const [filterOptions, setFilterOptions] = useState("id");
    const [toggleList, setToggleList] = useState(false);
    const [inputText, setInputText] = useState("");
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [currentShop, setCurrentShop] = useState(null);



    const allShops = useSelector(state => state.shops.shops);  // all users
    const [shops_, setShops_] = useState([]); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);


    if (firstLoad) {
        // users wouldn't have been set so we use settimeout
        allShops !== null && setTimeout(() => {
            setShops_(allShops);
            setFirstLoad(false)
        }, 750);
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
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} className={classes.appBar}>
                <Grid item xs={6} md={4} lg={3} style={{margin: 0}}>
                    <Button color="transparent" onClick={()=>{setShops_(allShops)}} className={classes.title}>
                        Find Shop to Update</Button>
                </Grid>
                <Grid item xs={6} md={8} lg={9} style={{margin: 0}}>
                    <section style={{display: "flex", justifyContent: 'flex-end'}}>
                        <Autocomplete
                            id="erfrmo"
                            freeSolo
                            style={{width: 300}}
                            options={allShops}
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
                              style={{left: '85%', marginTop: '0.5em'}}
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
                {shops_ !== null && shops_.length > 0 && !showUpdateForm ?
                    shops_.map((shop, index) => (
                        <Grid item xs={6} md={4} lg={4} style={{margin: 0}} key={index}>
                            <ShopCard shop={shop} setCurrentShop={setCurrentShop} toggleShop={setShowUpdateForm}/>
                        </Grid>
                    )) : null}
                {showUpdateForm &&
                        <Fab aria-label="add" style={{marginTop: '1em', marginLeft: '5em'}}
                             onClick={() => setShowUpdateForm(val => !val)}>
                            <ArrowBackIcon/>
                        </Fab>
                }

                {shops_ !== null && shops_.length > 0 && showUpdateForm ?
                    <Grid item xs={6} md={6} lg={7} style={{margin: "2em", marginTop: '0'}}>

                        <UpdateAShopForm shop={currentShop} setShowUpdateForm={setShowUpdateForm}/>
                    </Grid> : null
                }
            </Grid>
        </div>

    )
};

export default UpdateAShop
