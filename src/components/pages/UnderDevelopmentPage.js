import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import cityCloud from "../../image/cityCloud.png";
import superImg from "../../image/super.png";
import error404 from "../../image/404.png";
import gear from "../../image/gear.png";
import IconButton from "@material-ui/core/IconButton";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";


const userStyles = makeStyles(() => ({
    title: {
        fontSize: '1.2em',
        fontWeight: 400,
        marginBottom: '0.5em',
    },
    grid:{
        paddingLeft: "4%",
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
    }

}));



const UnderDevelopmentPage = (props) =>{
    const classes = userStyles();

    return (
        <div className={classes.root}>
            <NavBar {...props}/>
            <section style={{height: "80%", width: "100%"}}>
                <div style={{backgroundColor: "#3fc6f5", height: "50vh"}}>
                    <div>
                        <img src={cityCloud} alt={"city cloud"} style={{width: "100%", paddingTop: "7.9%"}}/>
                    </div>
                </div>
                <div style={{backgroundColor:"#fdba13",height: "25vh"}}>
                    <img src={superImg} alt={"superImg"} style={{position: "absolute", top: '60%', left: '15%'}}/>
                    <section style={{marginLeft: "30%", paddingTop: '1em'}}>
                        {props.status === "404" ?
                        <>
                        <img src={error404} alt={"err404"}/>
                        <div style={{fontWeight: 800, fontSize: '2.2em', color: "white", display: 'inline', marginLeft: "3em"}}>
                            Sorry, the page you are looking for does not exist!
                        </div></>:
                            <>
                                <img src={gear} alt={"gear"} style={{width: "10%", position: "absolute", top: '80%', left: '35%'}}/>
                                <div style={{fontWeight: "bold", fontSize: '2.2em', color: "white", position: "absolute", top: '85%', left: '50%'}}>
                                    Sorry, this page is under development!
                                </div></>
                        }
                    </section>
                </div>
            </section>
            <Footer/>
        </div>
    )
};

export default UnderDevelopmentPage
