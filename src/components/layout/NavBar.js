import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Icon from '@material-ui/core/Icon';


import tikiLogo from '../../image/tikiNavbarLogo.png'
import navImage from '../../image/navImage.png'
import tikiAssistant from '../../image/tiki_assistant.png'
import sprite from '../../image/sprite.png'
import tikiNow from '../../image/tiki-now.png'
import ticketBox from '../../image/ticketBox.png'


import userStyles from '../../styles/NavbarStyles'
import {loadCSS} from 'fg-loadcss';




function NavBar() {
    const classes = userStyles();
    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, []);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = event => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

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
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}
                         style={{paddingLeft: 0, paddingRight: 0, marginTop: "-0.1em", height: "1.8em"}}>
                    <img src={navImage} alt="image" style={{height: "100%", width: "100%"}}/>
                </Toolbar>
                <Toolbar className={classes.toolbar} style={{
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
                </Toolbar>
                <Toolbar className={classes.toolbar} style={{backgroundColor: "#189EFF"}}>
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
                    <div className={classes.sectionDesktop}>

                        <IconButton aria-label="track orders" color="inherit" className={classes.iconNav}>
                            <Icon className={"fas fa-shipping-fast"}
                                  style={{float: "left", fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
                        </IconButton>
                        <Typography>
                            <span style={{width: "0.2em"}} className={classes.navText}>Track </span>

                            <Typography className={classes.navTypo}>
                                <span className={classes.navText}> orders</span>

                            </Typography>

                        </Typography>
                        <IconButton aria-label="Notification" color="inherit" className={classes.iconNav}>
                            <Icon className={"fas fa-bell"}
                                  style={{float: "left", fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
                        </IconButton>
                        <Typography>
                            <span className={classes.navText}>Your </span>

                            <Typography className={classes.navTypo}>
                                <span className={classes.navText}> notification</span>

                            </Typography>

                        </Typography>
                        <IconButton aria-label="Log In" color="inherit" className={classes.iconNav}>
                            <Icon className={"fas fa-user"}
                                  style={{float: "left", fontSize: 20, paddingTop: "0.05em", width: "1.5em"}}/>
                        </IconButton>
                        <Typography>
                            <span className={classes.navText}>Login </span>

                            <Typography className={classes.navTypo}>
                                <span className={classes.navText}> account</span>

                            </Typography>

                        </Typography>
                        <Typography style={{marginTop: "0.8em"}} className={classes.navText2}>
                            <Badge badgeContent={4} color="error" className={classes.iconNav2}>
                                <ShoppingCartIcon/>
                            </Badge>
                            Cart
                        </Typography>


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
                </Toolbar>
                <Toolbar className={classes.toolbar} style={{backgroundColor: "#189EFF"}}>
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
                        <Typography className={classes.title2} variant="h11" noWrap>
                            <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0}}>
                                <Icon className={"fas fa-angle-down"}
                                      style={{fontSize: 20, width: "1.5em"}}/>
                            </IconButton>
                            Products you have viewed
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

                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}

export default NavBar


