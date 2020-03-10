import React from 'react';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import Button from '@material-ui/core/Button'
import noProductsLogo from '../../image/no_products_logo.png'
import Card from './Card'
import BottleWarmer from '../../image/bottoleWarmer.jpg'
import Carousel from 'react-material-ui-carousel'
import CartCard from '../CartCard'
import ArrayList from '../pages/ArrayList'

const useStyles = makeStyles(theme => ({
	root: {
		padding: "0 15%"
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center'
	},
	cartLabel: {
		marginTop: '20px'
	},
	feePaper: {
		marginTop: 52
	},
	boxFee: {
		padding: "5%"
	}
}));


const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const paperStyle = createMuiTheme({
	overrides: {
		MuiPaper: {
			root: {
				textAlign: "left",

			},
		}

	}
})

const Cart = (props) => {
	const classes = useStyles();
	const [cartList, setCartList] = React.useState(ArrayList)
	const totalCalculate = (cart)=>{
		setTotalPrice(numberWithCommas(cart.length ? cart.reduce((total, item) => (
			(total + item.discounted_price*item.amount)
		), 0) : 0))
	}
	// handle remove button
	const handleRemoveItem = (name) => {
		// setCartList(ArrayList.filter(item => item.name !== name))
		for(var i =0; i<ArrayList.length; i++){
			if(ArrayList[i].name == name){
				ArrayList.splice(i, 1)
				break
			}
		}
		totalCalculate(ArrayList.filter(item => item.name !== name))
	}


	// calculate total price
	const [totalPrice, setTotalPrice] = React.useState(0)
	React.useEffect(()=>{

		totalCalculate(cartList)
	},[])
	// handle update after changing quantity of products
	const handleUpdate = (name, price, amount) => {
		var clickedObject = ArrayList.filter(item => item.name === name)
		clickedObject[0].discounted_price = price
		clickedObject[0].amount = amount
		totalCalculate(cartList)
		console.log('array list after update amount: ', ArrayList)
	}

	// handle amount change on cart logo
	const [cartLength, setCartLength] = React.useState(cartList.length)
	React.useEffect(() => {
		setCartLength(cartList.length)
	})

	const itemList = cartList.map(item => {
		return (
			<CartCard type={'cart'} name={item.name} photo={item.photo[0]} selledBy={item.branch} price={item.price} discount={item.discount} quantity={item.amount} color={item.choosen_color} update={handleUpdate} removeItem={handleRemoveItem}></CartCard>

		)
	})

	const total = () => {
		return (
			<p>
				<span>Total fee:</span>
				<div className="amount" style={{ float: "right", display: "flex", flexDirection: "column", textAlign: "right" }}>
					<strong style={{ fontSize: "22px", color: "red", fload: "right" }}>
						{totalPrice}$
					</strong>
					<small>(Included VAT)</small>
				</div>
			</p>

		)

	}
	const CartSection = (cart) => {
		if (!cart.length) {
			return (
				<Grid container className={classes.root} spacing={2} >
					<Grid item xs={12} alignItems="center">
						<h5 className={classes.cartLabel}>Your cart ({props.amount} products)</h5>
						<Paper className={classes.paper} elevation={0} variant='outlined' square>
							<img src={noProductsLogo}></img>
							<p>No products in your cart yet!</p>
							<Button variant="contained" color="primary" href="/">Continue shopping</Button>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<h5 className={classes.cartLabel}>Good deal</h5>
						<Paper className={classes.paper} elevation={0} variant="outlined" square>
							{/* <Carousel autoPlay="true" animation="slide" interval={4000}>
						
						</Carousel> */}
							<Card
								type={'default'}
								price={990000}
								discount={62}
								title={"Sanity multifunctional bottle warmer"}
								image={BottleWarmer}
							>
								<Button>Buy now</Button>

							</Card>
							<Card
								type={'deal'}
								price={990000}
								discount={62}
								title={"Sanity multifunctional bottle warmer"}
								image={BottleWarmer}
								sold={90}
								hot={true}
								timeInMilliSec={5 * 10000}   // 50 seconds
							/>
							<Card
								type={'review'}
								price={990000}
								discount={62}
								title={"Sanity bottle multifunctional warmer"}
								image={BottleWarmer}
								rating={4}
								review={5}
							/>
							<Card
								type={'review'}
								price={990000}
								discount={62}
								title={"Sanity bottle multifunctional warmer"}
								image={BottleWarmer}
								rating={4}
								review={5}
							/>

						</Paper>
					</Grid>
				</Grid>
			)
		}
		return (
			<Grid container className={classes.root} spacing={2} >
				<Grid item xs={9}>
					<h5 className={classes.cartLabel}>Your cart ({props.amount} products)</h5>
					<MuiThemeProvider theme={paperStyle}>
						<Paper className={classes.paper} elevation={0} variant='outlined' square>
							{itemList}
						</Paper>
					</MuiThemeProvider>
				</Grid>
				<Grid item xs={3}>
					<Paper elevation={0} variant='outlined' square className={classes.feePaper}>
						<div className={classes.boxFee}>
							<p className={classes.listInfoPrice} style={{ margin: 0 }}>
								<span>Temporary calculated: </span>
								<strong style={{ float: "right" }}>{totalPrice}$</strong>
							</p>
						</div>
						<div className={classes.boxFee} style={{ marginBottom: "5%" }}>
							{total()}
						</div>
					</Paper>
					<Button fullWidth="true" variant="contained" color="secondary" style={{ marginTop: 10 }}>Order</Button>
				</Grid>
			</Grid>
		)
	}

	return (
		<div>
			<NavBar/>

			{CartSection(ArrayList)}

			<Footer />
		</div>
	)

}

export default Cart