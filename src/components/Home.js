import React, {Component} from 'react';
import Header from "./views/Header";
import Footer from "./views/Footer";


class Home extends Component {
    render() {
        return (
            <div>
                <Header/>

                <h1>Online Clothing</h1>

                <Footer/>
            </div>
        );
    }
}

export default Home;
