import React from 'react';
import styled from 'styled-components';

import color from '~/css/base/colors.scss';

const Container = styled.div`
  font-size: 15px;
  margin-top: 20px;
  margin-right: 40px;
  color: #a7acad;
  text-align: right;
  padding-bottom: 10px;
  color: ${color['cool-grey']};
`;


const CustomerService = () => {
    return (
        <Container>
            우주컴퍼니팀 | 문의  flassadm@gmail.com
        </Container>
    );
};

export default CustomerService;
