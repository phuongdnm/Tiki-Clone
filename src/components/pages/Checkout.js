import React from "react";
import { useState, useEffect } from "react";
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
import {useDispatch, useSelector} from "react-redux";
import * as authActions from "../../store/actions/authActions";
import { message } from "antd";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import * as addressAction from '../../store/actions/addressActions'
import * as orderAction from '../../store/actions/orderActions'
import store from '../../store'

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
              variant="text"
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
const AddressUI = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [radio, setRadio] = useState("House/Condominium");
  const [checked, setChecked] = useState(false);
  const userAddr = useSelector(state => state.user_address.location)
  React.useEffect(()=>{
    if(userAddr){
      setName(userAddr.name)
      setCompanyName(userAddr.companyName)
      setCity(userAddr.city)
      setDistrict(userAddr.district)
      setWard(userAddr.ward)
      setPhoneNo(userAddr.phoneNo)
      setAddress(userAddr.address)
    }
  },[])
  const city_ = [
    "Ho Chi Minh",
    "Hanoi",
    "Danang",
    "An Giang",
    "BA Ria Vung Tau",
    "Bac Giang",
    "Bac Kan",
    "Bac Lieu",
    "Bac Ninh",
    "Ben tre",
    "Binh Duong",
    "Binh Phuoc",
    "Binh Thuan",
    "Pacify",
    "Ca Mau",
    "Can Tho",
    "As tall as",
    "Gia Lai",
    "Ha Giang",
    "Henan",
    "Ha Tinh",
    "Hai Duong",
    "Hai Phong",
    "Hau Giang",
    "Hòa Bình",
    "hung Yen",
    "Khánh Hòa",
    "Kien Giang",
    "Kon Tum",
    "Lai Chau",
    "Lam Dong",
    "Lang Son",
    "Lao Cai",
    "Long An",
    "Nam Dinh",
    "Nghe An",
    "Ninh Binh",
    "Ninh Thuận",
    "Phu-Tho",
    "Phu Yen",
    "Quang Binh",
    "Quang Nam",
    "Quang Ngai",
    "Quang Ninh",
    "Quang Tri",
    "Soc Trang",
    "Son La",
    "Xining",
    "peaceful",
    "Thai Nguyen",
    "Thanh Hoa",
    "Hue",
    "Tien Giang",
    "Tra Vinh",
    "Tuyen Quang",
    "Vinh Long",
    "Vinh Phuc",
    "Yen Bai",
    "Dak Lak",
    "Dak Nong",
    "Dien Bien",
    "Dong Nai",
    "Dong Thap"
  ];
  const district_ = [
    "Quận Ba Đình",
    "Quận Hoàn Kiếm",
    "Quận Hai Bà Trưng",
    "Quận Đống Đa",
    "Quận Cầu Giấy",
    "Quận Long Biên",
    "Quận Hoàng Mai",
    "Huyện Sóc Sơn",
    "Quận Bắc Từ Liêm",
    "Huyện Thanh Trì",
    "Huyện Gia Lâm",
    "Huyện Ba Vì",
    "Huyện Chương Mỹ",
    "Huyện Đan Phượng",
    "Huyện Hoài Đức",
    "Huyện Mỹ Đức",
    "Huyện Phú Xuyên",
    "Huyện Phúc Thọ",
    "Huyện Quốc Oai",
    "Huyện Thạch Thất",
    "Huyện Thanh Oai",
    "Huyện Thường Tín",
    "Huyện Ứng Hòa",
    "Huyện Mê Linh",
    "Quận Hà Đông",
    "Thị xã Sơn Tây",
    "Huyện Đông Anh",
    "Quận Nam Từ Liêm",
    "Quận Thanh Xuân",
    "Quận Tây Hồ"
  ];
  const ward_ = [
    "Phường Cống Vị",
    "Phường Điện Biên",
    "Phường Đội Cấn",
    "Phường Giảng Võ",
    "Phường Kim Mã",
    "Phường Liễu Giai",
    "Phường Ngọc Hà",
    "Phường Ngọc Khánh",
    "Phường Nguyễn Trung Trực",
    "Phường Phúc Xá",
    "Phường Quán Thánh",
    "Phường Thành Công",
    "Phường Trúc Bạch",
    "Phường Vĩnh Phúc"
  ];

  const handleSubmit = ()=>{
    const UserAddress = {name, companyName, city, district, ward, phoneNo, address}
    console.log("input: ", UserAddress)
    dispatch(addressAction.setAddress(UserAddress))
  }

  return (
    <div
      style={{
        padding: "0% 15% 1% 15%",
        border: "0.1em dashed lightgreen",
        backgroundColor: "white"
      }}
    >
      <ValidatorForm onSubmit={handleSubmit}>
        <FormGroup>
          <FormControl>
            <TextValidator
              size="small"
              label="Full Name"
              style={{ margin: 8 }}
              placeholder="Your full name"
              value={name}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              onChange={e => setName(e.target.value)}
              variant="standard"
              validators={["required"]}
              errorMessages={["Enter Your Full Name"]}
            />
          </FormControl>
          <FormControl>
            <TextValidator
              id="outlined-full-width"
              size="small"
              label="Company name"
              style={{ margin: 8 }}
              placeholder="Your company name"
              value={companyName}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              onChange={e => setCompanyName(e.target.value)}
              variant="standard"
              validators={["required"]}
              errorMessages={["Enter your company name"]}
            />
          </FormControl>
          <FormControl>
            <TextValidator
              size="small"
              label="Phone Number"
              style={{ margin: 8 }}
              placeholder="Phone No."
              value={phoneNo}
              onChange={e => setPhoneNo(e.target.value)}
              margin="normal"
              type={"tel"}
              InputLabelProps={{
                shrink: true
              }}
              variant="standard"
              validators={["required"]}
              errorMessages={["Enter your phone number"]}
            />
          </FormControl>
          <FormControl>
            <TextValidator
              size="small"
              select
              label="City/Province"
              value={city}
              style={{ margin: 8 }}
              onChange={e => setCity(e.target.value)}
              // helperText="Please select your city/province"
              variant="standard"
              validators={["required"]}
              errorMessages={["Select a city"]}
            >
              {city_.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextValidator>
          </FormControl>
          <FormControl>
            <TextValidator
              size="small"
              select
              label="District"
              value={district}
              style={{ margin: 8 }}
              onChange={e => setDistrict(e.target.value)}
              // helperText="Please select your city/province"
              variant="standard"
              validators={["required"]}
              errorMessages={["Select a district"]}
            >
              {district_.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextValidator>
          </FormControl>
          <FormControl>
            <TextValidator
              size="small"
              select
              label="Ward"
              value={ward}
              style={{ margin: 8 }}
              onChange={e => setWard(e.target.value)}
              // helperText="Please select your city/province"
              variant="standard"
            >
              {ward_.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextValidator>
          </FormControl>
          <FormControl>
            <TextValidator
              size="small"
              label="Address"
              value={address}
              style={{ margin: 8 }}
              onChange={e => setAddress(e.target.value)}
              // helperText="Please select your city/province"
              variant="standard"
              validators={["required"]}
              errorMessages={["Enter your address"]}
            />
          </FormControl>

          <Button
            variant="outlined"
            type={"submit"}
            color="secondary"
            className={classes.button}
            style={{
              fontSize: "0.7em",
              margin: 0,
              marginLeft: "1em",
              marginRight: "0.5em",
              marginTop: "2em"
            }}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </FormGroup>
      </ValidatorForm>
    </div>
  );
};

const ShippingAddr = ()=>{
  const classes = useStyles()
  const userAddr = useSelector(state => state.user_address.location)
  console.log('userAddr: ', userAddr.name, ", type: ", typeof(userAddr))
  return(
    <div
    className={classes.bill}
    style={{ padding: "5%", borderRadius: "4px" }}
  >
    <div
      className="title"
      style={{ borderBottom: "1px solid lightgrey", margin: "2%" }}
    >
      <p>
        User address
        <span>
          <Button
            variant="text"
            size="small"
            style={{ position: "relative", float: "right" }}
          >
            Change
          </Button>
        </span>
      </p>
    </div>
    
    <div style={{ paddingBottom: "1em" }}>
      <span style={{ fontWeight: 600 }}>{userAddr.name}</span>
      <p style={{margin: 0}}>{userAddr.address}, {userAddr.ward}, {userAddr.district}, {userAddr.city}, Viet Nam</p>
      <p style={{margin: 0}}>Phone: {userAddr.phoneNo}</p>
    </div>
  </div>
  )
}
// payment method uix
const PaymentMethodUI = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const cartInfo = useSelector(state=>state.cart.items)
  const orderTotal = useSelector(state=>state.cart.totalAmount)
  const userAddr = useSelector(state =>state.user_address.location)
  const cartObj = cartInfo[Object.keys(cartInfo)[0]]
  // console.log("cartinfo: ", Object.keys(cartInfo).length)
  console.log("cart info: ", cartObj)
  const orderProduct = cartObj.productId
  console.log('productid: ', orderProduct)
  const orderShop = cartObj.product.shop.id
  const orderQuantity = cartObj.quantity
  const orderAddress = userAddr.address
  const orderPhone = userAddr.phoneNo

  const [shipping, setShipping] = React.useState("standard");
  const [payXu, setPayXu] = React.useState(false);
  const [payment, setPayment] = React.useState("cash");
  const [loading, setLoading] = useState(false)  

  const handleShipping = event => {
    setShipping(event.target.value);
  };

  const handlePayxu = event => {
    setPayXu(event.target.value);
  };

  const handlePayment = event => {
    setPayment(event.target.value);
  };

  const handleOrder= async e =>{
    setLoading(true)
    const msg = message.loading("Ordering!", 0)
    const product = orderProduct
    const shop = orderShop
    const quantity = orderQuantity
    const address = orderAddress
    const phone = orderPhone
    const total = orderTotal
    const order = {product, shop, quantity, address, phone, total}
    console.log('order: ', JSON.stringify(order))
    await dispatch(orderAction.addNewOrder(order))
    setTimeout(msg, 1)
    setLoading(false)
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

          <Button
            variant="contained"
            color="secondary"
            size="big"
            style={{ marginTop: "2%" }}
            onClick={handleOrder}
          >
            Order
          </Button>
        </Grid>
        <Grid item xl={4}>
          <div style={{ marginTop: "11%", marginBottom: '2%'}}>
              <ShippingAddr />
            </div>
          <div style={{marginBottom: '2%'}}>
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
  const [activeStep, setActiveStep] = React.useState(1);
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  
 
  const steps = getSteps();

  React.useEffect(() => {
    if (isLoggedIn) {
      setActiveStep(1);
    } else {
      setActiveStep(0);
    }
  }, []);

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
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
