import React from 'react'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const userStyles = makeStyles(() => ({
    // "@global .BrainhubCarousel": {marginLeft: '2em', marginRight: '2em', marginTop: '3em'},
    "@global .BrainhubCarousel__arrows": {
        backgroundColor: '#189EFF',
    },
    "@global .BrainhubCarousel__arrows:hover:enabled": {
        backgroundColor: '#189EFF'
    },
    image: {
        padding: '1.25em',
        paddingRight: '1em',
        paddingLeft: '1em',
        borderRadius: '5px',
        "&:hover": {
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
            cursor: 'pointer'
        },
    },
    removeLinkStyle: {
        textDecoration: "none !important",
        color: "white !important",
    },

}));

const HotKeyword = (props) => {
    const classes = userStyles();
    const pickRandColor = () => {
        let colors = ['#438B56', '#7C7568', '#AB8731', '#7B3987', '#AB5056', '#315B7B', '#317972', '#AA6F36'];
        return colors[Math.floor(Math.random() * colors.length)]
    };
    return (
        <div style={{marginLeft: '2em', marginRight: '2em', marginTop: '2em'}}>
            <div style={{fontSize: '1.1em', fontWeight: 400, marginBottom: '0.3em', marginLeft: '2.5em'}}>HOT KEYWORD
            </div>
            <Carousel
                slidesPerPage={8}
                slidesPerScroll={8}
                arrows
                infinite

            >
                <div className={classes.image} style={{backgroundColor: pickRandColor()}}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <span style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Backpack</span>
                    </Link>
                </div>
                <div className={classes.image} style={{backgroundColor: pickRandColor()}}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <span
                            style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Medical Sutures</span>
                    </Link>
                </div>
                <div className={classes.image} style={{backgroundColor: pickRandColor()}}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <span style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>3m mask</span>
                    </Link>
                </div>
                <div className={classes.image} style={{backgroundColor: pickRandColor()}}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <span style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Men's jacket</span>
                    </Link>
                </div>
                <div className={classes.image} style={{backgroundColor: pickRandColor()}}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <span style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Iphone11</span>
                    </Link>
                </div>
                <div className={classes.image} style={{backgroundColor: pickRandColor()}}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <span style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>lock and lock</span>
                    </Link>
                </div>
                <div className={classes.image} style={{backgroundColor: pickRandColor()}}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <span style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Backup charger</span>
                    </Link>
                </div>
                <div className={classes.image} style={{backgroundColor: pickRandColor()}}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <span style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Ipad</span>
                    </Link>
                </div>

            </Carousel>
        </div>
    )
};

export default HotKeyword
