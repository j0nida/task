import React, { Component } from 'react';
import { Switch, Route, matchPath } from 'react-router-dom';

import { EmployeesList, EmployeesForm } from './employees';

class AppRoutes extends Component {
    previousLocation = this.props.location;
    modalComponents = [];
    modalRef;

    constructor(props) {
        super(props);

        const nextModal = this.modalRouter(this.props);

        if (nextModal) {
            //(!location.state || !location.state.modal)
            this.previousLocation = this.props.location;
            this.modalComponents.push(nextModal);
        }
    }

    componentWillUpdate(nextProps) {
        const nextModal = this.modalRouter(nextProps);
        if (nextProps.history.action !== 'POP') {
            // set previousLocation if props.location is not modal
            if (nextModal) {
                //(!location.state || !location.state.modal)
                this.previousLocation = this.props.location;
                this.modalComponents.push(nextModal);
            }
        } else if (this.modalComponents.length > 0) {
            this.modalComponents.pop();
            const closingModalState = this.props.location.state;
            nextProps.location.state = { ...nextProps.location.state, LAST_MODAL_STATE: closingModalState };

            const modalRef = this['modalRef' + nextProps.location.key];
            if (modalRef) {
                modalRef.componentWillReceiveProps(nextProps);
            }
        }
    }

    getModalComponents = () => {
        return this.modalComponents.map(component => {
            return <div key={component.props.location.key || component.props.location.pathname}>{component}</div>;
        });
    };

    modalRouter(props) {
        let matchProps;

        const check = path => {
            matchProps = matchPath(props.location.pathname, { path });
            if (matchProps !== null) {
                matchProps = {
                    ...props,
                    match: matchProps,
                    ref: instance => {
                        this['modalRef' + props.location.key] = instance;
                    }
                };
                return true;
            }

            return false;
        };

        switch (true) {
            case check('/:id'):
                return <EmployeesForm {...matchProps} />;

            default:
                return null;
        }
    }

    render() {
        const { location } = this.props;
        const isModal = !!(this.modalComponents.length > 0 && this.previousLocation !== location); // not initial render
        return (
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route path="/" component={EmployeesList} />
                </Switch>

                {this.getModalComponents()}
            </div>
        );
    }
}

export default AppRoutes;
