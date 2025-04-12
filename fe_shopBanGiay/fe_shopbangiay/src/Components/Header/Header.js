import React from 'react';
import Navbar from "./Navbar";
import Topbar from "../HomePage/Topbar";

const Header = () => {
    return (
        <div>
            <Topbar></Topbar>
            <Navbar></Navbar>
        </div>
    );
};

export default Header;