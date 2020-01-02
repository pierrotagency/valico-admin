import React from 'react'
import Area from '../components/Area'



function Layout1({ children:areas, renderModule, moduleAdded, disableModuleDrag,modules }) {
    return (
        <>

            <Area
                key={1}
                index={1}
                renderModule={renderModule}
                moduleAdded={moduleAdded}              
                disableModuleDrag={disableModuleDrag}
                modules={modules}
            >
                {areas[0]}
            </Area>            

            <Area
                key={2}
                index={2}
                renderModule={renderModule}
                moduleAdded={moduleAdded}              
                disableModuleDrag={disableModuleDrag}
                modules={modules}
            >
                {areas[1]}
            </Area>           
        
        </>
    )    
}

export default Layout1
