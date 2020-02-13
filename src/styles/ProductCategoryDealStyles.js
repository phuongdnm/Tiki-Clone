import {fade, makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    root: {
        width: "40%",
        height: "80%",
        backgroundColor: "black",
        marginRight: "10%",

    },
    container: {
        width: "60%",
        marginTop: "0.5%",
        marginLeft: "30%",
        // backgroundColor:"#F4F4F4",

    },
    mediumProduct: {
        width: "100%",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
        borderRadius: "1em",
        transition: "all .2s ease-in-out",
        "&:hover": {
            transform: "scale(1.05)",
        }

    },
    largeProduct: {
        width: "100%",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
        transition: "all .2s ease-in-out",
        borderRadius: "1em",
        "&:hover": {
            transform: "scale(1.05)",
        }

    },
    smallProduct: {
        width: "100%",
        marginTop: "3.158em",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
        transition: "all .2s ease-in-out",
        borderRadius: "1em",
        "&:hover": {
            transform: "scale(1.05)",
        }
    },
    "@global .Carousel":{
        position: "unset"
    }

}));

export default useStyles;
