import React from 'react';
import { Link } from 'react-router-dom'

export default ({ ...props }) => {

  const formColumnClass = props.formColumnClass || '';
  const formTitle = props.title || (!props.type ? 'Create/Edit' : (props.type === 'create' ? 'Create' : 'Edit'));
  const resourceLabel = props.resourceLabel || props.resource;
  
  return (
    <div className="container">
      <div className={formColumnClass}>
        <div className="row">
          <div className="col">
            <h2>
              <Link className="text-capitalize" to={'/' + props.resource}>{resourceLabel}</Link>&nbsp;
              {formTitle}
            </h2>
          </div>
        </div>
        <hr />

        {props.children}

      </div>
    </div>
  );
};
