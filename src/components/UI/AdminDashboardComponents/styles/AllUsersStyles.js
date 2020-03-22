import {
    successColor,
    whiteColor,
    grayColor,
    hexToRgb
} from "../Card/styles/material-dashboard-react.js";
import {makeStyles} from "@material-ui/core/styles";
import {defaultFont} from "../Card/styles/material-dashboard-react";

const useStyles = makeStyles(theme => ({
    successText: {
        color: successColor[0]
    },
    upArrowCardCategory: {
        width: "16px",
        height: "16px",
        paddingBottom: '0.2em'
    },
    stats: {
        color: grayColor[0],
        display: "inline-flex",
        fontSize: "12px",
        lineHeight: "22px",
        "& svg": {
            top: "4px",
            width: "16px",
            height: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px"
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            top: "4px",
            fontSize: "16px",
            position: "relative",
            marginRight: "3px",
            marginLeft: "3px"
        }
    },
    cardCategory: {
        color: grayColor[0],
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        paddingTop: "10px",
        marginBottom: "0"
    },
    cardCategoryWhite: {
        color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitle: {
        color: grayColor[2],
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: grayColor[1],
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    cardTitleWhite: {
        color: whiteColor,
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: grayColor[1],
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    card:{
        "&:hover":{
            cursor: "pointer"
        }
    },
    listStyle:{
        position: "absolute",
        zIndex: '9000',
        display: "none",
        width: "21%",
        backgroundColor: 'white',
        marginTop: '4.5em',

    },
    showList:{
        display: "block"
    },
    title: {
        ...defaultFont,
        letterSpacing: "unset !important",
        lineHeight: "30px !important",
        fontSize: "18px !important",
        borderRadius: "3px !important",
        textTransform: "none !important",
        color: "inherit !important",
        margin: "0 !important",
        // padding: '6px 15px',
        marginLeft: '1.5em',
        "&:hover,&:focus": {
            background: "transparent !important"
        }
    },
    addCursor:{
        "&:hover":{
            cursor: 'pointer'
        }
    },
    oldTimeItem:{
        "& span::before": {
            background: 'white !important'
        },
        "& .rs-timeline-item-tail":{
            background: 'white !important'
        }
    },
    newTimeItem:{
        "& span::before": {
            background: `${successColor[0]} !important`,
            border: '1px solid white'
        },
    },
    "@global .MuiFab-primary":{
        backgroundColor: "#FC930A"
    },
    "@global .MuiFab-primary:hover":{
        backgroundColor: "#FC930A"
    },
    "@global .MuiFab-secondary":{
        backgroundColor: "#189EFF"
    },
    "@global .MuiFab-secondary:hover":{
        backgroundColor: "#189EFF"
    },
    fabGreen:{
        backgroundColor: "#50AA54",
        color: "white",
        "&:hover":{
            backgroundColor: "#50AA54"
        }
    },
    loading3:{
        position: "absolute",
        left: '55%',
        top:'65%'}
}));

export default useStyles;
