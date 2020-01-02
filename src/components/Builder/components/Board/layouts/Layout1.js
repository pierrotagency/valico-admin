import React from 'react'
import Area from '../components/Area'



function Layout1({
    children:areas, 
    renderModule, 
    moduleAdded, 
    disableModuleDrag,
    library
}) {
    return (
        <>

            <Area
                key={1}
                index={1}
                name="area1"
                renderModule={renderModule}
                moduleAdded={moduleAdded}              
                disableModuleDrag={disableModuleDrag}
                library={library}
            >
                {areas}
            </Area>            

            <Area
                key={2}
                index={2}
                name="area2"
                renderModule={renderModule}
                moduleAdded={moduleAdded}              
                disableModuleDrag={disableModuleDrag}
                library={library}
            >
                {areas}
            </Area>           
        
        </>
    )    
}

export default Layout1
