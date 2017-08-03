import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import './FlassDrawer.scss';

const propTypes = {
};

const defaultProps = {
};

class FlassDrawer extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Navbar className="flass-drawer" fluid>
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>
              <ContentInbox />
            </Navbar.Brand>
          </LinkContainer>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/channel/me">
            <NavItem>
              <ContentInbox />
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/upload">
            <NavItem>
              <ActionGrade />
            </NavItem>
          </LinkContainer>
          <NavItem>
            <ContentDrafts />
          </NavItem>
          <NavItem>
            <ContentInbox />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

FlassDrawer.propTypes = propTypes;
FlassDrawer.defaultProps = defaultProps;

export default FlassDrawer;
