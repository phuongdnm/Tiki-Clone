import React from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TikiLogo from "../../image/sprite.png";
import Grid from "@material-ui/core/Grid";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

import FacebookIcon from "@material-ui/icons/Facebook";
import zaloLogo from "../../image/Logo_Zalo.png";
import Icon from "@material-ui/core/Icon";
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import hotline from "../../image/hotline.png";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import zaloPay from "../../image/icon-zalopay.svg";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  iconLogoBlue: {
    backgroundImage: `url(${TikiLogo}?v=100000000)`,
    backgroundPosition: "0px 0px",
    width: "90px",
    height: "60px"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabsContainer: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "auto"
  },
  bill: {
    backgroundColor: theme.palette.background.paper,
    height: "auto"
  }
}));

// login ui
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any,
  value: PropTypes.any
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const Bill = () => {
  const classes = useStyles();
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartTotalAmountDiscounted = useSelector(
    state => state.cart.totalAmount_discounted
  );
  const cartItems = useSelector(state => {
    // transform the object of object to array of object
    const transformedCartItems = [];
    for (let key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        discountedPrice: state.cart.items[key].discountedPrice,
        product: state.cart.items[key].product,
        quantity: state.cart.items[key].quantity,
        sum_discounted: state.cart.items[key].sum_discounted,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const itemList = cartItems.map((item, index) => {
    return (
      <div style={{ borderBottom: "1px solid lightgrey" }}>
        <p style={{ fontSize: "0.9em", margin: 0 }}>
          <span style={{ fontWeight: 600 }}>{item.quantity}</span>
          <span style={{ fontWeight: 600 }}> x </span>
          <span>
            <a href="#">{item.product.name}</a>
          </span>
        </p>
        <p style={{ fontSize: "0.8em" }}>
          Sold by <strong>{item.product.shop.name}</strong>
        </p>
      </div>
    );
  });
  return (
    <div
      className={classes.bill}
      style={{ padding: "5%", borderRadius: "4px" }}
    >
      <div
        className="title"
        style={{ borderBottom: "1px solid lightgrey", margin: "2%" }}
      >
        <p>
          Bill<span> ({cartItems.length} product(s))</span>
          <span>
            <Button
              variant="outlined"
              size="small"
              style={{ position: "relative", float: "right" }}
            >
              Change
            </Button>
          </span>
        </p>
      </div>
      {itemList}
      <div style={{ paddingBottom: "1em" }}>
        <span style={{ fontWeight: 600 }}>Total fee:</span>
        <div
          className="amount"
          style={{
            float: "right",
            display: "flex",
            flexDirection: "column",
            textAlign: "right"
          }}
        >
          {cartTotalAmountDiscounted !== null &&
          !isNaN(cartTotalAmountDiscounted) &&
          cartTotalAmountDiscounted > 0 ? (
            <>
              <strong
                style={{
                  fontSize: "22px",
                  color: "red",
                  float: "right"
                }}
              >
                {numberWithCommas(cartTotalAmountDiscounted.toFixed(2))}
              </strong>
              <small>(Included VAT)</small>
            </>
          ) : (
            <>
              <strong
                style={{
                  fontSize: "22px",
                  color: "red",
                  float: "right"
                }}
              >
                {numberWithCommas(cartTotalAmount.toFixed(2))}
              </strong>
              <small>(Included VAT)</small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const LoginUI = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div
        className="payment-with"
        style={{ textAlign: "center", padding: "0 10%", marginBottom: "2%" }}
      >
        <p>Pay orders with only one step with:</p>
        <div className="login-with-group-button">
          <Button
            size={"small"}
            variant="contained"
            className={classes.button}
            style={{
              backgroundColor: "#4267B2",
              color: "white",
              marginRight: "2%"
            }}
            startIcon={<FacebookIcon />}
          >
            Login with Facebook
          </Button>
          <span>or</span>
          <Button
            size={"small"}
            variant="contained"
            style={{
              backgroundColor: "#DC4F42",
              color: "white",
              margin: "0 2%"
            }}
            startIcon={<Icon className={"fab fa-google"} />}
          >
            Sign in with Google
          </Button>
          <span>or</span>
          <Button
            size={"small"}
            variant="contained"
            style={{
              backgroundColor: "#0180CE",
              color: "white",
              marginLeft: "2%"
            }}
            startIcon={
              <img src={zaloLogo} alt="zalo" style={{ width: "1em" }} />
            }
          >
            Login with Zalo
          </Button>
        </div>
      </div>
      <div className="login-form">
        <Grid container spacing={2}>
          <Grid item xl={8}>
            <div className={classes.tabsContainer}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                indicatorColor="secondary"
                className={classes.tabs}
                TabIndicatorProps={{
                  style: { left: 0, backgroundColor: "#4267B2" }
                }}
              >
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Signup" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <Login type="checkout" />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <SignUp />
              </TabPanel>
            </div>
          </Grid>
          <Grid item xl={4}>
            <Bill />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

// address ui
const UserAddress = () => {};
const AddressUI = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [city, setCity] = React.useState('')
  const [district, setDistrict] = React.useState('')
  const [text, setText] = React.useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  };
  const handleCity = event=>{
    setCity(event.target.value)
  }
  const handleDistrict = event=>{
    setDistrict(event.target.value)
  }
  const handleText = event=>{
    setText(event.target.value)
  }

  const handleSubmit = () => {
    const userAddress = {name, phone, city, district, text}
    const addressJson = JSON.stringify(userAddress)
  };
  return (
    <div
      style={{
        padding: "0% 15% 1% 15%",
        border: "0.1em dashed lightgreen",
        backgroundColor: "white"
      }}
    >
      <Grid container>
        <Grid item xl={12}>
          <div>
            <FormGroup onSubmit={handleSubmit} fullWidth="true">
              <FormControl margin="normal">
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  name="name"
                  onChange={handleNameChange}
                />
                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
              </FormControl>
              <FormControl margin="normal">
                <InputLabel htmlFor="my-input">Phone number</InputLabel>
                <Input
                  id="my-input2"
                  aria-describedby="my-helper-text"
                  name="phone"
                  onChange={handlePhoneChange}
                />
              </FormControl>
              <FormControl margin="normal">
                <InputLabel htmlFor="my-input">City</InputLabel>
                <Input
                  id="my-input2"
                  aria-describedby="my-helper-text"
                  name="city"
                  onChange={handlePhoneChange}
                />
              </FormControl>
              <FormControl margin="normal">
                <InputLabel htmlFor="my-input">District</InputLabel>
                <Input
                  id="my-input2"
                  aria-describedby="my-helper-text"
                  name="district"
                  onChange={handlePhoneChange}
                />
              </FormControl>
              <TextareaAutosize
                aria-label="minimum height"
                rowsMin={3}
                placeholder="22 Jump Street"
              />
            </FormGroup>
            <div
              style={{ marginTop: "2%", position: "relative", float: "right" }}
            >
              <Button
                variant="contained"
                color="default"
                size={"small"}
                style={{ marginRight: "30px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                size={"small"}
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
              >
                Update
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

// payment method uix
const PaymentMethodUI = () => {
  const classes = useStyles();
  const [shipping, setShipping] = React.useState("standard");
  const [payXu, setPayXu] = React.useState(false);
  const [payment, setPayment] = React.useState("cash");
  console.log("1st shipping: ", shipping);
  console.log("1st payxu: ", payXu);

  const handleShipping = event => {
    setShipping(event.target.value);
  };

  const handlePayxu = event => {
    setPayXu(event.target.value);
  };

  const handlePayment = event => {
    setPayment(event.target.value);
  };

  const handleSubmit = ()=>{
    const options = {shipping, payXu, payment}
    const optionsJson = JSON.stringify(options)
  }
  return (
    <div className="payment-method">
      <Grid container spacing={2}>
        <Grid item xl={8}>
          <div className="shipping-method-section">
            <p style={{ fontWeight: 600 }}>1. Choose the shipping method</p>
            <FormControl component="fieldset" fullWidth="true">
              <div
                style={{
                  backgroundColor: "white",
                  border: "0.75px solid light grey",
                  borderRadius: "4px",
                  width: "100%",
                  padding: "2% 10% 2% 0",
                  fontSize: "0.85em"
                }}
              >
                <Grid
                  container
                  xl={12}
                  spacing={2}
                  style={{ marginBottom: "1%" }}
                >
                  <Grid item>
                    <Radio
                      checked={shipping === "standard"}
                      onChange={handleShipping}
                      value="standard"
                      name="radio-button-demo"
                    />
                  </Grid>
                  <Grid item>
                    <p style={{ color: "#26bc4e", margin: 0 }}>
                      Shipping on Thursday, 26/03
                    </p>
                    <span style={{ color: "lightgrey" }}>19.000d</span>
                    <span>Standard shipping</span>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xl={12}
                  spacing={2}
                  style={{ marginBottom: "1%" }}
                >
                  <Grid item>
                    <Radio
                      checked={shipping === "fast"}
                      onChange={handleShipping}
                      value="fast"
                      name="radio-button-demo"
                    />
                  </Grid>
                  <Grid item>
                    <p style={{ color: "#26bc4e", margin: 0 }}>
                      Shipping on Thursday, 26/03
                    </p>
                    <span style={{ color: "lightgrey" }}>19.000d</span>
                    <span>Standard shipping</span>
                  </Grid>
                </Grid>
              </div>
            </FormControl>
          </div>

          <div className="payment-with-Tiki-xu" style={{ marginTop: "2%" }}>
            <p style={{ fontWeight: 600 }}>2. Pay with Tiki Xu</p>
            <FormControl component="fieldset" fullWidth="true">
              <div
                style={{
                  backgroundColor: "white",
                  border: "0.75px solid light grey",
                  borderRadius: "4px",
                  width: "100%",
                  padding: "2% 10% 2% 0",
                  fontSize: "0.85em"
                }}
              >
                <Grid
                  container
                  xl={12}
                  spacing={2}
                  style={{ marginBottom: "1%" }}
                >
                  <Grid item>
                    <Radio
                      checked={payXu === true}
                      onChange={handlePayxu}
                      value={true}
                      name="radio-button-demo"
                    />
                  </Grid>
                  <Grid item>
                    <p style={{ color: "#26bc4e", margin: 0 }}>
                      Shipping on Thursday, 26/03
                    </p>
                    <span style={{ color: "lightgrey" }}>19.000d</span>
                    <span>Standard shipping</span>
                  </Grid>
                </Grid>
              </div>
            </FormControl>
          </div>

          <div className="payment-method" style={{ marginTop: "2%" }}>
            <p style={{ fontWeight: 600 }}>3. Payment method</p>
            <FormControl component="fieldset" fullWidth="true">
              <div
                style={{
                  backgroundColor: "white",
                  border: "0.75px solid light grey",
                  borderRadius: "4px",
                  width: "100%",
                  padding: "2% 10% 2% 0",
                  fontSize: "0.85em"
                }}
              >
                <Grid
                  container
                  xl={12}
                  spacing={2}
                  style={{ marginBottom: "1%" }}
                >
                  <Grid item>
                    <Radio
                      checked={payment === "cash"}
                      onChange={handlePayment}
                      value="cash"
                      name="radio-button-demo"
                    />
                  </Grid>
                  <Grid item>
                    <p>Pay with cash when receiving a product</p>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xl={12}
                  spacing={2}
                  style={{ marginBottom: "1%" }}
                >
                  <Grid item>
                    <Radio
                      checked={payment === "inter-card"}
                      onChange={handlePayment}
                      value="inter-card"
                      name="radio-button-demo"
                    />
                  </Grid>
                  <Grid item>
                    <p>Pay with international cards: Visa, Master, JCB</p>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xl={12}
                  spacing={2}
                  style={{ marginBottom: "1%" }}
                >
                  <Grid item>
                    <Radio
                      checked={payment === "atm"}
                      onChange={handlePayment}
                      value="atm"
                      name="radio-button-demo"
                    />
                  </Grid>
                  <Grid item>
                    <p>Pay with internal ATM / Internet Banking</p>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xl={12}
                  spacing={2}
                  style={{ marginBottom: "1%" }}
                >
                  <Grid item>
                    <Radio
                      checked={payment === "zalopay"}
                      onChange={handlePayment}
                      value="zalopay"
                      name="radio-button-demo"
                    />
                  </Grid>
                  <Grid item xl={10}>
                    <img src={zaloPay} style={{ marginRight: "2%" }} />
                    <span>Pay with ZaloPay</span>
                    <p style={{ color: "#FFAE00" }}>
                      Please install ZaloPay app to pay
                    </p>
                  </Grid>
                </Grid>
                <Grid
                  container
                  xl={12}
                  spacing={2}
                  style={{ marginBottom: "1%" }}
                >
                  <Grid item>
                    <Radio
                      checked={payment === "sacombank"}
                      onChange={handlePayment}
                      value="sacombank"
                      name="radio-button-demo"
                      disabled
                    />
                  </Grid>
                  <Grid item xl={10}>
                    <span
                      style={{
                        backgroundColor: "lightgrey",
                        color: "white",
                        borderRadius: "4px",
                        padding: "0.5%",
                        width: "fit-content",
                        marginRight: "2%"
                      }}
                    >
                      Sale
                    </span>
                    <span style={{ color: "lightgrey" }}>
                      Sacombank card discounts 150.000d for order of 1m and
                      above
                    </span>
                    <p style={{ color: "#FFAE00" }}>
                      The time for joining the program or the numbers of
                      products has expired.
                    </p>
                  </Grid>
                </Grid>
              </div>
            </FormControl>
          </div>
        
          <Button variant="contained" color="secondary" size="big" style={{marginTop: '2%'}}>Order</Button>
        </Grid>
        <Grid item xl={4}>
          <div style={{ marginTop: "11%" }}>
            <Bill />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

function bodyTemplate(index) {
  switch (index) {
    case 0:
      return (
        <div>
          <p style={{ fontWeight: 600 }}>1. New user/Login</p>
          <LoginUI />
        </div>
      );

    case 1:
      return (
        <div>
          <p style={{ fontWeight: 600 }}>2. Address</p>
          <AddressUI />
        </div>
      );
    case 2:
      return <PaymentMethodUI />;

    default:
      return (
        <div>
          <h5>Some title</h5>
        </div>
      );
  }
}
function getSteps() {
  return ["Log in", "Address", "Payment & orders"];
}

const Checkout = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div className={classes.root}>
      <div
        className="progress-header"
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid grey",
          padding: "0 20%"
        }}
      >
        <Grid container>
          <Grid item xl={1}>
            <IconButton
              aria-label="where do you want to shop to?"
              color="inherit"
              style={{ padding: "auto 0px", paddingLeft: "0" }}
            >
              <i className={classes.iconLogoBlue} />
            </IconButton>
          </Grid>
          <Grid item xl={9}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(step => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item xl={2} style={{ padding: "2% 0" }}>
            <img
              src={hotline}
              style={{ position: "relative", float: "left" }}
            />
          </Grid>
        </Grid>
      </div>

      <div
        className="progress-body"
        style={{ padding: "1% 20% 20% 20%", backgroundColor: "#f4f4f4" }}
      >
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {bodyTemplate(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
