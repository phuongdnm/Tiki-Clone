import React, {useEffect, useState} from 'react'
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";


import tikiNotFound from '../../../image/tiki-not-found-pgae.png'
import tikiXu from '../../../image/tiki-xu.svg'
import bookCare from '../../../image/bookcare2.png'
import Grid from "@material-ui/core/Grid";


const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#ff9100',
        borderColor: '#ff9100',
        color: 'white',
        "&:focus": {
            outline: "none",
        },
        "&:hover": {
            color: 'rgba(0,0,0,0.8)',
        },
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
    '@global .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottom: '2px solid rgb(153, 153, 153) !important'
    },
    '@global .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd:focus': {
        outline: 'none !important'
    },
    '@global .MuiInput-underline:after': {
        borderBottom: '2px solid #29b6f6 !important'
    },
    '@global label.Mui-focused': {
        color: '#29b6f6 !important',
    },
}));


const MyBookCare = (props) => {
    const classes = userStyles();


    return (
        <div style={{width: '80%'}}>
            <div className={classes.title}>Manage my BookCare</div>
            <div className={classes.grid} style={{textAlign: 'center', padding: '0.5em'}}>
                <section style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img src={bookCare} alt=""/>
                    <p style={{color: '#41D67E', fontSize: '3.5em', marginLeft: '0.2em', fontWeight: 'bold'}}>0</p>
                </section>
                <p>You have <span style={{color: '#41D67E', fontWeight: 'bold'}}>0</span> BookCare in your account</p>
            </div>

            <div className={classes.title} style={{marginTop: '1em'}}>Transaction History</div>
            <Grid container className={classes.grid} style={{padding: '1.5em'}}>
                <Grid item xs={3} style={{textAlign: 'center'}}>
                    BookCare
                </Grid>
                <Grid item xs={3} style={{textAlign: 'center'}}>
                    Order
                </Grid>
                <Grid item xs={3} style={{textAlign: 'center'}}>
                    Time
                </Grid>
                <Grid item xs={3} style={{textAlign: 'center'}}>
                    Content
                </Grid>
            </Grid>


        </div>
    )
};

export default MyBookCare
