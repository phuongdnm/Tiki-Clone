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
  const piority = parseInt(props.piority, 10);

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

// transition modal
function TransitionsModal(props) {
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
          <div className={classes.paper}>{ModalTabSection(props)}</div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal;
