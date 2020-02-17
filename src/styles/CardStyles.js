import {fade, makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    container: {
        width: "15vw",
        padding: "1em",
        margin: '1em',
        "&:hover": {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            cursor: 'pointer'
        },
        display: 'inline-block',
        [theme.breakpoints.down('md')]: {
            fontSize: "0.65em !important"
        },
    },
    divider: {marginLeft: '0.25em', marginRight: '0.25em', color: '#858585'},
    title: {fontSize: '0.75em', color: '#858585', lineHeight: '0.5cm'},
    discount: {color: 'rgba(36, 36, 36, 0.6)', fontSize: '0.75em', marginLeft: '0.5em'},
    price: {fontSize: '0.8em', color: '#858585', marginTop: 0},
    progress: {
        // margin: theme.spacing(1),
        // borderRadius: '10px !important',
        width: '50%',
        // position: 'absolute'
        // progress-bar
        backgroundColor: '#FDDCCB',
        color: '#FD752E',
        display: 'inline-block'
    },
    timer: {
        width: '40%',
        marginLeft: '1.5em',
        fontSize: '0.8em',
        color: '#858585'
    },
    "@global .progress-bar": {
        backgroundColor: '#FD752E'
    },
    "@global .ripple,.ripple:before,.ripple:after": {
        display: 'block',
        borderRadius: '2px',
        width: '2px',
        height: '2px',
        webkitAnimation: 'rip 6s infinite ease-out',
        mozAnimation: 'rip 6s infinite ease-out',
    },
    "@global .react-ripples": {
        display: 'inline-block !important'
    }

}));

export default useStyles;
