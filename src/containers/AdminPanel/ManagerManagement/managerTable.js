import React, {Component} from "react";
import {base_url} from "../../../constants";
import * as authActions from "../../../store/actions/authActions";
import {connect} from "react-redux";

class ManagerTable extends Component{

    state = {
        managerList: []
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated){
            this.props.getToken()
                .then(result => {
                    if(result){
                        this.getManagers();
                    }else{
                        this.props.history.push('/login');
                    }
                })
        }else{
            this.getManagers();
        }
    }

    getManagers = () => {
        console.log(this.props.auth.isAuthenticated)
        //const token =  this.props.auth.token;
        fetch(`${base_url}/manager`, {
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': token
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                this.setState({
                    managerList: jsonResponse.message
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
                <h4>Available Store Managers</h4>
                <table className="table table-striped">
                    <thead class="thead-dark">
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Created Date</th>
                    </tr>
                    </thead>
                    {
                        this.state.managerList.map(managers => {
                            return(
                                <tbody>
                                <tr>
                                    <td>{managers.firstName}</td>
                                    <td>{managers.lastName}</td>
                                    <td>{managers.email}</td>
                                    <td>{this.formatDate(managers.createdAt)}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerTable);