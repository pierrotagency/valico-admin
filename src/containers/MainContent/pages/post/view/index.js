import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Hotkeys from 'react-hot-keys';
import { useHistory } from "react-router";

import { templates, taxonomies, types } from 'valico-sanmartin'

import Breadcrumb from '../_common/Breadcrumb';
import { activateAuthLayout, getViewPost, saveViewPost, getTags, addLocalTags } from "../../../../../store/actions";
import useUndo from '../../../../../hooks/useUndo';
import useForm from '../../../../../hooks/useForm';

import ActionsMenu from "./ActionsMenu";
import MetaCard from './MetaCard';
import ChildsCard from './ChildsCard';
import ParamsCard from './ParamsCard';
import { fields, validations } from './formSchema'


function PostView() {

    const viewPost = useSelector(state => state.post.viewPost);    
    const loadingViewPost = useSelector(state => state.post.loadingViewPost);
    const savingPost = useSelector(state => state.post.savingPost);
    const dispatch = useDispatch();
    const tags = useSelector(state => state.tag.tags);        
    const history = useHistory();

    const { state: post, set: setPost, init, undo, redo, clear, canUndo, canRedo } = useUndo({});

    const { form, setForm, errors, handleOnChange, disable } = useForm(fields, validations);

    let { id } = useParams();

    useEffect(() => {       
        dispatch(activateAuthLayout());        
        dispatch(getTags())        
    },[dispatch]);

    useEffect(() => {
        dispatch(getViewPost(id));	
    }, [dispatch, id]);

    useEffect(() => {       
        setPost(viewPost)		
        init(viewPost)
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [viewPost]);

    // eslint-disable-next-line react-hooks/exhaustive-deps  
    useEffect(() => setForm(post), [post]);


    const handlePostSave = () => {
        console.log('handlePostSave')

        dispatch(saveViewPost(post))		

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
    
    const handleClickBuilder = () => history.push('/posts/'+id+'/builder')    
    
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

    const handleFieldUpdated = (name, value) => {
        handleOnChange(name, value)
        setPost({...post, [name]: value})
    }

    const templateOptions = Object.keys(templates).map((template) => ({ value: template, label: templates[template].name }))
    const taxonomyOptions = Object.keys(taxonomies).map((taxonomy) => ({ value: taxonomy, label: taxonomies[taxonomy].name }))
    const typeOptions = Object.keys(types).map((type) => ({ value: type, label: types[type].name }))
    

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
                                <h4 className="page-title">{post?post.name:'Post ' + id}</h4>
                                <Breadcrumb 
                                    post={post} 
                                    action={'Edit'}                                    
                                />
                            </Col>
                            <Col sm="6">
                            <div className="float-right d-none d-md-block">
                                {!loadingViewPost && post ? (
                                <ActionsMenu                                     
                                    onClickSave={handlePostSave}
                                    onClickUndo={handleClickUndo}
                                    onClickRedo={handleClickRedo}
                                    onClickClear={handleClickClear}
                                    onClickBuilder={handleClickBuilder}
                                    canRedo={canRedo}
                                    canUndo={canUndo}
                                    canSave={!disable}
                                    savingPost={savingPost}
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
                                        errors={errors}
                                        handleInputChange={handleInputChange}
                                        handleSelectChange={handleSelectChange}
                                        handleInputBlur={handleInputBlur}
                                        typeOptions={typeOptions}
                                        taxonomyOptions={taxonomyOptions}
                                        templateOptions={templateOptions}                                                                        
                                    />
                                        
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <h4 className="mt-0 header-title">Childs</h4>
                                    <p className="text-muted mb-4">sdadaasdaa</p>

                                    <ChildsCard
                                        form={form}
                                        errors={errors}
                                        handleSwitchToggle={handleSwitchToggle}
                                        handleSelectChange={handleSelectChange}                                
                                        typeOptions={typeOptions}
                                        taxonomyOptions={taxonomyOptions}                                    
                                        templateOptions={templateOptions}                                    
                                    />

                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                    <h4 className="mt-0 header-title">Meta Data</h4>
                                    <p className="text-muted mb-4">SEO and Social Sharing</p>

                                    <MetaCard
                                        form={form}                                    
                                        errors={errors}
                                        handleInputChange={handleInputChange}
                                        handleInputBlur={handleInputBlur}
                                        tags={tags}
                                    />

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </div>
        </Hotkeys>
        </>
    );
}

export default PostView