import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 
class DemoCarousel extends Component {
    render() {
        return (
            <div >
            <Carousel >
                <div>
                    <img src="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=cnRk0HYq" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=cnRk0HYq" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=cnRk0HYq" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
            </div>
        );
    }
};
 
export default DemoCarousel;