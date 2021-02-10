import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = {
    list: {
        width: 250,
        margin: 10
    },
    fullList: {
        width: 'auto'
    }
};

class SideInfo extends React.Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const getDate = moment().format('DD MMMM');

        return (
            <div>
                <div className={classes.list}>
                    <Typography variant="h5">Today</Typography>
                    <Typography variant="h4">{getDate}</Typography>
                </div>
                <Divider />
                <div className={classes.list}>
                    <Typography variant="h6">Notifications</Typography>
                    <Divider style={{ marginBottom: 10 }} />
                </div>
                <div className={classes.list}>
                    <Typography variant="h6">Weather</Typography>
                    <Divider />
                </div>
            </div>
        );
    }
}

SideInfo.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SideInfo);
