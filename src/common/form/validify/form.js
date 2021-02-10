import React from 'react';
import BaseForm from './base';

export default class Form extends React.Component {
  constructor({ values = {}, errors = {} }) {
    super();
    this.state = { values, errors };
  }

  componentWillReceiveProps({ reRender=true, values, errors}) {
    if (reRender) {
      this.setState({ values, errors });
    }
  }

  render() {
    let { values, errors } = this.state;
    let { reRender, children, ...props } = this.props;
    return (
      <BaseForm
        {...props}
        values={values}
        errors={errors}
        onValues={values => this.setState({ values })}
        onErrors={errors => this.setState({ errors })}
      >
        {children}
      </BaseForm>
    );
  }
}
