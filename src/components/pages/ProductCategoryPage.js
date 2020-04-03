import React, {useEffect, useState} from 'react'
import NavBar from "../layout/NavBar";
import DemoCarousel from "../UI/Categories/Carousel"
import SideBar from "../UI/Categories/SideBar"
import Grid from '@material-ui/core/Grid';
import ItemContainer from "../UI/ItemContainer";
import Card from "../UI/Card";
import BottleWarmer from "../../image/bottoleWarmer.jpg";
import {useSelector} from "react-redux";
import Footer from "../layout/Footer";


if (!String.prototype.contains) {
    String.prototype.contains = function (s) {
        return this.indexOf(s) > -1
    }
}

const items = [
    {
        name: 'camera',
        label: 'Camera',
        items: [
            {name: 'camera', label: 'Camera'},
            {name: 'supervise camera', label: 'Supervise camera'},
            {name: 'accesories', label: 'Accesories'},
            {name: 'lens', label: 'Lens'},
            {name: 'group tube', label: 'Group Tube'},
            {name: 'light equipment', label: 'Light Equiment'},
        ],
    },
]

const item = [
    {name: 'camera', label: 'Camera'},
    {name: 'supervise camera1', label: 'Supervise camera'},
    {name: 'accesories', label: 'Accesories'},
    {name: 'lens', label: 'Lens'},
    {name: 'group tube', label: 'Group Tube'},
    {name: 'light equipment', label: 'Light Equiment'},
]


const ProductCategoryPage = (props) => {
    const {type} = props.match.params;

    const products = useSelector(state => state.products.products);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [firstLoad, setFirstLoad] = useState(true);


    const handleSearch = async (returnResult=false) => {
        // setFilteredProducts(
        const filtered = await products.filter(product => {
            if (product.name === type) return true;  // product name matches search

            let isMatchesWord = false;
            type.split(' ').forEach((word) => { // if product name matches a word in search
                if (product.name.contains(word)) {
                    isMatchesWord = true
                }
            });
            if (isMatchesWord) return true;

            // category
            product.category.map(category => {    // if search is based on category
                if (type.contains(category)) isMatchesWord = true
            });
            if (isMatchesWord) return true;

            // description
            if (type.split(' ').length > 1) {    // if type is two words or more
                if (product.description.contains(type)) return true
            }

            // branch
            if (product.branch.contains(type)) return true;

            return isMatchesWord; // if all other conditions where not met
        });

        // )
        await setFilteredProducts(filtered)
        if(returnResult) return filtered
    };

    if (firstLoad && products !== null && type !== null && type.length > 0) {
        setTimeout(handleSearch, 1000);
        setFirstLoad(false)
    }
    useEffect(() => {
        if (!firstLoad && products !== null && type !== null && type.length > 0) {
            handleSearch()
        }
    }, [type]);

    const handleFilter = async (isComplexSearch, filterType, min, max)=>{
        const filteredProducts_ = await handleSearch(true);
        switch (isComplexSearch) {
            case "both":
                let filtered = await handleRatingFilter(filterType, filteredProducts_);
                filtered = await handlePriceFilter(min, max, filtered);
                setFilteredProducts(filtered);
                return;
            case "rating":
                let filtered_ = await handleRatingFilter(filterType, filteredProducts_);
                setFilteredProducts(filtered_);
                return ;

            case "price":
                let filtered__ = await handlePriceFilter(min, max, filteredProducts_);
                setFilteredProducts(filtered__)
                return ;

        }
    };

    const handleRatingFilter = async (filterType, filteredProducts_) => {
        switch (filterType.toString()) {
            case "5":
                const filtered = await filteredProducts_.filter(product => product.averageRating !== undefined && product.averageRating === 5);
                setFilteredProducts(filtered);
                return filtered;
            case "4":
                const filtered_ = await filteredProducts_.filter(product => product.averageRating !== undefined && product.averageRating === 4);
                setFilteredProducts(filtered_);
                return filtered_;
            case "3":
                const filtered__ = await filteredProducts_.filter(product => product.averageRating !== undefined && product.averageRating === 3);
                return filtered__;
            default: return await handleSearch(true)
        }
    };
    const handlePriceFilter = async ( min, max, filteredProducts_) => {
        let min_ = (min == null || isNaN(min)) ? 0 :parseInt(min);
        let max_ = (max == null || isNaN(max)) ? Infinity :parseInt(max);
        const filtered = await filteredProducts_.filter(product => product.price >= min_  && product.price <=  max_);
        return filtered;
    };

    return (
        <div style={{width: "100%", height: "100%", backgroundColor: "#F4F4F4"}}>
            <NavBar {...props} />
            <div style={{padding: '2% 10%'}}>
                <Grid container style={{
                    backgroundColor: "#fff",
                    padding: '0.5em',
                    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)"
                }}>
                    <Grid item xs={3}>
                        <SideBar
                            items={items}
                            item={item}
                            handleFilter={handleFilter}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <DemoCarousel {...props} results={filteredProducts !== null ? filteredProducts.length : 0}/>
                        {filteredProducts !== null && filteredProducts.length > 0 ?
                            <ItemContainer
                                space={3}
                                title={''}
                                gridStyle={{boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0.1), 0 0px 0px 0 rgba(0, 0, 0, 0.1)"}}
                                style={{margin: 0, padding: 0, borderRadius: 0}}
                            >
                                {filteredProducts !== null && filteredProducts.map((prod, index) => (
                                    <Card
                                        style={{width: '13vw'}}
                                        key={prod.id}
                                        id={prod.id}
                                        type={'review'}
                                        price={prod.price}
                                        discount={prod.discount !== undefined ? prod.discount : 0}
                                        title={prod.name}
                                        image={prod.photo === "no-photo.jpg" ? BottleWarmer : `${process.env.REACT_APP_API}/uploads/${prod.photo}`}
                                        rating={prod.averageRating}
                                        link={true}
                                    />

                                ))}
                            </ItemContainer> :
                            <section style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                width: '100%',
                                height: '20%'
                            }}>
                                <p style={{
                                    padding: '10% auto',
                                    fontSize: "3em",
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    marginTop: '2em',
                                    color: "rgba(149, 149, 149, 1)"
                                }}>No products found :(</p>
                            </section>
                        }
                    </Grid>
                </Grid>
            </div>
            <Footer/>

        </div>

    )
};

export default ProductCategoryPage






