// this is displayed whenever the user click to the login, signup button
// import for modal
import React, {useEffect, useState} from "react";
import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import for modal formcontrol
import Login from "../user/Login";
import SignUp from "../user/SignUp";
// import for modal tab
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import tikiGraphicMap from "../../image/tiki-graphic-map.png";
import Grid from '@material-ui/core/Grid';
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import * as reviewActions from "../../store/actions/reviewActions";
import {useDispatch} from "react-redux";
import {message} from "antd";
import * as productActions from "../../store/actions/productActions";


// style for both modal and tabs
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "100 !important"

  },
  paper: {
    backgroundColor: "rgb(248, 248, 248)",
    border: "none",
    borderRadius: 6,
    boxShadow: theme.shadows[5],
    width: "auto"
  },
  destab: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    position: "auto"
  },
  tabSection: {
    position: "relative",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 6
  },
  descriptionSection: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    // marginRight: "2%",
    borderRadius: 6
  },
  formStyle: {
    padding: "0 10% 10% 10%"
  },
  formStyle2: {
    padding: 0
  },
  textDescription: {
    textAlign: "justify"
  },
  buttonStyle: {
    marginTop: "16px",
    marginBottom: "8px"
  },
  "@global .MuiRating-label ": {
    display: 'block !important',
    color: 'inherit',
    fontSize: 'inherit'
  }

}));

const tabTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        flexGrow: 1
      }
    }
  }
});

// tabs inside the modal
function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
      <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && <Box p={5}>{children}</Box>}
      </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const ModalTabSection = props => {
  const classes = useStyles();
  const piority = parseInt(props.piority, 10);

  const [value, setValue] = React.useState(piority);

  useEffect(() => {
    setValue(piority);
  }, [piority]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
      <Grid container>

        <div className={classes.destab}>

          <Grid item md={6} sm={6} xs={6} style={{backgroundColor: 'white'}}>
            <Grid container alignItems="center">
              <div className={classes.descriptionSection}>
                <div className="description-section">
                  <TabPanel value={value} index={0}>
                    <h2>Log in</h2>
                    <p className={classes.textDescription}>
                      Login in to track your orders, save your favorite products, get
                      many interesting news
                    </p>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <h2>Sign up</h2>
                    <p className={classes.textDescription}>
                      Signing up to track your orders, save your favorite products, get
                      many interesting news
                    </p>

                  </TabPanel>
                </div>
                <div className="image-section">
                  <img src={tikiGraphicMap} alt="tiki-graphic-map"
                       style={{height: '100%', width: '100%'}}/>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <div className={classes.tabSection}>
              <MuiThemeProvider theme={tabTheme}>
                <AppBar position="static">
                  <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="wrapped label tabs example"
                  >
                    <Tab
                        value={0}
                        className={classes.tab}
                        label="Log in"
                        {...a11yProps("zero")}
                    />
                    <Tab
                        value={1}
                        className={classes.Tab}
                        label="Sign Up"
                        wrapped
                        {...a11yProps("one")}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} className={classes.formStyle}>
                  <Login {...props} type="default" />
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.formStyle2}>
                  <SignUp {...props} />
                </TabPanel>
              </MuiThemeProvider>
            </div>
          </Grid>
        </div>
      </Grid>
  );
};

const ModalComment = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const [text, setText] = useState('');
  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  };
  const handleChangeText = (e) => {
    setText(e.target.value)
  };
  const handleSubmit =  async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const msg = message.loading("Updating review!", 0);
    let review = {title, text, rating};
    await dispatch(reviewActions.addNewReview(review, props.productId));
    await dispatch(productActions.getProductById(props.productId));
    props.onClose();
    setTimeout(msg, 1);
    setIsLoading(false)
  };
  const handleDiscard = () => {
    props.onClose()
  };

  return (
      <Grid item xl={12} md={12} sm={12} xs={12} style={{padding: '10%', minWidth: '520px'}}>
        <ValidatorForm onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl fullWidth={true}>
              <TextValidator
                  size="small"
                  label="Title"
                  placeholder="Enter you comment title"
                  value={title}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChangeTitle}
                  variant="standard"
                  validators={["required"]}
                  errorMessages={["Enter your comment title"]}
              />
            </FormControl>
            <InputLabel htmlFor="my-input2" style={{marginTop: '1em', fontSize: '0.8em'}}>Rating</InputLabel>

            <FormControl>
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '1em'}}>

                <Rating
                    name="hover-feedback"
                    size={'large'}
                    style={{display: 'inline-flex'}}
                    value={rating}
                    precision={0.5}
                    onChange={(e, newValue) => {newValue > 0.5 && setRating(newValue)}}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                />
                <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>

              </div>
            </FormControl>
            <FormControl fullWidth={true}>

              <TextareaAutosize aria-label="empty textarea" rowsMin={3} placeholder="Write your comment here..."
                                width="420px" onChange={handleChangeText} value={text} required style={{borderColor: '#303F9F'}}/>
            </FormControl>
            <Button
                type={'submit'}
                variant="contained"
                color="secondary"
                fullWidth={true}
                disabled={isLoading}
                className={classes.buttonStyle}
            >
              Comment
            </Button>

            <Button variant='contained' color='primary' fullWidth={true} className={classes.buttonStyle} onClick={handleDiscard}>Discard</Button>
          </FormGroup>
        </ValidatorForm>
      </Grid>
  )
};

const handleModalType = (props, classes) => {
  switch (props.type) {
    case "authModal":
      return <div className={classes.paper}>{ModalTabSection(props)}</div>;
    case "commentModal":
      return <div className={classes.paper}>{ModalComment(props)}</div>;
    default:
      return <div className={classes.paper}>{ModalTabSection(props)}</div>;
  }
};

// transition modal
const TransitionsModal = (props) => {
  const classes = useStyles();
  return (
      <div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
        >
          <Fade in={props.open}>
            {handleModalType(props, classes)}
          </Fade>
        </Modal>
      </div>
  );
}

export default TransitionsModal;
