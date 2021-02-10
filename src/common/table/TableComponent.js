import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
//import { findDOMNode } from "react-dom"
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
import FileDownloadIcon from '@material-ui/icons/GetApp';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ReactTable from 'react-table';
//import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles';
import { match, exportCSV } from '../utils';
import ActionMenu from './actionMenu';
import get from 'lodash/get';
import './styles.css';

import { Restricted } from '../rights';

const styles = theme => ({
    spacer: {
        flex: '1 1 100%'
    },
    actions: {
        color: theme.palette.text.secondary,
        display: 'flex'
    },
    title: {
        flex: '0 0 auto'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

export class TableComponent extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {
            filterable: props.filterable || false,
            anchorEl: null
        };
    }

    componentWillMount() {
        if (this.props.onFiltersOpen && this.state.filterable) this.props.onFiltersOpen();
    }

    handleRowClick = (rowInfo, hasRight) => {
        const { onRowClick } = this.props;

        if (rowInfo && hasRight) {
            return {
                onClick: e => onRowClick && onRowClick(rowInfo.original)
            };
        }

        return {};
    };

    toggleFilters = () => {
        this.setState({ filterable: !this.state.filterable }, () => {
            if (this.props.onFiltersOpen && this.state.filterable) this.props.onFiltersOpen();
        });
    };

    defaultFilterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id;

        return row[id] !== undefined ? match(filter.value, row[id]) : true;
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    exportDataToCSV = () => {
        const { title = '', exportFilename, columns, data } = this.props;

        let csvData;

        if (this.props.getCSVDataToExport) {
            csvData = this.props.getCSVDataToExport();
        } else {
            const csvColumns = columns.map(col => col.Header);
            const csvRows = data.map(row =>
                columns.map(col => {
                    if (typeof col.accessor === 'function') return col.accessor(row); //if the displayed value is done with a function call it to give the same result

                    return get(row, col.accessor);
                })
            );
            csvData = [csvColumns, ...csvRows];
        }

        exportCSV(csvData, exportFilename || title + ' Export ' + new Date().toJSON().substring(0, 10));
    };

    render() {
        const {
            title,
            createLink,
            columns,
            data = [],
            defaultPageSize = 10,
            classes,
            children,
            tableRef,
            anchorEl,
            restricted = false,
            rowClickRight = 'edit',
            ...otherProps
        } = this.props;

        return (
            <Paper square={false}>
                <Toolbar style={{ backgroundColor: '#30aabc' }}>
                    <div className={classes.title}>
                        <Typography className="text-capitalize" variant="h6">
                            {title}
                        </Typography>
                    </div>

                    <Restricted model={title} right="create">
                        <div>
                            <Tooltip title="Add">
                                <IconButton aria-label="Add" component={Link} to={createLink}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Restricted>

                    <div className={classes.spacer} />

                    <div className={classes.actions}>
                        {children}

                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list" onClick={this.toggleFilters}>
                                {this.state.filterable ? <ClearIcon /> : <SearchIcon />}
                            </IconButton>
                        </Tooltip>

                        <div className="desktop-actions">
                            <Tooltip title="Print">
                                <IconButton aria-label="PDF/Print">
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Export">
                                <IconButton aria-label="Export" onClick={this.exportDataToCSV}>
                                    <FileDownloadIcon />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <div className="actionmenu-mobile">
                            <ActionMenu />
                        </div>
                    </div>
                </Toolbar>

                <Restricted model={title} right="create" shouldRestrict={restricted}>
                    <Fab color="secondary" aria-label="add" className="fab-add" component={Link} to={createLink}>
                        <AddIcon />
                    </Fab>
                </Restricted>

                <Restricted model={title} right="list" preventHide shouldRestrict={restricted}>
                    {({ rights }) => (
                        <ReactTable
                            data={rights.list !== '1' ? data : []}
                            filterable={this.state.filterable}
                            getTrProps={(state, rowInfo) => this.handleRowClick(rowInfo, rights[rowClickRight] !== '1')}
                            container={tableRef}
                            columns={columns}
                            defaultPageSize={defaultPageSize}
                            defaultFilterMethod={this.defaultFilterMethod}
                            className=" -highlight"
                            ref={input => {
                                this.myInput = input;
                            }}
                            {...otherProps}
                        />
                    )}
                </Restricted>
            </Paper>
        );
    }
}

export default withStyles(styles)(TableComponent);
