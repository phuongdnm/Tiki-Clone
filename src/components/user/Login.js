import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import PersonIcon from "@material-ui/icons/Person";
import FacebookIcon from "@material-ui/icons/Facebook";
import zaloLogo from "../../image/Logo_Zalo.png";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/authActions";
import { message } from "antd";

const userStyles = makeStyles(() => ({
  groupButton: {
    display: "flex !important",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    marginTop: "15px"
  }
}));

const Login = props => {
  const classes = userStyles();
  const dispatch = useDispatch();

  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailInputChange = e => {
    setEmailState(e.target.value);
  };

  const handlePasswordInputChange = e => {
    setPasswordState(e.target.value);
  };

  const handleSubmit = async e => {
    setLoading(true);
    const msg = message.loading("Logging in user!", 0);

    const text = { email, password };
    console.log(text);

    await dispatch(
        authActions.loginUser(text, props.history, props.closeModal)
    );
    setTimeout(msg, 1);
    setLoading(false);
  };
  const form1 = (
      <div style={{width: "100%", borderRadius: '4px'}}>
        <FormGroup onSubmit={handleSubmit} fullWidth="true">
          <FormControl margin="normal" >
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
                id="my-input"
                aria-describedby="my-helper-text"
                name="email"
                onChange={handleEmailInputChange}
            />
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input
                id="my-input2"
                type="password"
                aria-describedby="my-helper-text"
                name="password"
                onChange={handlePasswordInputChange}
            />
          </FormControl>
          <Button
              variant="contained"
              size={"small"}
              style={{ backgroundColor: "#FDDE54" }}
              startIcon={<PersonIcon />}
              className={classes.button}
              onClick={handleSubmit}
              disabled={loading}
          >
            Login
          </Button>
        </FormGroup>
      </div>
  );
  const form2 = (
      <div>
        <FormGroup onSubmit={handleSubmit}>
          <FormControl margin="normal">
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input
                id="my-input"
                aria-describedby="my-helper-text"
                name="email"
                onChange={handleEmailInputChange}
            />
            {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
          </FormControl>
          <FormControl margin="normal">
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input
                id="my-input2"
                type="password"
                aria-describedby="my-helper-text"
                name="password"
                onChange={handlePasswordInputChange}
            />
          </FormControl>
          <div className={classes.groupButton}>
            <Button
                variant="contained"
                size={"small"}
                style={{ backgroundColor: "#FDDE54", height: "3em" }}
                startIcon={<PersonIcon />}
                className={classes.button}
                onClick={handleSubmit}
                disabled={loading}
            >
              Login
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{ backgroundColor: "#4267B2", color: "white", height: "3em" }}
                startIcon={<FacebookIcon />}
                className={classes.button}
            >
              Login with Facebook
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{ backgroundColor: "#DC4F42", color: "white", height: "3em" }}
                startIcon={<Icon className={"fab fa-google"} />}
                className={classes.button}
            >
              Login with Google
            </Button>
            <Button
                size={"small"}
                variant="contained"
                style={{ backgroundColor: "#0180CE", color: "white", height: "3em" }}
                startIcon={
                  <img src={zaloLogo} alt="zalo" style={{ width: "1em" }} />
                }
                className={classes.button}
            >
              Login with Zalo
            </Button>
          </div>
        </FormGroup>
      </div>
  );

  const handleForm = (type)=>{
    switch(type){
      case "default ":
        return form2;
      case "checkout":
        return form1;
      default:
        return form2
    }
  };
  return (
      <>
        {handleForm(props.type)}
      </>
  )
};

export default Login;
