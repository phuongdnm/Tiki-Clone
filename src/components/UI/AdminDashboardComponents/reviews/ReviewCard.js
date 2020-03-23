import userStyles from "../styles/FindAUserStyles";
import Card from "../Card/Card";
import CardAvatar from "../Card/CardAvatar";
import CardBody from "../Card/CardBody";
import Rating from "@material-ui/lab/Rating";
import Moment2 from "moment";
import React from "react";

export const ReviewCard = ({review, getUser})=>{
    const classes = userStyles();
    const user = getUser();

    const pickRandBackground = () => {
        let bgs = ['https://i.imgur.com/w5tX1Pn.jpg', 'https://i.imgur.com/uDYejhJ.jpg', "https://images.unsplash.com/photo-1505015390928-f9e55218544f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80", "https://images.unsplash.com/photo-1507984211203-76701d7bb120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80", "https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", "https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80", "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"];
        return bgs[Math.floor(Math.random() * bgs.length)]
    };
    return(
        <Card profile style={{textAlign: 'left'}}>
            <CardAvatar profile>
                <a href="#" onClick={e => e.preventDefault()}>
                    <img src={pickRandBackground()} alt="..." />
                </a>
            </CardAvatar>
            <CardBody profile>
                <h6 className={classes.cardCategory}>{user.name !== undefined && user.name}</h6>
                <h4 className={classes.cardTitle}>{review.title}</h4>
                <p className={classes.description}>{review.text}</p>
                <Rating
                    style={{marginTop: '0.75em', marginBottom: '0.75em'}}
                    name="read-only"
                    value={review.rating}
                    readOnly
                    precision={0.5}
                />
                <p style={{color: '#999999', fontSize: '0.9em'}}>Created -  {Moment2(review.createdAt !== null && review.createdAt).format('MMMM DD YYYY,  h:mm:ss a')}</p>
                <p style={{color: '#999999', fontSize: '0.9em'}}>Reviewed product -  {review.product.name}</p>
                <p style={{color: '#999999', fontSize: '0.9em'}}>Product id - {review.product._id} </p>
                <p style={{color: '#999999', fontSize: '0.9em'}}>Review id - {review._id}</p>

            </CardBody>
        </Card>
    )
};
