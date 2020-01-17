import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Toggle from 'react-toggle';
import Hotkeys from 'react-hot-keys';
import { useHistory } from "react-router";

// import { useForm } from "react-hook-form"


// import {log} from '../../../../../helpers/log'

import ActionsMenu from "./ActionsMenu";

import img1 from '../../../../../images/products/1.jpg';

import Breadcrumb from '../_common/Breadcrumb';
import CardWithLoading from '../../../../../components/CardWithLoading';
import { Select, Input } from '../../../../../components/Form';


import { templates, taxonomies, types } from 'valico-sanmartin'

import { activateAuthLayout, getViewPost,  saveViewPost } from "../../../../../store/actions";

import useUndo from '../../../../../store/history';

function PostEdit() {

    const viewPost = useSelector(state => state.post.viewPost);    
    const loadingViewPost = useSelector(state => state.post.loadingViewPost);
    const savingPost = useSelector(state => state.post.savingPost);
    const dispatch = useDispatch();

    const history = useHistory();

    const { state: post, set: setPost, init, undo, redo, clear, canUndo, canRedo } = useUndo({});

    let { id } = useParams();

    const templateOptions = Object.keys(templates).map((template) => ({ value: template, label: templates[template].name }))
    const taxonomyOptions = Object.keys(taxonomies).map((taxonomy) => ({ value: taxonomy, label: taxonomies[taxonomy].name }))
    const typeOptions = Object.keys(types).map((type) => ({ value: type, label: types[type].name }))
        

    useEffect(() => {
        dispatch(getViewPost(id));	
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(activateAuthLayout());
    }, [dispatch]);
        

    useEffect(() => {
        setPost(viewPost)		
        init(viewPost)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ setPost, viewPost]);


    // const handlePostUpdate = (updatedPost) => setPost(updatedPost)		
	
	const handlePostSave = () => dispatch(saveViewPost(post))		

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

    
    const [live, setLive] = useState(true)
    const handleAllowChildsToggle = (e) => setLive(e.target.checked) 


    const ParamsCard = () => {    

        // const { register, handleSubmit, errors } = useForm(); // initialise the hook
        // const onSubmit = data => {
        // console.log(data);
        // };



        const [input, setInput] = useState({
            name: '',
            slug: ''
        })

        const handleInputChange = (name, value) => setInput({
            ...input,
            [name]: value
        })

        const handleSelectChange = (name, value) => setInput({
            ...input,
            [name]: value.value
        })
    

        

        const handleInputBlur = (name) => {
            console.log('blur ', name)
            console.log(input[name])
            setPost(input)
        }

        useEffect(() => {
            console.log('useEffect')
            setInput(post)     
            // eslint-disable-next-line react-hooks/exhaustive-deps   
        }, [post]);

        
        return (           
            <>

                <h4 className="mt-0 header-title">Basic Properties</h4>
                <p className="text-muted mb-4">Common to all posts</p>

                {input &&

                    <Row>

                        <Col sm="6">
                            
                            <Input key="nameinput"
                                name="name" 
                                label="Name" 
                                onChange={handleInputChange} 
                                onBlur={handleInputBlur} 
                                value={input.name}
                            />

                            <Input key="sluginput" 
                                name="slug" 
                                label="Slug" 
                                onBlur={handleInputBlur} 
                                onChange={handleInputChange}
                                value={input.slug}                            
                            />

                        </Col>

                        <Col sm="6">                                 
                            <div className="form-group">
                                <label className="control-label">Type</label>
                                <Select 
                                    name="type"
                                    options={typeOptions} 
                                    placeholder={''}
                                    onChange={handleSelectChange}
                                    value={typeOptions.find(item => item.value === input.type)}                                     
                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Taxonomy</label>
                                <Select 
                                    name="taxonomy"
                                    options={taxonomyOptions} 
                                    placeholder={''}                                        
                                />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Template</label>
                                <Select 
                                    name="template"
                                    options={templateOptions} 
                                    placeholder={''}                                        
                                />
                            </div>
                        </Col>
                    </Row>

                    
                }

            </>
        )

    }

    const ChildsCard = () => {    
        
        return (           
            <>
                <h4 className="mt-0 header-title">Childs</h4>
                <p className="text-muted mb-4">sdsdaa</p>

                <Row>
                    <Col sm="6">
                        <label className="d-flex align-items-center mb-1">
                            <Toggle defaultChecked={live} aria-label='Allow Childs' icons={false} onChange={handleAllowChildsToggle} />
                            <span className="ml-2">Allow creating child pages for this page</span>
                        </label>
                        
                    </Col>
                    <Col sm="6">                                 
                        <div className="form-group">
                            <label className="control-label">Type</label>
                            <Select 
                                options={typeOptions} 
                                placeholder={''}                                        
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Taxonomy</label>
                            <Select 
                                options={taxonomyOptions} 
                                placeholder={''}                                        
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Template</label>
                            <Select 
                                options={templateOptions} 
                                placeholder={''}                                        
                            />
                        </div>
                    </Col>
                </Row>

            </>
        )

    }
    
    const MetaCard = () => {    
        
        return (           
            <>
                <h4 className="mt-0 header-title">Meta Data</h4>
                <p className="text-muted mb-4">SEO and Social Sharing</p>

                <Row>
                    <Col sm="6">
                        <div className="form-group">
                            <label htmlFor="metatitle">Meta Title</label>
                            <input id="metatitle" name="productname" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="metakeywords">Meta Keywords</label>
                            <input id="metakeywords" name="manufacturername" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="metadescription">Meta Description</label>
                            <textarea className="form-control" id="metadescription" rows="5"></textarea>
                        </div>
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

            </>
        )

    }
    

    const ParamsCardWithLoading = CardWithLoading(ParamsCard);
    const ChildsCardWithLoading = CardWithLoading(ChildsCard);
    const MetaCardWithLoading = CardWithLoading(MetaCard);

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


                                   

            
                            
                            <ParamsCardWithLoading isLoading={loadingViewPost} />   
                            <ChildsCardWithLoading isLoading={loadingViewPost} />   
                            <MetaCardWithLoading isLoading={loadingViewPost} />   
                        

                        </Col>
                    </Row>

                </div>
            </div>
        </Hotkeys>
        </>
    );
}

export default PostEdit