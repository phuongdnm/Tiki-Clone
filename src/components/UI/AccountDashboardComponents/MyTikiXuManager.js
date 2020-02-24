import React, {useEffect, useState} from 'react'
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";


import tikiNotFound from '../../../image/tiki-not-found-pgae.png'
import tikiXu from '../../../image/tiki-xu.svg'
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

import tikiLogo from '../../../image/tiki_v3.svg'
import gotItLogo from '../../../image/gotit_v3.svg'
import urBoxLogo from '../../../image/urbox_v3.svg'



const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#ff9100',
        borderColor: '#ff9100',
        color: 'white',
        "&:focus": {
            outline: "none",
        },
        "&:hover":{
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


const MyTikiXuManager = (props) => {
    const classes = userStyles();
    const [supplier, setSupplier] = useState("");
    const [giftCode, setGiftCode] = useState("");
    const handleSubmit =()=>{

    };


    return (
        <div style={{width: '80%'}}>
            <div className={classes.title}>My Tiki Xu manager</div>
            <div className={classes.grid} style={{textAlign: 'center', padding: '0.5em'}}>
                <section style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img src={tikiXu} alt=""/>
                    <p style={{color: '#41D67E', fontSize: '3.5em', marginLeft: '0.2em', fontWeight: 'bold'}}>0</p>
                </section>
                <p>You have <span style={{color: '#41D67E', fontWeight: 'bold'}}>0</span> Tiki Xu in your account</p>
            </div>

            <div className={classes.title} style={{marginTop: '1em'}}>CHANGE GIFT CODE TO TIKI XU</div>
            <ValidatorForm onSubmit={handleSubmit} className={classes.grid} style={{ padding: '1.5em'}}>
                <FormGroup style={{width: '50%'}}>
                    <FormControl>
                        <TextValidator
                            size="small"
                            label="Gift Code"
                            style={{margin: 8}}
                            placeholder="Your gift code"
                            value={giftCode}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setGiftCode(e.target.value)}
                            variant="standard"
                            validators={["required"]}
                            errorMessages={["Enter your gift code"]}
                        />
                    </FormControl>
                    <FormControl>
                        <TextValidator
                            size="small"
                            select
                            label="Supplier"
                            value={supplier}
                            style={{margin: 8}}
                            onChange={(e)=>setSupplier(e.target.value)}
                            variant="standard"
                            validators={["required"]}
                            errorMessages={["Select the supplier of the gift code"]}
                        >
                                <MenuItem value={"tiki"}>
                                    <section style={{display: 'flex', alignItems: 'center'}}>
                                        <img src={tikiLogo} alt=""/>
                                        <p style={{marginLeft: '0.3em', marginBottom: 0}}>Tiki</p>
                                    </section>

                                </MenuItem>
                            <MenuItem value={"gotIt"}>
                                    <section style={{display: 'flex', alignItems: 'center'}}>
                                        <img src={gotItLogo} alt=""/>
                                        <p style={{marginLeft: '0.3em', marginBottom: 0}}>Got it</p>
                                    </section>

                                </MenuItem>
                            <MenuItem value={"urBox"}>
                                    <section style={{display: 'flex', alignItems: 'center'}}>
                                        <img src={urBoxLogo} alt=""/>
                                        <p style={{marginLeft: '0.3em', marginBottom: 0}}>Ur Box</p>
                                    </section>

                                </MenuItem>
                        </TextValidator>

                    </FormControl>

                    <Button
                        variant="outlined"
                        type={'submit'}
                        color="secondary"
                        className={classes.button}
                        style={{
                            fontSize: '0.7em',
                            margin: 0,
                            marginLeft: '1em',
                            marginRight: '0.5em',
                            marginTop: '2em'
                        }}

                    >
                        Change to Tiki Xu
                    </Button>
                </FormGroup>
            </ValidatorForm>
            <div className={classes.title} style={{marginTop: '1em'}}>ABOUT TIKI XU</div>
            <div className={classes.grid} style={{padding: '1.5em'}}>
                <p><span style={{color: '#FF9100', marginRight: '0.2em'}}>&#9673;</span>Tiki Xu is a reward system for customers <br/>
                    <span style={{marginLeft: '1em'}}>of Tiki.vn</span></p>
                <p><span style={{color: '#FF9100', marginRight: '0.2em'}}>&#9673;</span>1,000 Tiki Xu = 1,000 VND</p>
                <p><span style={{color: '#FF9100', marginRight: '0.2em'}}>&#9673;</span>Customers receive Tiki Xu when making purchases or <br/>
                    <span style={{marginLeft: '1em'}}>interacting with the Tiki.vn mobile app and website</span></p>
            </div>


        </div>
    )
};

export default MyTikiXuManager
