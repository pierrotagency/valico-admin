import React, { useEffect } from 'react';
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'reactstrap';

// import MenuSettings from './MenuSettings';
import { activateAuthLayout, getViewPost } from '../../../../../store/actions';
import Breadcrumb from '../_common/Breadcrumb';
import Board from '../../../../../components/Builder';


function PostBuilder() {

  const post = useSelector(state => state.post.viewPost);    
  const loadingViewPost = useSelector(state => state.post.loadingViewPost);
  const dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {      
          
    dispatch(getViewPost(id))

  },[dispatch, id]);


  useEffect(() => {      
    dispatch(activateAuthLayout())
  },[dispatch]);

  return (
      <>
          <div className="content">
              <div className="container-fluid">
                  <div className="post-title-box">
                      <Row className="align-items-center">
                          <Col sm="6">
                              <h4 className="page-title">{post?post.name:'Post ' + id}</h4>
                              <Breadcrumb 
                                  post={post} 
                                  action={'Builder'}                                    
                              />
                          </Col>
                          <Col sm="6">
                              <div className="float-right d-none d-md-block">
                                  {/* <Settingmenu /> */}
                              </div>
                          </Col>
                      </Row>                      
                  </div>

                  <Row>
                        <Col>

                            {!loadingViewPost ? (                  
                            <Board                                                                
                                onModuleRemove={console.log}
                                onModuleEdit={console.log}
                                onModuleAdded={console.log}
                                onModuleDragEnd={console.log} 
                                onPostSave={console.log}             
                                initialPost={post}
                            />
                            ): null}
                        
                        </Col>
                    </Row>

                </div>
            </div>
      </>
  );

}

export default PostBuilder;