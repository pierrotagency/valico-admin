import React, {useEffect, useState, useRef, useCallback} from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { activateAuthLayout, getPosts, getPost, resetPost, setPostEpp, setPostSort } from '../../../../../store/actions';
import queryString from 'query-string'
import { useLocation, useHistory } from "react-router";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { types } from 'valico-sanmartin'
import Breadcrumb from '../components/Breadcrumb';
import Paginator from '../../../../../components/Paginator';
import Settingmenu from '../../../Subpages/Settingmenu';
import Item from './Item';


function Posts({}) {
    const location = useLocation();
    const history = useHistory();
    const posts = useSelector(state => state.post.posts);
    const loadingPosts = useSelector(state => state.post.loadingPosts);
    const post = useSelector(state => state.post.post);    
    // const loadingPost = useSelector(state => state.post.loadingPost);
    const dispatch = useDispatch();
    
    const epp = useSelector(state => state.post.epp)
    
    // const [father, setFather] = useState(null)
    // const [page, setPage] = useState(1)
    const [view, setView] = useState({
        page: 1,
        father: null
    })
    
    useEffect(() => {      
        dispatch(activateAuthLayout())
    },[dispatch]);
    
    
    const fetchPosts = useCallback(() => {

        console.log('>>> useCallback')
        dispatch(getPosts(view.father, view.page, epp))

    }, [dispatch, view.father, view.page, epp]);

    useEffect(() => {
        console.log('useEffect location')
        
        const qs = queryString.parse(location.search)        
        const father = qs.father ? qs.father : null
        const page = qs.page ? qs.page : 1
        
        if(page !== view.page || father !== view.father){
            setView({        
                page: page,
                father: father
            })            
        }

    }, [location.search, view.father, view.page])

    useEffect(() => {
        console.log('useEffect view')
        console.log(view)
        
        if(view.father){                   
            dispatch(getPost(view.father))
        }
        else{            
            dispatch(resetPost())
        }
        
        fetchPosts()

    }, [view, dispatch, fetchPosts])




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

    const epps = [5,10,50,500];
    let eppOptions = [];
    epps.map((item,index) => {
        // if(item===epp)
            // eppOptions.push(<option key={item} selected>{item}</option>);
        // else
            eppOptions.push(<option key={item}>{item}</option>);
    })

    const handleSetEpp = (event) => {        
        console.log(event.target.value)
        dispatch(setPostEpp(event.target.value))
    }

    const handleSetSort = (event) => {        
        console.log(event.target.value)
        dispatch(setPostSort(event.target.value))
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
                                    <form>
                                        <Row className="form-group mb-0">                                            
                                            <label className="col-sm-12 col-form-label">Posts per page</label>                                            
                                            <Col sm="12">
                                                <div className="input-group mb-0">
                                                    <select className="form-control" onChange={handleSetEpp} value={epp}>
                                                        {eppOptions}
                                                    </select>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row className="form-group mb-0">
                                            <label className="col-sm-12 col-form-label">Sort</label>
                                            <Col sm="12">
                                                <div className="input-group mb-0">
                                                    <select className="form-control" onChange={handleSetSort} value={epp}>
                                                        <option>Name ASC</option>
                                                        <option>Name DESc</option>
                                                        <option>Newest</option>
                                                        <option>Oldest</option>
                                                    </select>
                                                </div>
                                            </Col>
                                        </Row>
                                    </form>
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