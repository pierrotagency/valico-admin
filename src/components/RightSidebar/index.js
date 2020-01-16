import React  from 'react';

const RightSidebar = ({
    children,
    visible
}) => {

    if(visible)
        return (
            <>
                <div className="right-sidebar d-none d-xl-block">
                    <div className="slimscroll-menu">
                        {children}
                    </div>
                </div>
            </>
        )
    else
        return (<></>)


}

export default RightSidebar;