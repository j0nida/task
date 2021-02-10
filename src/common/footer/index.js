import React from 'react';
import Divider from '@material-ui/core/Divider';
import './styles.css'

export const Footer = (props) => (
    <div className="footer">
        <Divider />
        <div className="footer-container">
            <div className="footer-left">
                <a href="/#" className="footer-item">Blog</a>
                <a href="/#" className="footer-item">Resources</a>
                <a href="/#" className="footer-item">License</a>
            </div>
            <div className="footer-right">
            {props.site} Copyright &copy; 2018
            </div>
        </div>
    </div>
)