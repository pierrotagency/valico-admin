import React, { useEffect, useCallback } from 'react';
import { Row, Col } from 'reactstrap';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Hotkeys from 'react-hot-keys';
import { useHistory } from "react-router";

import ActionsMenu from "./ActionsMenu";
import Breadcrumb from '../_common/Breadcrumb';
import CardWithLoading from '../../../../../components/CardWithLoading';
// import ParamsCard from './ParamsCard';
import MetaCard from './MetaCard';
// import ChildsCard from './ChildsCard';
import { activateAuthLayout, getViewPost, saveViewPost, getTags, addLocalTags } from "../../../../../store/actions";
import useUndo from '../../../../../store/history';


function PostView() {

    const viewPost = useSelector(state => state.post.viewPost);    
    const loadingViewPost = useSelector(state => state.post.loadingViewPost);
    const savingPost = useSelector(state => state.post.savingPost);
    const dispatch = useDispatch();

    const tags = useSelector(state => state.tag.tags);    
    
    const history = useHistory();

    const { state: post, set: setPost, init, undo, redo, clear, canUndo, canRedo } = useUndo({});
    // const [ post, setPost] = useState({});

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
    const MetaCardWithLoading = CardWithLoading(MetaCard);


    const handleFieldUpdated = (name, value) => {
        setPost({...post, [name]: value})

        // eslint-disable-next-line react-hooks/exhaustive-deps   
    }


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
                            
                            <MetaCardWithLoading                                
                                isLoading={loadingViewPost} 
                                post={post}
                                fieldUpdated={handleFieldUpdated}
                                tags={tags}                  
                            />   
                        
                        </Col>
                    </Row>

                </div>
            </div>
        </Hotkeys>
        </>
    );
}

export default PostView