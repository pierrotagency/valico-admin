import React from "react";

export default props => (
  <div className="bar">
    <h2>BAR</h2>
    {props.fields.title && <h3>{props.fields.title}</h3>}
    {props.fields.subtitle && <h4>{props.fields.subtitle}</h4>}
    <ul>
    {props.fields.tasks.map((item, index) => (
      <li key={index}>{item.title}</li>
    ))}
    </ul>
  </div>
);
