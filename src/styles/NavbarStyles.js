import {fade, makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    // toolbar: {
    //   width: "100%"
    // },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 600,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    tikiLogo: {
        width: 120,
        height: 50,
        marginLeft: "0.5em"
    },
    navText: {
        fontSize: "0.7em",
    },
    navTypo: {
        lineHeight: 0.4
    },
    iconNav: {
        paddingLeft: "1em",
        paddingRight: "0.2em"
    } ,
    iconNav2: {
        marginRight: "1em"
    },
    navText2:{
        marginLeft: "5em",
        marginTop: "4em",
        // marginBottom: "4em",
        paddingLeft: "3em",
        paddingRight: "3em",
        paddingTop: "0.65em",
        paddingBottom: "0.5em",
        fontSize: "0.7em",
        border: "2px solid white"
    },
    title2:{
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        fontSize: "0.9em",
        // marginRight: "3em"
    }
}));

export default useStyles;
