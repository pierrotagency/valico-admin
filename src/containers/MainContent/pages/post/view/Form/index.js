import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import Hotkeys from 'react-hot-keys';
// import { useUndo } from "react-router";

import { templates, taxonomies, types } from 'valico-sanmartin'

import Breadcrumb from '../../_common/Breadcrumb';
import { saveViewPost, storeViewPost, addLocalTags } from "../../../../../../store/actions";
import useBack from '../../../../../../hooks/useBack';
import useForm from '../../../../../../hooks/useForm';
import DynamicForm from '../../../../../../components/DynamicForm'


import ActionsMenu from "../ActionsMenu";
import MetaCard from '../MetaCard';
import ChildsCard from '../ChildsCard';
import ParamsCard from '../ParamsCard';
import { fieldSchema, validationSchema } from './formSchema'
import { parseBackendValidations, validateField } from '../../../../../../helpers/validation';

// import usePrevious from '../../../../../../hooks/usePrevious'


function Form() {

    const viewPost = useSelector(state => state.post.viewPost);    
    const loadingViewPost = useSelector(state => state.post.loadingViewPost);
    const savingPost = useSelector(state => state.post.savingPost);
    const savingPostError = useSelector(state => state.post.savingPostError);    
    const tags = useSelector(state => state.tag.tags);        

    const dispatch = useDispatch();
    // const history = useBack();

    const { state: post, set: setPost, init, undo, redo, clear, canUndo, canRedo } = useBack({});

    const { form, setForm, errors, handleOnChange, saveDisabled, setBackendErrors, setDirty, validateForm } = useForm(fieldSchema, validationSchema);

    // const prevDynamicForm = usePrevious(form.data);
    
    // add backend validations to stack of errors
    useEffect(() => {       
        if(savingPostError && savingPostError.validations){ // if the ajax response is an error, check if the response has validations attached and add them to state
            setBackendErrors(savingPostError.validations)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps  
    },[savingPostError]);

    useEffect(() => {       
        setPost(viewPost)		
        init(viewPost)
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [viewPost]);

    // refresh Form object ONLY when theres a real object to fill
    useEffect(() => {
        if(post && Object.keys(post).length > 1){                 
            setForm(post)       
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [post]);


    const handlePostSave = async () => {
        if(saveDisabled) return false

        // Force to check all fields before saving (in case hotcheck wasn't active due a non dirty form)
        const validForm = await validateForm(true)
        if(!validForm) return false

        const fieldsToAddToValidation = Object.keys(validationSchema)
        if(isNew){
            dispatch( storeViewPost(post, parseBackendValidations(fieldsToAddToValidation, true, validationSchema)) )		
        }
        else{
            dispatch( saveViewPost(post, parseBackendValidations(fieldsToAddToValidation, true, validationSchema)) )		
        }

        // clean state so save button disables
        setDirty(false)

        // add created tags to local Redux so i dont't have to request all the tag list from server
        const newTags = Object.keys(post.meta_keywords).reduce((object, key) => {
            if (key !== 'isNew') {
                object[key] = post.meta_keywords[key]
            }
            return object
        }, {})
        if(newTags.length>0) dispatch(addLocalTags(newTags))

    }

	const handleClickUndo = () => undo()
	const handleClickRedo = () => redo()
    const handleClickClear = () => clear()
    
    // const handleClickBuilder = () => history.push('/posts/'+id+'/builder')    
    
    const onKeyDown = (keyName, e, handle) => {
        switch (keyName) {
            case "ctrl+z":
                undo();
                break;
            case "ctrl+shift+z":
                redo();
                break;
            case "ctrl+s":
                handlePostSave();
                break;
            default:
                break;
        }
    }

    const handleInputChange = (name, value) => handleOnChange(name, value)
    const handleSwitchToggle = (name, value) => handleOnChange(name, value)
    const handleSelectChange = (name, value) => handleFieldUpdated(name, value?value.value:null)
    const handleInputBlur = (name, value) => handleFieldUpdated(name,value) 
    const handleDynamicFormBlur = (e) => handleFieldUpdated('data',e.formData)

    const handleFieldUpdated = (name, value) => {
        handleOnChange(name, value)
        setPost({...post, [name]: value})
    }

    const handleDynamicFormValidate = async (formData, errors) => {
        
        const validationSchema = taxonomies[form.taxonomy].validationSchema

        if(!formData || Object.keys(formData).length === 0) return errors

        // TODO set all errrors at once in state
        Object.keys(validationSchema).forEach(async (name) => {
            // if (!prevForm.data || !prevForm.data[name] || formData[name] !== prevForm.data[name]) { // only validate the fields that changed (except validateAllFields is true)
                const error = await validateField(name, formData[name], validationSchema);                
                const valid = (typeof error === 'undefined' || error === '') ? true:false
                // console.log(name, ' Valid:', valid)
                if(!valid) errors[name].addError(error);
            // }
        })

        return errors
    }

    const templateOptions = Object.keys(templates).map((template) => ({ value: template, label: templates[template].name }))
    const taxonomyOptions = Object.keys(taxonomies).map((taxonomy) => ({ value: taxonomy, label: taxonomies[taxonomy].name }))
    const typeOptions = Object.keys(types).map((type) => ({ value: type, label: types[type].name }))
    
    const isNew = ( post && post.uuid ) ?  false : true;

    return (
        <>
        <Hotkeys 
            keyName="shift+a,alt+s,ctrl+s,ctrl+z" 
            onKeyDown={onKeyDown}       
        >
            <div className="content">
                <div className="container-fluid">
                    
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <h4 className="page-title">{post?post.name:''}</h4>
                                <Breadcrumb 
                                    post={post} 
                                    action={isNew?'New':'Edit'}                                    
                                />
                            </Col>
                            <Col sm="6">
                            <div className="float-right d-none d-md-block">
                                {!loadingViewPost ? (
                                <ActionsMenu                                     
                                    onClickSave={handlePostSave}
                                    onClickUndo={handleClickUndo}
                                    onClickRedo={handleClickRedo}
                                    onClickClear={handleClickClear}
                                    // onClickBuilder={handleClickBuilder}
                                    canRedo={canRedo}
                                    canUndo={canUndo}
                                    canClear={canUndo}
                                    canSave={!saveDisabled}
                                    savingPost={savingPost}
                                    saveLabel={isNew?'Create':'Save'}
                                />
                                ) : null}
                            </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <h4 className="mt-0 header-title">Basic Properties</h4>
                                    <p className="text-muted mb-4">Common to all posts</p>

                                    <ParamsCard
                                        form={form}                                    
                                        validationStatus={errors}
                                        handleInputChange={handleInputChange}
                                        handleSelectChange={handleSelectChange}
                                        handleInputBlur={handleInputBlur}
                                        typeOptions={typeOptions}
                                        taxonomyOptions={taxonomyOptions}
                                        templateOptions={templateOptions}   
                                        validationSchema={validationSchema}
                                    />
                                        
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <h4 className="mt-0 header-title">Childs</h4>
                                    <p className="text-muted mb-4">sdadaasdaa</p>

                                    <ChildsCard
                                        form={form}
                                        validationStatus={errors}
                                        handleSwitchToggle={handleSwitchToggle}
                                        handleSelectChange={handleSelectChange}                                
                                        typeOptions={typeOptions}
                                        taxonomyOptions={taxonomyOptions}                                    
                                        templateOptions={templateOptions}   
                                        validationSchema={validationSchema}                                 
                                    />

                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <h4 className="mt-0 header-title">Meta Data</h4>
                                    <p className="text-muted mb-4">SEO and Social Sharing</p>

                                    <MetaCard
                                        form={form}                                    
                                        validationStatus={errors}
                                        handleInputChange={handleInputChange}
                                        handleInputBlur={handleInputBlur}
                                        tags={tags}
                                        validationSchema={validationSchema}
                                    />

                                </CardBody>
                            </Card>

                            {form.taxonomy &&
                            <Card>
                                <CardBody>
                                    <h4 className="mt-0 header-title">Custom Fields</h4>
                                    <p className="text-muted mb-4">from taxonomy</p>
                                    
                                    <DynamicForm
                                        schema={taxonomies[form.taxonomy].fieldSchema}
                                        formData={form.data}                                        
                                        onBlur={handleDynamicFormBlur}
                                        onError={(e) => console.log("form error", e)}    
                                        validate={handleDynamicFormValidate}
                                        liveValidate={true}                                        
                                    />

                                </CardBody>
                            </Card>
                            }

                        </Col>
                    </Row>

                </div>
            </div>
        </Hotkeys>
        </>
    );
}

export default Form