import React from 'react'
import { Link } from 'react-router-dom';
import queryString from 'query-string'
import { useLocation, useHistory } from "react-router";

function Paginator({ paginator }) {

    const location = useLocation();
    const history = useHistory();
    // const [options, setOptions] = useState([])

    const handlePageClick = (e, i) => {
        e.preventDefault()
       
        let qs = queryString.parse(location.search)
            qs.page = i

        const url = location.pathname + '?' + queryString.stringify(qs)    
        history.push(url)
    }

    // useEffect(() => {      
    //     let op = [];
    //     for (let i = 1; i <= paginator.lastPage; i++) {
    //         if(i===paginator.page)
    //             op.push(<li key={i} className="page-item active"><Link className="page-link" to="#" onClick={(e) => handlePageClick(e,i)}>{i}</Link></li>);
    //         else
    //             op.push(<li key={i} className="page-item"><Link className="page-link" to="#" onClick={(e) => handlePageClick(e,i)}>{i}</Link></li>);
    //     }
    //     setOptions(op)        
    // },[paginator]);

    let options = [];
    for (let i = 1; i <= paginator.lastPage; i++) {
        if(i===paginator.page)
            options.push(<li key={i} className="page-item active"><Link className="page-link" to="#" onClick={(e) => handlePageClick(e,i)}>{i}</Link></li>);
        else
            options.push(<li key={i} className="page-item"><Link className="page-link" to="#" onClick={(e) => handlePageClick(e,i)}>{i}</Link></li>);
    }
    // setOptions(op)



    return (
        <ul className="pagination justify-content-end mb-0">
            <li className="page-item disabled">
                <Link className="page-link" to="#" tabIndex="-1" aria-disabled="true">Previous</Link>
            </li>

            {options}
                
            <li className="page-item">
                <Link className="page-link" to="#">Next</Link>
            </li>
        </ul>
    )
}

export default Paginator
