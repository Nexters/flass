import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import FlassDrawer from "./FlassDrawer";
import SvgIcon from 'material-ui/SvgIcon';
import './Flass.scss';
import FlassBadge from "./FlassBadge";

const propTypes = {};
const defaultProps = {};

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </SvgIcon>
);

const FlassUserAppBar = (<div>
  이름 <HomeIcon />
</div>);

const AppBarRight = (
  <div>
    <FlassBadge />
  </div>
);

class Flass extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          title="Flass"
          titleStyle={{paddingTop: 13, paddingLeft: 13}}
          iconElementRight={<FlassBadge />}
        />
        <FlassDrawer/>
      </div>
    );
  }
}

Flass.propTypes = propTypes;
Flass.defaultProps = defaultProps;

export default Flass;
