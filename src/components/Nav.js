import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

const AppNav = (props) => {
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">OpenBMG</NavbarBrand>
                <NavbarToggler onClick={props.toggle} />
                <Collapse isOpen={props.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default AppNav;