import toPath from "lodash.topath";
import { isObject } from "./utils";
import { FormValidationError, ErrorSchema } from './index';

function toErrorSchema(errors: FormValidationError[]) {
 
  if (!errors.length) {
    return {};
  }
  return errors.reduce((errorSchema, error) => {
    const { property, message } = error;
    const path = toPath(property);
    let parent: any = errorSchema;

    // If the property is at the root (.level1) then toPath creates
    // an empty array element at the first index. Remove it.
    if (path.length > 0 && path[0] === "") {
      path.splice(0, 1);
    }

    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        parent[segment] = {};
      }
      parent = parent[segment];
    }

    if (Array.isArray(parent.__errors)) {
      // We store the list of errors for this node in a property named __errors
      // to avoid name collision with a possible sub schema field named
      // "errors" (see `validate.createErrorHandler`).
      parent.__errors = parent.__errors.concat(message);
    } else {
      if (message) {
        parent.__errors = [message];
      }
    }
    return errorSchema;
  }, {});
}

export function toErrorList(errorSchema: any, fieldName: string = "root") {  
  console.log('RRRRRRRRRR toErrorList errorSchema', errorSchema);
  if(!errorSchema) return [];

  let errorList: object[] = [];
  if ("__errors" in errorSchema) {
      errorSchema.__errors.forEach((err: string) => errorList.push({[fieldName]: err}))
  }
  
  return Object.keys(errorSchema).reduce((acc, key) => {
    if (key !== "__errors") acc = acc.concat(toErrorList(errorSchema[key], key));    
    return acc;
  }, errorList);

}

const createErrorHandler = (formData: Record<string, any>): any => {
  console.log('createErrorHandler', formData);
  const handler: ErrorSchema = {
    // We store the list of errors for this node in a property named __errors
    // to avoid name collision with a possible sub schema field named
    // "errors" (see `utils.toErrorSchema`).
    __errors: [],
    __addError(message: string) {
      // console.log('addError', message)
      this.__errors.push(message);
    },
  };

  if (isObject(formData)) {
    return Object.keys(formData).reduce((acc, key) => {
      return { ...acc, [key]: createErrorHandler(formData[key]) };
    }, handler);
  }

  if (Array.isArray(formData)) {
    return formData.reduce((acc, value, key) => {
      return { ...acc, [key]: createErrorHandler(value) };
    }, handler);
  }

  return handler;
}


function unwrapErrorHandler(errorHandler: any): any {
  return Object.keys(errorHandler).reduce((acc, key) => {
    if (key === "__addError") {
      return acc;
    } else if (key === "__errors") {
      return { ...acc, [key]: errorHandler[key] };
    }
    return { ...acc, [key]: unwrapErrorHandler(errorHandler[key]) };
  }, {});
}


export default async function validateFormData(
  formData: any,
  customValidate: any  
) {

  let errors: FormValidationError[] = [];
  let errorSchema = toErrorSchema(errors);

  if (typeof customValidate !== "function") {
    return { errors, errorSchema };
  }

  const errorHandler = await customValidate(formData, createErrorHandler(formData));
  const userErrorSchema = unwrapErrorHandler(errorHandler);
  
  return userErrorSchema
}

/**
 * Validates data against a schema, returning true if the data is valid, or
 * false otherwise. If the schema is invalid, then this function will return
 * false.
 */
export function isValid(schema: any, data: any) {

  // try {
  //   return ajv.validate(schema, data);
  // } catch (e) {
  //   return false;
  // }
}
