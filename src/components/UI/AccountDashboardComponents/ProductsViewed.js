import ItemContainer from "../ItemContainer";
import Card from "../Card";
import BottleWarmer from "../../../image/bottoleWarmer.jpg";
import React from "react";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

import tikiNotFound from '../../../image/tiki-not-found-pgae.png'


const userStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#ff9100',
        borderColor: '#ff9100',
        "&:focus": {
            outline: "none"
        },
        color: 'rgba(0,0,0,0.8)',

        fontSize: '0.7em',
        margin: 0,
        marginLeft: '1em',
        marginRight: '0.5em',
        marginTop: '2em',
        marginBottom: '1em'
    },
    input: {
        height: '1em !important'
    },
    title: {
        fontSize: '1.1em',
        fontWeight: 400,
        marginBottom: '0.3em',
        color: 'rgba(0,0,0,0.8)',
    },
    grid: {
        padding: '0',
        marginTop: '0.5em',
        marginBottom: '0.5em',
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.14)",
    },
    grid2: {
        padding: '2em',
        marginTop: '0.6em',
        marginBottom: '0.5em',
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.14)",
    },
    removeLinkStyles: {
        textDecoration: 'none !important'
    },
    "@global .MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded": {
        top: '45% !important',
        left: '70% !important'
    },
    "@global .MuiButton-containedSecondary:hover": {
        border: "1px solid #ff9100",
        backgroundColor: "rgba(255, 145, 0, 0)"
    },

}));


const ProductsViewed = (props) => {
    const classes = userStyles();


    return (
        <div style={{width: '100%'}}>
            {/*<div className={classes.grid}>*/}

                <ItemContainer
                    space={4}
                    title={'PRODUCTS YOU HAVE LOOKED FOR'}
                    items={[
                        <Card
                            type={'default'}
                            price={990000}
                            discount={62}
                            title={"Sanity multifunctional bottle warmer"}
                            image={BottleWarmer}
                        />,
                        <Card
                            type={'default'}
                            price={990000}
                            discount={62}
                            title={"Sanity multifunctional bottle warmer"}
                            image={BottleWarmer}
                        />,
                        <Card
                            type={'default'}
                            price={990000}
                            discount={62}
                            title={"Sanity multifunctional bottle warmer"}
                            image={BottleWarmer}
                        />
                    ]}
                />
            {/*</div>*/}

        </div>
    )
};

export default ProductsViewed
