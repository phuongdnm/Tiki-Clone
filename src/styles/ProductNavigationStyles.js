import { makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root:{
        flexGrow: 1,
        width: "20%",
        height: "auto !important",
        backgroundColor: "white",
        marginLeft: "2%",
        marginRight: "10%",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "0.5em !important",
        position: "absolute",
        left: '5%',
        marginTop: "0.5%",
        zIndex: '90'
    },
    resize:{
        flexGrow: 1,
        width: "80%",
        height: "auto !important",
        backgroundColor: "white",
        marginLeft: "2%",
        marginRight: "10%",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "0.5em !important",
        position: "absolute",

    },
    category:{
        marginTop: "1.5em"
    },
    category2:{
        fontWeight: "bold"
    },
    category2item:{
        marginTop:"5%",
        marginBottom:0,

    },
    removeDefaultLink:{
        textDecoration: "none !important",
        color: "inherit !important" ,
    },
    leftDrawer:{
        marginTop: "1em",
        paddingTop: "2em",
        paddingLeft: "3em",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)",
        display: "none"
    },
    showDrawer:{
        display: "block !important"
    },
    sectionDesktop3:{
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            height: 'auto'
        }
    },
    item2:{
        [theme.breakpoints.up('md')]: {
            fontSize: "0.7em"
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "0.8em"
        },
    },
    item:{

        [theme.breakpoints.up('md')]: {
            width: "0.8em !important"
        },
        [theme.breakpoints.up('lg')]: {
            width: "1em !important"
        },
    }
}));

export default useStyles;
