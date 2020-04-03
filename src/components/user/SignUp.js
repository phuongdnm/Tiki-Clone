import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import * as authActions from '../../store/actions/authActions'
import {useDispatch} from "react-redux";
import Moment from 'moment';
import {message} from "antd";




const useStyles = makeStyles(theme => ({
  // radio style
  root: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
        "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5"
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)"
    }
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
        "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""'
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3"
    }
  },
  buttonStyle: {
    marginTop: "16px",
    marginBottom: "8px"
  }
}));

// radio function
const StyledRadio = props => {
  const classes = useStyles();
  return (
      <Radio
          className={classes.root}
          disableRipple
          color="default"
          checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
          icon={<span className={classes.icon} />}
          {...props}
      />
  );
};

const SignUp = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // date time select function
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('female');
  const [selectedDate, setSelectedDate] = useState(new Date("2014-08-18T21:11:54"));
  const [loading, setLoading] = useState(false);

  // handle change input
  const handleChangeInputName = (e) => {
    setName(e.target.value)
  };
  const handleChangeInputPhone = (e) => {
    setPhone(e.target.value)
  };
  const handleChangeInputAddress = (e) => {
    setAddress(e.target.value)
  };
  const handleChangeInputEmail = (e) => {
    setEmail(e.target.value)
  };
  const handleChangeInputPassword = (e) => {
    setPassword(e.target.value)
  };
  const handleChangeInputGender = (e) => {
    setGender(e.target.value)
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // handle change submit
  const handleSubmit = async() => {
    setLoading(true);
    const msg = message.loading("Creating a new user!", 0);
    let formatedDate = Moment(selectedDate.toDateString()).format('YYYY-MM-DD');

    const text = {name, email, password, gender, dob: formatedDate};
    await dispatch(authActions.registerUser(text, props.history, props.closeModal));
    setTimeout(msg, 1);
    setLoading(false)

    // const text = {name, phone, address, email, password, gender, selectedDate}

  };
  return (
      <div >
        <FormGroup   onKeyPress={(e)=>{
          e.charCode === 13 && handleSubmit(e)    // if enter key is pressed redirect to product category and search
        }}>
          <FormControl >
            <InputLabel htmlFor="my-input">Name</InputLabel>
            <Input
                id="my-input"
                aria-describedby="my-helper-text"
                name="name"
                value={name}
                onChange={handleChangeInputName}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="my-input2">Phone</InputLabel>
            <Input
                id="my-input2"
                aria-describedby="my-helper-text"
                name="phone"
                value={phone}
                onChange={handleChangeInputPhone}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="my-input3">Address</InputLabel>
            <Input
                id="my-input3"
                aria-describedby="my-helper-text"
                name="address"
                value={address}
                onChange={handleChangeInputAddress}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="my-input4">Email address</InputLabel>
            <Input
                id="my-input4"
                aria-describedby="my-helper-text"
                name="email"
                onChange={handleChangeInputEmail}
            />
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="my-input5">Password</InputLabel>
            <Input
                id="my-input5"
                type="password"
                aria-describedby="my-helper-text"
                name="password"
                onChange={handleChangeInputPassword}
            />
          </FormControl>

          {/* radio group */}
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
                defaultValue="female"
                aria-label="gender"
                name="customized-radios"
                row
                onChange={handleChangeInputGender}
            >
              <FormControlLabel
                  value="female"
                  control={<StyledRadio />}
                  label="Female"
              />
              <FormControlLabel
                  value="male"
                  control={<StyledRadio />}
                  label="Male"
              />
              <FormControlLabel
                  value="other"
                  control={<StyledRadio />}
                  label="Other"
              />
            </RadioGroup>
          </FormControl>
        </FormGroup>

        {/* date time select */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date of birth"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
          />
        </MuiPickersUtilsProvider>
        <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            className={classes.buttonStyle}
            onClick={handleSubmit}
            disabled={loading}
        >
          Signup
        </Button>
      </div>
  );
};

export default SignUp;
