import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './FlassGrid.scss';


const propTypes = {
  items: PropTypes.array.isRequired,
  fetchRequestMyChannelItems: PropTypes.func.isRequired
};

const defaultProps = {
};

class FlassGrid extends Component {

  componentDidMount() {
    this.props.fetchRequestMyChannelItems('1');
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  renderChild() {
    const { items } = this.props;
    return items.map(item => (
      <Link to={ `/detail/${item.key}` }>
        <GridTile
          key={ item.key }
          className="flass-grid-item"
          title={ item.title }
          subtitle={ <span>by <b>{item.author}</b></span> }
          actionIcon={ <IconButton><StarBorder
            color="white" /></IconButton> }>
          <img alt="" src={ item.img } />
        </GridTile>
      </Link>
    ));
  }

  render() {
    return (
      <GridList
        cellHeight={ 200 }
        cols={ 3 }
        padding={ 20 }
        className="flass-grid-list">
        {this.renderChild()}
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
