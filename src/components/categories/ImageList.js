import React from 'react'
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    width: '100%',
    height: '80%'
}
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className={classes.paper}><a href="https://i.imgur.com/fe0T4nw.png"><img className ={classes.image} src='https://cdn.tgdd.vn/Products/Images/4728/208848/camera-ip-mi-home-360-do-1080p-xiaomi-qdj4041gl-tr-add-600x600.jpg' onClick="https://arizonaatwork.com" /></a></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><a href="https://i.imgur.com/fe0T4nw.png"><img className ={classes.image} src='https://cdn.tgdd.vn/Products/Images/4728/208848/camera-ip-mi-home-360-do-1080p-xiaomi-qdj4041gl-tr-add-600x600.jpg' onClick="https://arizonaatwork.com" /></a></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><a href="https://i.imgur.com/fe0T4nw.png"><img className ={classes.image} src='https://cdn.tgdd.vn/Products/Images/4728/208848/camera-ip-mi-home-360-do-1080p-xiaomi-qdj4041gl-tr-add-600x600.jpg' onClick="https://arizonaatwork.com" /></a></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><a href="https://i.imgur.com/fe0T4nw.png"><img className ={classes.image} src='https://cdn.tgdd.vn/Products/Images/4728/208848/camera-ip-mi-home-360-do-1080p-xiaomi-qdj4041gl-tr-add-600x600.jpg' onClick="https://arizonaatwork.com" /></a></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><a href="https://i.imgur.com/fe0T4nw.png"><img className ={classes.image} src='https://cdn.tgdd.vn/Products/Images/4728/208848/camera-ip-mi-home-360-do-1080p-xiaomi-qdj4041gl-tr-add-600x600.jpg' onClick="https://arizonaatwork.com" /></a></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><a href="https://i.imgur.com/fe0T4nw.png"><img className ={classes.image} src='https://cdn.tgdd.vn/Products/Images/4728/208848/camera-ip-mi-home-360-do-1080p-xiaomi-qdj4041gl-tr-add-600x600.jpg' onClick="https://arizonaatwork.com" /></a></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><a href="https://i.imgur.com/fe0T4nw.png"><img className ={classes.image} src='https://cdn.tgdd.vn/Products/Images/4728/208848/camera-ip-mi-home-360-do-1080p-xiaomi-qdj4041gl-tr-add-600x600.jpg' onClick="https://arizonaatwork.com" /></a></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><a href="https://i.imgur.com/fe0T4nw.png"><img className ={classes.image} src='https://cdn.tgdd.vn/Products/Images/4728/208848/camera-ip-mi-home-360-do-1080p-xiaomi-qdj4041gl-tr-add-600x600.jpg' onClick="https://arizonaatwork.com" /></a></Paper>
        </Grid>
      </Grid>
    </div>
  );
}