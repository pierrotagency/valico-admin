import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Progress, Tooltip } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { activateAuthLayout, getPosts } from '../../../../../store/actions';
import { connect } from 'react-redux';
import Settingmenu from '../../../Subpages/Settingmenu';


import user6 from '../../../../../images/users/user-6.jpg';
import user7 from '../../../../../images/users/user-7.jpg';
import user8 from '../../../../../images/users/user-8.jpg';



class Posts extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.activateAuthLayout();

        this.props.getPosts();
    }


    render() {

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
                                        <div className="table-responsive project-list">
                                            <table className="table project-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Status</th>
                                                        <th scope="col">Team</th>
                                                        <th scope="col" style={{ width: "16%" }}>Progress</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>New admin Design</td>
                                                        <td>22/4/2019</td>
                                                        <td><span className="badge badge-soft-success badge-pill"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Completed</span></td>

                                                        <td>
                                                            <div className="team">
                                                                <Tooltip placement="top" isOpen={this.state.i1} target="i1" toggle={() => this.setState({ i1: !this.state.i1 })}>Roger Drake</Tooltip>
                                                                <Link to="#" id="i1" className="team-member"><img src={user6} alt="Valico" className="rounded-circle thumb-sm" /></Link>

                                                                <Tooltip placement="top" isOpen={this.state.i2} target="i2" toggle={() => this.setState({ i2: !this.state.i2 })}>Reggie James</Tooltip>
                                                                <Link to="#" id="i2" className="team-member"><img src={user7} alt="Valico" className="rounded-circle thumb-sm" /> </Link>

                                                                <Tooltip placement="top" isOpen={this.state.i3} target="i3" toggle={() => this.setState({ i3: !this.state.i3 })}>Reggie James</Tooltip>
                                                                <Link to="#" id="i3" className="team-member"><img src={user8} alt="Valico" className="rounded-circle thumb-sm" /></Link>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className="float-right mb-0 ml-3">80%</p>
                                                            <Progress className="mt-2" style={{ height: '5px' }} color="success" value={80} />
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <Tooltip placement="top" isOpen={this.state.t1} target="t1" toggle={() => this.setState({ t1: !this.state.t1 })}>Edit</Tooltip>
                                                                <Link to="#" id="t1" className="text-success mr-4"> <i className="dripicons-pencil h5 m-0"></i></Link>

                                                                <Tooltip placement="top" isOpen={this.state.t2} target="t2" toggle={() => this.setState({ t2: !this.state.t2 })}>Delete</Tooltip>
                                                                <Link to="#" id="t2" className="text-danger" > <i className="dripicons-cross h5 m-0"></i></Link>
                                                            </div>
                                                        </td>
                                                    </tr>

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


                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </div>
                </div>
            </>
        );
    }
}




const mapStatetoProps = state => {
    const { posts, loading } = state.post;
    return { posts, loading };
}

export default withRouter(connect(mapStatetoProps, { activateAuthLayout, getPosts })(Posts));



