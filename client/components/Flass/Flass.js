import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import FlassDrawer from "./FlassDrawer";
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import SvgIcon from 'material-ui/SvgIcon';
import './Flass.scss';

const propTypes = {};
const defaultProps = {};

const FlassBadge = (<Badge
  badgeContent={4}
  primary={true}>
  <NotificationsIcon />
</Badge>);

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
          title="Flass"
          iconElementRight={<Badge
            badgeContent={4}
            primary={true}
            badgeStyle={{top: 12, right: 12}}>
            <NotificationsIcon className="flass-notification-icon" />
          </Badge>}
        />
        <FlassDrawer/>
      </div>
    );
  }
}

Flass.propTypes = propTypes;
Flass.defaultProps = defaultProps;

export default Flass;
