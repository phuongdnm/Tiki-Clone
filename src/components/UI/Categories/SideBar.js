import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import StarRateIcon from '@material-ui/icons/Star';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const SidebarItem = ({ label, items,item, depthStep = 10, depth = 0, ...rest })=> {
    return (
      <>
        <ListItem  button dense {...rest}>
          <ListItemText  style={{ paddingLeft: depth * depthStep }}>
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
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 100,
        height:20,
      },
    },
  }));

  const Sidebar = ({ items,item, depthStep, depth })=>{
    const classes = useStyles();
    return (
    <div>
      <div style = {{ borderStyle: 'solid', borderRadius: '1px',borderColor:'white'} }>
        <p style={{paddingLeft:"15px"}}>PRODUCT CATEGORIES </p>
        <List disablePadding dense>
          {items.map((sidebarItem, index) => (
            <SidebarItem style={{fontWeight:"bold",color:'red'}}
              key={`${sidebarItem.name}${index}`}
              depthStep={depthStep}
              depth={depth}
              {...sidebarItem}
            />
          ))}
        </List>
        <hr></hr>
          <p style={{paddingLeft:"15px"}}>RATE</p>
          <List disablePadding dense>
            <ListItem button>
                <ListItemIcon>
                    <StarRateIcon style={{color:'orange'}} />
                    <StarRateIcon style={{color:'orange'}}/>
                    <StarRateIcon style={{color:'orange'}}/>
                    <StarRateIcon style={{color:'orange'}}/>
                    <StarRateIcon style={{color:'orange'}}/>
                </ListItemIcon>
                <ListItemText primary="(From 5 Stars)" />
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <StarRateIcon style={{color:'orange'}} />
                    <StarRateIcon style={{color:'orange'}}/>
                    <StarRateIcon style={{color:'orange'}}/>
                    <StarRateIcon style={{color:'orange'}}/>
                    <StarRateIcon />
                </ListItemIcon>
                <ListItemText primary="(From 4 Stars)" />
            </ListItem>


            <ListItem button>
                <ListItemIcon>
                    <StarRateIcon style={{color:'orange'}} />
                    <StarRateIcon style={{color:'orange'}}/>
                    <StarRateIcon style={{color:'orange'}}/>
                    <StarRateIcon />
                    <StarRateIcon />
                </ListItemIcon>
                <ListItemText primary="(From 3 Stars)" />
            </ListItem>
          </List>
            <hr></hr>
            <p style={{paddingLeft:"15px"}}>PRICE</p>
            <p style={{paddingLeft:"15px",color:'gray'}}>select range:</p>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="price" variant="outlined" type='number'  size="small"  /> _
                <TextField id="price" variant="outlined" type='number'  size="small" />

                <button style={{marginTop:'20px'}} type="submit" >OK</button>
            </form>
         </div>
         <hr></hr>
         <p style={{paddingLeft:"15px"}}>BRAND</p>
        <List style={{size:'small',color:'grey'}}>
        {item.map((sidebarBrandItem, index) => (
            <ListItem button>
                <ListItemText primary = {sidebarBrandItem.label}/>
            </ListItem>
            ))}
        </List>
        <hr></hr>
         <p style={{paddingLeft:"15px"}}>PROVIDER</p>
        <List style={{size:'small',color:'grey'}}>
        {item.map((sidebarBrandItem, index) => (
            <ListItem button>
                <ListItemText primary = {sidebarBrandItem.label}/>
            </ListItem>
            ))}
        </List>
    </div>
    )
  }

  export default Sidebar
