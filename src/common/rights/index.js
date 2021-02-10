import React, { Component } from 'react';

const Context = React.createContext('restricted');

const Provider = ({ rights, children }) => <Context.Provider value={rights}>{children}</Context.Provider>;

class Restricted extends Component {
    renderComponent(rights = {}) {
        const { model, right, children, preventHide = false, shouldRestrict = true } = this.props;
        const modelRights = Object.keys(rights[model] || {}).filter(mr => rights[model][mr] === '1');
        let hasRight = false;

        if (Array.isArray(right)) {
            hasRight = modelRights.some(r => right.includes(r));
        } else {
            hasRight = modelRights.includes(right);
        }

        if (preventHide) {
            const restrictedRights = modelRights.reduce((acc, right) => ({ ...acc, [right]: '1' }), {});

            return (
                <Context.Provider value={{ rights: restrictedRights }}>
                    <Context.Consumer>{children}</Context.Consumer>
                </Context.Provider>
            );
        }

        return shouldRestrict ? (hasRight ? children : null) : children;
    }

    render() {
        return <Context.Consumer>{rights => this.renderComponent(rights)}</Context.Consumer>;
    }
}

export { Provider, Restricted };
