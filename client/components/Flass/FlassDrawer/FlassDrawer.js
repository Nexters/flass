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

const FlassMenuIcon = styled(Link)`
  display: block;
  text-align: center;
  padding: 1.5rem 0;
`;

const FlassMenuIconImage = styled.img`
  vertical-align: center;
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
              <FlassMenuIcon
                to="/home" >
                <img alt="" src={ match ? SideHomeActive : SideHome } />
              </FlassMenuIcon>
            )} />
        <Route
          path="/upload"
          children={({ match }) =>
            (
              <FlassMenuIcon
                to="/upload" >
                <img alt="" src={ match ? SideUploadActive : SideUpload } />
              </FlassMenuIcon>
            )} />
      </div>
    );
  }
}

FlassDrawer.propTypes = propTypes;
FlassDrawer.defaultProps = defaultProps;

export default FlassDrawer;
