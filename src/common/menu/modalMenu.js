import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import Typography from '@material-ui/core/Typography'
import { Transition } from '../modal'

class ModalMenu extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <IconButton className="white-font" onClick={this.handleClickOpen}><ViewModuleIcon /></IconButton>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition} 
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="all-menu-items-title"
                    maxWidth="md"
                >
                    <DialogTitle id="all-menu-items-title">
                        {"All Menu Pages"}
                    </DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-md-4">
                                <Typography variant="subtitle1">Frontdesk</Typography>
                                <ul className="nav-all">
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all active" to="/" onClick={this.handleClose}>Home</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/reservations-calendar" onClick={this.handleClose}>Calendar</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/reservations" onClick={this.handleClose}>Reservations</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/reservationsview" onClick={this.handleClose}>One Reservation ex</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/newreservation" onClick={this.handleClose}>New Reservation</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/groups" onClick={this.handleClose}>Groups</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/clients" onClick={this.handleClose}>Clients test</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/events" onClick={this.handleClose}>Events</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <Typography variant="subtitle1">Backoffice</Typography>
                                <ul className="nav-all">
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/bedtypes" onClick={this.handleClose}>Bed Types</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/channels" onClick={this.handleClose}>Sales Channels</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/partners" onClick={this.handleClose}>Partners</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/extras-step" onClick={this.handleClose}>Extras</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/facilities" onClick={this.handleClose}>Facilities</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/roomrates" onClick={this.handleClose}>Room Rates</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/rooms" onClick={this.handleClose}>Rooms</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/roomtypes" onClick={this.handleClose}>Room Types</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/employees" onClick={this.handleClose}>Employees</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/products" onClick={this.handleClose}>Products</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/productcategories" onClick={this.handleClose}>Product Categories</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <Typography variant="subtitle1">Finance</Typography>
                                <ul className="nav-all">
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/invoices" onClick={this.handleClose}>Invoices</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/taxes" onClick={this.handleClose}>Taxes</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/sell" onClick={this.handleClose}>POS Register</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/suppliers" onClick={this.handleClose}>Suppliers</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <Typography variant="subtitle1">Reports</Typography>
                                <ul className="nav-all">
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all active" to="/" onClick={this.handleClose}>Home</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <Typography variant="subtitle1">Settings</Typography>
                                <ul className="nav-all">
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/roles" onClick={this.handleClose}>Roles</Link>
                                    </li>
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/settings" onClick={this.handleClose}>Settings</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <Typography variant="subtitle1">Accounts</Typography>
                                <ul className="nav-all">
                                    <li className="nav-item-all">
                                        <Link className="nav-link-all" to="/users" onClick={this.handleClose}>Users</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ModalMenu;