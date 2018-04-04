import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import {
  SideHome,
  SideHomeActive,
  SideUpload,
  SideUploadActive,
  FlassLogo
} from './images';
import color from '../../../css/base/colors.scss';
import './Drawer.scss';

const FlassMark = styled.div`
  display: flex;
  padding-top: 2.8125rem;
  padding-bottom: 3rem;
`;

const FlassLogoImg = styled.img`
  margin: auto;
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

class Drawer extends Component {
  render() {
    return (
      <div className="flass-drawer">
        <Link to="/">
          <FlassMark>
            <FlassLogoImg srcSet={ FlassLogo } alt="Flass logo" />
          </FlassMark>
        </Link>
        <Route
          path="/home"
          children={ ({ match }) =>
            (
              <FlassMenu
                to="/home" >
                <FlassMenuImage alt="" width="17" src={ match ? SideHomeActive : SideHome } />
                {match && <ClickLine />}
              </FlassMenu>
            ) } />
        <Route
          path="/upload"
          children={ ({ match }) =>
            (
              <FlassMenu
                to="/upload" >
                <FlassMenuImage alt="" width="17" src={ match ? SideUploadActive : SideUpload } />
                {match && <ClickLine />}
              </FlassMenu>
            ) } />
      </div>
    );
  }
}

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;

export default Drawer;
