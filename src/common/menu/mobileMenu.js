import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

class MobileMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton aria-owns={anchorEl ? 'mobile-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick} className="white-font" style={{float:"right"}}>
            <MoreVertIcon />
        </IconButton>
        <Menu
          id="mobile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        ><MenuItem onClick={this.handleClose}>Rooms</MenuItem>
        <MenuItem onClick={this.handleClose}>Reservations</MenuItem>
        <MenuItem onClick={this.handleClose}>Users</MenuItem>
        <MenuItem onClick={this.handleClose}>Roles</MenuItem>
        <MenuItem onClick={this.handleClose}>Partners</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MobileMenu;
