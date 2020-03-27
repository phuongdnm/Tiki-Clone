import { makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root:{
        flexGrow: 1,
        width: "20%",
        height: "68vh !important",
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
        height: "68vh !important",
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
        [theme.breakpoints.up('md')]:{
            height: '78vh !important',
        },
        [theme.breakpoints.up('lg')]:{
            height: '60vh !important',
        },
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
            height: "78vh !important"

        },
        [theme.breakpoints.up('lg')]: {
            height: "60vh !important"
        },
    },
    item2:{
        [theme.breakpoints.up('md')]: {
            fontSize: "12px"
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "15px"
        },
    },
    item:{

        [theme.breakpoints.up('md')]: {
            width: "12px !important"
        },
        [theme.breakpoints.up('lg')]: {
            width: "15px !important"
        },
    }
}));

export default useStyles;
