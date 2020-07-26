import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
// import { useHistory } from "react-router";
import Hotkeys from 'react-hot-keys';
// import cloneDeep from 'lodash.clonedeep';
import { activateAuthLayout, getViewPost,  saveViewPost, StoreAction } from "../../../../../store/actions";
import Breadcrumb from "../_common/Breadcrumb";
import ActionsMenu from "./ActionsMenu";
import Board from '../../../../../components/Board'
import { useBack, SET, RESET } from '../../../../../hooks/useBack'
import { AppState } from "../../../../../store/reducers";

function backReducer(_: any, action: StoreAction) {
  console.log('backReducer', action);
  switch (action.type) {
    case SET:
      return { post: action.payload }
    case RESET:
      return { post: action.payload }         
    default:
      throw new Error(`Unknown action ${action.type}`)
  }
}


function PostBuilder() {

  // const location = useLocation();
  // const history = useHistory();

  const post = useSelector((s: AppState) => {
    console.log(s);
    return s.post.viewPost});
  const loadingPost = useSelector((s: AppState) => s.post.loadingViewPost);
  const savingPost = useSelector((s: AppState) => s.post.savingPost);
  const dispatch = useDispatch();

  const { state, canUndo, canRedo, undoState, redoState, setState, resetState } = useBack(backReducer,{})
  
  let { id } = useParams();

  useEffect(() => {
    dispatch(activateAuthLayout());
  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
  useEffect(() => {
		dispatch(getViewPost(id));	
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

	useEffect(() => { 
    if(post) resetState(post)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);


  const handleChangeTemplate = (t: any) => setState({...state.post, template: t}) 

	const handlePostUpdate = (updatedPost: any) => setState(updatedPost)

  const handleClickUndo = () => undoState()
	const handleClickRedo = () => redoState()
  const handleClickClear = () => resetState(post)
  
  const handlePostSave = () => dispatch(saveViewPost(state.post))		

  // const handleClickView = () => history.push('/posts/'+id+'/view')    
  
  
  const onKeyDown = (keyName: string) => {
    // console.log("test:onKeyDown", keyName, e, handle)    
    switch (keyName) {
      case "ctrl+z":
        handleClickUndo();
        break;
      case "ctrl+shift+z":
        handleClickRedo();
        break;
      case "ctrl+s":
        handleClickClear();
        break;
      default:
        break;
    }
    
  }


  // const boardPost = state.post; //cloneDeep(state.post);

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
                    {state.post ? state.post.name : "..."}
                    {" "}<sup>({state.post && state.post._revision? state.post._revision : 0})</sup>
                  </h4>
                  <Breadcrumb post={state.post} action={"Builder"} />
                </Col>
                <Col sm="6">
                  <div className="float-right d-none d-md-block">
                    {!loadingPost && state.post ? (
                      <ActionsMenu 
                        currentTemplate={state.post.template}
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
                {!loadingPost ? (
                  <Board
                    onPostUpdated={handlePostUpdate}                  
                    post={state.post}									
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