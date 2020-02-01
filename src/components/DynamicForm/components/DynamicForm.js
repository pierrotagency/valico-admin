import React, { Component } from "react";
import PropTypes from "prop-types";
import _pick from "lodash/pick";


import {
  getDefaultFormState,
  retrieveSchema,
  shouldRender,
  toIdSchema,
  setState,
  getDefaultRegistry,
  deepEquals,
  toPathSchema,
  getFieldNames
} from "../utils";
import validateFormData, { toErrorList } from "../validate";

export default class DynamicForm extends Component {
  
  
  static defaultProps = {
    uiSchema: {},
    noValidate: false,
    liveValidate: false,
    disabled: false,
    safeRenderCompletion: false,
    noHtml5Validate: false,
    omitExtraData: false,
  };

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
    if (
      this.props.onChange &&
      !deepEquals(this.state.formData, this.props.formData)
    ) {
      this.props.onChange(this.state);
    }
    this.formElement = null;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {

    const nextState = this.getStateFromProps(nextProps);
    if (    
      !deepEquals(nextState.formData, nextProps.formData) &&
      !deepEquals(nextState.formData, this.state.formData) &&
      this.props.onChange
    ) {
      this.props.onChange(nextState);
    }
    this.setState(nextState);

  }

  getStateFromProps(props, inputFormData = props.formData) {

    const state = this.state || {};
    const schema = "schema" in props ? props.schema : this.props.schema;
    const uiSchema = "uiSchema" in props ? props.uiSchema : this.props.uiSchema;
    const edit = typeof inputFormData !== "undefined";
    // const liveValidate = props.liveValidate || this.props.liveValidate;
    // const mustValidate = edit && !props.noValidate && liveValidate;
    const { definitions } = schema;

    const formData = getDefaultFormState(schema, inputFormData, definitions);
    const retrievedSchema = retrieveSchema(schema, definitions, formData);
    // const customFormats = props.customFormats;
    const additionalMetaSchemas = props.additionalMetaSchemas;
    // const { errors, errorSchema } = mustValidate
    //   ? this.validate(formData, schema, additionalMetaSchemas, customFormats)
    //   : {
    //       errors: state.errors || [],
    //       errorSchema: state.errorSchema || {},
    //     };

    const { errors, errorSchema } = {
          errors: state.errors || [],
          errorSchema: state.errorSchema || {},
        };

    // const errorSchema = await this.validate(formData, schema, additionalMetaSchemas, customFormats);        
    // const errors = toErrorList(errorSchema)

    const idSchema = toIdSchema(
      retrievedSchema,
      uiSchema["ui:rootFieldId"],
      definitions,
      formData,
      props.idPrefix
    );

    const pathSchema = toPathSchema(retrievedSchema, "", definitions, formData);

    return {
      schema,
      uiSchema,
      idSchema,
      formData,
      edit,
      errors,
      errorSchema,
      additionalMetaSchemas,
      pathSchema,
    };

  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }


  doValidate = async (formData = null) => {    
    if(!formData) formData = this.state.formData

    const errorSchema = await validateFormData(formData, this.props.validate    );          
    const errors = toErrorList(errorSchema)

    console.log(errorSchema)

    setState(this, { errors, errorSchema });

    return { errorSchema, errors }
  };


  getUsedFormData = (formData, fields) => {
    //for the case of a single input form
    if (fields.length === 0 && typeof formData !== "object") {
      return formData;
    }

    return _pick(formData, fields);
  };

  

  onChange = async (formData, newErrorSchema) => {

    // const mustValidate = !this.props.noValidate && this.props.liveValidate;
    let state = { formData };
    let newFormData = formData;

    if (this.props.omitExtraData === true && this.props.liveOmit === true) {
      const newState = this.getStateFromProps(this.props, formData);

      const fieldNames = getFieldNames(
        newState.pathSchema,
        newState.formData
      );

      newFormData = this.getUsedFormData(formData, fieldNames);
      state = {
        formData: newFormData,
      };
    }

    // if (mustValidate) {

    //   const { errors, errorSchema } = await this.validate(newFormData);      
    
    //   state = { formData: newFormData, errors, errorSchema };
    
    // } else if (!this.props.noValidate && newErrorSchema) {
      state = {
        formData: newFormData,
        errorSchema: newErrorSchema,
        errors: toErrorList(newErrorSchema),
      };
    // }

    setState(this, state, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });


  };

  onBlur = async () => {

    const { errors } = await this.doValidate()

    if (this.props.onBlur) {
      this.props.onBlur(this.state.formData, errors);      
    }

  };

  onFocus = (...args) => {
    if (this.props.onFocus) {
      this.props.onFocus(...args);
    }
  };

  onSubmit = async (event) => {
    console.log('onSubmit')
  };

  getRegistry() {
    // For BC, accept passed SchemaField and TitleField props and pass them to
    // the "fields" registry one.
    const { fields, widgets } = getDefaultRegistry();
    return {
      fields: { ...fields, ...this.props.fields },
      widgets: { ...widgets, ...this.props.widgets },
      ArrayFieldTemplate: this.props.ArrayFieldTemplate,
      ObjectFieldTemplate: this.props.ObjectFieldTemplate,
      FieldTemplate: this.props.FieldTemplate,
      definitions: this.props.schema.definitions || {},
      formContext: this.props.formContext || {},
    };
  }

  submit() {
    if (this.formElement) {
      this.formElement.dispatchEvent(new Event("submit", { cancelable: true }));
    }
  }

  render() {
    const {
      children,
      safeRenderCompletion,
      id,
      idPrefix,
      className,
      tagName,
      name,
      method,
      target,
      action,
      autocomplete,
      enctype,
      acceptcharset,
      noHtml5Validate,
      disabled,
      formContext,
    } = this.props;

    const { schema, uiSchema, formData, errorSchema, idSchema } = this.state;
    const registry = this.getRegistry();
    const SchemaField = registry.fields.SchemaField;
    const FormTag = tagName ? tagName : "form";

    return (
      <FormTag
        className={className ? className : "rjsf"}
        id={id}
        name={name}
        method={method}
        target={target}
        action={action}
        autoComplete={autocomplete}
        encType={enctype}
        acceptCharset={acceptcharset}
        noValidate={noHtml5Validate}
        onSubmit={this.onSubmit}
        ref={form => {
          this.formElement = form;
        }}>
        {/* {this.renderErrors()} */}
        <SchemaField
          schema={schema}
          uiSchema={uiSchema}
          errorSchema={errorSchema}
          idSchema={idSchema}
          idPrefix={idPrefix}
          formContext={formContext}
          formData={formData}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          registry={registry}
          safeRenderCompletion={safeRenderCompletion}
          disabled={disabled}
        />
        {children ? (
          children
        ) 
        :         
        (
          <div className="end-dynamic-form">
            {/* <button type="submit" className="btn btn-info">
              Submit***
            </button> */}
          </div>
        )
        }
      </FormTag>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  DynamicForm.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.any,
    widgets: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    ),
    fields: PropTypes.objectOf(PropTypes.func),
    ArrayFieldTemplate: PropTypes.func,
    ObjectFieldTemplate: PropTypes.func,
    FieldTemplate: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onSubmit: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    tagName: PropTypes.string,
    name: PropTypes.string,
    method: PropTypes.string,
    target: PropTypes.string,
    action: PropTypes.string,
    autocomplete: PropTypes.string,
    enctype: PropTypes.string,
    acceptcharset: PropTypes.string,
    noValidate: PropTypes.bool,
    noHtml5Validate: PropTypes.bool,
    liveValidate: PropTypes.bool,
    validate: PropTypes.func,
    transformErrors: PropTypes.func,
    safeRenderCompletion: PropTypes.bool,
    formContext: PropTypes.object,
    customFormats: PropTypes.object,
    additionalMetaSchemas: PropTypes.arrayOf(PropTypes.object),
    omitExtraData: PropTypes.bool,
  };
}
