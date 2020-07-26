import DynamicForm from "./components/DynamicForm";
import withTheme from "./withTheme";


export interface FormValidationError {
    property: string,
    message: string,
};  

export interface ErrorSchema {
    __errors: string[],
    __addError: (message: string) => void,
};  

// export interface FormData {
//     __errors: string[],
//     __addError: (message: string) => void,
// };  


export { withTheme };
export default DynamicForm;
