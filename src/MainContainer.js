import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Badge from '@material-ui/core/Badge'
import { menuItems, AccountMenu, MobileMenu, SideInfo } from './common/menu'
import { Route } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { Footer } from './common/footer'
import { Restricted } from './common/rights'


const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    hide: {
        display: 'none'
    },
    drawerPaper: {
        backgroundColor: '#03363D',
        position: 'fixed',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    },
    spacer: {
        flex: '1 1 1%'
    },
    avatar: {
        color: '#fff',
        backgroundColor: '#C2185B'
    },
    accountButton: {},
    mobileButton: {},
    allmenuButton: {}
});

class MainContainer extends React.Component {
    state = {
        open: false,
        selectedMainMenuIndex: 0,
        right: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true, changeclass: !this.state.changeclass });
    };

    handleDrawerClose = () => {
        this.setState({ open: false, changeclass: !this.state.changeclass });
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

    renderMainMenuItems = () => {
        return menuItems.map((item, index) => {
            if (item.type === 'divider') return <Divider key={item.name} />;
            const Item = (
                <ListItem
                    button
                    component={Link}
                    to={item.url}
                    key={item.name}
                    onClick={() => {
                        this.setState({ selectedMainMenuIndex: index });
                    }}
                >
                    <ListItemIcon style={{ color: 'rgba(255, 255, 255, 0.91)' }}>
                        {React.createElement(item.icon)}
                    </ListItemIcon>
                    <ListItemText primary={item.label} disableTypography style={{ color: 'rgba(255, 255, 255, 0.91)' }} className="white-font" />
                </ListItem>
            );

            if (item.restrict) {
                const { model, right } = item.restrict;

                return (
                    <Restricted key={item.name} model={model} right={right}>
                        {Item}
                    </Restricted>
                );
            }

            return Item;
        });
    };

    renderTopMenuItems = () => {
        return menuItems[this.state.selectedMainMenuIndex].topMenuItems.map(item => {
            const Item = (
                <li key={item.name} className="nav-item">
                    <Link className="nav-link" to={item.url}>
                        {item.label}
                    </Link>
                </li>
            );

            if (item.restrict) {
                const { model, right } = item.restrict;

                return (
                    <Restricted key={item.name} model={model} right={right}>
                        {Item}
                    </Restricted>
                );
            }

            return Item;
        });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift) + ' main-header'}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img
                            alt="logo"
                            height="40px"
                            src="http://strowberrycode.com/wp-content/uploads/2017/10/hb-logo-1.png"
                        />
                        <div className="desktop-menu">
                            <ul className="nav">{this.renderTopMenuItems()}</ul>
                        </div>
                        <div className={classes.spacer} />
                        <div className={classes.accountButton}>
                            <AccountMenu />
                        </div>
                        <div className={classes.mobileButton + ' mobile-menu'}>
                            <MobileMenu />
                        </div>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.toggleDrawer('right', true)}
                            className={classes.menuButton}
                        >
                            <Badge badgeContent={4} color="secondary">
                                <FormatListBulletedIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <SwipeableDrawer
                anchor="right"
                open={this.state.right}
                onClose={this.toggleDrawer('right', false)}
                onOpen={this.toggleDrawer('right', true)}
                >
                <div
                    tabIndex={0}
                    //role="button"
                    //onClick={this.toggleDrawer('right', false)}
                    //onKeyDown={this.toggleDrawer('right', false)}
                >
                    <SideInfo />
                </div>
                </SwipeableDrawer>

                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <Typography style={{ color: '#ffffff' }} variant="h6">
                            Aste Guesthouse
                        </Typography>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{this.renderMainMenuItems()}</List>
                    <div className={classes.spacer} />
                    <Divider />
                    <ListItem style={{ padding: '10px' }}>
                        <Avatar alt="HB" src="http://strowberrycode.com/wp-content/uploads/2017/10/logo-red-strw.png" />
                        <ListItemText disableTypography primary="HotelBee" secondary="V 1.0" className="white-font" />
                    </ListItem>
                </Drawer>
                <main
                    className={classes.content}
                    style={
                        {
                            //overflowY: 'auto'
                        }
                    }
                >
                    <div className={classes.toolbar} />
                    <div
                        className={this.state.changeclass ? 'slideleft withslide' : 'slideleft'}
                        style={
                            {
                                //flex: '1 1 auto'
                            }
                        }
                    >
                        <Route component={AppRoutes} />
                    </div>

                    <Footer site="HotelBee" />
                </main>
            </div>
        );
    }
}

MainContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MainContainer);
