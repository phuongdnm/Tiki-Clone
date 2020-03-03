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
import tikiNow from '../../../image/tiki-now.png'
import exclusive1 from '../../../image/exclusiveDeal1.png'
import exclusive2 from '../../../image/exclusiveDeal2.png'
import Tooltip from "@material-ui/core/Tooltip";


const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#FF424E !important',
        borderColor: '#FF424E !important',
        "&:focus": {
            outline: "none",
        },
        color: 'white',

        fontSize: '0.7em',
        margin: 0,
        marginLeft: '1em',
        marginRight: '0.5em',
        // marginTop: '1em',
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
        fontSize: '0.8em',
        // width: '1em !important',
        // minWidth: '13% !important',
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
                        <img src={exclusive2} alt="ex"/><br/>
                        <p>You are not registered with TikiNOW</p>
                    </section>

                </Typography>
                :
                <Typography
                    component="div"
                    role="tabpanel"
                    hidden={value !== index}
                    id={`wrapped-tabpanel-${index}`}
                    aria-labelledby={`wrapped-tab-${index}`}
                    {...other}
                >
                    {value === index && <>{children}</>}
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

const InformationTikiNow = (props) => {
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

                    <Tab label={"My TikiNow"} className={classes.tab} value="one" {...a11yProps('one')} />
                    <Tab label={"TikiNow package purchase history"} className={classes.tab} value="two" {...a11yProps('two')}/>
                    <Tab  label={"Orders using TikiNow"} className={classes.tab} value="three" {...a11yProps('three')}/>
                </Tabs>

                <TabPanel value={tabValue} index="one">
                        <div className={classes.grid} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1em'}}>
                            <img src={tikiNow} alt=""/>
                            <p  style={{marginTop: "1em"}}>Your account has not been activated</p>
                            <Button
                                variant="contained"
                                type={'submit'}
                                color="secondary"
                                className={classes.button}

                            >
                               Register only 499,000 VND / 1 year
                            </Button>
                        </div>
                    <div className={classes.title}>Exclusive TikiNOW deals</div>
                    <div className={classes.grid} style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '2em'}}>
                           <section >
                               <img src={exclusive1} alt="exclusive1" width={"50%"}/>
                               <p style={{fontSize: '0.8em'}}><b>Free shipping<br/>
                                   Delivery in just a few hours <br/></b>
                                   Shopping on the same time with delivery <br/>within a few hours at: <b>HCMC - Hanoi - Can <br/> Tho - Da Nang - Nha Trang - Hai Phong</b> <br/>with hundreds of thousands of symbols products
                                   <br/><img src={tikiNow} alt="" style={{display: 'inline-block'}}/>
                               </p>

                           </section>
                        <section>
                            <img src={exclusive2} alt="exclusive2" width={"50%"}/>
                            <p style={{fontSize: '0.8em'}}> <b>30 days exchange free return</b> <br/>
                                As a TikiNOW member, you will receive <br/> special policies of up to 30 days free <br/> exchange for Tiki Trading products.
                            </p>
                        </section>
                        </div>
                </TabPanel>
                <TabPanel value={tabValue} index="two" empty={true}>
                    Item Two
                </TabPanel>
                <TabPanel value={tabValue} index="three" empty={true}>
                    Item Three
                </TabPanel>


            </div>
        </div>
    )
};

export default InformationTikiNow
