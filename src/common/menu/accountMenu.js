import React from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

class AccountMenu extends React.Component {
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
        {/* <IconButton aria-owns={anchorEl ? 'account-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick} className="white-font" style={{float:"right"}}>
            <AccountCircleIcon />
        </IconButton> */}
        <ButtonBase onClick={this.handleClick} aria-owns={anchorEl ? 'account-menu' : null} style={{marginRight:7, padding:6}}>
          <Typography variant="subtitle1" className="white-font" style={{ marginRight:10 }}>Admin</Typography><Avatar alt="Admin" style={{ width: 30, height:30 }}>AP</Avatar>
        </ButtonBase>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default AccountMenu;
