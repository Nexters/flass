import React, { PureComponent } from 'react';
import { Loading } from './styled';

class AnalysisLoadingComponent extends PureComponent {
  render() {
    return (
      <Loading.Wrapper>
        <Loading.Text>
          등록된 문제가 없습니다.
        </Loading.Text>
      </Loading.Wrapper>
    );
  }
}

export default AnalysisLoadingComponent;
