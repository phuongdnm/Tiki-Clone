import React, { useState} from 'react'
import {UserCard} from 'react-ui-cards'
import userStyles from "../styles/AllUsersStyles";
import Moment from 'react-moment';
import Moment2 from 'moment';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardIcon from "../Card/CardIcon";
import CardFooter from "../Card/CardFooter";
import {Accessibility, AccessTime, Update} from "@material-ui/icons";
import CardAvatar from "../Card/CardAvatar";
import CardBody from "../Card/CardBody";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReactLoading from 'react-loading';
import UserStats from "../Stats/UserStats";



const AllUsers = (props) => {
    const classes = userStyles();

    const allUsers = useSelector(state => state.users.users);  // all users
    const [users_, setUsers_] = useState(null); // to update users that are rendered
    const [firstLoad, setFirstLoad] = useState(true);
    const sellers = allUsers !== null ? allUsers.filter(user => user.role === "seller") : [];
    const admins = allUsers !== null ? allUsers.filter(user => user.role === "admin") : [];
    const usersOnly = allUsers !== null ? allUsers.filter(user => user.role === "user") : [];   // all user with user role
    const [isLoading, setIsLoading] = useState(false);

    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [showUserCard, setShowUserCard] = useState(false);

    const [usersLastUpdated, setUsersLastUpdated] = useState(Date.now());
    const [sellersLastUpdated, setSellersLastUpdated] = useState(Date.now());
    const [adminsLastUpdated, setAdminsLastUpdated] = useState(Date.now());
    const [usersOnlyLastUpdated, setUsersOnlyLastUpdated] = useState(Date.now());

    if(firstLoad){
        // users wouldn't have been set so we use settimeout
        allUsers!== null && setTimeout(()=>{setUsers_(allUsers); setFirstLoad(false)}, 750);
    }
    const pickRandBackground = () => {
        let bgs = ['https://i.imgur.com/w5tX1Pn.jpg', 'https://i.imgur.com/uDYejhJ.jpg', "https://images.unsplash.com/photo-1505015390928-f9e55218544f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80", "https://images.unsplash.com/photo-1507984211203-76701d7bb120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80", "https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"];
        return bgs[Math.floor(Math.random() * bgs.length)]
    };
    const handleFilter = (filter) => {
        setIsLoading(true);
        switch (filter) {
            case "totalUsers":
                setUsers_(allUsers.length > 0 ? allUsers : []);
                setUsersLastUpdated(Date.now());
                setIsLoading(false);
                return null;
            case "users":
                setUsers_(usersOnly.length > 0 ? usersOnly : []);
                setUsersOnlyLastUpdated(Date.now());
                setIsLoading(false);
                return null;
            case "sellers":
                setUsers_(sellers.length > 0 ? sellers : []);
                setSellersLastUpdated(Date.now());
                setIsLoading(false);
                return null;
            case "admins":
                setUsers_(admins.length > 0 ? admins : []);
                setAdminsLastUpdated(Date.now());
                setIsLoading(false);
                return null;
            default:
                return null
        }
    };
    const UserCardFull = () => {
        return(
        allUsers !== null && currentUserProfile !== null ?
        // setCurrentUserProfile(allUsers.find(user => user._id === currentUserId));
        <Card profile style={{height: "100%", backgroundColor: "rgba(213, 213, 213, 0.1)"}}>
            <CardAvatar profile>
                <a href="#" onClick={e => e.preventDefault()}>
                    <img src={pickRandBackground()} alt="..."/>
                </a>
            </CardAvatar>
            <CardBody profile>
                <h6 className={classes.cardCategory}>{currentUserProfile !== null && currentUserProfile.role}</h6>
                <h4 className={classes.cardTitle}>{currentUserProfile !== null && currentUserProfile.name}</h4>
                <div style={{textAlign: 'left'}}>
                <p className={classes.cardText}><b>Email</b>: {currentUserProfile !== null && currentUserProfile.email}
                </p>
                <p className={classes.cardText}>
                    <b>Gender</b>: {currentUserProfile !== null && currentUserProfile.gender}</p>
                <p className={classes.cardText}><b>Sold</b>: 0 products</p>
                <p className={classes.cardText}><b>Bought</b>: 0 products</p>
                <p className={classes.cardText}><b>Age</b>: {currentUserProfile !== null && currentUserProfile.age}</p>
                <p style={{marginTop: '1em'}}>Account created
                    on {Moment2(currentUserProfile !== null && currentUserProfile.createdAt).format('MMMM DD, YYYY')}
                </p>
                </div>
            </CardBody>
        </Card>: null
        )
    };
    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} >
                <Grid item xs={10} md={12} >
                    <UserStats/>
                </Grid>
                <Grid item xs={6} md={4} lg={3} className={classes.card} onClick={() => handleFilter("totalUsers")}>
                    <Card>
                        <CardHeader color="warning" stats icon>
                            <CardIcon color="warning">
                                <Accessibility/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Total Users</p>
                            <h3 className={classes.cardTitle}>{allUsers !== null && allUsers.length}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update/>
                                <Moment fromNow style={{textTransform: "capitalize"}}>{usersLastUpdated}</Moment>
                            </div>
                        </CardFooter>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={3} className={classes.card} onClick={() => handleFilter("users")}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <PersonIcon/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Users</p>
                            <h3 className={classes.cardTitle}>{usersOnly.length}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update/>
                                <Moment fromNow style={{textTransform: "capitalize"}}>{usersOnlyLastUpdated}</Moment>
                            </div>
                        </CardFooter>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={3} className={classes.card} onClick={() => handleFilter("sellers")}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <PersonIcon/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Sellers</p>
                            <h3 className={classes.cardTitle}>{sellers.length}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <AccessTime/>
                                <Moment fromNow style={{textTransform: "capitalize"}}>{sellersLastUpdated}</Moment>
                            </div>
                        </CardFooter>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={3} className={classes.card} onClick={() => handleFilter("admins")}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <LockIcon/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Admins</p>
                            <h3 className={classes.cardTitle}>{admins.length}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                <Update/>
                                <Moment fromNow style={{textTransform: "capitalize"}}>{adminsLastUpdated}</Moment>
                            </div>
                        </CardFooter>
                    </Card>
                </Grid>

            </Grid>
            <Grid container>
                {users_ !== null && users_.length > 0 && !showUserCard ?
                    users_.map((user, index) => (
                        <Grid item xs={6} md={4} lg={3} style={{margin: 0}} key={index}>
                            <UserCard
                                style={{paddingBottom: '1em'}}
                                onClick={() => {
                                    setShowUserCard(val => !val);
                                    setCurrentUserProfile(user)
                                }}
                                float
                                avatar={pickRandBackground()}
                                name={user.name}
                                positionName={user.email}
                                stats={[
                                    {
                                        name: 'Gender',
                                        value: user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                                    },
                                    {
                                        name: 'Role',
                                        value: user.role.charAt(0).toUpperCase() + user.role.slice(1)
                                    },
                                    {
                                        name: 'Age',
                                        value: user.age
                                    }
                                ]}
                            />
                        </Grid>
                    )) : null
                }
                {showUserCard &&
                <Fab aria-label="add" style={{marginTop: '3em', marginLeft: '5em'}}
                     onClick={() => setShowUserCard(val => !val)}>
                    <ArrowBackIcon/>
                </Fab>
                }
                {users_ !== null && users_.length > 0 && showUserCard ?
                    <Grid item xs={10} md={6} lg={4} style={{margin: "2em", marginLeft: '16vw'}}>
                        <UserCardFull/>
                    </Grid> : null
                }
                {
                    (users_ === null || isLoading )&&
                    <ReactLoading type={"balls"} color={"#189EFF"} width={'10%'} height={'10%'} className={classes.loading3}/>
                }
            </Grid>
        </div>

    )
};

export default AllUsers
