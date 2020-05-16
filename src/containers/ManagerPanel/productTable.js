import React, {Component} from "react";
import {base_url} from "../../constants";
import * as authActions from "../../store/actions/authActions";
import {connect} from "react-redux";


class ProductTable extends Component{

    state = {
        productList: []
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result){
                        this.getProducts();
                    }else{
                        this.props.history.push('/login');
                    }
                })
        }else{
            this.getProducts();
        }
    }

    getProducts = () => {
        console.log(this.props.auth.isAuthenticated)
        //const token =  this.props.auth.token;
        fetch(`${base_url}/products`, {
            headers: {
                'Content-Type': 'application/json',
                //'auth-token': token
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    productList: jsonResponse.message
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    formatDate = (date) => {
        let d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    }

    render() {
        return (
            <div class="container">
                <h4>Available Products</h4>
                <table className="table table-striped">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Created Date</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Options</th>
                    </tr>
                    </thead>
                    {
                        this.state.productList.map(product => {
                            return(
                                <tbody>
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.offer}</td>
                                    <td>{this.formatDate(product.createdAt)}</td>
                                    <td>{product.stock}</td>
                                    <td><input type="text" name="discount" placeholder="Discount" />&nbsp;&nbsp;
                                        <button type="submit" value="Submit" className="btn btn-dark">Add Discount</button></td>
                                </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getToken: () => dispatch(authActions.getToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTable);