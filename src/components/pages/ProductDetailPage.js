import React from 'react'
import NavBar from "../layout/NavBar";
import Footer from '../layout/Footer'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createMuiTheme, MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles'
import TikiNow from '../../image/tiki-now.png'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box';
import { Progress } from 'reactstrap';
import Countdown from "react-countdown-now";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import TikiTimerIcon from '../../image/tiki_timer.png'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CartIcon from '../../image/ic-cart@2x.png'
import IconButton from '@material-ui/core/IconButton'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import InterestedProducts from '../UI/InterestedProducts'
import Bottle from '../../image/sprite.png'
import ZoomIcon from '../../image/zoom-in.png'
// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import WarningIcon from '../../image/icon-warning.svg'
import ResIcon from '../../image/response-icon.png'
import Card from '@material-ui/core/Card'
import StarIcon from '@material-ui/icons/Star'
// select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Cart from '../UI/Cart'
import ArrayList from './ArrayList'

// list divider
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
const product = {
 
  category: [
  "accessories",
  "books-gifts"
  ],
  colors: [
  "Black&Red",
  "Blacka&Green",
  "Black&Blue"
  ],
  photo: "no-photo.jpg",
  _id: "5e48f8970bedbc0e99c44f02",
  name: "HyperX Pulsefire Raid - Gaming Mouse",
  price: 59.99,
  description: "11 Programmable Buttons, RGB, Ergonomic Design, Comfortable Side Grips, Software-Controlled Customization",
  weight: "50g",
  specs: "Connection Type: Wired, Buttons: 11, Max Speed: 450IPS",
  branch: "HyperX",
  origin: "US",
  discount: 10,
  shop: "5e4406dfe67ba2619654062e",
  user: "5e479b23df94eb34c43a0ca8",
  createdAt: "2020-02-28T14:17:54.088Z",
  slug: "hyperx-pulsefire-raid-gaming-mouse",
  __v: 0,
  averageRating: 4,
  id: "5e48f8970bedbc0e99c44f02",
  sold:90,
  hot: 'true',
  timeInMilliSec: 50000
}
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%", 
    height: "100%", 
    backgroundColor: "#F4F4F4",
    padding: '0 10%'
  },
  block:{
    backgroundColor: "white",
    marginBottom: '2%',
    borderBottom: '1px solid lightgrey',
    paddingBottom: '2%'
  },
  presentImage:{
    display: "block",
    width: "100%",
    pointerEvents: "none",

  },
  image:{
    margin: '10% 0',
  },
  title: {fontSize: '1.5em', color: '#858585', lineHeight: '0.5cm'},
  figure: {
    width: '100%',
    backgroundRepeat: 'no-repeat',
    '&:hover img':{
      opacity: 0,
    },
  },
  tikiStoreIcon:{
    backgroundImage: 'url(../../image/sprite.png)',
    backgroundPosition: '0 -409px',
    width: '24px',
    height:' 24px',
  },
  tikiRefund2:{
    backgroundImage: 'url(../../image/sprite.png)',
    backgroundPosition: '-362px -281px',
    width: '24px',
    height:' 24px',
  }, 
  table: {
    width: '50%',

  },
  firstCell:{
    fontWeight: 500
  },
  responseIcon:{
    // display: 'inline-block',

    width: '13px',
 
    height: '11px',
    backgroundPosition: '0 0',
  },

  question:{
    fontSize: '1em',
    fontWeight: 600
  },
  answer:{
    fontSize: '0.9em',
    color: 'grey'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },

}))

const ImageZoom = (props)=>{
  const classes = useStyles()
  const src = 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0'
  // const src = `${props.photo}`
  const [backgroundPosition, setBackgroundPosition] = React.useState('0% 0%')
  const handleMouseMove = (e)=>{
    const {left, top, width, height} = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    setBackgroundPosition(`${x}% ${y}%`)
  }
  return(
    <div className={classes.image}> 
      <figure className={classes.figure} onMouseMove={handleMouseMove} style={{backgroundPosition, backgroundImage:`url(${src})`}}>
        <img className={classes.presentImage } src={src}/>
      </figure>
      
      <div className='image-description' style={{textAlign: 'center'}}>
        <span style={{fontSize: '0.75em'}}>
          <img src={ZoomIcon}/>
          Drag your mouse to zoom out
        </span>
      </div>
 
    </div>
   
    
  )
}

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>Offer is over!</span>;
  } else {
    if (days !== 0) {
      return <span>{days} days {hours}:{minutes}:{seconds}</span>;
    }
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
}

const ImageList = (props) => {
  const classes = useStyles()
  // const imageList = props.photo.map(item=>{
  //   return(
      
  //   )
  // })
  const src = 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0'
  return (
    <div className={classes.image}>
      <List component="nav" aria-label="mailbox folders">
        <ListItem button>
          <img style={{width: '50px', height: '50px'}} src={src}/>
        </ListItem>
        {/* <Divider /> */}
        {/* <ListItem button divider>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
        <Divider light />
        <ListItem button>
          <ListItemText primary="Spam" />
        </ListItem> */}
      </List>
    </div>
  
  )
}

const dealCounter = (props)=>{

  if(props.hot=='true'){
    return(
      <div className="counter" style={{borderBottom: '1px solid lightgrey', marginBottom: '3%', paddingBottom: '16px'}}>
        <div className="deal-time">
          <span>
            <img src={TikiTimerIcon} style={{ height: '24px', width: '24px' }} />
          </span>
          <span>
            Deal is finished in: {props.timeInMilliSec &&
              <span >
                <Countdown
                  date={Date.now() + props.timeInMilliSec}
                  renderer={renderer}
                />
              </span>
            }
          </span>
        </div>
        <Progress value={!isNaN(props.sold) ? props.sold : 50} color={"#FF3B27"}>
          {!isNaN(props.sold) &&
            <span> {!!props.hot &&
              <WhatshotIcon style={{ color: "white", fontSize: '1.3em', paddingBottom: '0.2em' }} />}
              Sold {props.sold}</span>
          }
        </Progress>
        
    </div>
    )
  }
}

const ProductPriceInfo = (props) => {
  // console.log("data fetched: ", props)
  const [value, setValue] = React.useState(props.averageRating);
  const classes = useStyles()
  const [amount, setAmount] = React.useState(1)
  const handleDecrease = () => {
    if(amount-1>=0){
      setAmount(eval(amount - 1))
    }
  }
  const handleIncrease = () => {
    setAmount(eval(amount + 1))
  }
  const handleChange = (e) => {
    setAmount(e.target.value)
  }
  
  const discounted_price = props.price - ((parseInt(props.price) * parseInt(props.discount)) / 100);
  const discount_price = ((parseInt(props.price) * parseInt(props.discount)) / 100)

  // product feature description ul
  const descArray = props.description.split(',').map(item=>{
    return(
      <li>{item}</li>
    )
  })
  // color options 
  const colorOption = props.colors.map(item=>{
    return(
      <Grid item xs>
        <Button variant="contained" color="primary">{item}</Button>
      </Grid>
    )
  })
  const groupButton = (price)=>{
    if(price>5){
      return(
        <Button variant="contained" color='primary' style={{marginBottom: '16px', fontSize: '0.75em'}}> Installment only 345.000$/month</Button>
      )
    }
  }

  const handleAddToCart = (props)=>{
    // const total_price = amount*discounted_price
    product["amount"]=amount
    product["discounted_price"]=discounted_price
    // product["total_price"]=total_price
    ArrayList.push(product)
    console.log('array: ', ArrayList)
  }
  
      
  return (
    <div className={classes.block}>
      <div className="name">
        <img src={TikiNow} alt="an image"/> <span className={classes.divider}>|</span>
        <span className={classes.title} >{props.name}</span>
      </div>
      {/* rating block */}
      <div className={classes.block}>
        <Box component="fieldset" mb={3} borderColor="transparent" style={{marginBottom: '0'}}>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
         
        </Box>
        <span style={{fontSize: '1em'}}>
            Branch: <a href="#">{props.branch}</a>
          </span>
      </div>
      {/* price and warranty block */}
      <div className={classes.block} style={{fontSize: '1em'}}>
        <Grid container spacing={5} wrap='nowrap'>
          <Grid item className="price-block" xl={7} xs={7}>
            <div className="item-price" className={classes.block}>
              <p style={{color: 'red', fontSize: '1.5em', padding: 0, margin: 0}}>{discounted_price}$</p>
              <p style={{color: 'lightgrey', padding: 0, margin: 0}}>Save: <span style={{color: 'red'}}>{props.discount}%</span> ({discount_price}$)</p>
              <p style={{color: 'lightgrey'}}>Original price: {props.price}$</p>
            </div>
            {dealCounter(props)}
            <div className="product-description">
              <ul>
                {descArray}
              </ul>

            </div>
            <div className="item-product-options" className={classes.block} >
            <div className="color-options" style={{marginBottom: '10%', width: '100%'}}>
              <div style={{fontWeight: 600}}>Color options</div>
              <Grid container spacing={1}>
                {colorOption}
              </Grid>
            </div>
              <Grid item container className='add-to-cart-options' spacing={2}>
                  <Grid item className='product-amount' xl="4" xs md>
                    <ButtonGroup size="small">
                      <Button onClick={handleDecrease}>-</Button>
                      <TextField variant="outlined" style={{ borderRadius: 0, width: "25px" }} value={amount} onChange={handleChange}></TextField>
                      <Button onClick={handleIncrease} >+</Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item className='product-add-to-cart' xl="6" xs md>
                    <ButtonGroup orientation="vertical">
                      <Button onClick={handleAddToCart} variant="contained" color='secondary' style={{marginBottom: '16px'}}><img src={CartIcon} style={{width: "20px", height: "20px", marginRight: "10px", fontSize:'0.75em'}}/> 
                        Add to cart
                      </Button>
                      {groupButton(discounted_price)}
                    </ButtonGroup>
                  </Grid>
                  <Grid item className='product-add-to-favorite' xl="2" xs md>
                  <IconButton aria-label="delete" size="medium">
                    <FavoriteBorderIcon fontSize="inherit"/>
                  </IconButton>
                  </Grid>
              </Grid>
            </div>
            <div className="product-attr-section" className={classes.block} style={{fontSize: '0.75em'}}>
              <div style={{border: '1px solid yellow', padding: '5px 10px', marginBottom: '2%'}}>
                <Grid container >
                  <Grid item xs={1} xl={1} md={1}>
                    <img src={WarningIcon}/>
                  </Grid>
                  <Grid item xs>
                    <span>Please select the shipping location in order to be forecasted a delivery time accurately. <a href="#">Enter your address.</a></span>
                  </Grid>
                </Grid>
              </div>
              <div>
                <img className={classes.responseIcon} src={ResIcon}/>
                <span><a href="#">Report the product incorrect information.</a></span>
              </div>
            </div>
            <div className="promotion-section" style={{fontSize: '0.75em'}}>
              <div style={{fontWeight: 600, fontSize: '1em'}}>RELATED SERVICES AND PROMOTIONS</div>
              <ul>
                <li>
                  <p style={{padding: 0, margin: 0}}>Refunds to TikiNow members (maximum: 100k/month), <span style={{color: 'red'}}>0.25%</span> (10.375$) - <a href="#">Detail</a></p>
                </li>
                <li>
                  <span style={{color: 'red', backgroundColor: 'yellow'}}>SHB card</span> - 10% off for orders from 500k
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item className="seller-block" xl={5} xs>
            <Typography>
              <div style={{ border: '1px solid lightgrey', borderRadius: '2px', height: '100%', width: 'auto', padding: '10px 20px', fontSize: '0.9em'}}>
                <div className="name">
                  <i className={classes.tikiStoreIcon}></i>
                  <div className={classes.text}>
                    <span style={{color: "#189EFF"}}>Tiki trading</span>
                    <p>Genuine commitment</p>
                  </div>
                
                </div>
                <div className={classes.warrantyInfo}>
                  <i className={classes.tikiRefund2}></i>
                  <div className={classes.text}>
                    <span style={{fontWeight: 600}}>Tiki refunds 111%</span>
                    <p>if fake products are detected</p>
                  </div>
                </div>
                <div className={classes.warrantyInfo}>
                  <i className={classes.tikiRefund2}></i>
                  <div className={classes.text}>
                    <span style={{fontWeight: 600}}>Warranty information</span>
                    <p style={{padding: 0, margin: 0}}>36 months</p>
                    <a href="#">Detail</a>
                  </div>
                </div>
                  
              </div>
            </Typography>
            
          </Grid>
        </Grid>
      </div>
      
    </div>

  )
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const InfoTable = (props)=>{
  const classes= useStyles()
  const specsArray = props.specs.split(',').map(item=>{
    item=item.split(':')
    return(
      <TableRow>
        <TableCell align="left">{item[0]}</TableCell>
        <TableCell align="left">{item[1]}</TableCell>
      </TableRow>
    )
  })
  return(
      <TableContainer component={Paper} style={{padding: '3%'}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            {specsArray}
          </TableHead>
        </Table>
      </TableContainer>

    
  )
}


const ProductDetailInfo = (props)=>{
  const classes = useStyles()
  return(
    <div>
      <div className="item-recommandation">
        <InterestedProducts/>
      </div>
      {/* info table block */}
      <div className="info-table"style={{marginLeft: '2em', marginRight: '2em', marginTop: '2em', width: '75%'}}>
        <div style={{fontSize: '1.1em', fontWeight: 400, marginBottom: '0.3em', marginLeft: '2.5em'}}>PRODUCT DETAIL INFO</div>
        {InfoTable(props)}
      </div>
      <div className="info-table"style={{marginLeft: '2em', marginRight: '2em', marginTop: '2em'}}>
        <div style={{fontSize: '1.1em', fontWeight: 400, marginBottom: '0.3em', marginLeft: '2.5em'}}>PRODUCT DESCRIPTION</div>
        <div style={{backgroundColor: 'white', padding: '2%'}}>{props.description}</div>
      </div>
    </div>
    
  )

}

const ProductQA = (props)=>{
  const classes = useStyles()
  return(
    <div style={{marginLeft: '2em', marginRight: '2em', marginTop: '2em'}}>
      <div style={{fontSize: '1.1em', fontWeight: 400, marginBottom: '0.3em', marginLeft: '2.5em'}}>
        QUESTION AND ANSWER
      </div>
      <Card variant="outlined">
        <Grid container spacing={2} wrap="nowrap">
          <Grid item xs xl={2} style={{textAlign:'center'}}>
            <div className='like-amount'>0</div>
            <div>likes</div>
          </Grid>
          <Grid item>
            <div className={classes.question}>Can I change the product when it is broken?</div>
            <div className={classes.answer}>No, you cant</div>
            <div className={classes.answer}>Tiki answered at: {Date.now()}</div>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

const theme = createMuiTheme({
  overrides:{
    MuiButton:{
      contained:{
        backgroundColor: '#FDD22F'
      }
    }
  }
});

const ReviewCard = (props)=>{
  const classes = useStyles()
  return(
    <Card>
      <Grid container>
        <Grid item xs xl={1} style={{textAlign:'center', margin: '0 3%'}}>
          <span style={{borderRadius: '50%', backgroundColor: '#d3d2d3', color: '#919090', fontWeight: 500, textAlign: 'center', width: '65px', height: '65px', display: 'inline-block', lineHeight: '65px'}}>{props.nameShort}</span>
          <p>{props.nameFull}</p>
        </Grid>
        <Grid item xs xl={9} style={{textAlign: 'left'}}>
          <span>
            <Box component="fieldset" mb={3} borderColor="transparent" style={{marginBottom: '0'}}>
              <Rating
                name="read-only"
                value={props.value}
                readOnly
              />
            </Box>
            
          </span>
          <p style={{color: '#22B345', fontSize: '0.75em'}}>
            Bought from Tiki
          </p>
          <p>{props.review}</p>
        </Grid>

      </Grid>
    </Card>
  )
}
const ProductReview=(props)=>{
  const classes = useStyles()
  const [value, setValue]=React.useState(props.averageRating)
  const [age, setAge] = React.useState(10);
  const handleChange = event => {
    setAge(event.target.value);
  };

  return(
    <div style={{marginLeft: '2em', marginRight: '2em', marginTop: '2em'}}>
      <div style={{fontSize: '1.1em', fontWeight: 400, marginBottom: '0.3em', marginLeft: '2.5em'}}>
        CUSTOMER REVIEW
      </div>
      <div className={classes.block} style={{padding: '2%', margin: 0}}>
        <Grid container xs wrap="nowrap" style={{textAlign: 'center'}}>
          <Grid item xs={3}>
            <div style={{fontSize: '1em'}}>Average rating</div>
            <div className="average-number" style={{fontSize: '2.5em', fontWeight: 600, color: 'red'}}>{props.averageRating}/5</div>
            <Box component="fieldset" mb={3} borderColor="transparent" style={{marginBottom: '0'}}>
              <Rating
                name="read-only"
                value={value}
                readOnly
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <div className="5-star">
              <span>5<StarIcon fontSize="small"/>
                <span>
                  <Progress value={Math.floor((Math.random() * 50) + 1)} color={"#23B445"}/>
                </span>
              </span>
            </div>
            <div className="4-star">
              <span>4<StarIcon fontSize="small"/>
                <span>
                  <Progress value={Math.floor((Math.random() * 50) + 1)} color={"#23B445"}/>
                </span>
              </span>
            </div>
            <div className="3-star">
              <span>3<StarIcon fontSize="small"/>
                <span>
                  <Progress value={Math.floor((Math.random() * 50) + 1)} color={"#23B445"}/>
                </span>
              </span>
            </div>
            <div className="2-star">
              <span>2<StarIcon fontSize="small"/>
                <span>
                  <Progress value={Math.floor((Math.random() * 50) + 1)} color={"#23B445"}/>
                </span>
              </span>
            </div>
            <div className="1-star">
              <span>1<StarIcon fontSize="small"/>
                <span>
                  <Progress value={Math.floor((Math.random() * 50) + 1)} color={"#23B445"}/>
                </span>
              </span>
            </div>
          </Grid>
          <Grid item xs={3}>
            Share your comment about the product
            <ThemeProvider theme={theme}>
              <Button size='small' variant='contained'>Write your comment</Button>
            </ThemeProvider>
            
          </Grid>
        </Grid>
      </div>
      <div className={classes.block} style={{padding: '2%'}}>
        <div className="sort-options">
          <span style={{lineHeight: '70px'}}>Filter the comments</span>
          <span>
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-label">Useful</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value={10}>Useful</MenuItem>
              <MenuItem value={20}>Newest</MenuItem>
              <MenuItem value={30}>Having images</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-label">All Customers</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              variant="outlined"

            >
              <MenuItem value={10}>All customers</MenuItem>
              <MenuItem value={20}>All customers made a purchase</MenuItem>
  
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-label">All stars</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              variant="outlined"

            >
              <MenuItem value={10}>All stars</MenuItem>
              <MenuItem value={20}>5</MenuItem>
              <MenuItem value={30}>4</MenuItem>
              <MenuItem value={30}>3</MenuItem>
              <MenuItem value={30}>2</MenuItem>
              <MenuItem value={30}>1</MenuItem>
              <MenuItem value={30}>Satisfied</MenuItem>
              <MenuItem value={30}>Not satisfied</MenuItem>


            </Select>
          </FormControl>
          </span>
        </div>
        <div className="review">
          <ReviewCard nameShort={"TT"} nameFull={'Thanh Thi'} value={4} review={"I really love Tiki product"}/>
          <ReviewCard nameShort={"HC"} nameFull={'Hoang Chau'} value={2} review={"I don't like Tiki product"}/>
          <ReviewCard nameShort={"QK"} nameFull={'Quynh Khang'} value={5} review={"I really love Tiki"}/>


        </div>
      </div>
    </div>
  )
}
const ProductDetailPage = (props) => {
  // const { productName, productId } = props.match.params;
  const classes = useStyles()
  // console.log('params: ',props.match.params);
  const [data, setData]=React.useState('')
  // React.useEffect(()=>{
  //   fetch('http://34.87.170.252/api/v1/shops')
  //   .then(res=>res.json())
  //   .then((fetchData)=>{
  //     setData(fetchData)
  //     console.log(fetchData)
  //   })
  //   .catch(console.log)
  // })

  return (
    <div>
      <NavBar />
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.block}>
          <Grid item container xs={4} xl={5} md={5} spcaing={0}>
            <Grid item xs={4} xl={3} md={4}>
              {ImageList(product)}
            </Grid>
            <Grid item xs={8} xl={9} md={8}>
              {ImageZoom(product)}
            </Grid>

          </Grid>
          <Grid item xs={8} xl={7} md={7} style={{borderLeft: "1px solid lightgrey", padding: '3%'}}>
            {ProductPriceInfo(product)}
          </Grid>

        </Grid>
        {ProductDetailInfo(product)}
        {ProductQA()}
        {ProductReview(product)}
      </div>

      <Footer />
    </div>
  )
};

export default ProductDetailPage

