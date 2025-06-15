import React from "react";

import "./Footer.css";

import Logo2 from "../../assets/logo2.svg";

function Footer() {
    return (
        <footer>
            <img src={Logo2} alt="Betabuy Logo 2" title="Betabuy Logo 2"/>
            <p>Betabuy. All Rights Reserved</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
        </footer>
    )
}

export default Footer;