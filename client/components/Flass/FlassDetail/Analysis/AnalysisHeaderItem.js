import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import color from '../../common/colors.scss';

const propTypes = {
  headerName: PropTypes.string.isRequired,
  rangeComponent: PropTypes.object.isRequired,
  headerDetail: PropTypes.string.isRequired,
};

const defaultProps = {};

const Item = styled.div`
  border-radius: 3px;
  background-color: ${color['white']};
  border: solid 1px ${color['cool-grey']};
`;

const Content = styled.div`
  font-weight: 500;
  padding: 1rem 1rem;
`;

const Footer = styled.div`
  text-align: right;
  border-top: solid 1px ${color['cool-grey']};
  padding: .5rem .5rem;
`;

const AnalysisHeaderItem = (props) => {
  const { headerName, rangeComponent, headerDetail } = props;

  return (
    <Item>
      <Content>
        { headerName }
        { rangeComponent }
      </Content>
      <Footer>
        {headerDetail}
      </Footer>
    </Item>
  );
};

AnalysisHeaderItem.propTypes = propTypes;
AnalysisHeaderItem.defaultProps = defaultProps;

export default AnalysisHeaderItem;
