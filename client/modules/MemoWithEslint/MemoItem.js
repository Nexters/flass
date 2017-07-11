import React from 'react';
import PropTypes from 'prop-types';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { ListItem } from 'material-ui';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  deleteMemo: PropTypes.func.isRequired,
  memo: PropTypes.shape({
    id: PropTypes.string,
    txt: PropTypes.string
  })
};

const defaultProps = {
  memo: {}
};

const MemoItem = props => {
  const { txt = '', id } = props.memo;

  return (
    <div>
      <ListItem
        primaryText={ txt }
        onClick={ () => props.handleClick(id) }
        rightIcon={ <ActionGrade onClick={ () => props.deleteMemo(id) } /> } />
    </div>
  );
};

MemoItem.propTypes = propTypes;
MemoItem.defaultProps = defaultProps;

export default MemoItem;
