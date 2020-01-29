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
import useBack from '../../../../../hooks/useBack';


function PostBuilder() {

  // const location = useLocation();
  // const history = useHistory();

  const post = useSelector(s => s.post.viewPost);
  const loadingPost = useSelector(s => s.post.loadingViewPost);
  const savingPost = useSelector(s => s.post.savingPost);
  const dispatch = useDispatch();

  // const { state, setState, initState, undoState, redoState, clearState, canUndo, canRedo } = useBack({});
  
  // const { state, setState, initState, undoState, redoState, clearState, canUndo, canRedo } = useBack({});

  const [
    countState,
    {
      set: setState,
      reset: clearState,
      undo: undoState,
      redo: redoState,
      canUndo,
      canRedo,
    },
  ] = useBack({});
  const { present: state } = countState;



  let { id } = useParams();

  // useEffect(() => {
  //   // console.log('useEffect state')
  //   // if(state && state.content) console.log(state.content[0].modules[0].fields.title)
  // }, [state]);

  useEffect(() => {
		dispatch(getViewPost(id));	
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    dispatch(activateAuthLayout());
  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	

	useEffect(() => { 
    console.log('useEffect post')
    clearState(post)
    setState(post)				
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

	const handleChangeTemplate = (t) => setState({...state, template: t})
	
	const handlePostUpdate = (updatedPost) => {
    
    // updatedPost._revision = typeof updatedPost._revision === 'number' ? updatedPost._revision + 1 : 1;

    // console.log('handlePostUpdate >>')
    // console.log(updatedPost.content[0].modules[0].fields.title)
    // console.log(updatedPost._revision)

    // setState({...state, ...updatedPost})

      // setState({...state, content: updatedPost.content})
    setState(updatedPost)		
  }
	
	const handlePostSave = () => dispatch(saveViewPost(state))		

	const handleClickUndo = () => undoState()
	const handleClickRedo = () => redoState()
  const handleClickClear = () => clearState()
  
  // const handleClickView = () => history.push('/posts/'+id+'/view')    
  
  
  const onKeyDown = (keyName, e, handle) => {
    // console.log("test:onKeyDown", keyName, e, handle)    
    switch (keyName) {
      case "ctrl+z":
        undoState();
        break;
      case "ctrl+shift+z":
        redoState();
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
                    {state ? state.name : "..."}
                    {" "}<sup>({state && state._revision? state._revision : 0})</sup>
                  </h4>
                  <Breadcrumb post={state} action={"Builder"} />
                </Col>
                <Col sm="6">
                  <div className="float-right d-none d-md-block">
                    {!loadingPost && state ? (
                      <ActionsMenu 
                        currentTemplate={state.template}
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
                {!loadingPost && state ? (
                  <Board
                    onPostUpdated={handlePostUpdate}                  
                    post={state}									
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