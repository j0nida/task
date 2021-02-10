import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Tooltip from '@material-ui/core/Tooltip'

class ActionMenu extends React.Component {
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
        <Tooltip title="More">  
            <IconButton
            aria-owns={anchorEl ? 'action-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            </Tooltip>
            <Menu
            id="action-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            >
            <MenuItem onClick={this.handleClose}>Print</MenuItem>
            <MenuItem onClick={this.handleClose}>Export</MenuItem>
            <MenuItem onClick={this.handleClose}>Delete</MenuItem>
            </Menu>
        
      </div>
    );
  }
}

export default ActionMenu;