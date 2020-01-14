import React from 'react'
import { Card, CardBody } from 'reactstrap';


const CardWithLoading = (Component) => {
    return function EnhancedComponent({ isLoading, ...props }) {
        if (!isLoading) 
            return (
                <Card>
                    <CardBody>
                        <Component { ...props } />
                    </CardBody>
                </Card>          
            )
        else
            return (
                <Card>
                    <CardBody>
                        <div className="d-flex justify-content-center">
                            <div className="spinner-grow text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            );
    };
}

export default CardWithLoading