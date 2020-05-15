import React, {Component} from 'react';
import * as productActions from '../../store/actions/productActions';
import { Link, Redirect } from 'react-router-dom';
import  { connect } from 'react-redux';
import Error from "../../components/Error/error";
import * as authActions from "../../store/actions/authActions";


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
            productPic:[].img,
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

    setError = (error, message) => {
        const { addProForm } = this.state;
        const updatedaddProForm = {
            ...addProForm,
            isError: error,
            errorMessage: message
        }
        this.setState({
            addProForm: updatedaddProForm
        });
    }

    addProductsHandler = (e) => {
        e.preventDefault();
        const { addProForm } = this.state;

        if(addProForm.name === ''){
            this.setError(true, 'Enter Product Name'); return;
        }

        if(addProForm.category === ''){
            this.setError(true,'Enter Category'); return;
        }

        if(addProForm.productPic === ''){
            this.setError(true,'Enter Image URL'); return;
        }

        if(addProForm.description === ''){
            this.setError(true,'Enter Description'); return;
        }

        if(addProForm.price === ''){
            this.setError(true,'Enter Price'); return;
        }

        if(addProForm.keyword === ''){
            this.setError(true,'Enter Keyword'); return;
        }

        if(addProForm.stock === ''){
            this.setError(true,'Enter Stock'); return;
        }

        const product = {
            name:addProForm.name,
            price:addProForm.price,
            stock:addProForm.stock,
            description:addProForm.description,
            productPic:addProForm.image,
            keyword:addProForm.keyword,
            category:addProForm.category
        }

        this.props.addProducts(authActions.getToken(),product)
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.props.history.push({
                    //pathname: '/',
                    search: '?addProducts=success',
                    state: jsonResponse.message
                });
            })
            .catch(error => {
                console.log(error);
            })

    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    // result will be either true or false
                    if(result){
                        this.setState({
                            redirectToreferrer: true
                        });
                    }

                })
                .catch(er => {
                    console.log(er);
                });
        }
    }

    render() {

        const { addProForm, redirectToreferrer }  = this.state;

        if(redirectToreferrer){
            return <Redirect to="/" />
        }

        return (
            <div className="jumbotron bg-transparent d-flex align-items-center">
                <form className="col-md-4 offset-md-4" onSubmit={this.addProductsHandler} >
                    <div>
                        <h4>Add Products</h4>
                    </div>
                    <br/>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress">Product Name</label>
                            <input type="text" className="form-control"  name="name" placeholder="Product Name" value={addProForm.name} onChange={this.textHandler} />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress">Category</label>
                            <input type="text" className="form-control"  name="category" placeholder="Category" value={addProForm.category} onChange={this.textHandler} />
                        </div>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputAddress">Product Image</label>
                        <input type="file" className="form-control" name="image" accept="image/*"onkeyup="(readURL)" placeholder="Image" value={addProForm.image} onChange={this.textHandler}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Description</label>
                        <textarea type="text" className="form-control"  name="description" placeholder="Description" value={addProForm.description} onChange={this.textHandler} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Price</label>
                        <input type="text" className="form-control"  name="price" placeholder="Price" value={addProForm.price} onChange={this.textHandler} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Key Word</label>
                        <input type="text" className="form-control"  name="keyword" placeholder="Key Word" value={addProForm.keyword} onChange={this.textHandler} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Stock</label>
                        <input type="text" className="form-control"  name="stock" placeholder="Stock" value={addProForm.stock} onChange={this.textHandler} />
                    </div>

                    <Error>{this.state.addProForm.errorMessage}</Error>

                    <div className="form-group ">
                        <button type="submit" value="Submit" className="btn btn-dark btn-block">ADD</button>
                    </div>

                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProducts: (product) => dispatch(productActions.addProducts(product)),
        getToken: () => dispatch(authActions.getToken())
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AddProducts);