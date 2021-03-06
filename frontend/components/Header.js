import React, { useState } from 'react';
import { APP_NAME } from '../config'
import Link from 'next/link'
import { signout, isAuth } from '../actions/auth'
import Router from 'next/router'
import NProgress from 'nprogress';

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

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()



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
            {<NavLink href='/blogs'>
              <Button  color='link' >Blogs</Button>
            </NavLink>}

            {
              !isAuth() &&
              (<React.Fragment>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink>
                      <Button color='link'>SignUp</Button>
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signin'>
                    <NavLink>
                      <Button color='link'>SignIn</Button>
                    </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
              )}

            {
              isAuth() && isAuth().role === 0 &&
              (
                <Link href='/user'>
                  <NavLink>
                    <Button color='link'>
                      {`${isAuth().name}'s Dashboard`}
                    </Button>
                  </NavLink>
                </Link>
              )
            }

            {
              isAuth() && isAuth().role === 1 &&
              (
                <Link href='/admin'>
                  <NavLink>
                    <Button color='link'>
                      {`${isAuth().name}'s Dashboard`}
                    </Button>
                  </NavLink>
                </Link>
              )
            }


            {
              isAuth() &&
              (
                // <NavItem>
                // <Link href='/signin'>
                <NavLink>
                  <Button color='link' onClick={() => signout(() => Router.replace(`/signin`))}>SignOut</Button>
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