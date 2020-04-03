import {makeStyles} from "@material-ui/core/styles";

const fterStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin:"5% 2% 0 2%",
        paddingBottom: "2%"
    },
    form: {
        paddingTop:"2%",
        [theme.breakpoints.down('sm')]: {
            paddingTop:"0",
            paddingBottom:"1em"
        },
    },
    about: {
        paddingTop:"2em",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    news: {
        backgroundColor: "#F7F7F7",
    },
    input1: {
        height: 0,
        fontSize: "1em"
    },
    fteritem1:{
        paddingTop:"1em",
        '&:last-child': {
            marginBottom:"3em",
        }
    },
    newsTypo:{
        fontWeight:"bold",
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    imageNews:{
        width:"70%",
        marginLeft:"1em",
        [theme.breakpoints.only('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.only('xs')]: {
            width:"120%",
        },

    },
    mobileMode:{
        '&:first-child': {
            paddingLeft:[["1em"], '!important'],
        },
        [theme.breakpoints.down('sm')]: {
            display: [["none"], '!important']
        },
    },
    icon:{
        paddingLeft:"0.2em",
        marginRight: '0.5em'
    },
    apprefer:{
        width:"70%",
        height:"70%",
    },
    headers:{
        fontSize: '0.95em',
        fontWeight:'bold',
        lineHeight:3,
        paddingBottom:"0.47em"
    },
    fontSmall:{
        fontSize: "0.85em",
        fontWeight: 600
    },
    removeLinkStyles:{
        textDecoration: "none !important",
        color: "inherit !important" ,
        "&:hover":{
            color: "rgba(0, 0, 0, 0.4) !important"
        }
    },
    '@global .MuiInput-underline:after': {
        borderBottom: '2px solid #189EFF !important'
    },
    '@global .MuiButtonBase-root.MuiIconButton-root': {
        outline: 'none !important'
    },
    "@global .MuiFormLabel-root.Mui-focused":{
        color: "#189EFF !important"
    },
    "@global #subscribe.MuiButton-containedPrimary":{
        backgroundColor: "#189EFF !important"
    }
}));

export default fterStyles;

