import { useEffect, useRef } from "react";

export default function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    
    useEffect(() => {
        // console.log('set Previous')
        ref.current = value;
    }, [value]);
    
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}