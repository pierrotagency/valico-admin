import React, { useEffect } from 'react';
import { Row, Col, Card, CardBody, Alert } from 'reactstrap';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Hotkeys from 'react-hot-keys';
import { useHistory } from "react-router";

import ActionsMenu from "./ActionsMenu";
import Breadcrumb from '../_common/Breadcrumb';
// import CardWithLoading from '../../../../../components/CardWithLoading';
// import ParamsCard from './ParamsCard';
// import MetaCard from './MetaCard';
// import ChildsCard from './ChildsCard';


import { templates, taxonomies, types } from 'valico-sanmartin'


import { activateAuthLayout, getViewPost, saveViewPost, getTags, addLocalTags } from "../../../../../store/actions";
import useUndo from '../../../../../store/history';

import { Input, Tags, TextArea, Select, Toggle } from '../../../../../components/Form';
import img1 from '../../../../../images/products/1.jpg';

import useForm from '../../../../../components/Form/useForm';

const stateSchema = {
    meta_title: '',
    meta_description: '',
    meta_keywords: [],

    childs_template: null,
    childs_type: null,
    childs_taxonomy: null,
    childs_allowed: false

};

const validationStateSchema = {
    meta_title: {
        required: true,
        validator: {
            regEx: /^[a-zA-Z]+$/,
            error: 'Invalid first name format.',
        },
    },
    meta_description: {
        required: true,
        validator: {
            regEx: /^[a-zA-Z]+$/,
            error: 'Invalid last name format.',
        },
    },
    meta_keywords: {
        required: true
    }
};

function PostView() {

    const viewPost = useSelector(state => state.post.viewPost);    
    const loadingViewPost = useSelector(state => state.post.loadingViewPost);
    const savingPost = useSelector(state => state.post.savingPost);
    const dispatch = useDispatch();


    const tags = useSelector(state => state.tag.tags);    
    
    const history = useHistory();

    const { state: post, set: setPost, init, undo, redo, clear, canUndo, canRedo } = useUndo({});
    // const [ post, setPost] = useState({});

    const { state, setState, errors, handleOnChange  } = useForm(stateSchema, validationStateSchema);


    let { id } = useParams();

    useEffect(() => {       
        console.log('RENDER PostView')      
        if(tags.length===0) dispatch(getTags())
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    },[]);

    useEffect(() => {
        dispatch(getViewPost(id));	
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(activateAuthLayout());
    }, [dispatch]);
        
    useEffect(() => {
        console.log('PostView useEffect viewPost')
        setPost(viewPost)		
        init(viewPost)

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [viewPost]);


    useEffect(() => {
        console.log('PostView useEffect post')        
        setState(post)
        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [post]);


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
        // console.log("test:onKeyDown", keyName, e, handle)    
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

    // const ParamsCardWithLoading = CardWithLoading(ParamsCard);
    // const ChildsCardWithLoading = CardWithLoading(ChildsCard);
    // const MetaCardWithLoading = CardWithLoading(MetaCard);


    const handleInputChange = (name, value) => handleOnChange(name, value)
    const handleSwitchToggle = (name, value) => handleOnChange(name, value)
    const handleSelectChange = (name, value) => handleFieldUpdated(name, value?value.value:null)
    const handleInputBlur = (name, value) => handleFieldUpdated(name,value) 

    const handleFieldUpdated = (name, value) => {
        handleOnChange(name, value)
        setPost({...post, [name]: value})

        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }


    const templateOptions = Object.keys(templates).map((template) => ({ value: template, label: templates[template].name }))
    const taxonomyOptions = Object.keys(taxonomies).map((taxonomy) => ({ value: taxonomy, label: taxonomies[taxonomy].name }))
    const typeOptions = Object.keys(types).map((type) => ({ value: type, label: types[type].name }))
    
    const typeValue = state && state.childs_type ? typeOptions.find(item => item.value === state.childs_type) : null
    const templateValue = state && state.childs_template ? templateOptions.find(item => item.value === state.childs_template) : null
    const taxonomyValue = state && state.childs_taxonomy ? taxonomyOptions.find(item => item.value === state.childs_taxonomy) : null

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
                                    savingPost={savingPost}
                                />
                                ) : null}
                            </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col>

                            {/* <ParamsCardWithLoading 
                                isLoading={loadingViewPost}
                                post={post}
                                setPost={setPost}                                
                            />   
                            
                            <ChildsCardWithLoading 
                                isLoading={loadingViewPost}
                                post={post}
                                setPost={setPost}
                            />    */}
                            
                            {/* <MetaCardWithLoading                                
                                isLoading={loadingViewPost} 
                                post={post}
                                fieldUpdated={handleFieldUpdated}
                                tags={tags}                  
                            />    */}

                            <Card>
                            <CardBody>
                                <h4 className="mt-0 header-title">Childs</h4>
                                <p className="text-muted mb-4">sdadaasdaa</p>

                                {state ?

                                    <Row>

                                        <Col sm="6">

                                            <Toggle 
                                                name="childs_allowed"
                                                checked={state.childs_allowed || false}
                                                label='Allow Childs'
                                                onChange={handleSwitchToggle}
                                            />
                                            
                                        </Col>

                                        <Col sm="6">                                 
                                            <div className="form-group">
                                                <label className="control-label">Type</label>
                                                <Select 
                                                    name="childs_type"
                                                    options={typeOptions} 
                                                    placeholder={''}
                                                    onChange={handleSelectChange}
                                                    value={typeValue}                                     
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Taxonomy</label>
                                                <Select 
                                                    name="childs_taxonomy"
                                                    options={taxonomyOptions} 
                                                    placeholder={''}           
                                                    onChange={handleSelectChange}
                                                    value={taxonomyValue}                               
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Template</label>
                                                <Select 
                                                    name="childs_template"
                                                    options={templateOptions} 
                                                    placeholder={''}              
                                                    onChange={handleSelectChange}
                                                    value={templateValue}                              
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                :
                                    <Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>                             
                                }

                            </CardBody>
                            </Card>

                            <Card>
                            <CardBody>
                                <h4 className="mt-0 header-title">Meta Data</h4>
                                <p className="text-muted mb-4">SEO and Social Sharing</p>

                                {state ?

                                    <Row>
                                        <Col sm="6">

                                            <Input
                                                name="meta_title" 
                                                label="Title" 
                                                onChange={handleInputChange} 
                                                onBlur={handleInputBlur} 
                                                value={state.meta_title || ''}
                                                isInvalid={errors.meta_title!==''}
                                                message={errors.meta_title}
                                            />

                                            <Tags 
                                                name="meta_keywords" 
                                                label="Keywords" 
                                                onChange={handleInputBlur}                             
                                                value={state.meta_keywords || []}
                                                options={tags}
                                                isInvalid={errors.meta_keywords!==''}
                                                message={errors.meta_keywords}
                                            />

                                            <TextArea
                                                name="meta_description" 
                                                label="Description" 
                                                rows="4"
                                                onChange={handleInputChange} 
                                                onBlur={handleInputBlur} 
                                                value={state.meta_description || ''}
                                                isInvalid={errors.meta_description!==''}
                                                message={errors.meta_description}
                                            />
                                            
                                        </Col>
                                        <Col sm="6">
                                            <div className="form-group">
                                                <label>Image</label> <br />
                                                <img src={img1} alt="product img" className="img-fluid rounded" style={{ maxWidth: "200px" }} />
                                                <br />
                                                <button type="button" className="btn btn-info mt-2 waves-effect waves-light">Change Image</button>
                                            </div>
                                        </Col>
                                    </Row>
                                :
                                    <Alert color="danger" className="bg-white border border-danger">Couldn't get post info</Alert>                
                                }
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