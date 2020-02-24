import React, {useEffect, useState} from 'react'
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import {makeStyles} from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {KeyboardDatePicker} from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import zaloLogo from '../../../image/Logo_Zalo.png'
import Icon from "@material-ui/core/Icon";
import FacebookIcon from "@material-ui/icons/Facebook";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {Link} from "react-router-dom";


const userStyles = makeStyles(() => ({
    button: {
        color: '#ff9100',
        borderColor: '#ff9100',
        "&:focus": {
            outline: "none"
        }
    },
    input: {
        height: '1em !important'
    },
    title: {
        fontSize: '1.1em',
        fontWeight: 400,
        marginBottom: '0.3em',
    },
    grid: {
        padding: '2em',
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
    },
    removeLinkStyles:{
      textDecoration: 'none !important'
    },
    "@global .MuiButton-outlinedSecondary:hover": {
        border: "1px solid #ff9100",
        backgroundColor: "rgba(255, 145, 0, 0)"
    },
    '@global .MuiOutlinedInput-root fieldset': {
        borderColor: 'rgb(153, 153, 153)',
    },
    '@global .Mui-focused fieldset': {
        borderColor: '#29b6f6 !important',
    },
    '@global label.Mui-focused': {
        color: '#29b6f6 !important',
    },
    '@global .MuiRadio-colorSecondary.Mui-checked': {
        color: '#29b6f6 !important'
    },
    '@global .MuiRadio-colorSecondary.Mui-checked:hover ': {
        backgroundColor: 'rgba(41,182,246, 0.04) !important'
    },
    '@global .MuiIconButton-colorSecondary:hover': {
        backgroundColor: 'rgba(41,182,246, 0.04) !important'
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
    '@global .MuiButtonBase-root.MuiIconButton-root': {
        outline: 'none !important'
    },
    '@global .MuiPickersDay-daySelected': {
        backgroundColor: '#29b6f6 !important'
    },
    '@global .MuiCheckbox-colorSecondary.Mui-checked': {
        color: '#29b6f6 !important'
    }

}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#29b6f6',
        },
    },
});

const AccountInformation = (props) => {
    const classes = userStyles();
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));


    const [radio, setRadio] = useState('male');
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) =>
            newPassword === retypePassword
        );
    }, [retypePassword, newPassword]);

    const handleSubmit = () => {

    };


    return (
        <div style={{width: '80%'}}>
            <div>
                <div className={classes.title}>Account Information</div>

                <ValidatorForm onSubmit={handleSubmit} className={classes.grid}>
                    <FormGroup>
                        <FormControl>

                            <TextValidator
                                id="outlined-full-width"
                                size="small"
                                label="Full Name"
                                style={{margin: 8}}
                                placeholder="Your full name"
                                value={name}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setName(e.target.value)}
                                variant="standard"
                                validators={["required"]}
                                errorMessages={["Enter Your Full Name"]}
                            />
                        </FormControl>
                        <FormControl>
                            <TextValidator
                                // size="small"
                                label="Phone Number"
                                style={{margin: 8}}
                                placeholder="Phone No."
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                margin="normal"
                                type={'tel'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                className={classes.button}
                                                style={{fontSize: '0.7em', margin: 0,marginBottom: '1em'}}
                                                onClick={() => {
                                                }}
                                            >
                                                Send Verification Code
                                            </Button>
                                        </InputAdornment>
                                }}
                                variant="standard"
                                validators={["required"]}
                                errorMessages={["Enter your phone number"]}
                            />

                        </FormControl>
                        <FormControl>
                            <TextValidator
                                size="small"

                                id="outlined-full-width"
                                label="Verification code"
                                style={{margin: 8}}
                                placeholder="Enter the verification code sent to the number above"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                validators={["required"]}
                                errorMessages={["Enter Your Verification code"]}
                            />

                        </FormControl>
                        <FormControl>
                            <TextValidator
                                size="small"

                                id="outlined-full-width"
                                label="Email"
                                style={{margin: 8}}
                                placeholder="Email"
                                type={'email'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                validators={["required", "isEmail"]}
                                errorMessages={["Enter an email", "Enter a valid email address"]}
                            />

                        </FormControl>
                        <FormControl style={{marginLeft: '1em', marginTop: '0.5em'}}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={radio}
                                        onChange={(e) => setRadio(e.target.value)} row>
                                <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                            </RadioGroup>
                        </FormControl>
                        <FormControl style={{marginLeft: '1em', marginRight: '0.5em'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    size="small"
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label="Date of birth"
                                    value={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                        <FormControl>
                            <FormControlLabel
                                style={{color: "rgb(153, 153, 153)", marginLeft: '0.35em'}}
                                control={
                                    <Checkbox
                                        style={{width: "2em"}}
                                        checked={checked}
                                        onChange={() => setChecked(val => !val)}
                                        value="primary"
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                    />
                                }
                                label="Change the password"

                            />

                        </FormControl>
                        {checked &&
                        <FormControl>
                            <TextValidator
                                size="small"
                                label="Old Password"
                                style={{margin: 8}}
                                placeholder="Enter the old password"
                                margin="normal"
                                value={oldPassword}
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setOldPassword(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                validators={["required"]}
                                errorMessages={["Enter your old password"]}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(val => !val)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                            />
                            < TextValidator
                                size="small"
                                label="New Password"
                                style={{margin: 8}}
                                placeholder="Password from 6 to 32 characters"
                                maxLength={6}
                                minLength={32}
                                value={newPassword}
                                margin="normal"
                                type={showPassword ? 'text' : 'password'}
                                onChange={(e) => setNewPassword(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                validators={["required", "isPasswordMatch"]}
                                errorMessages={["Enter your new password", "Password does not match"]}
                                variant="standard"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(val => !val)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                            />
                            <TextValidator
                                size="small"
                                label="Retype"
                                style={{margin: 8}}
                                placeholder="Enter a new password"
                                maxLength={6}
                                minLength={32}
                                value={retypePassword}
                                margin="normal"
                                onChange={(e) => setRetypePassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="standard"
                                validators={["required", "isPasswordMatch"]}
                                errorMessages={["Retype you new password", "Password does not match"]}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(val => !val)}
                                            onMouseDown={(e) => e.preventDefault()}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }}
                            />

                        </FormControl>
                        }

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
                            Update
                        </Button>
                    </FormGroup>
                </ValidatorForm>
            </div>
            <div style={{marginTop: '2em'}}>
                <div className={classes.title}>Link Social Network accounts</div>

                <div className={classes.grid}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <section>
                            <img src={zaloLogo} alt="Zalo" style={{display: "inline-block", width: '2em', marginRight: '2.4em'}}/>
                            <span  style={{fontWeight: 600, display: "inline-block"}}>Zalo</span>
                        </section>
                        <p><Link to={"#"} className={classes.removeLinkStyles}>Link</Link> </p>
                    </div>
                    <hr/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <section>
                            <FacebookIcon style={{marginRight: '1em', color: '#4267B2', fontSize: 35}}/>
                            <span  style={{fontWeight: 600, display: "inline-block"}}>Facebook</span>
                        </section>
                        <p><Link to={"#"} className={classes.removeLinkStyles}>Link</Link> </p>
                    </div>
                    <hr/>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <section style={{display: 'flex', alignItems: 'center'}}>
                            <Icon className={"fab fa-google"} style={{marginRight: '1.2em', color: '#DC4F42', fontSize: 30, marginLeft: '0.1em'}}/>
                            <span  style={{fontWeight: 600, display: "inline-block"}}>Google</span>
                            <VerifiedUserIcon style={{width: '2em', color: '#26BC4E'}}/>
                        </section>
                        <p><Link to={"#"} className={classes.removeLinkStyles}>Already Linked </Link> </p>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default AccountInformation
