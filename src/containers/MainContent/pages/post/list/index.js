import React, {useEffect, useState, useRef} from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { activateAuthLayout, getPosts, getPost, resetPost, setPostEpp, setPostSort, setPostPage } from '../../../../../store/actions';
// import queryString from 'query-string'
// import { useLocation, useHistory } from "react-router";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { types } from 'valico-sanmartin'
import Breadcrumb from '../components/Breadcrumb';
import Paginator from '../../../../../components/Paginator';
import Settingmenu from '../../../Subpages/Settingmenu';
import Item from './Item';
import CardWithLoading from '../../../../../components/CardWithLoading';


function Posts() {

    // const location = useLocation();
    const history = useHistory();
    const posts = useSelector(state => state.post.posts);
    const loadingPosts = useSelector(state => state.post.loadingPosts);
    const post = useSelector(state => state.post.post);    
    // const loadingPost = useSelector(state => state.post.loadingPost);
    const dispatch = useDispatch();
    
    const epp = useSelector(state => state.post.epp)
    const page = useSelector(state => state.post.page)
    const sort = useSelector(state => state.post.sort)
    
    
    let { id } = useParams();


    const prevAmount = usePrevious({id});
    // const [view, setView] = useState({
    //     page: 1
    // })
    
    
    // const changeUrlParam = (params) => {        

    //     let qs = queryString.parse(location.search)
    //         qs = {...qs, ...params}

    //     const url = location.pathname + '?' + queryString.stringify(qs)    
    //     history.push(url)        
    // }

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    useEffect(() => {      
        dispatch(activateAuthLayout())
    },[dispatch]);

    useEffect(() => {
        console.log('useEffect id location.search')
        
        if(id){
            if(!prevAmount || prevAmount.id !== id) {
                dispatch(getPost(id))                
            }            
        }
        else{            
            dispatch(resetPost())
        }
        
        // const qs = queryString.parse(location.search)                
        // const page = qs.page ? parseInt(qs.page) : 1
        dispatch(getPosts(id, page, epp, sort))
        
        console.log(id)
        console.log(page)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id, page, epp, sort])


    const handlePostEnter = (e, item) => {
        e.preventDefault()        
        history.push('/posts/'+item.uuid)
    }

    const handlePostEdit = (e, item) => {        
        e.preventDefault()        
        history.push('/posts/'+item.uuid+'/edit')
    }

    const handlePostBuild = (e, item) => {        
        e.preventDefault()        
        history.push('/posts/'+item.uuid+'/builder')
    }

    const handlePostRemove = (e, item) => {  // TODO
        e.preventDefault()        
        console.log('Remove')
    }

    // const handleBreadcrumbClick = (e, item) => {        
    //     e.preventDefault()      
    //     history.push('/posts/'+item.uuid)          
    // }


    const epps = [5,10,50,500];
    let eppOptions = [];
    epps.forEach((item,index) => {      
        eppOptions.push(<option key={index}>{item}</option>);
    })

    const sorts = [
        {
            value: 'created_at-',
            label: 'Newest'
        },
        {
            value: 'created_at',
            label: 'Oldest'
        },
        {
            value: 'name',
            label: 'Name'
        }
    ]
    let sortOptions = [];
    sorts.forEach((item,index) => {      
        sortOptions.push(<option key={index} value={item.value}>{item.label}</option>);
    })


    const handleSetEpp = (event) => {        
        console.log(event.target.value)
        dispatch(setPostEpp(event.target.value))
    }

    const handleSetSort = (event) => {        
        console.log(event.target.value)
        dispatch(setPostSort(event.target.value))
    }

    const handlePaginatorClick = (e, newPage) => {          
        e.preventDefault()                
        dispatch(setPostPage(newPage))        
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
                                    onEditClick={handlePostEdit}
                                    onBuildClick={handlePostBuild}
                                    onRemoveClick={handlePostRemove}
                                ></Item>)}                                                
                            </tbody>
                        </table>
                    </div>
                    <div className="pt-3">

                        <Paginator 
                            lastPage={posts.lastPage} 
                            currentPage={page}
                            onPageClick={handlePaginatorClick}                             
                        />

                    </div>
                </>
            )
        }
        else{
            return (<h4>Nothing yet</h4>)
        }

    }

    const ListWithLoading = CardWithLoading(Table);


    return (
        <>
            <div className="content">
                <div className="container-fluid">
                    
                    <div className="page-title-box">
                        <Row className="align-items-center">
                            <Col sm="6">
                                <h4 className="page-title">{post ? post.name : "Posts"}</h4>
                                <Breadcrumb 
                                    post={post} 
                                    // onClick={handleBreadcrumbClick}                                     
                                />
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
                                                    <select className="form-control" onChange={handleSetSort} value={sort}>
                                                        {sortOptions}                                                        
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