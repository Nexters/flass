import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './FlassGrid.scss';


const propTypes = {};

const defaultProps = {};

const tilesData = [
  {
    key: 1,
    img: 'http://via.placeholder.com/350x150',
    title: 'Breakfast',
    author: 'jill111'
  },
  {
    key: 2,
    img: 'http://via.placeholder.com/350x150',
    title: 'Tasty burger',
    author: 'pashminu'
  },
  {
    key: 3,
    img: 'http://via.placeholder.com/350x150',
    title: 'Camera',
    author: 'Danson67'
  },
  {
    key: 4,
    img: 'http://via.placeholder.com/350x150',
    title: 'Morning',
    author: 'fancycrave1'
  },
  {
    key: 5,
    img: 'http://via.placeholder.com/350x150',
    title: 'Hats',
    author: 'Hans'
  },
  {
    key: 6,
    img: 'http://via.placeholder.com/350x150',
    title: 'Honey',
    author: 'fancycravel'
  },
  {
    key: 7,
    img: 'http://via.placeholder.com/350x150',
    title: 'Vegetables',
    author: 'jill111'
  },
  {
    key: 8,
    img: 'http://via.placeholder.com/350x150',
    title: 'Water plant',
    author: 'BkrmadtyaKarki'
  }
];

class FlassGrid extends Component {

  componentDidMount() {}

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    return (
      <GridList
        cellHeight={ 200 }
        cols={ 3 }
        padding={ 20 }
        className="flass-grid-list">
        {tilesData.map(tile => (
          <Link to={ `/detail/${tile.key}` }>
            <GridTile
              key={ tile.key }
              className="flass-grid-item"
              title={ tile.title }
              subtitle={ <span>by <b>{tile.author}</b></span> }
              actionIcon={ <IconButton><StarBorder
                color="white" /></IconButton> }>
              <img alt="" src={ tile.img } />
            </GridTile>
          </Link>
        ))}
      </GridList>
    );
  }
}

FlassGrid.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};
FlassGrid.propTypes = propTypes;
FlassGrid.defaultProps = defaultProps;

export default FlassGrid;