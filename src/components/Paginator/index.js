import React from 'react'
import { Link } from 'react-router-dom';

function Paginator({     
    onPageClick,
    currentPage,
    lastPage
}) {

    const handlePageClick = (e, page) => (typeof(onPageClick) === 'function') ? onPageClick(e, page) : false
    const handlePreviousClick = (e) => (typeof(onPageClick) === 'function') ? onPageClick(e, currentPage-1) : false
    const handleNextClick = (e) => (typeof(onPageClick) === 'function') ? onPageClick(e, currentPage+1) : false

    const nextDisabled = currentPage >= lastPage
    const previousDisabled = currentPage <= 1

    let options = [];
    for (let i = 1; i <= lastPage; i++) {
        if(i===currentPage)
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