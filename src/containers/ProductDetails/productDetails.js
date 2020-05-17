import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import * as cartActions from '../../store/actions/cartActions';
import * as authActions from '../../store/actions/authActions';
import './productdetails.styles.css';
import { base_url } from '../../constants';

class ProductDetails extends Component{

    state = {
        product: null,
        redirectToReferrer: false
    }

    componentDidMount() {

        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result){
                        this.props.getCartItems(this.props.auth.token, this.props.auth.user.userId)
                            .then(response => {
                                console.log(response);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }




        const { category, slug } = this.props.match.params;
        fetch(`${base_url}/products/${category}/${slug}`)
            .then(response => response.json())
            .then(jsonResponse => {

                if(jsonResponse.hasOwnProperty('message')){
                    console.log(jsonResponse);
                    this.setState({
                        product: jsonResponse.message
                    })
                }

            })
            .catch(error => {
                console.log(error);
            });



    }

    addToCart = (productId, price, name, image) => {

        if(!this.props.auth.isAuthenticated){
            this.props.history.push('/login');
            return;
        }

        const { auth } = this.props;
        const cartItem = {
            user: auth.user.userId,
            product: productId,
            name: name,
            image: image,
            quantity: 1,
            price: price
        }
        this.props.addToCart(auth.token, cartItem)
            .then(response => {
                //console.log(response);
                console.log(this.props.cart);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){

        const { product } = this.state;

        let productDescription;

        if(this.state.product){
            productDescription =
                <div className="Content">
                    <div className="ProductDetailsWrapper">
                        <div className="ProductDetailsImage">
                            <div className="ProductDetailsImageWrapper">
                                <img src={product.productPic[0].img} alt="" />
                            </div>
                        </div>
                        <div className="ProductDetails">
                            {/*<div className="BreadCrumb">*/}
                            {/*    <small>Home > Mobiles > Iphone</small>*/}
                            {/*</div>*/}

                            <div className="row">
                            <h2 >{product.name}</h2>
                            </div>
                            <div className="row">
                                <h1><i className="fa fa-usd" aria-hidden="true"></i> {product.price}</h1>
                                &nbsp; &nbsp;
                                <h2 className="text-success">30% off</h2>
                            </div>
                            <div className="row">
                                <h3 className="text-warning">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                    <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                    <i className="fa fa-star-o" aria-hidden="true"></i>
                                </h3>
                                &nbsp; &nbsp;
                                <h5>1200 star rating and 250 reviews</h5>
                            </div>
                            <div className="row">
                                <p><i className="text-success fa fa-check-square-o" aria-hidden="true"></i> <strong>Bank
                                    Offer</strong> 20% Instant Discount on SBI Credit Cards</p>
                                <p><i className="text-success fa fa-check-square-o" aria-hidden="true"></i> <strong>Bank
                                    Offer</strong> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card </p>
                            </div>

                            <div className="row">
                                <h3 className="text-info"><i className="fa fa-map-marker" aria-hidden="true"></i></h3>
                                <p> &nbsp; Delivery | &nbsp;<span>FREE</span></p>
                            </div>
                            <div className="row">
                                <div className="ProductDescription">
                                    <h5>Product Description</h5>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                            <div className="row ActionButtonWrapper">
                                <button onClick={() => { this.addToCart(product._id, product.price, product.name, product.productPic[0].img) }}><i className="fa fa-shopping-cart"></i>&nbsp;ADD TO CART</button>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <h2>Ratings & Reviews</h2>
                        </div>

                        <div className="row mt-5 mb-5">
                            <div className="media">
                                <img className="mr-3" src={require('./user_logo.jpg')} alt="Generic placeholder image"/>
                                    <div className="media-body">
                                        <h5 className="mt-0">Very nice product. <span className="text-warning">
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                            <i className="fa fa-star-o" aria-hidden="true"></i> </span>
                                        </h5>
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                        sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra
                                        turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
                                        felis in faucibus.
                                    </div>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <h2> Post Your Own Reviews</h2>
                        </div>


                        <form>
                            {/*<div className="form-group">*/}
                            {/*    <label htmlFor="exampleInputEmail1">Email address</label>*/}
                            {/*    <input type="email" className="form-control" id="exampleInputEmail1"*/}
                            {/*           aria-describedby="emailHelp" placeholder="Enter email"/>*/}
                            {/*        <small id="emailHelp" className="form-text text-muted">We'll never share your email*/}
                            {/*            with anyone else.</small>*/}
                            {/*</div>*/}
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Review</label>
                                <textarea type="text" className="form-control" id="exampleInputtextarea"
                                          placeholder="write your own reviews" rows="3"></textarea>
                            </div>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </form>
                    </div>

                </div>

        }else{
            productDescription = <div>Product is loading...!</div>
        }


        return (
            <div>
                <Header/>
                <br/>
                {productDescription}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (token, cartItem) => dispatch(cartActions.addToCart(token, cartItem)),
        getCartItems: (token, userId) => dispatch(cartActions.getCartItems(token, userId)),
        getToken: () => dispatch(authActions.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);