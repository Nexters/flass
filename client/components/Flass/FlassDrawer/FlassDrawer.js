import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Route } from 'react-router-dom';
import { ListGroup, ListGroupItem, Nav, Navbar, NavItem } from 'react-bootstrap';
import styled from 'styled-components';
import SideHome from './images/side-home.png';
import SideHomeActive from './images/side-home-active.png';
import SideUpload from './images/side-upload.png';
import SideUploadActive from './images/side-upload-active.png';
import color from '../common/colors.scss';
import './FlassDrawer.scss';

const FlassMark = styled.div`
  font-family: ArialRoundedMT;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  color: ${color['light-navy']};
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const FlassMenu = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: 7rem;
  text-align: center;
  padding: 1rem 0;
`;

const FlassMenuImage = styled.img`
  max-height: 100%;  
  max-width: 100%; 
  width: 17px;
  height: auto;
  position: absolute;  
  top: 0;  
  bottom: 0;  
  left: 0;  
  right: 0;  
  margin: auto;
`;

const ClickLine = styled.div`
  width: 5px;
  height: 100%;
  border-radius: 100px;
  background-color: ${color['light-navy']};
  float: right;
`;


const propTypes = {
};

const defaultProps = {
};

class FlassDrawer extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="flass-drawer">
        <Link to="/">
          <FlassMark>F</FlassMark>
        </Link>
        <Route
          path="/home"
          children={({ match }) =>
            (
              <FlassMenu
                to="/home" >
                <FlassMenuImage alt="" width="17" src={ match ? SideHomeActive : SideHome } />
                {match ? <ClickLine /> : ''}
              </FlassMenu>
            )} />
        <Route
          path="/upload"
          children={({ match }) =>
            (
              <FlassMenu
                to="/upload" >
                <FlassMenuImage alt="" width="17" src={ match ? SideUploadActive : SideUpload } />
                {match ? <ClickLine /> : ''}
              </FlassMenu>
            )} />
      </div>
    );
  }
}

FlassDrawer.propTypes = propTypes;
FlassDrawer.defaultProps = defaultProps;

export default FlassDrawer;
