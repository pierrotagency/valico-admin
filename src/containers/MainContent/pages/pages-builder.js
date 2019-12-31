import React, { Component } from 'react';
import { activateAuthLayout } from '../../../store/actions';
import { connect } from 'react-redux';
import Settingmenu from '../Subpages/Settingmenu';
import { Link } from 'react-router-dom';

import Board from '../../../components/Builder';


const board = {
    lanes: [
      {
        id: 1,
        title: 'Lane Backlog',
        cards: [
          {
            id: 1,
            title: 'Card title 1',
            description: 'Card content',
            component: "foo"            
          },
          {
            id: 2,
            title: 'Card title 2',
            description: 'Card content',
            component: "bar"            
          },
          {
            id: 3,
            title: 'Card title 3',
            description: 'Card content',
            component: "bar"            
          },
          {
            id: 4,
            title: 'Card title 4',
            description: 'Card content',
            component: "foo"            
          },
          {
            id: 5,
            title: 'Card title 5',
            description: 'Card content',
            component: "foo"            
          },
          {
            id: 6,
            title: 'Card title 6',
            description: 'Card content',
            component: "foo"            
          },
          {
            id: 7,
            title: 'Card title 7',
            description: 'Card content',
            component: "foo"            
          },
          {
            id: 8,
            title: 'Card title 8',
            description: 'Card content',
            component: "foo"            
          }
        ]
      },
      {
        id: 2,
        title: 'Lane Doing',
        cards: [
          {
            id: 9,
            title: 'Card title 9',
            description: 'Card content',
            component: "foo"            
          }
        ]
      },
      {
        id: 3,
        title: 'Lane Done',
        cards: [
          
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


                        <div>
                            <Board                                                                
                                onCardRemove={console.log}
                                onCardAdded={console.log}
                                allowRemoveCard={true}                           
                                initialBoard={board}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(null, { activateAuthLayout })(PagesBuilder);


