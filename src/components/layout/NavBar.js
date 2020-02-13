import React, {useState} from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from "classnames";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";


import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import Icon from '@material-ui/core/Icon';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import FacebookIcon from '@material-ui/icons/Facebook';


import tikiLogo from '../../image/tikiNavbarLogo.png'
import navImage from '../../image/navImage.png'
import tikiAssistant from '../../image/tiki_assistant.png'
import sprite from '../../image/sprite.png'
import tikiNow from '../../image/tiki-now.png'
import ticketBox from '../../image/ticketBox.png'
import zaloLogo from '../../image/Logo_Zalo.png'
import tikiGraphicMap from '../../image/tiki-graphic-map.png'

import userStyles from '../../styles/NavbarStyles'
import {loadCSS} from 'fg-loadcss';

// import for modal
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
// import for modal formcontrol
import Login from '../user/Login'
import SignUp from '../user/SignUp'
// import for modal tab
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

function NavBar() {
    const classes = userStyles();
    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, []);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [productModal, setProductModal] = useState(false);
    const [isLoginTip, setIsLoginTip] = useState(false);
    const isLoggedIn = false;


    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    // function to open and close modal
    const [open, setOpen] = React.useState(false)

    const handleOnClick=()=>{
        setOpen(true)
    }
    const handleCloseModal = ()=>{
        setOpen(false)
    }
    //  modal when clicking to login or signup button
    const useStyles = makeStyles(theme => ({
        modal: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        paper: {
          backgroundColor: 'rgb(248, 248, 248)',
          border: 'none',
          borderRadius: 6,
          boxShadow: theme.shadows[5],
          width: "50%"
        },
        destab: {
            display: "flex",
            flexDirection: "row", 
            width: "100%",
            position: "auto"
        },
        tabSection: {
            position: "relative", 
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper
        },
        descriptionSection: {
            position: "relative",
            backgroundColor: theme.palette.background.paper,
            marginRight: "2%",
            width: `25%`,
            padding: '45px 30px'
        }
      }));
    
    const modalClasses = useStyles()

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to={"/orders"} onClick={e => e.stopPropagation()} className={classes.removeDefaultLink}>
                    <IconButton aria-label="track orders" color="inherit" className={classes.iconNav}>
                        <Icon className={"fas fa-shipping-fast"}
                              style={{fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
                    </IconButton>
                </Link>
                <p>Track Order</p>

            </MenuItem>
            <MenuItem>

                <IconButton aria-label="Notification" color="inherit" className={classes.iconNav}>
                    <Icon className={"fas fa-bell"}
                          style={{fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleOnClick}>
                <IconButton aria-label="Log In" color="inherit" className={classes.iconNav}>
                    <Icon className={"fas fa-user"}
                          style={{paddingTop: "0.05em"}}/>
                </IconButton>
                <p>Login</p>
            </MenuItem>
        </Menu>
    );

    // modal tab(between login and signup)
    const TabPanel = (props)=>{
        const {children, value, index, ...other} = props
        return(
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`wrapped-tabpanel-${index}`}
                {...other}
            >
                {value === index && <Box p={2}>{children}</Box>}
            </Typography>
        )
    }

    TabPanel.prototype={
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired
    }

    const a11yProps = (index)=>{
        return{
            id: `wrapped-tab-${index}`,
            'aria-controls': `wrapped-tabpanel-${index}`
        }
    }

    const [value, setValue] = React.useState('one')
    console.log("value: ", value, "setValue: ", setValue)

    const handleChangeTab = (event, newValue)=>{
        setValue(newValue)
    }

    const modalTabSection = (
        <div className={modalClasses.tabSection}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChangeTab} aria-label="wrapped label tabs example">
                    <Tab value="one" label="Sign Up" wrapped {...a11yProps('one')}/>
                    <Tab value="two" label="Log in" {...a11yProps('two')} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
                <Login/>
            </TabPanel>
            <TabPanel value={value} index="two">
                <SignUp/>
            </TabPanel>
        </div>
    )

    const descriptionSection = (
        <div className={modalClasses.descriptionSection}>
            <div className="description-section">
                <TabPanel value={value} index="one">
                    <h2>Sign up</h2>
                    <p>Signing up to track your orders, save your favorite products, get many interesting news</p>
                </TabPanel>
                <TabPanel value={value} index="two">
                    Hello from tab two
                </TabPanel>
            </div>
            <div className="image-section">
                <img src={tikiGraphicMap} alt="tiki-graphic-map"/>
            </div>
            
        </div>
    )
    
    // modal with text description and tab 
    const modalWithDesTab = (
        <div className={modalClasses.destab}>
            {descriptionSection},{modalTabSection}
        </div>
    )
// finish code for: modal
    const authLinks = isLoggedIn ? (
        <section  className={classNames({[classes.loginToolTip]: isLoginTip})}
                  onMouseLeave={()=>{setIsLoginTip(false)}}
                  style={{width: "18em", height:"17em",  textAlign: "center", padding: "1.2em",backgroundColor: "rgba(255,255,255,0.8)", margin: 0, display: "None"}} >
            <Button
                variant="contained"
                size={"small"}
                style={{backgroundColor: "#FDDE54"}}
                startIcon={<PersonAddDisabledIcon />}
            >
                Logout
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{backgroundColor: "#FDDE54"}}
                startIcon={<PersonIcon />}
            >
                My account
            </Button>
            <Button
                size={"small"}
                variant="contained"
                className={classes.button}
                style={{ color: "black"}}
            >
                Product to buy later
            </Button>
            <Button
                size={"small"}
                variant="contained"
                className={classes.button}
                style={{ color: "black"}}
            >
                Review product purchased
            </Button>
            <Button
                size={"small"}

                variant="contained"
                style={{ color: "black"}}
            >
                My comment
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{color: "black"}}
            >
                Easy exchange an returns
            </Button>
        </section>

    ):(
        <section  className={classNames({[classes.loginToolTip]: isLoginTip})}
                  onMouseLeave={()=>{setIsLoginTip(false)}}
                  style={{width: "18em", height:"17em",  textAlign: "center", padding: "1.2em",backgroundColor: "rgba(255,255,255,0.8)", margin: 0, display: "None"}} >
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={modalClasses.modal}
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={modalClasses.paper}>
                    {modalWithDesTab}
                </div>
                </Fade>
            </Modal>
            <Button
                variant="contained"
                size={"small"}
                style={{backgroundColor: "#FDDE54"}}
                startIcon={<PersonIcon/>}
                value="one"
                onClick={handleOnClick}
            >
                Login
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{backgroundColor: "#FDDE54"}}
                startIcon={<PersonAddIcon />}
                value="two"
                onClick={handleOnClick}
            >
                Create Account
            </Button>
            <Button
                size={"small"}
                variant="contained"
                className={classes.button}
                style={{backgroundColor: "#4267B2", color: "white"}}
                startIcon={<FacebookIcon/>}
            >
                Login with Facebook
            </Button>
            <Button
                size={"small"}

                variant="contained"
                style={{backgroundColor: "#DC4F42", color: "white"}}
                startIcon={<Icon className={"fab fa-google"}/>}
            >
                Sign in with Google
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{backgroundColor: "#0180CE", color: "white"}}
                startIcon={<img src={zaloLogo} alt="zalo" style={{width: "1em"}}/>}
            >
                Login with Zalo
            </Button>
        </section>
    );

    const NavSection1=   <Toolbar className={classNames(classes.toolbar, classes.sectionDesktop)}
                                  style={{paddingLeft: 0, paddingRight: 0, marginTop: "-0.1em", height: "1.8em"}}>
        <img src={navImage} alt="image" style={{height: "100%", width: "100%"}}/>
    </Toolbar>;
    const NavSection2 = <Toolbar className={classNames(classes.toolbar, classes.sectionDesktop)} style={{
        padding: 0,
        backgroundColor: "#1D71AB",
        minHeight: "1.6em",
        height: "1.6em",
        marginTop: "-0.1em",
        justifyContent: "space-around",
        paddingRight: "4em",
        paddingLeft: "4em"
    }}>
        <Typography className={classes.title} variant="subtitle2" noWrap>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <img src={ticketBox} alt="ticketBox" style={{height: "50%", width: "50%"}}/>
            </IconButton>
            ticketBox
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <img src={tikiAssistant} alt="tikiAssistant" style={{height: "50%", width: "50%"}}/>
            </IconButton>
            Assistant Tiki
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-219px -317px",
                    width: "18px",
                    height: "18px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>
            partner Incentives
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-40px -365px",
                    width: "16px",
                    height: "20px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>
            Hotel reservations
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-35px -317px",
                    width: "20px",
                    height: "20px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>

            Ticket Booking
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap>
            <IconButton aria-label="where do you want to shop to?" style={{padding: 0}}>
                <WhatshotIcon style={{color: "F2D33B"}}/>
            </IconButton>
            Hot Promotion
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-304px -261px",
                    width: "20px",
                    height: "20px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>
            International goods
        </Typography>
        <Typography className={classes.title} variant="subtitle2" noWrap>
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <i style={{
                    backgroundImage: `url(${sprite}?v=100000000)`,
                    backgroundPosition: "-333px -228px",
                    width: "18px",
                    height: "19px",
                    marginRight: "0.1em"
                }}/>
            </IconButton>
            Sales with Tiki
            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                <Icon className={"fas fa-angle-down"}
                      style={{fontSize: 14, width: "1.5em"}}/>
            </IconButton>
        </Typography>
    </Toolbar>;
    const NavSection3 =  <Toolbar className={classes.toolbar} style={{backgroundColor: "#189EFF"}} onMouseEnter={() => {
        setProductModal(false)
    }}>
        <Typography className={classes.title} variant="h6" noWrap>
            TIKI
        </Typography>
        <img src={tikiLogo} alt={"logo"} className={classes.tikiLogo}/>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </div>
        <div className={classes.sectionDesktop2}>

            <IconButton aria-label="track orders" color="inherit" className={classes.iconNav}>
                <Icon className={"fas fa-shipping-fast"}
                      style={{fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
            </IconButton>
            <Typography>
                <Link to={"/orders"} onClick={e => e.stopPropagation()}
                      className={classes.removeDefaultLink}>

                    <span style={{width: "0.2em"}} className={classes.navText}>Track </span>

                    <Typography className={classes.navTypo}>
                        <span className={classes.navText}> orders</span>

                    </Typography>
                </Link>

            </Typography>
            <IconButton aria-label="Notification" color="inherit" className={classes.iconNav}>
                <Icon className={"fas fa-bell"}
                      style={{fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
            </IconButton>
            <Typography>
                <span className={classes.navText}>Your </span>

                <Typography className={classes.navTypo}>
                    <span className={classes.navText}> notification</span>

                </Typography>

            </Typography>
            <IconButton aria-label="Log In" color="inherit" className={classes.iconNav} onMouseEnter={()=>{setIsLoginTip(true)}}>
                <Icon className={"fas fa-user"}
                      style={{paddingTop: "0.05em"}}/>
            </IconButton>

            <Typography >
                <Link to={"#"} onMouseEnter={()=>{setIsLoginTip(true)}} className={classes.removeDefaultLink} >

                    <span className={classes.navText}>Login </span>

                    <Typography className={classes.navTypo}>
                        <span className={classes.navText}> account</span>

                    </Typography>
                </Link>

            </Typography>
            {authLinks}

            <Link to={"/cart"} onClick={e => e.stopPropagation()} className={classes.removeDefaultLink}>

                <Typography style={{marginTop: "0.8em"}} className={classes.navText2}>
                    <Badge badgeContent={4} color="error" className={classes.iconNav2}>
                        <ShoppingCartIcon/>
                    </Badge>
                    Cart
                </Typography>
            </Link>



        </div>
        <div className={classes.sectionMobile}>
            <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
                <MoreIcon/>
            </IconButton>
        </div>
    </Toolbar>;
    const NavSection4 =  <Toolbar className={classNames(classes.toolbar, classes.sectionDesktop) }
                                  onMouseEnter={()=>{setIsLoginTip(false)}}
                                  style={{backgroundColor: "#189EFF"}}>
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
        >
            <MenuIcon/>
        </IconButton>
        <Typography className={classes.title2} variant="h11" noWrap>
            PRODUCT CATEGORY
        </Typography>
        <section style={{
            display: "flex",
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: "80%",
            alignItems: "center"
        }}>
            <Typography className={classes.title2} variant="h11" noWrap>
                <IconButton aria-label="where do you want to shop to?" color="inherit"
                            style={{paddingRight: 0}}>
                    <Icon className={"fas fa-map-marker-alt"}
                          style={{fontSize: 20, width: "1.5em"}}/>
                </IconButton>
                Where do you want to shop to?
            </Typography>
            <Typography className={classes.title2} variant="h11" noWrap onMouseEnter={() => {
                setProductModal(true)
            }}>
                <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                    <Icon className={"fas fa-angle-down"}
                          style={{fontSize: 20, width: "1.5em"}}/>
                </IconButton>
                Products you have viewed
                <div className={classNames(classes.customModal, {[classes.productModal]: productModal})}
                     style={{display: "none"}}>
                    <div className={classes.customSubModal} onMouseLeave={() => {
                        setProductModal(false)
                    }}>
                        <br/><br/><br/>You have not viewed any products. <br/> keep exploring tiki, the
                        product you viewed will show up here!
                    </div>
                </div>
            </Typography>
            <section style={{alignItems: "center", flexDirection: 'row', display: 'flex'}}>
                <IconButton aria-label="where do you want to shop to?" color="inherit"
                            style={{padding: 0, marginRight: "0.53em"}}>
                    <img src={tikiNow} alt="tikiNow" style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "white",
                        padding: "0.28em",
                        borderRadius: "30%",
                    }}/>
                </IconButton>
                <Typography className={classes.title2} variant="h11" noWrap>

                    TIKInow fast delivery Hundreds <br/>of thousands of products
                </Typography>
            </section>
            <section style={{alignItems: "center", flexDirection: 'row', display: 'flex'}}>

                <IconButton aria-label="All products are 100% genuine" color="inherit"
                            style={{padding: "0.3em"}}>
                    <Icon className={"fas fa-medal"}
                          style={{fontSize: 20, width: "1.5em", color: "#F2D33B"}}/>
                </IconButton>
                <Typography className={classes.title2} variant="h11" noWrap>

                    All products are <br/>100% genuine
                </Typography>
            </section>
            <section style={{alignItems: "center", flexDirection: 'row', display: 'flex'}}>

                <IconButton aria-label="All products are 100% genuine" color="inherit"
                            style={{padding: "0.3em"}}>
                    <Icon className={"fas fa-box-open"}
                          style={{fontSize: 20, width: "1.5em", color: "#F2D33B"}}/>
                </IconButton>
                <Typography className={classes.title2} variant="h11" noWrap>
                    30 days exchange<br/> easily
                </Typography>
            </section>
        </section>

    </Toolbar>;


    return (
        <div className={classes.grow}>
            <AppBar position="static">
                {NavSection1}
                {NavSection2}
                {NavSection3}
                {NavSection4}
            </AppBar>
            {renderMobileMenu}
        </div>
    );
}

export default NavBar


