import React from 'react'
import Deal1 from '../../image/productDeal2Image1.png'
import Deal2 from '../../image/productDeal2Image2.png'
import Deal3 from '../../image/productDeal2Image3.png'
import {Link} from "react-router-dom";
import Ripples from 'react-ripples'


const ProductDeal = (props) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <Ripples>
                <Link to={"#"}>
                    <img src={Deal1} alt="deal" style={{width: '20vw'}}/>
                </Link>
            </Ripples>

            <Ripples>
                <Link to={"#"}>
                    <img src={Deal2} alt="deal" style={{width: '20vw'}}/>
                </Link>
            </Ripples>
            <Ripples>
                <Link to={"#"}>
                    <img src={Deal3} alt="deal" style={{width: '20vw'}}/>
                </Link>
            </Ripples>
            <Ripples>
                <Link to={"#"}>
                    <img src={Deal3} alt="deal" style={{width: '20vw'}}/>
                </Link>
            </Ripples>

        </div>
    )
};

export default ProductDeal
