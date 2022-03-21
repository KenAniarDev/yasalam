import useToggle from 'hooks/useToggle';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HamburgerMenu from './menu/Menu';
import { Nav, NavContainer, NavLogo } from './Navbar.styled';
import NavItems from './navItem/NavItems';

const Navbar = () => {
  const [state, toggle] = useToggle();

  return (
    <Nav>
      <NavContainer>
        <Link href='/' passHref>
          <NavLogo>
            <Image
              src='/yasalamlogo.png'
              alt='YaSalam Logo'
              layout='fixed'
              width={24}
              height={42}
              unoptimized
            />
          </NavLogo>
        </Link>
        <NavItems open={state} toggle={toggle} />
        <HamburgerMenu toggle={toggle} open={state} />
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
