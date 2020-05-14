import React, {Component} from 'react';
import * as productActions from '../../store/actions/productActions';
import { Link, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';
import Error from "../../components/Error/error";


class AddProducts extends Component {

    state = {
        redirectToreferrer: false,
        addProForm: {
            name:'',
            price:'',
            stock:'',
            description:'',
            keyword:'',
            category:'',
            productPic:[],
            isError: false,
            errorMessage: ''
        }
    }

    textHandler = (e) => {
        const addProForm = this.state.addProForm;
        const updateaddProForm = {
            ...addProForm,
            [e.target.name] : e.target.value
        }
        console.log('called--');
        this.setState({
            addProForm: updateaddProForm
        })

    }



    render() {
        return (
            <div className="jumbotron bg-transparent d-flex align-items-center">
                <form className="col-md-4 offset-md-4"  >
                    <div>
                        <h4>Add Products</h4>
                    </div>
                    <br/>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress">Product Name</label>
                            <input type="text" className="form-control"  name="pname" placeholder="Product Name" />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress">Category</label>
                            <input type="text" className="form-control"  name="category" placeholder="Category" />
                        </div>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Product Image</label>
                        <input type="file" className="form-control" name="image" accept="image/*"onkeyup="(readURL)" placeholder="Image"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Description</label>
                        <textarea type="text" className="form-control"  name="description" placeholder="Description" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Price</label>
                        <input type="text" className="form-control"  name="price" placeholder="Price" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Key Word</label>
                        <input type="text" className="form-control"  name="keyword" placeholder="Key Word" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Stock</label>
                        <input type="text" className="form-control"  name="stock" placeholder="Stock" />
                    </div>

                    <div className="form-group ">
                        <button type="submit" value="Submit" className="btn btn-dark btn-block">ADD</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default AddProducts;