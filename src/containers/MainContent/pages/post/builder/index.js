import React, { useEffect } from 'react';
import { activateAuthLayout } from '../../../../../store/actions';
import { connect } from 'react-redux';
import MenuSettings from './MenuSettings';
import { Link } from 'react-router-dom';
import { useParams } from "react-router";

import Board from '../../../../../components/Builder';


const post = {
    name: "Página 1",
    template: "Template1",
    content: [
      {
        id: 1,
        name: 'area1',
        title: 'Area 1',
        modules: [
          {
            id: 1,                        
            component: 'Foo',
            fields: {
              title: 'Title module 1',
              subtitle: 'Subtitle module 1'
            }        
          },
          {
            id: 2,                        
            component: 'Bar',
            fields: {
              title: 'Title module 2',
              subtitle: 'Subtitle module 2',
              "tasks": [
                {
                  "title": "My first task",
                  "details": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                  "done": true
                },
                {
                  "title": "My second task",
                  "details": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
                  "done": false
                }
              ]
            }          
          }          
        ]
      },
      {
        id: 2,
        name: 'area2',
        title: 'Area 2',
        modules: [
          {
            id: 3,                        
            component: 'Foo',            
            fields: {
              title: 'Title module 3',
              subtitle: 'Subtitle module 3'
            }         
          }
        ]
      },
      {
        id: 3,
        name: 'area3',
        title: 'Area 3',
        modules: [          
        ]
      }
    ]
  }


function PostBuilder({
  activateAuthLayout
}) {

  useEffect(() => {
    activateAuthLayout();
  },[activateAuthLayout]);

  let { id } = useParams();

  return (
      <React.Fragment>
          <div className="content">
              <div className="container-fluid">
                  <div className="post-title-box">
                      <div className="row align-items-center">
                          <div className="col-sm-6">
                              <h4 className="post-title">Builder</h4>
                              <ol className="breadcrumb">
                                  <li className="breadcrumb-item"><Link to="#"><i className="mdi mdi-home-outline"></i></Link></li>
                                  <li className="breadcrumb-item"><Link to="#">{post.name} {id}</Link></li>
                                  <li className="breadcrumb-item active">Builder</li>
                              </ol>
                          </div>
                          <div className="col-sm-6">
                              <div className="float-right d-none d-md-block">
                                  <MenuSettings                                           
                                  />
                              </div>
                          </div>
                      </div>
                  </div>

                  <Board                                                                
                      onModuleRemove={console.log}
                      onModuleEdit={console.log}
                      onModuleAdded={console.log}
                      onModuleDragEnd={console.log} 
                      onPostSave={console.log}             
                      initialPost={post}
                  />
              
              </div>
          </div>
      </React.Fragment>
  );

}

export default connect(null, { activateAuthLayout })(PostBuilder);