import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
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
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

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
    marginTop: "8px"
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

const SignUp = () => {
  const classes = useStyles();
  // date time select function
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [gender, setGender] = React.useState('female')
  const [selectedDate, setSelectedDate] = React.useState(new Date("2014-08-18T21:11:54"));

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
  const handleSubmit = () => {
    const text = {name, phone, address, email, password, gender, selectedDate}
    const textJson = JSON.stringify(text)
    console.log("text json: ", textJson)
  };
  return (
    <div>
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="my-input">Name</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            name="name"
            onChange={handleChangeInputName}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="my-input">Phone</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            fullWidth="true"
            required="true"
            name="phone"
            onChange={handleChangeInputPhone}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="my-input">Address</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            fullWidth="true"
            required="true"
            name="address"
            onChange={handleChangeInputAddress}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            fullWidth="true"
            name="email"
            onChange={handleChangeInputEmail}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="my-input">Password</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            fullWidth="true"
            required="true"
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
      >
        Signup
      </Button>
    </div>
  );
};

export default SignUp;
