import React from "react";
import { useState, useEffect } from "react";
import {
  makeStyles,
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

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import zaloPay from "../../image/icon-zalopay.svg";
import {useDispatch, useSelector} from "react-redux";
import { message } from "antd";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import MenuItem from "@material-ui/core/MenuItem";
import * as orderActions from '../../store/actions/orderActions'
import {Link} from "react-router-dom";
import {loadCSS} from "fg-loadcss";
import * as authActions from "../../store/actions/authActions";

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
    height: "auto",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1.5px 5px 0 rgba(0, 0, 0, 0.1)"

  },
  button:{
    color: 'rgb(0, 182, 240)',
    borderColor: 'rgba(0, 182, 240, 0.4)',
    "&:hover":{
      color: 'rgb(0, 182, 240)',
      borderColor: 'rgba(0, 182, 240, 0.4)',
      backgroundColor: 'rgba(0, 182, 240, 0.04)'
    }
  },
  nextButton:{
    backgroundColor: "rgb(0, 182, 240)",
    "&:hover":{
      backgroundColor: "rgba(0, 182, 240, 0.8)",
    }
  },
  "@global .MuiTab-wrapper":{
    width: 'auto !important'
  },
  "@global .MuiStepIcon-root.MuiStepIcon-completed, .MuiStepIcon-root.MuiStepIcon-active":{
    color: '#00B6F0'
  },
  "@global .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit:focus":{
    outline: 'none !important'
  },
  '@global .MuiRadio-colorSecondary.Mui-checked': {
    color: '#29b6f6 !important'
  },
  '@global .MuiRadio-colorSecondary.Mui-checked:hover': {
    color: '#29b6f6 !important'
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
        <div style={{ borderBottom: "1px solid lightgrey", marginTop: '1.5em' }} key={index}>
          <p style={{ fontSize: "0.9em", margin: 0 }}>
            <span style={{ fontWeight: 600 }}>{item.quantity}</span>
            <span style={{ fontWeight: 600 }}> x </span>
            <span>
            <Link to={`/${item.product.title}/${item.product._id}`}>{item.product.name}</Link>
          </span>
          </p>
          <p style={{ fontSize: "0.8em", marginTop: '1.5em' }}>
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
            style={{ borderBottom: "1px solid lightgrey", margin: "2%", paddingBottom: '0.7em' }}
        >
          <p>
            Bill<span> ({cartItems.length} product{cartItems.length > 1 && 's'})</span>
            <span>
            <Link to={"/cart"} className={classes.removeLinkStyle}>
              <Button
                  variant="text"
                  size="small"
                  style={{ position: "relative", float: "right" }}
              >
              Change
            </Button>
            </Link>

          </span>
          </p>
        </div>
        {itemList}
        <div style={{ paddingBottom: "2em", paddingTop: '1em' }}>
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
  const [value, setValue] = useState(0);

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
          <div className="login-with-group-button" style={{marginTop: '1.5em'}}>
            <Button
                size={"small"}
                variant="contained"
                className={classes.button}
                style={{
                  backgroundColor: "#4267B2",
                  color: "white",
                  marginRight: "2%",
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
                startIcon={<Icon className={"fab fa-google"}/>}
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
        <div className="login-form"  style={{marginTop: '2.5em'}}>
          <Grid container spacing={2}>
            <Grid item xl={8}>
              <div className={classes.tabsContainer} style={{boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.08)",}}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    style={{width: '20%'}}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    indicatorColor="secondary"
                    className={classes.tabs}
                    TabIndicatorProps={{
                      style: { left: 0, backgroundColor: "#00B6F0"}
                    }}
                >
                  <Tab label="Login" {...a11yProps(0)} style={{justifyContent: 'start'}} />
                  <Tab label="Signup" {...a11yProps(1)} style={{justifyContent: 'start'}} />
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
const AddressUI = ({handleNext, setName, setCompanyName, setCity, setDistrict, setWard, setPhoneNo, setAddress, setRadio, name, companyName, city, district, ward, phoneNo, address, radio}) => {
  const classes = useStyles();
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

  const handleSubmit = (e)=>{
    e.preventDefault();
    handleNext();
  };

  return (
      <div
          style={{
            padding: "5%",
            marginLeft: '15%',
            width: '80%',
            marginTop: '2.5%',
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)",
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
            <FormControl style={{marginLeft: '0.5em', marginTop: '1.5em'}}>
              <FormLabel component="legend" style={{color: 'rgb(153, 153, 153)'}}>Address type</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={radio}
                          onChange={(e) => setRadio(e.target.value)} row>
                <FormControlLabel value="House/Condominium" control={<Radio/>} style={{color: 'rgb(153, 153, 153)'}} label="House / Condominium"/>
                <FormControlLabel value="Agency/Company" control={<Radio/>} style={{color: 'rgb(153, 153, 153)'}} label="Agency / Company"/>
              </RadioGroup>
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
            >
              Update
            </Button>
          </FormGroup>
        </ValidatorForm>
      </div>
  );
};

const ShippingAddr = ({ setActiveStep, name, city, district, ward, phoneNo, address})=>{
  const classes = useStyles();
  return(
      <div
          className={classes.bill}
          style={{ padding: "5%", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1.5px 5px 0 rgba(0, 0, 0, 0.1)"}}
      >
        <div
            className="title"
            style={{ borderBottom: "1px solid lightgrey", margin: "2%", paddingBottom: '0.7em' }}
        >
          <p>
            User address
            <span>
          <Button
              variant="text"
              size="small"
              style={{ position: "relative", float: "right" }}
              onClick={()=>setActiveStep(1)}
          >
            Change
          </Button>
        </span>
          </p>
        </div>

        <div style={{ paddingBottom: "1em", marginLeft: '0.5em'}}>
          <span style={{ fontWeight: 600 }}>{name}</span>
          <p style={{margin: 0}}>{address}, {ward}, {district}, {city}, Viet Nam</p>
          <p style={{margin: 0}}>Phone: {phoneNo}</p>
        </div>
      </div>
  )
}
// payment method uix
const PaymentMethodUI = ({loading, setActiveStep, name, city, district, ward, phoneNo, address, handleOrder}) => {
  const cartInfo = useSelector(state=>state.cart.items);

  const [shipping, setShipping] = useState("standard");
  const [payXu, setPayXu] = useState(false);
  const [payment, setPayment] = useState("cash");

  const handleShipping = event => {
    setShipping(event.target.value);
  };

  const handlePayxu = event => {
    setPayXu(event.target.value);
  };

  const handlePayment = event => {
    setPayment(event.target.value);
  };



  return (
      <div className="payment-method">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <div className="shipping-method-section" >
              <p style={{ fontWeight: 600 }}>1. Choose the shipping method</p>
              <FormControl component="fieldset" fullWidth>
                <div
                    style={{
                      marginTop: '2%',
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1.5px 5px 0 rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "2%",
                      fontSize: "0.85em"
                    }}
                >
                  <Grid
                      container
                      xl={12}
                      spacing={2}
                      style={{ marginBottom: "1%", paddingTop: '2.5%'}}
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
                      <span style={{ color: "lightgrey", marginRight: '2em' }}>19.000d</span>
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
                      <span style={{ color: "lightgrey",marginRight: '2em' }}>19.000d</span>
                      <span>Standard shipping</span>
                    </Grid>
                  </Grid>
                </div>
              </FormControl>
            </div>

            <div className="payment-with-Tiki-xu" style={{ marginTop: "4%" }}>
              <p style={{ fontWeight: 600 }}>2. Pay with Tiki Xu</p>
              <FormControl component="fieldset" fullWidth>
                <div
                    style={{
                      marginTop: '2%',
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1.5px 5px 0 rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "2%",
                      fontSize: "0.85em"
                    }}
                >
                  <Grid
                      container
                      xl={12}
                      spacing={2}
                      style={{ marginBottom: "1%", paddingTop: '2.5%'}}
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
                      <span style={{ color: "lightgrey", marginRight: '2em' }}>19.000d</span>
                      <span>Standard shipping</span>
                    </Grid>
                  </Grid>
                </div>
              </FormControl>
            </div>

            <div className="payment-method" style={{ marginTop: "4%" }}>
              <p style={{ fontWeight: 600 }}>3. Payment method</p>
              <FormControl component="fieldset" fullWidth>
                <div
                    style={{
                      marginTop: '2%',
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1.5px 5px 0 rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                      width: "100%",
                      padding: "2%",
                      fontSize: "0.85em"
                    }}
                >
                  <Grid
                      container
                      xl={12}
                      spacing={2}
                      style={{ marginBottom: "1%", paddingTop: '2.5%'}}
                  >
                    <Grid item>
                      <Radio
                          checked={payment === "cash"}
                          onChange={handlePayment}
                          value="cash"
                          name="radio-button-demo"
                      />
                    </Grid>
                    <Grid item style={{marginTop: '1em'}}>
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
                    <Grid item style={{marginTop: '1em'}}>
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
                    <Grid item style={{marginTop: '1em'}}>
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


          </Grid>
          <Grid item xs={4}>
            <div style={{ marginTop: "11%", marginBottom: '2%'}}>
              <ShippingAddr setActiveStep={setActiveStep} name={name} city={city} district={district} ward={ward} phoneNo={phoneNo} address={address} />
            </div>
            <div style={{marginBottom: '2%'}}>
              <Bill />
            </div>
            <Button
                variant="contained"
                color="secondary"
                style={{ marginTop: "2%" }}
                onClick={handleOrder}
                disabled={loading}
                fullWidth
            >
              Order
            </Button>
          </Grid>
        </Grid>
      </div>
  );
};

function bodyTemplate(index, handleNext, setActiveStep, handleOrder, loading, setName, setCompanyName, setCity, setDistrict, setWard, setPhoneNo, setAddress, setRadio, name, companyName, city, district, ward, phoneNo, address, radio) {

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
            <div style={{ fontWeight: 600 }}>2. Address</div>
            <AddressUI handleNext={handleNext} setName={setName} setCompanyName={setCompanyName} setCity={setCity} setDistrict={setDistrict} setPhoneNo={setPhoneNo} setRadio={setRadio}  setWard={setWard} setAddress={setAddress} name={name} companyName={companyName} city={city} district={district} ward={ward} phoneNo={phoneNo} address={address} radio={radio}/>
          </div>
      );
    case 2:
      return <PaymentMethodUI setActiveStep={setActiveStep} name={name} loading={loading} city={city} district={district} ward={ward} phoneNo={phoneNo} address={address} handleOrder={handleOrder}/>;

    default:
      return (
          <div>
            <h5>Some title</h5>
          </div>
      );
  }
}

const Checkout = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.userData);
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
  const total = useSelector(state=>state.cart.totalAmount_discounted);

  const [activeStep, setActiveStep] = useState(1);

  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [phoneNo, setPhoneNo] = useState( "");
  const [address, setAddress] = useState( "");
  const [radio, setRadio] = useState("House/Condominium");
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);


  const steps = ["Log in", "Address", "Payment & orders"];

  useEffect(() => {
    loadCSS(
        'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        document.querySelector('#font-awesome-css'),
    );
    isLoggedIn ? setActiveStep(1) : setActiveStep(0);

  }, []);

  if(firstLoad && (user.address !== undefined || user.phone !== undefined || user.name !== undefined)){
    setAddress(user.address);
    setPhoneNo(user.phone);
    setName(user.name);
    setFirstLoad(false)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0)
  };
  const handleOrder= async e =>{
    setLoading(true);
    const msg = message.loading("Ordering!", 0);
    for (let i = 0; i <cartItems.length; i++) {
      let order_ = {
        shop: cartItems[i].product.shop.id,
        product: cartItems[i].productId,
        quantity: parseInt(cartItems.quantity),
        phone: phoneNo,
        address,
        total
      };
      dispatch( await orderActions.addNewOrder(order_));
    }
    dispatch(await  authActions.updateUserInfo({name: user.name,address, phone: phoneNo}));
    setTimeout(msg, 1);
    props.history.push('/');

    setLoading(false)
  };


  return (
      <div className={classes.root}>
        <div
            className="progress-header"
            style={{
              backgroundColor: "white",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              padding: "0 20%"
            }}
        >
          <Grid container>
            <Grid item xs={1}>
              <Link to={"/"}>
                <IconButton
                    aria-label="where do you want to shop to?"
                    color="inherit"
                    style={{ padding: "auto 0px", paddingLeft: "0" }}
                >
                  <i className={classes.iconLogoBlue} />
                </IconButton>
              </Link>

            </Grid>
            <Grid item xs={9}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(step => (
                    <Step key={step} style={{color: "#00B6F0"}}>
                      <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
              </Stepper>
            </Grid>
            <Grid item xs={2} style={{ padding: "2% 0" }}>
              <img
                  src={hotline}
                  style={{ position: "relative", float: "left" }}
              />
            </Grid>
          </Grid>
        </div>

        <div
            className="progress-body"
            style={{ padding: "1% 15% 20% 15%", backgroundColor: "#f4f4f4" }}
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
                <div className={classes.instructions}>
                  {bodyTemplate(activeStep, handleNext, setActiveStep, handleOrder, loading, setName, setCompanyName, setCity, setDistrict, setWard, setPhoneNo, setAddress, setRadio, name, companyName, city, district, ward, phoneNo, address, radio)}
                  <div style={{marginTop: '2%'}}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                        style={{marginRight: '2%'}}
                    >
                      Back
                    </Button>
                    {activeStep !== 1 && activeStep !== 2 &&
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.nextButton}
                        onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                    }
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Checkout;
