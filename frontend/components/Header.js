import React, { useState } from 'react';
import { APP_NAME } from '../config'
import Link from 'next/link'
import { signout, isAuth } from '../actions/auth'
import Router from 'next/router'

import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

// import { Router } from 'next/router';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);


  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{APP_NAME}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          
            {
            !isAuth() &&
            (<React.Fragment>
            <NavItem>
              <Link href='/signup'>
                <NavLink>
                  <Button color='link' class='buttonNav'>SignUp</Button>
                </NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href='/signin'>
                <NavLink>
                  <Button color='link' class='buttonNav'>SignIn</Button>
                </NavLink>
              </Link>
            </NavItem>
            </React.Fragment>
            )}

            {
              isAuth() &&
              (
                // <NavItem>
                // <Link href='/signin'>
                <NavLink>
                    <Button class='buttonNav' color='link' onClick={() => signout(() => Router.replace(`/signin`))}>SignOut</Button>
                  </NavLink>
                // </Link>
                // </NavItem>
                )
              }
              </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;