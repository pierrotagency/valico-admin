import React, {useEffect} from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { activateAuthLayout, getPosts } from '../../../../../store/actions';
import queryString from 'query-string'
import { useLocation, useHistory } from "react-router";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Settingmenu from '../../../Subpages/Settingmenu';
import Item from './Item';

import { types } from 'valico-sanmartin'


function Posts({
    ddd,
    aaa
}) {
    const location = useLocation();
    const history = useHistory();
    const posts = useSelector(state => state.post.posts);
    const loading = useSelector(state => state.post.loading);
    const dispatch = useDispatch();
    
    
    useEffect(() => {      
        dispatch(activateAuthLayout())
    },[dispatch]);
    

    useEffect(() => {
        console.log('useEffect Location') // TODO is running twice on history back
        
        const qs = queryString.parse(location.search)        
        dispatch(getPosts(qs.father))

    }, [location, dispatch])


    const handleOnEnter = (e, item) => {
        e.preventDefault()
        e.stopPropagation()

        let qs = queryString.parse(location.search)
            qs.father = item.uuid

        const url = location.pathname + '?' + queryString.stringify(qs)    
        history.push(url)
    }

    const handleOnEdit = (e, item) => {        
        e.preventDefault()
        e.stopPropagation()

        const url = '/posts/'+item.uuid+'/builder'
        history.push(url)
    }


    const withLoading = (Component) => {
        return function EnhancedComponent({ isLoading, ...props }) {
            if (!isLoading) 
                return <Component { ...props } />;            
            else
                return (<div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>);
        };
    }

    const Table = () => {

        if(posts && posts.length) {
            return (
                <>
                    <div className="table-responsive project-list">
                        <table className="table project-table">
                            <thead>
                                <tr>                                                       
                                    <th scope="col">Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Status</th>                                                       
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => <Item 
                                    item={post} key={index} types={types}
                                    onEnter={handleOnEnter} 
                                    onEdit={handleOnEdit}
                                ></Item>)}                                                
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-3">
                        <ul className="pagination justify-content-end mb-0">
                            <li className="page-item disabled">
                                <Link className="page-link" to="#" tabIndex="-1" aria-disabled="true">Previous</Link>
                            </li>
                            <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                            <li className="page-item active"><Link className="page-link" to="#">2</Link></li>
                            <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                            <li className="page-item">
                                <Link className="page-link" to="#">Next</Link>
                            </li>
                        </ul>
                    </div>
                </>
            )
        }
        else{
            return (<h4>Nothing yet</h4>)
        }

    }


    const ListWithLoading = withLoading(Table);

    return (
        <>
            <div className="content">
                <div className="container-fluid">
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <h4 className="page-title">Posts </h4>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="#"><i className="mdi mdi-home-outline"></i></Link></li>
                                    <li className="breadcrumb-item active">Posts</li>
                                </ol>
                            </Col>
                            <Col sm="6">
                                <div className="float-right d-none d-md-block">
                                    <Settingmenu />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col xl="3" md="6">
                            <Card className="bg-pattern">
                                <CardBody>
                                    <div className="float-right">
                                        <i className="dripicons-archive text-primary h4 ml-3"></i>
                                    </div>
                                    <h5 className="font-20 mt-0 pt-1">24</h5>
                                    <p className="text-muted mb-0">Total Posts</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="3" md="6">
                            <Card className="bg-pattern">
                                <CardBody>
                                    <div className="float-right">
                                        <i className="dripicons-trophy text-primary h4 ml-3"></i>
                                    </div>
                                    <h5 className="font-20 mt-0 pt-1">18</h5>
                                    <p className="text-muted mb-0">Completed Posts</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="3" md="6">
                            <Card className="bg-pattern">
                                <CardBody>
                                    <div className="float-right">
                                        <i className="dripicons-hourglass text-primary h4 ml-3"></i>
                                    </div>
                                    <h5 className="font-20 mt-0 pt-1">06</h5>
                                    <p className="text-muted mb-0">Pending Posts</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl="3" md="6">
                            <Card>
                                <CardBody>
                                    <form>
                                        <div className="form-group mb-0">
                                            <label>Search</label>
                                            <div className="input-group mb-0">
                                                <input type="text" className="form-control" placeholder="Search..." aria-describedby="project-search-addon" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-danger" type="button" id="project-search-addon"><i className="mdi mdi-magnify search-icon font-12"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg="12">
                            <Card>
                                <CardBody>
                                    <ListWithLoading
                                        isLoading={loading}
                                        posts={posts}
                                    />                             
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
    
}

export default Posts