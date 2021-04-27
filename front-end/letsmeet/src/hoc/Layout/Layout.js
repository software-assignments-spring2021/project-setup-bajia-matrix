import React, { useState } from 'react';

// import custom files and components
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

/*
    This component manages the layout of the entire webpage. The layout
    includes either a navbar (Toolbar) fixed at the top of the screen on larger screens,
    or a navbar that includes a hamburger menu (SideDrawer) at the top of the screen
    for smaller screens. Then it displays the contents of the page depending on
    which route is loaded.

    Props:
        - isAuthenticated: whether the user is signed in
        - children: what 'page' to display based on the currently loaded route
*/

const Layout = (props) => {
    /* 
        Toolbar is the Navbar
        props.children will render different components depending on which route is active,
        these componens are the so-called different "pages"
    */

    const [show, setShow] = useState({
        showSideDrawer: false
    });

    const sideDrawerClosedHandler = () => {
        setShow({showSideDrawer: false});
    };

    const sideDrawerToggleHandler = () => {
        setShow((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    };
    
    return ( 
        <div> 
            <Toolbar 
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={show.showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;