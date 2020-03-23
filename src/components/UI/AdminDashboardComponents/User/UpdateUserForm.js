import React, {useEffect, useState} from 'react'

import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader";
import CardBody from "../Card/CardBody";
import Button from '../CustomButtons/Button'
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {message} from "antd";
import * as userActions from "../../../../store/actions/userActions";


const userStyles = makeStyles(() => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    "@global button:focus":{
        outline: "none !important"
    },
    '@global label.Mui-focused': {
        color: '#189EFF !important',
    },
    '@global .MuiRadio-colorSecondary.Mui-checked': {
        color: '#189EFF !important'
    },
    '@global .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl.MuiInputBase-adornedEnd:focus': {
        outline: 'none !important'
    },
    '@global .MuiInput-underline:after': {
        borderBottom: '2px solid #189EFF !important'
    },
    '@global .MuiButtonBase-root.MuiIconButton-root': {
        outline: 'none !important'
    },
    '@global .MuiPickersDay-daySelected': {
        backgroundColor: '#189EFF!important'
    },
    '@global .MuiCheckbox-colorSecondary.Mui-checked': {
        color: '#189EFF !important'
    }

}));

const UpdateUserForm = (props) => {
    const classes = userStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [phone, setPhone] = useState(props.user.phone);
    const [address, setAddress] = useState(props.user.address);
    const [newPassword, setNewPassword] = useState(props.user.password);
    const [retypePassword, setRetypePassword] = useState(props.user.password);
    const [selectedDate, setSelectedDate] = useState(props.user.dob);


    const [gender, setGender] = useState(props.user.gender);
    const [role, setRole] = useState(props.user.role);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) =>
            newPassword === retypePassword
        );
    }, [retypePassword, newPassword]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        const msg = message.loading("Updating user!", 0);
        let user;
        if(checked){
            user = {newName: name, newPassword: newPassword, newRole: role, newGender: gender, newPhone: phone, newAddress: address, newDob: selectedDate };
        }else{
            console.log(`heree`);
            user = {newName: name, newRole: role, newGender: gender, newPhone: phone, newAddress: address, newDob: selectedDate };
        }
        await dispatch(userActions.updateUserById(user, props.user._id));

        props.setShowUserCard(val => !val);
        setTimeout(msg, 1);
        setIsLoading(false)
    };

    return (
        <div style={{width: '100%'}}>
            <Grid container style={{marginTop: '0.7em', marginLeft: '0.5em'}} spacing={3} >
                <Grid item xs={12} sm={12} md={12}>
                    <Card style={{marginLeft: '3vw'}}>
                        <CardHeader color="tiki">
                            <h4 className={classes.cardTitleWhite}>Update User</h4>
                            <p className={classes.cardCategoryWhite}>Update a user's profile</p>
                        </CardHeader>
                        <CardBody>
                            <ValidatorForm onSubmit={handleSubmit} >
                                <FormGroup>
                                    <FormControl>
                                        <TextValidator
                                            size="small"
                                            label="Full Name"
                                            style={{margin: 8}}
                                            placeholder="User's full name"
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
                                            size="small"
                                            label="Email"
                                            style={{margin: 8}}
                                            placeholder="Email"
                                            disabled
                                            type={'email'}
                                            value={email}
                                            // onChange={(e) => setEmail(e.target.value)}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            validators={["required", "isEmail"]}
                                            errorMessages={["Enter an email", "Enter a valid email address"]}
                                        />

                                    </FormControl>
                                    <FormControl>
                                        <TextValidator
                                            size="small"
                                            label="Phone"
                                            style={{margin: 8}}
                                            placeholder="Phone Number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            validators={["required"]}
                                            errorMessages={["Enter user's you phone number"]}
                                        />

                                    </FormControl>
                                    <FormControl>
                                        <TextValidator
                                            size="small"
                                            label="Address"
                                            style={{margin: 8}}
                                            placeholder="User's Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="standard"
                                            validators={["required"]}
                                            errorMessages={["Enter user's address"]}
                                        />

                                    </FormControl>
                                    <FormControl style={{marginLeft: '0.6em', marginTop: '0.5em'}}>
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup aria-label="gender" name="gender1" value={gender}
                                                    onChange={(e) => setGender(e.target.value)} row>
                                            <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                                            <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                                        </RadioGroup>
                                        <FormLabel component="legend">Role</FormLabel>
                                        <RadioGroup aria-label="role" name="role1" value={role}
                                                    onChange={(e) => setRole(e.target.value)} row>
                                            <FormControlLabel value="user" control={<Radio/>} label="User"/>
                                            <FormControlLabel value="seller" control={<Radio/>} label="Seller"/>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl style={{marginLeft: '0.8em', marginRight: '0.5em'}}>
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
                                            style={{color: "rgb(153, 153, 153)", marginLeft: '0.1em'}}
                                            control={
                                                <Checkbox
                                                    style={{width: "2em"}}
                                                    checked={checked}
                                                    onChange={() => setChecked(val => !val)}
                                                    value="primary"
                                                    inputProps={{'aria-label': 'primary checkbox'}}
                                                />
                                            }
                                            label="Change user's password"

                                        />
                                    </FormControl>
                                    {checked &&
                                    <FormControl>
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
                                            validators={["required"]}
                                            errorMessages={["Enter your new password"]}
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

                                    <Button color="tiki" type={'submit'} style={{marginTop: '1em'}} disabled={isLoading}>
                                        Update user
                                    </Button>
                                </FormGroup>
                            </ValidatorForm>
                        </CardBody>
                    </Card>
                </Grid>

            </Grid>
        </div>

    )
};

export default UpdateUserForm
