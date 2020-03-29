import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const DemoCarousel = (props)=>{
    const {type} = props.match.params;

    return (
        <div style={{marginBottom: '2em'}}>
            <div style={{fontSize: '1.6em', margin: '1em 0'}}><span style={{fontWeight: 600}}>Search results for <span style={{fontWeight: 700}}>'{type}'</span></span><span style={{color: 'grey'}}>: {props.results} results</span></div>
            <Carousel dynamicHeight showThumbs={false} >
                <div>
                    <img src="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=cnRk0HYq" alt={"jherwf"} />
                </div>
                <div>
                    <img src="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=cnRk0HYq" alt={"jherwf"} />
                </div>
                <div>
                    <img src="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=cnRk0HYq" alt={"jherwf"} />
                </div>
            </Carousel>
        </div>
    );
};

export default DemoCarousel;
