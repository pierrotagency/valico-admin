import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Toggle from 'react-toggle';

// import {log} from '../../../../../helpers/log'

import { activateAuthLayout, getViewPost } from '../../../../../store/actions';
import Settingmenu from '../../../Subpages/Settingmenu';

import img1 from '../../../../../images/products/1.jpg';

import Breadcrumb from '../_common/Breadcrumb';
import CardWithLoading from '../../../../../components/CardWithLoading';
import Select from '../../../../../components/Select';

import { templates, taxonomies, types } from 'valico-sanmartin'


function PostEdit() {

    const post = useSelector(state => state.post.viewPost);    
    const loadingPost = useSelector(state => state.post.loadingViewPost);
    const dispatch = useDispatch();

    let { id } = useParams();

    const templateOptions = Object.keys(templates).map((template) => ({ value: template, label: templates[template].name }))
    const taxonomyOptions = Object.keys(taxonomies).map((taxonomy) => ({ value: taxonomy, label: taxonomies[taxonomy].name }))
    const typeOptions = Object.keys(types).map((type) => ({ value: type, label: types[type].name }))
        

    useEffect(() => {      
        dispatch(activateAuthLayout())
        // window.addEventListener('popstate', (event) => {
        // alert("You message");
        // });
    },[dispatch]);

    useEffect(() => {      
        
        dispatch(getViewPost(id))

    },[dispatch, id]);


    const [live, setLive] = useState(true)
    const handleAllowChildsToggle = (e) => setLive(e.target.checked) 


    const ParamsCard = () => {    
        
        return (           
            <>
                <h4 className="mt-0 header-title">Basic Properties</h4>
                <p className="text-muted mb-4">Common to all posts</p>

                <form>
                    <Row>
                        <Col sm="6">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id="name" name="name" type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="slug">Slug</label>
                                <input id="slug" name="slug" type="text" className="form-control" />
                            </div>
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
                    <Row>
                        <Col sm="6">
                        </Col>
                        <Col sm="6">
                        </Col>
                    </Row>

                    <button type="submit" className="btn btn-success mr-1 waves-effect waves-light">Save Changes</button>
                    <button type="submit" className="btn btn-secondary waves-effect">Cancel</button>
                </form>
            </>
        )

    }

    const ChildsCard = () => {    
        
        return (           
            <>
                <h4 className="mt-0 header-title">Childs</h4>
                <p className="text-muted mb-4">sdsdaa</p>

                <form>

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

                    <button type="submit" className="btn btn-success mr-1 waves-effect waves-light">Save Changes</button>
                    <button type="submit" className="btn btn-secondary waves-effect">Cancel</button>
                </form>
            </>
        )

    }
    
    const MetaCard = () => {    
        
        return (           
            <>
                <h4 className="mt-0 header-title">Meta Data</h4>
                <p className="text-muted mb-4">SEO and Social Sharing</p>

                <form>
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

                    <button type="submit" className="btn btn-success mr-1 waves-effect waves-light">Save Changes</button>
                    <button type="submit" className="btn btn-secondary waves-effect">Cancel</button>

                </form>
            </>
        )

    }
    

    const ParamsCardWithLoading = CardWithLoading(ParamsCard);
    const ChildsCardWithLoading = CardWithLoading(ChildsCard);
    const MetaCardWithLoading = CardWithLoading(MetaCard);

    return (
        <>
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
                                    <Settingmenu />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col>

                            <ParamsCardWithLoading isLoading={loadingPost} />   
                            <ChildsCardWithLoading isLoading={loadingPost} />   
                            <MetaCardWithLoading isLoading={loadingPost} />   

                        </Col>
                    </Row>

                </div>
            </div>
        </>
    );
}

export default PostEdit