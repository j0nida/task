import React from 'react'
//import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ReactTable from "react-table"
import { withStyles } from '@material-ui/core/styles';
//import { match } from '../utils'
import './styles.css'

const EditableTable = (props) => {

    let {
        columns,
        showDeleteColumn=true,
        data = [],
        classes,
        children,
        ...otherProps
    } = props;

    if (showDeleteColumn) {
        columns.push({
            Header: " ",
            id: "delete",
            width: 30,
            Cell: (cellInfo) => (
                <IconButton tabIndex="-1" className={classes.deleteButton} aria-label="Delete" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    if(props.onRowDelete)
                        props.onRowDelete(cellInfo.index);
                    return false;
                }}>
                    <DeleteIcon />
                </IconButton>
            )
        })
    }

    const customRowProps = (state, rowInfo, column) => {
        return rowInfo ? {
            tabIndex: (props.focusedRowIndex === rowInfo.index ? -1 : 0),
            className: (props.focusedRowIndex === rowInfo.index ? 'selected-row' : ''),
            onFocus: () => {
                if (props.onRowFocus) 
                    props.onRowFocus(rowInfo.index)
            },
            onClick: () => {
                if (props.onRowFocus)
                    props.onRowFocus(rowInfo.index)
            },
        } : {}
    }

    return (
        <Paper square={false} className={classes.container + ' editable-table'}>
            <ReactTable
                data={data}
                columns={columns}
                showPagination={false}
                sortable={false}
                defaultPageSize={data.length} 
                pageSize={data.length}
                NoDataComponent={() => null}
                getTrProps={customRowProps}
                className="-highlight"
                {...otherProps}
            />
        </Paper>
    )
}


const styles = theme => ({
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
        paddingRight: '110px'
    },
    title: {
        flex: '0 0 auto',
    },
    container: {
        marginTop: '20px',
        marginBottom: '44px',
    },
    deleteButton: {
        margin: 0,
        padding: 0,
        width: '24px',
        height: '24px'
    },
});

export default withStyles(styles)(EditableTable);