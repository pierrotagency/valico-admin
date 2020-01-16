import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "reactstrap";

import { activateAuthLayout, getViewPost,  saveViewPost } from "../../../../../store/actions";
import Breadcrumb from "../_common/Breadcrumb";
import ActionsMenu from "./ActionsMenu";
import Board from '../../../../../components/Board'
// import { test, test2 } from './services'

import useUndo from '../../../../../store/history';


function PostBuilder() {

  const viewPost = useSelector(state => state.post.viewPost);
  const loadingViewPost = useSelector(state => state.post.loadingViewPost);
  const dispatch = useDispatch();

	const { state: post, set: setViewPost, init, undo, redo, clear, canUndo, canRedo } = useUndo({});


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

	const handleClickUndo = () => undo();
	const handleClickRedo = () => redo();
	const handleClickClear = () => clear();

  return (
    <>
    	<div className="content">
        <div className="container-fluid">
          <div className="post-title-box">
            <Row className="align-items-center">
              <Col sm="6">
                <h4 className="page-title">
                  {post ? post.name : "Post " + id}
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
    </>
  );
}

export default PostBuilder;