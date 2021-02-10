import React, { Component } from 'react'
import { TableComponent } from '../common/table'
import { onModalClose } from '../common/modal'
import { Employees } from './'

export default class EmployeesList extends Component {

    state = {
        records: []
    }

    loadData = async () => {
        const result = await Employees.all();
        this.setState({ records: result.rows });
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        onModalClose('EmployeesForm', nextProps, this.loadData);
    }

    onRowClick = (data)=>{
        this.props.history.push(Employees.url(data.id));
    }

    render() {
        return (
            <TableComponent 
                title={Employees.resource()}
                createLink={Employees.url('create')}
                onRowClick={this.onRowClick}
                data={this.state.records}
                columns={[
                    {
                        Header: "Name",
                        accessor: "doc.name"
                    }, {
                        Header: "Position",
                        accessor: "doc.position"
                    }, {
                        Header: "Email",
                        accessor: "doc.email"
                    }, {
                        Header: "Phone",
                        accessor: "doc.phone"
                    }, {
                        Header: "Description",
                        accessor: "doc.description",
                        //Filter: (params) => SelectFilter({...params, options: this.descriptionFilterOptions})
                    },
                ]}/>
        )
    }
}