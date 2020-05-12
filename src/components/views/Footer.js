import React, {Component} from 'react';
//import {Icon} from 'antd';

class Footer extends Component {
    render() {
        return (
            <div style={{
                height: '80px', display: 'flex', bg:'dark',
                flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', fontSize:'1rem'
            }}>

                <p> Happy Coding </p>

            </div>
        );
    }
}

export default Footer;