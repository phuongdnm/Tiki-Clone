import React from 'react'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import IP1 from '../image/IP1.jpg'
import IP2 from '../image/IP2.jpg'
import IP3 from '../image/IP3.png'
import IP4 from '../image/IP4.png'
import IP5 from '../image/IP5.png'
import IP6 from '../image/IP6.png'
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const userStyles = makeStyles(() => ({
    "@global .BrainhubCarousel__arrows": {
        backgroundColor: '#189EFF',
    },
    "@global .BrainhubCarousel__arrows:hover:enabled": {
        backgroundColor: '#189EFF'
    },
    image: {
        backgroundColor: 'white',
        padding: '1em',
        paddingRight: '1.9em',
        paddingLeft: '1.9em',
        borderRadius: '5px',
        "&:hover": {
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
            cursor: 'pointer'
        },
    },
    removeLinkStyle: {
        textDecoration: "none !important",
        color: "inherit !important",
    },

}));

const InterestedProducts = (props) => {
    const classes = userStyles();

    return (
        <div style={{marginLeft: '2em', marginRight: '2em', marginTop: '2em'}}>
            <div style={{fontSize: '1.1em', fontWeight: 400, marginBottom: '0.3em', marginLeft: '2.5em'}}>INTERESTED
                PRODUCTS
            </div>
            <Carousel
                slidesPerPage={6}
                slidesPerScroll={6}
                arrows
                infinite

            >
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img src={IP1} alt={"interested products"} style={{width: "8vw"}}/>
                        <div style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Voucher - Services
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img src={IP2} alt={"interested products"} style={{width: "8vw"}}/>
                        <div style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Voucher - Services
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img src={IP3} alt={"interested products"} style={{width: "8vw"}}/>
                        <div style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Voucher - Services
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img src={IP4} alt={"interested products"} style={{width: "8vw"}}/>
                        <div style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Voucher - Services
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img src={IP5} alt={"interested products"} style={{width: "8vw"}}/>
                        <div style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Voucher - Services
                        </div>
                    </Link>
                </div>
                <div className={classes.image}>
                    <Link to={"#"} className={classes.removeLinkStyle}>
                        <img src={IP6} alt={"interested products"} style={{width: "8vw"}}/>
                        <div style={{fontSize: '0.8em', marginTop: '0.5em', textAlign: 'center'}}>Voucher - Services
                        </div>
                    </Link>
                </div>

            </Carousel>
        </div>
    )
};

export default InterestedProducts
