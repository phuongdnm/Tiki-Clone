import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TikiNow from '../image/tiki-now.png'
import TikiArrow from '../image/tikiArrow.png'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: "100%"
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 0
  },
  tikiArrow: {
    maxHeight: "20px"
  },
  priceOrigin: {
    color: "lightgrey",
    textDecoration: "line-through"
  },
}));
const CartCard = (props) => {
  const classes = useStyles();

  const discounted_price = props.price - ((parseInt(props.price) * parseInt(props.discount)) / 100);
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // card for cart page
  const quantity = parseInt(props.quantity, 10)
  // const priceDiscounted = props.price - (props.discount / 100) * props.price
  const name = props.name
  const [amount, setAmount] = React.useState(quantity)
  // var priceOneProduct = priceDiscounted*amount

  const handleDecrease = () => {
    if(amount-1>=0){
      setAmount(amount - 1)
      props.update(name, discounted_price, amount-1)
    }
    
  }
  const handleIncrease = () => {
    setAmount(amount + 1)
    props.update(name, discounted_price, amount+1)
  }
  const handleChange = (e) => {
    setAmount(e.target.value)
  }
  const handleRemove = () => {
    props.removeItem(name)
  }
  
  // count number of component mount
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} square elevation={0}>
        <Grid container spacing={2} xs={12}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={props.image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container spacing={2}>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  <img src={TikiNow} /> | {props.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <img src={TikiArrow} className={classes.tikiArrow} /> Ship in 2h
              </Typography>
                <Typography variant="body2" color="textSecondary">
                  Selled by {props.selledBy}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonGroup>
                  <Button size="small" color="secondary" onClick={handleRemove}>Remove</Button>
                  <Button size="small" color="primary">Buy later</Button>
                </ButtonGroup>

              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" style={{ textAlign: "right" }}><strong>{numberWithCommas(discounted_price)}đ</strong></Typography>
              <Typography variant="subtitle2">
                <span className={classes.priceOrigin}>
                  {numberWithCommas(props.price)}đ
              </span>
                | -{props.discount}%
            </Typography>
            </Grid>
          </Grid>
          <Grid item >
            <ButtonGroup size="small">
              <Button onClick={handleDecrease}>-</Button>
              <TextField variant="outlined" style={{ borderRadius: 0, width: "50px" }} value={amount} onChange={handleChange}></TextField>
              <Button onClick={handleIncrease} >+</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default CartCard