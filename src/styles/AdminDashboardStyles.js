import { makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    item2:{
        fontSize: '1em',
        color: '#CDCDCD',


    },
    item:{
        color: '#CDCDCD'
    },
    subItem:{
        marginLeft: '1em'
    },
    sideBar: {
        margin: 0,
        paddingTop: '3em !important',
        paddingLeft: '3em !important',
        background: "url('https://images.unsplash.com/photo-1557800636-894a64c1696f?ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80') repeat",
        backgroundSize: "auto 80vh",
        // height: "100%",
        backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundBlendMode: "multiply"
    },
    drop:{transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"}
}));

export default useStyles;
