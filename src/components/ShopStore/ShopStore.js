import React, { Component } from 'react';
//import Products from './Products/Products';
import addProducts from '../../containers/Products/addProducts';
import index from '../../containers/Products/ProductDetails/index';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
//import * as authAtions from '../../store/actions/authActions';
import { connect } from "react-redux";


class ShopStore extends Component{

    state={
        categoryTitle: 'Products'
    }

    render() {

        console.log('Parents');
        console.log(this.props);

        return (
            <React.Fragment>
                <Header/>
                <Switch>
                    {/*<Route path="/" exact component={Products} />*/}
                    {/*<Route path="/products" exact component={Products} />*/}
                <Route path="/addProducts" exact component={addProducts} />
                    <Route path="/index" exact component={index} />
                    {/*<Route path="/products/:slug" component={Products} />*/}
                </Switch>
            </React.Fragment>

        );
    }
}



export default connect(null, null)(ShopStore);