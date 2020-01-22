import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
// import { useHistory } from "react-router";
import Hotkeys from 'react-hot-keys';

import { activateAuthLayout, getViewPost,  saveViewPost } from "../../../../../store/actions";
import Breadcrumb from "../_common/Breadcrumb";
import ActionsMenu from "./ActionsMenu";
import Board from '../../../../../components/Board'
// import { test, test2 } from './services'
import useBack from '../../../../../hooks/useBack';


function PostBuilder() {

  // const location = useLocation();
  // const history = useHistory();

  const viewPost = useSelector(state => state.post.viewPost);
  const loadingViewPost = useSelector(state => state.post.loadingViewPost);
  const savingPost = useSelector(state => state.post.savingPost);
  const dispatch = useDispatch();

	const { state: post, set: setViewPost, init, undo, redo, clear, canUndo, canRedo } = useBack({});


  let { id } = useParams();

  useEffect(() => {
		dispatch(getViewPost(id));	
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(activateAuthLayout());
	}, [dispatch]);
	

	useEffect(() => {
		setViewPost(viewPost)		
		init(viewPost)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ setViewPost, viewPost]);

	const handleChangeTemplate = (t) => setViewPost({...post, template: t})
	
	const handlePostUpdate = (updatedPost) => setViewPost(updatedPost)		
	
	const handlePostSave = () => dispatch(saveViewPost(post))		

	const handleClickUndo = () => undo()
	const handleClickRedo = () => redo()
  const handleClickClear = () => clear()
  
  // const handleClickView = () => history.push('/posts/'+id+'/view')    
  
  
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

  return (
    <>
    <Hotkeys 
        keyName="shift+a,alt+s,ctrl+s,ctrl+z" 
        onKeyDown={onKeyDown}       
      >
        <div className="content">
          <div className="container-fluid">
            <div className="post-title-box">
              <Row className="align-items-center">
                <Col sm="6">
                  <h4 className="page-title">
                    {post ? post.name : "..."}
                  </h4>
                  <Breadcrumb post={post} action={"Builder"} />
                </Col>
                <Col sm="6">
                  <div className="float-right d-none d-md-block">
                    {!loadingViewPost && post ? (
                      <ActionsMenu 
                        currentTemplate={post.template}
                        onChangeTemplate={handleChangeTemplate}
                        onClickSave={handlePostSave}
                        onClickUndo={handleClickUndo}
                        onClickRedo={handleClickRedo}
                        onClickClear={handleClickClear}
                        // onClickView={handleClickView}
                        canRedo={canRedo}
                        canUndo={canUndo}
                        canClear={canUndo}
                        savingPost={savingPost}
                      />
                    ) : null}
                  </div>
                </Col>
              </Row>
            </div>

            <Row>
              <Col>
                {!loadingViewPost && post ? (
                  <Board
                    onPostUpdated={handlePostUpdate}                  
                    post={post}									
                  />
                ) : null}
              </Col>
            </Row>
          </div>
        </div>

        
        
      </Hotkeys>
    </>
  );
}

export default PostBuilder;