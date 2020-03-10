// this is displayed whenever the user click to the login, signup button
// import for modal
import React from "react";
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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormGroup from "@material-ui/core/FormGroup";
import "date-fns";
import Button from "@material-ui/core/Button";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
// style for both modal and tabs
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
   
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
    marginRight: "2%",
    borderRadius: 6
  },
  formStyle: {
    padding: "0 10% 10% 10%"
  },
  textDescription: {
    textAlign: "justify"
  },
  buttonStyle: {
    marginTop: "16px",
    marginBottom: "8px"
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
  const { children, value, index, ...other } = props;

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
  const piority = parseInt(props.value.piority, 10);
  const [value, setValue] = React.useState(piority);

  React.useEffect(() => {
    setValue(piority);
  }, [piority]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container xl={12} md={12} xs={12} sm={12}>

      <div className={classes.destab}>

        <Grid item md={6} sm={6} xs={6}  >
          <Grid container xs={3} alignItems="center">
            <div className={classes.descriptionSection}>
              <div className="description-section">
                <TabPanel value={value} index={0}>
                  <h2>Sign up</h2>
                  <p className={classes.textDescription}>
                    Signing up to track your orders, save your favorite products, get
                    many interesting news
            </p>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <h2>Log in</h2>
                  <p className={classes.textDescription}>
                    Loggin in to track your orders, save your favorite products, get
                    many interesting news
            </p>
                </TabPanel>
              </div>
              <div className="image-section">
                <img src={tikiGraphicMap} alt="tiki-graphic-map" />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item md={12} sm={12} xs={12} >
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
                    className={classes.Tab}
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
                <Login />
              </TabPanel>
              <TabPanel value={value} index={1} className={classes.formStyle}>
                <SignUp />
              </TabPanel>
            </MuiThemeProvider>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

const ModalComment = (props)=>{
  const classes = useStyles()
  const [title, setTitle] = React.useState('')
  const [rating, setRating] = React.useState('')
  const [text,setText] = React.useState('')
  const handleChangeTitle=(e)=>{
    setTitle(e.target.value)
  }
  const handleChangeRating=(e)=>{
    setRating(e.target.value)
  }
  const handleChangeText=(e)=>{
    setText(e.target.value)
  }
  const handleSubmit=async (props)=>{
    const data = {title, rating, text}
    const dataJson = JSON.stringify(data)
    await fetch('http://34.87.156.245/api/v1/products/5e48f8970bedbc0e99c44f01/reviews',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body : dataJson
    }).then(res=>{
      if(res.ok){
        window.alert('Commented successfully!')
        console.log('Post successfully:: ', dataJson, 'res: ', res)
      } else{
        console.log('Failed: ', res)
      }
    })

  }
  const handleDiscard=()=>{

  }

  return(
    <Grid item xl={12} md={12} sm={12} xs={12} style={{padding: '2%', minWidth: '420px'}}>
      <FormGroup>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="my-input">Title</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            name="title"
            onChange={handleChangeTitle}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="my-input">Rating</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            fullWidth="true"
            required="true"
            name="rating"
            onChange={handleChangeRating}
            defaultValue='/5, '
          />
        </FormControl>
        <TextareaAutosize aria-label="empty textarea" rowsMin={3} placeholder="Write your comment here..." width="420px" onChange={handleChangeText}/>
        
      </FormGroup>
        
      <Button
        variant="contained"
        color="secondary"
        fullWidth={true}
        className={classes.buttonStyle}
        onClick={handleSubmit}
      >
        Comment
      </Button>
      <Button variant='contained' color='primary' fullWidth={true} className={classes.buttonStyle} onClick={handleDiscard}>Discard</Button>
    </Grid>
  )
}
const bodyModal = (props)=>{
  const value = false  
  if(value){
    return(
      <ModalTabSection value={props}/>
    )
  } else{
    return(
      <ModalComment value={props}/>

    )
  }
}

// transition modal
function TransitionsModal(props) {
  const classes = useStyles();
  
  return(
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
        <div className={classes.paper}>{bodyModal(props)}</div>
      </Fade>
    </Modal>

  )
  
}

export default TransitionsModal;
