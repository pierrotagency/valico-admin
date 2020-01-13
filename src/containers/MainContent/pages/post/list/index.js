import React, {useEffect} from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { activateAuthLayout, getPosts, getPost, resetPost } from '../../../../../store/actions';
import queryString from 'query-string'
import { useLocation, useHistory } from "react-router";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Settingmenu from '../../../Subpages/Settingmenu';
import Item from './Item';

import { types } from 'valico-sanmartin'
import Breadcrumb from '../components/Breadcrumb';
import Paginator from '../../../../../components/Paginator';


function Posts({
    ddd,
    aaa
}) {
    const location = useLocation();
    const history = useHistory();
    const posts = useSelector(state => state.post.posts);
    const loadingPosts = useSelector(state => state.post.loadingPosts);
    const post = useSelector(state => state.post.post);    
    // const loadingPost = useSelector(state => state.post.loadingPost);
    const dispatch = useDispatch();
    
    useEffect(() => {      
        dispatch(activateAuthLayout())
    },[dispatch]);
    

    useEffect(() => {
        console.log('useEffect Location') // TODO is running twice on history back
        
        const qs = queryString.parse(location.search)        

        let page = qs.page ? qs.page : 1

        // eslint-disable-next-line no-mixed-operators
        if( qs.father && (!post || post && post.uuid !== qs.father) ){        
            page = 1
            dispatch(getPost(qs.father))
        }
        else if(!qs.father){
            dispatch(resetPost())
        }

        dispatch(getPosts(qs.father, page))


    }, [location, dispatch, post])


    const handlePostEnter = (e, item) => {
        e.preventDefault()        

        let qs = queryString.parse(location.search)
            qs.father = item.uuid

        const url = location.pathname + '?' + queryString.stringify(qs)    
        history.push(url)
    }

    const handlePostEdit = (e, item) => {        
        e.preventDefault()        

        const url = '/posts/'+item.uuid+'/builder'
        history.push(url)
    }

    // MMM should be common, and might uuid be param, filters still query
    const handleBreadcrumbClick = (e, item) => {        
        e.preventDefault()        
        
        let qs = queryString.parse(location.search)
            qs.father = item.uuid

        const url = location.pathname + '?' + queryString.stringify(qs)    
        history.push(url)        
    }

    const withLoading = (Component) => {
        return function EnhancedComponent({ isLoading, ...props }) {
            if (!isLoading) 
                return <Component { ...props } />;            
            else
                return (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                );
        };
    }

    const Table = () => {

        if(posts && posts.total > 0) {
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
                                {posts.data.map((post, index) => <Item 
                                    item={post} key={index} types={types}
                                    onEnter={handlePostEnter} 
                                    onEdit={handlePostEdit}
                                ></Item>)}                                                
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-3">

                        <Paginator paginator={posts} />

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
                                <h4 className="page-title">{post ? post.name : "Posts"}</h4>
                                <Breadcrumb post={post} onClick={handleBreadcrumbClick} />
                            </Col>
                            <Col sm="6">
                                <div className="float-right d-none d-md-block">
                                    <Settingmenu />
                                </div>
                            </Col>
                        </Row>
                    </div>
                
                    <Row>
                        <Col xl="4" md="12">
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
                        <Col xl="4" md="12">
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
                        <Col xl="4" md="12">
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
                                        isLoading={loadingPosts}
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