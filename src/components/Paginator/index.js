import React from 'react'
import { Link } from 'react-router-dom';
// import queryString from 'query-string'
// import { useLocation, useHistory } from "react-router";

function Paginator({ 
    paginator,
    onPageClick
}) {

    // const location = useLocation();
    // const history = useHistory();
    // const [options, setOptions] = useState([])

    const handlePageClick = (e, page) => (typeof(onPageClick) === 'function') ? onPageClick(e, page) : false
    const handlePreviousClick = (e) => (typeof(onPageClick) === 'function') ? onPageClick(e, paginator.page-1) : false
    const handleNextClick = (e) => (typeof(onPageClick) === 'function') ? onPageClick(e, paginator.page+1) : false

    const nextDisabled = paginator.page >= paginator.lastPage
    const previousDisabled = paginator.page <= 1

    // const handlePageClick = (e, i) => {
    //     e.preventDefault()
    //     let qs = queryString.parse(location.search)
    //         qs.page = i
    //     const url = location.pathname + '?' + queryString.stringify(qs)    
    //     history.push(url)
    // }

    let options = [];
    for (let i = 1; i <= paginator.lastPage; i++) {
        if(i===paginator.page)
            options.push(<li key={i} className="page-item active"><Link className="page-link" to="#" onClick={(e) => handlePageClick(e,i)}>{i}</Link></li>);
        else
            options.push(<li key={i} className="page-item"><Link className="page-link" to="#" onClick={(e) => handlePageClick(e,i)}>{i}</Link></li>);
    }

    return (
        <ul className="pagination justify-content-end mb-0">
            <li className={previousDisabled?'page-item disabled':'page-item'}>
                <Link className="page-link" to="#" tabIndex="-1" aria-disabled={previousDisabled} onClick={(e) => handlePreviousClick(e)}>Previous</Link>
            </li>

            {options}
                
            <li className={nextDisabled?'page-item disabled':'page-item'}>
                <Link className="page-link" to="#" aria-disabled={nextDisabled} onClick={(e) => handleNextClick(e)}>Next</Link>
            </li>
        </ul>
    )
}

export default Paginator
