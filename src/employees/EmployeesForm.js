import React, { Component } from 'react';
import { DialogFormSmall, closeModal } from '../common/modal';
import { InputControl } from '../common/form';
import { Employees } from './';
import db from '../common/db/db_hms'; //HmsDB as db


export default class EmployeesForm extends Component {
    state = {
        open: true,
        values: {

        },
        secondPhone: false,
        secondEmail: false
    };

    rules = () => Employees.schemaFields();

    async componentDidMount() {
        console.log(this.props);
        db.info().then(function (info) {
            console.log(info);
          });

        this.model = await Employees.load(this.props.match.params.id);
        // console.log(this.props.match.params.id);

        this.setState({
            values: this.model.data()
        });
    }

    saveForm = values => {

      //  console.log(values);
         const val ={
            _id : values.name,
             ...values,
        };
      //   console.log(val);
          db.put(val, function callback(err, result) {
              if (!err) {
                console.log(result);
                // console.log('Success!');
              }else{
                console.log(err);
              }
            });
    };

    onClose = () => {
        closeModal(this);
    };

    onFormValues = values => {
        this.setState({ values });
    };

    onFormErrors = errors => {
        this.setState({ errors });
    };

    render() {
        return (
            <DialogFormSmall
                openDialog={this.state.open}
                title={Employees.resource()}
                rules={this.rules()}
                values={this.state.values}
                errors={this.state.errors}
                onValues={this.onFormValues}
                onErrors={this.onFormErrors}
                onSave={this.saveForm}
                onCancel={this.onClose}
            >
                <div className="row">
                    <InputControl name="name" />
                </div>
                <div className="row">
                    <InputControl name="position" />
                </div>
                <div className="row">
                    <InputControl name="birthday" />
                </div>
                <div className="row">
                    <InputControl name="email" label="Contact Email" />
                    {this.state.secondPhone ? <InputControl name="secondEmail" label="Contact Email" /> : null }
                    <div className="small-btn float-right">
                        <button onClick={() => {this.setState({secondPhone: false})}} type="button" className="btn btn-link">
                            -
                        </button>
                        <button onClick={() => {this.setState({secondPhone: true})}} type="button" className="btn btn-link">
                            +
                        </button>
                    </div>
                </div>
                <div className="row">
                    <InputControl name="phone" label="Contact Phone" />
                    {this.state.secondEmail ? <InputControl name="secondPhone" label="Contact Phone" /> : null }
                    <div className="small-btn float-right">
                        <button onClick={() => {this.setState({secondEmail: false})}} type="button" className="btn btn-link">
                            -
                        </button>
                        <button onClick={() => {this.setState({secondEmail: true})}} type="button" className="btn btn-link">
                            +
                        </button>
                    </div>
                </div>
            </DialogFormSmall>
        );
    }
}