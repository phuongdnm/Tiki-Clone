import React, {useEffect, useState} from 'react'
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import {makeStyles} from "@material-ui/core/styles";
import HomeIcon from '@material-ui/icons/Home';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import HistoryIcon from '@material-ui/icons/History';
import MoreIcon from '@material-ui/icons/MoreVert';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';


import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import tikiNotFound from '../../../image/tiki-not-found-pgae.png'
import Tooltip from "@material-ui/core/Tooltip";


const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#ff9100',
        borderColor: '#ff9100',
        "&:focus": {
            outline: "none"
        },
        color: 'rgba(0,0,0,0.8)',

        fontSize: '0.7em',
        margin: 0,
        marginLeft: '1em',
        marginRight: '0.5em',
        marginTop: '2em',
        marginBottom: '1em'
    },
    input: {
        height: '1em !important'
    },
    title: {
        fontSize: '1.1em',
        fontWeight: 400,
        marginBottom: '0.3em',
        color: 'rgba(0,0,0,0.8)',
    },
    grid: {
        padding: '0',
        marginTop: '0.5em',
        marginBottom: '0.5em',
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.14)",
    },
    grid2: {
        padding: '2em',
        marginTop: '0.6em',
        marginBottom: '0.5em',
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.14)",
    },
    removeLinkStyles: {
        textDecoration: 'none !important'
    },
    tab: {
        marginRight: 0,
        marginLeft: 0,
        paddingRight: 0,
        paddingLeft: 0,
        width: '1em !important',
        minWidth: '13% !important',
        "&:focus": {
            outline: 'none !important'
        }
    },
    iconButtonPercent: {
        "&:focus": {
            outline: 'none !important'
        }
    },
    tab2: {
        minWidth: '5% !important',
        // height: '80% !important',
        marginLeft: '40%',
        color: 'rgba(0,0,0,0.8)',
        "&:focus": {
            outline: 'none !important'
        },

        padding: '0 !important'
    },
    icon: {
        fontSize: '1.5em',
        "&:focus": {
            outline: 'none !important'
        }
    },
    "@global .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded": {
        top: '45% !important',
        left: '70% !important'
    },
    "@global .MuiButton-containedSecondary:hover": {
        border: "1px solid #ff9100",
        backgroundColor: "rgba(255, 145, 0, 0)"
    },
    "@global .MuiTabs-indicator":{
        backgroundColor: '#29b6f6 !important'
    },
    "@global .MuiTab-textColorPrimary.Mui-selected":{
        color: '#29b6f6 !important'
    }

}));

function TabPanel(props) {
    const {children, value, index, empty, ...other} = props;
    const classes = userStyles();

    return (
        <>
            {empty ?
                <Typography
                    className={classes.grid2}
                    component="div"
                    role="tabpanel"
                    hidden={value !== index}
                    id={`wrapped-tabpanel-${index}`}
                    aria-labelledby={`wrapped-tab-${index}`}
                    {...other}
                >
                    <section style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        flexDirection: 'column'
                    }}>
                        <img src={tikiNotFound} alt=""/><br/>
                        <p>You have no notifications</p>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}

                        >
                            Continue shopping
                        </Button>
                    </section>

                </Typography>
                :
                <Typography
                    className={classes.grid2}
                    component="div"
                    role="tabpanel"
                    hidden={value !== index}
                    id={`wrapped-tabpanel-${index}`}
                    aria-labelledby={`wrapped-tab-${index}`}
                    {...other}
                >
                    {value === index && <Box p={3}>{children}</Box>}
                </Typography>
            }
        </>

    );
}

function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const MyNotice = (props) => {
    const classes = userStyles();
    const [tabValue, setTabValue] = useState('one');
    const [menu, setMenu] = useState(false);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };


    return (
        <div style={{width: '80%'}}>
            <div>
                <div className={classes.title}>Account Information</div>

                <Tabs
                    className={classes.grid}
                    style={{paddingRight: 0}}
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >

                    <Tab icon={
                        <Tooltip title="Home" aria-label="home">
                            <IconButton className={classes.icon}>
                                <HomeIcon/>
                            </IconButton>
                        </Tooltip>} className={classes.tab} value="one" {...a11yProps('one')}/>
                    <Tab icon={
                        <Tooltip title="Promotion" aria-label="Promotion">
                            <IconButton style={{fontSize: '1.2em'}} className={classes.iconButtonPercent}>
                                <Icon className="fas fa-percent" style={{fontSize: '1.2em'}}/>
                            </IconButton>
                        </Tooltip>} className={classes.tab} value="two" {...a11yProps('two')}/>
                    <Tab icon={
                        <Tooltip title="Order" aria-label="Order">
                            <IconButton className={classes.icon}>
                                <LocalShippingIcon/>
                            </IconButton>
                        </Tooltip>} className={classes.tab} value="three" {...a11yProps('three')}/>
                    <Tab icon={
                        <Tooltip title="Update" aria-label="Update">
                            <IconButton className={classes.icon}>
                                <HistoryIcon/>
                            </IconButton>
                        </Tooltip>} className={classes.tab} value="four" {...a11yProps('four')}/>
                    {/*<Tab icon={*/}
                    <IconButton
                        aria-label="show more"
                        aria-haspopup="true"
                        onClick={() => setMenu(true)}
                        color="inherit"
                        className={classes.tab2}
                    >
                        <MoreIcon/>
                    </IconButton>
                    {/*className={classes.tab2} value="five" {...a11yProps("five")}/>*/}

                    <Menu
                        // style={{top: '20%', left: '20%'}}
                        open={menu}
                        onClose={() => setMenu(false)}
                    >
                        <MenuItem>
                            <p>Mark all as read</p>
                        </MenuItem>
                        <MenuItem>
                            <p>Clear Notifications</p>
                        </MenuItem>
                    </Menu>
                </Tabs>

                <TabPanel value={tabValue} index="one" empty={true}>
                    Item One
                </TabPanel>
                <TabPanel value={tabValue} index="two" empty={true}>
                    Item Two
                </TabPanel>
                <TabPanel value={tabValue} index="three" empty={true}>
                    Item Three
                </TabPanel>
                <TabPanel value={tabValue} index="four" empty={true}>
                    Item Four
                </TabPanel>


            </div>
        </div>
    )
};

export default MyNotice
