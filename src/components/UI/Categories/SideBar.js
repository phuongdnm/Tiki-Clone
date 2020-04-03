import React, {useState} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import StarRateIcon from '@material-ui/icons/Star';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const SidebarItem = ({label, items, item, depthStep = 10, depth = 0, ...rest}) => {
    return (
        <>
            <ListItem button dense {...rest}>
                <ListItemText style={{paddingLeft: depth * depthStep}}>
                    <span>{label}</span>
                </ListItemText>
            </ListItem>
            {Array.isArray(items) ? (
                <List disablePadding dense>
                    {items.map((subItem) => (
                        <SidebarItem
                            key={subItem.name}
                            depth={depth + 1}
                            depthStep={depthStep}
                            {...subItem}
                        />
                    ))}
                </List>
            ) : null}
        </>
    )
}
const useStyles = makeStyles(theme => ({
    "@global #price, #price2":{
        width: "4em",
        // height: "1em",
        padding: "0.2em 0.7em"
    }
}));

const Sidebar = ({items, item, depthStep, depth,  handleFilter}) => {
    const [priceMin, setPriceMin] = useState(null);
    const [priceMax, setPriceMax] = useState(null);
    const [rating, setRating] = useState(6);
    const checkIsComplexSearch = (rating_)=>{
        let isComplex;
        if(priceMax !== null || priceMin !== null) isComplex = "both";
        else if(rating_ !== undefined) isComplex = "rating";
        else if(rating_ === undefined) isComplex = "price";
        let rating__ = rating_ === undefined ? rating : rating_;

        handleFilter(isComplex, rating__, priceMin, priceMax)
    };
    const classes = useStyles();
    return (
        <div>
            <div style={{borderStyle: 'solid', borderRadius: '1px', borderColor: 'white'}}>
                <p style={{paddingLeft: "15px", fontWeight: 600}}>PRODUCT CATEGORIES </p>
                <List disablePadding dense>
                    {items.map((sidebarItem, index) => (
                        <SidebarItem style={{fontWeight: "bold", color: 'red'}}
                                     key={`${sidebarItem.name}${index}`}
                                     depthStep={depthStep}
                                     depth={depth}
                                     {...sidebarItem}
                        />
                    ))}
                </List>
                <hr/>
                <p style={{paddingLeft: "15px", fontWeight: 600, marginBottom: '0.5em'}}>RATE</p>
                <List disablePadding dense>
                    <ListItem button onClick={()=>{checkIsComplexSearch(6); setRating(6)}} selected={rating === 6}>
                        <ListItemText primary="Include all stars"/>
                    </ListItem>
                    <ListItem button onClick={()=>{checkIsComplexSearch(5); setRating(5)}} selected={rating === 5}>
                        <ListItemIcon>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon style={{color: 'orange'}}/>
                        </ListItemIcon>
                        <ListItemText primary="(From 5 Stars)"/>
                    </ListItem>

                    <ListItem button onClick={()=>{checkIsComplexSearch(4); setRating(4)}} selected={rating === 4}>
                        <ListItemIcon>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon/>
                        </ListItemIcon>
                        <ListItemText primary="(From 4 Stars)"/>
                    </ListItem>


                    <ListItem button onClick={()=>{checkIsComplexSearch(3); setRating(3)}} selected={rating === 3}>
                        <ListItemIcon>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon style={{color: 'orange'}}/>
                            <StarRateIcon/>
                            <StarRateIcon/>
                        </ListItemIcon>
                        <ListItemText primary="(From 3 Stars)"/>
                    </ListItem>
                </List>
                <hr/>
                <p style={{paddingLeft: "15px", fontWeight: 600}}>PRICE</p>
                <p style={{paddingLeft: "15px", color: 'gray'}}>select range:</p>
                <form  noValidate autoComplete="off">
                    <div style={{display: 'flex', justifyContent: "space-around", marginTop:  '0.5em'}}>
                        <TextField id="price" variant="outlined" type='number' value={priceMin} size="small" onChange={(e)=>setPriceMin(parseInt(e.target.value))}/> _
                        <TextField id="price2" variant="outlined" type='number' value={priceMax} size="small" onChange={(e)=>setPriceMax(parseInt(e.target.value))}/>
                    </div>


                    <Button type="submit" size={'small'} style={{marginTop: '0.5em', marginLeft: '6%', color: "#189EFF", border: "1px solid #189EFF"}} onClick={(e)=>{e.preventDefault(); checkIsComplexSearch()}}>OK</Button>
                </form>
            </div>
            <hr/>
            <p style={{paddingLeft: "15px", fontWeight: 600}}>BRAND</p>
            <List style={{size: 'small', color: 'grey'}}>
                {item.map((sidebarBrandItem, index) => (
                    <ListItem button>
                        <ListItemText primary={sidebarBrandItem.label}/>
                    </ListItem>
                ))}
            </List>
            <hr/>
            <p style={{paddingLeft: "15px", fontWeight: 600}}>PROVIDER</p>
            <List style={{size: 'small', color: 'grey'}}>
                {item.map((sidebarBrandItem, index) => (
                    <ListItem button>
                        <ListItemText primary={sidebarBrandItem.label}/>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Sidebar
