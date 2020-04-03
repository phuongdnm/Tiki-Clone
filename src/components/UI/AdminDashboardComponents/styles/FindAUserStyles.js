import {
    container,
    defaultFont,
    primaryColor,
    defaultBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    whiteColor,
    grayColor
} from "../Card/styles/material-dashboard-react.js";
import {makeStyles} from "@material-ui/core/styles";
import {hexToRgb} from "../Card/styles/material-dashboard-react";


const userStyles = makeStyles(theme => ({
    appBar: {
        backgroundColor: "transparent",
        color: grayColor[7],
        border: "0",
        borderRadius: "3px",
        padding: "10px 0",
        transition: "all 150ms ease 0s",
        minHeight: "50px",
    },
    container: {
        ...container,
        minHeight: "50px"
    },
    flex: {
        flex: 1
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
        marginLeft: '1.5em !important',
        "&:hover,&:focus": {
            background: "transparent !important"
        }
    },
    title2: {
        ...defaultFont,
        letterSpacing: "unset !important",
        // lineHeight: "30px !important",
        fontSize: "1rem !important",
        borderRadius: "3px !important",
        textTransform: "none !important",
        color: "inherit !important",
        // margin: "0 !important",
        // padding: '6px 15px',
        marginLeft: '0.5em !important',
        "&:hover,&:focus": {
            background: "transparent !important"
        }
    },
    appResponsive: {
        top: "8px"
    },
    primary: {
        backgroundColor: primaryColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
    info: {
        backgroundColor: infoColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
    success: {
        backgroundColor: successColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
    warning: {
        backgroundColor: warningColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
    danger: {
        backgroundColor: dangerColor[0],
        color: whiteColor,
        ...defaultBoxShadow
    },
    listStyle:{
        position: "absolute",
        zIndex: '9000',
        display: "none",
        width: "12%",
        backgroundColor: 'white',
        marginTop: '4.5em',

    },
    showList:{
        display: "block"
    },
    margin: {
        zIndex: "4",
        margin: "0"
    },
    search: {
        width: 300,
        paddingBottom: 0,
        height: '5%'
    },
    option: {
        fontSize: 15,
        height: "100%",
        width: 300,
        '& > span': {
            width: 300,
            fontSize: 18,
        },
    },
    cardText:{
        fontSize: '1.2em',
        padding: 0,
        margin: 0,
        paddingTop: '0.4em'
    },
    "@global button:focus":{
        outline: "none !important"
    },
    "@global .MuiIconButton-colorSecondary:hover":{
        backgroundColor: "rgba(24, 158, 255, 0.05) !important"
    },
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
    pCardTitle: {
        color: '#909090',
        fontSize: '0.8em'
    },
    pCardContent:{
        color: '#303030',
        fontSize: '1.1em'
    },
    '@global .MuiAutocomplete-inputRoot[class*="MuiInput-root"]':{
        paddingBottom: '0.25em !important'
    },
    loading:{
        position: "absolute",
        left: '55%',
        top:'60%'},
    loading2:{
        position: "absolute",
        left: '60%',
        top:'40%'},
    loading3:{
        position: "absolute",
        left: '55%',
        top:'65%'},
    loading4:{
        position: "absolute",
        left: '55%',
        top:'65%'},
    "@global .styles__user-card-position-name___2Yu6-":{
        color: "rgba(0, 30, 60, 0.5) !important"
    },
    "@global .styles__stat-name___2COsF":{
        color: "rgba(0, 30, 60, 0.5) !important"
    },
    "@global .styles__user-card-name___3VFjy":{
        color: "#001E3C !important"
    },"@global .styles__stat-value___vSJHA":{
        color: "#001E3C !important"
    },
    "@global .styles__card___2P_1t.styles__float___HWEwV":{
        background: "#CDD6DC"
        // backgroundImage: `linear-gradient(40deg, #132349, #3064A7)`
    }
}));

export default userStyles;
