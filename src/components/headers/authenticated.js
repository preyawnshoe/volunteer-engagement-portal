import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as LogOutIcon } from "feather-icons/dist/icons/log-out.svg";

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-flex items-center`;

export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoutButton = styled.button`
  ${tw`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
  bg-transparent border-none cursor-pointer inline-block`}
  
  .icon {
    ${tw`w-4 h-4 mr-1 inline-block`}
  }
  
  &:hover {
    ${tw`text-primary-500 border-primary-500`}
  }
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({ roundedHeaderButton = false, logoLink, links, className, collapseBreakpointClass = "lg" }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tempUserData');
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.userType) {
      case 'volunteer':
        return '/volunteer/dashboard';
      case 'ngo':
        return '/ngo/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };

  const getAuthenticatedLinks = () => [
    <NavLinks key={1}>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact Us</NavLink>
      <NavLink href={getDashboardLink()}>Dashboard</NavLink>
      <LogoutButton onClick={handleLogout}>
        <LogOutIcon className="icon" />
        Logout
      </LogoutButton>
    </NavLinks>
  ];

  const getUnauthenticatedLinks = () => [
    <NavLinks key={1}>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact Us</NavLink>
      <NavLink href="/login" tw="lg:ml-12!">
        Login
      </NavLink>
      <PrimaryLink css={roundedHeaderButton && tw`rounded-full`} href="/signup">Join as Volunteer</PrimaryLink>
    </NavLinks>
  ];

  const getMobileAuthenticatedLinks = () => [
    <NavLinks key={1}>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact Us</NavLink>
      <NavLink href={getDashboardLink()}>Dashboard</NavLink>
      <LogoutButton onClick={handleLogout} tw="justify-center w-full">
        <LogOutIcon className="icon" />
        Logout
      </LogoutButton>
    </NavLinks>
  ];

  const getMobileUnauthenticatedLinks = () => [
    <NavLinks key={1}>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact Us</NavLink>
      <NavLink href="/login">Login</NavLink>
      <PrimaryLink css={roundedHeaderButton && tw`rounded-full`} href="/signup">Join as Volunteer</PrimaryLink>
    </NavLinks>
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
      NGO Connect
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || (isAuthenticated ? getAuthenticatedLinks() : getUnauthenticatedLinks());

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
          {isAuthenticated ? getMobileAuthenticatedLinks() : getMobileUnauthenticatedLinks()}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
}; 