import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import sprite from "../../image/sprite.png";
import IconButton from "@material-ui/core/IconButton";


const userStyles = makeStyles(() => ({
   root:{
       margin: '2em',
   },
    title: {
        fontSize: '1.1em',
        fontWeight: 400,
        marginBottom: '0.3em',
    },
    grid:{
        backgroundColor: 'white',
        borderRadius: '3px',
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",


    }

}));



const ItemContainer = (props) =>{
    const classes = userStyles();
    // const dealHeader =


    return (
        <div className={classes.root}>
            {props.title !== undefined ?
                <div className={classes.title}>{props.title}</div>:
                <section style={{backgroundColor: 'white', paddingTop: '1em', boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <IconButton aria-label="where do you want to shop to?" color="inherit" style={{padding: 0, display: 'inline-block'}}>

                        <i style={{
                            backgroundImage: `url(${sprite}?v=100000000)`,
                            backgroundPosition: "-95px 0",
                            width: "48px",
                            height: "48px",
                            marginRight: "0.1em"
                        }}/>
                        </IconButton>
                        <p style={{display: 'inline-block', marginBottom: '0.3em'}}><span style={{color: '#FF4C57', fontWeight: 700}}>Tiki Deal</span> <br/>Hourly updates of all special deals on Tiki. Bookmark this page and come back often so you don't miss it!</p>

                    </div>
                    <hr style={{marginTop: '0.5em', marginBottom: '0.5em'}}/>
                </section>

            }

        <Grid container className={classes.grid}>
            {props.items.map((item, index)=>(
                <Grid  item xs={props.space !== undefined ? props.space : 2} key={index}>
                    {item}
                </Grid>
            ))}
            <Grid container >
                <Grid item xs={12} style={{textAlign: 'center'}}>
                    <Button variant="outlined" color="primary" style={{fontSize: '0.7em', padding: '0.5em', paddingLeft: '4em', paddingRight: '4em', marginBottom: '1.7em', textTransform: 'lowercase'}}>
                        See more
                    </Button>
                </Grid>
            </Grid>
        </Grid>

        </div>
    )
};

export default ItemContainer
