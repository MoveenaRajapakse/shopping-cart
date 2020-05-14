import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as authActions from '../../../store/actions/authActions';
import { connect } from 'react-redux';


class TopHeader extends Component{

    componentDidMount() {
        this.props.getToken();
    }

    render() {
        let guestAccount =  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li className="dropdown-item"><Link to="/signup"><i className="fa fa-user-plus"></i>&nbsp;&nbsp;<span>Register</span></Link></li>
            <li className="dropdown-item"><Link to="/login"><i className="fa fa-sign-in"></i>&nbsp;&nbsp;<span>Login</span></Link></li>
        </div>;
        if(this.props.auth.isAuthenticated){
            guestAccount = <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li className="dropdown-item"><Link to="/orders"><i className="fa fa-list-alt"></i>&nbsp;&nbsp;<span>Orders</span></Link></li>
                <li className="dropdown-item"><Link to="" onClick={() => this.props.logout()}><i className="fa fa-sign-out"></i>&nbsp;&nbsp;<span>Logout</span></Link></li>
            </div>;
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Fashion Store</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {/*<li class="nav-item">*/}
                        {/*    <a class="nav-link" href="#">Products</a>*/}
                        {/*</li>*/}

                        <li className="nav-item">
                               <a> <Link className="nav-link"   to="/addProducts">AddProducts</Link></a>
                            {/*<nav.Link  href="/">AddProducts</nav.Link>*/}
                            {/*<Link to="/addProducts" className="nav-link">AddProducts</Link>*/}
                            {/*<NavLink href="#addProducts">AddProducts</NavLink>*/}
                            {/*<a class="nav-link" href="/addProducts">AddProducts</a>*/}

                        </li>

                        <li className="nav-item">
                            <a> <Link className="nav-link"   to="/index">Products</Link></a>
                            {/*<nav.Link  href="/">AddProducts</nav.Link>*/}
                            {/*<Link to="/addProducts" className="nav-link">AddProducts</Link>*/}
                            {/*<NavLink href="#addProducts">AddProducts</NavLink>*/}
                            {/*<a class="nav-link" href="/addProducts">AddProducts</a>*/}

                        </li>


                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink"
                                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                  to="/account"><i className="fa fa-user-circle-o"></i>&nbsp;&nbsp;{this.props.auth.isAuthenticated ? this.props.auth.user.firstName: 'My Account'}</Link>
                            {guestAccount}
                        </li>
                    </ul>
                </div>
            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);