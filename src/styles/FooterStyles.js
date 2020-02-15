import {makeStyles} from "@material-ui/core/styles";

const fterStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        fontFamily:"Roboto",
    },
    form: {
        alignItems:"center",
        paddingTop:"2%",
        width:"150%",
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
    subscribeText: {
        width: "50%",
        
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
    },
    apprefer:{
        width:"70%",
        height:"70%",
    }
}));

export default fterStyles;
