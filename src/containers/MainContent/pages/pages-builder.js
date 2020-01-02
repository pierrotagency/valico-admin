import React, { Component } from 'react';
import { activateAuthLayout } from '../../../store/actions';
import { connect } from 'react-redux';
import Settingmenu from '../Subpages/Settingmenu';
import { Link } from 'react-router-dom';

import Board from '../../../components/Builder';


const board = {
    areas: [
      {
        id: 1,
        title: 'Area 1',
        modules: [
          {
            id: 1,
            title: 'Module title 1',
            description: 'Module content',
            component: "Foo"            
          },
          {
            id: 2,
            title: 'Module title 2',
            description: 'Module content',
            component: "Bar"            
          },
          {
            id: 3,
            title: 'Module title 3',
            description: 'Module content',
            component: "Bar"            
          },
          {
            id: 4,
            title: 'Module title 4',
            description: 'Module content',
            component: "Foo"            
          },
          {
            id: 5,
            title: 'Module title 5',
            description: 'Module content',
            component: "Foo"            
          },
          {
            id: 6,
            title: 'Module title 6',
            description: 'Module content',
            component: "Foo"            
          },
          {
            id: 7,
            title: 'Module title 7',
            description: 'Module content',
            component: "Foo"            
          },
          {
            id: 8,
            title: 'Module title 8',
            description: 'Module content',
            component: "Foo"            
          }
        ]
      },
      {
        id: 2,
        title: 'Area 2',
        modules: [
          {
            id: 9,
            title: 'Module title 9',
            description: 'Module content',
            component: "Foo"            
          }
        ]
      },
      {
        id: 3,
        title: 'Area 3',
        modules: [
          
        ]
      }
    ]
  }

  
class PagesBuilder extends Component {

    componentDidMount() {
        this.props.activateAuthLayout();
    }

    render() {

        return (
            <React.Fragment>
                <div className="content">
                    <div className="container-fluid">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h4 className="page-title">Builder</h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="#"><i className="mdi mdi-home-outline"></i></Link></li>
                                        <li className="breadcrumb-item"><Link to="#">Page Name</Link></li>
                                        <li className="breadcrumb-item active">Builder</li>
                                    </ol>
                                </div>
                                <div className="col-sm-6">
                                    <div className="float-right d-none d-md-block">
                                        <Settingmenu />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Board                                                                
                            onModuleRemove={console.log}
                            onModuleAdded={console.log}
                            onModuleDragEnd={console.log}
                            allowRemoveModule={true}                           
                            initialBoard={board}
                        />
                    
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(null, { activateAuthLayout })(PagesBuilder);


