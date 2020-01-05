import React from "react";

export default props => (
  <div className="foo">
    <h2>FOO</h2>
    {props.fields.title && <h3>{props.fields.title}</h3>}
    {props.fields.subtitle && <h4>{props.fields.subtitle}</h4>}
  </div>
);
