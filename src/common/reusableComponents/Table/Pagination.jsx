
import React, { useRef } from "react";

export const Pagination = ({ currPage, setCurrPage, totalPages }) => {
    const inputRef = useRef()
    const fnGo = () => {
        const pageNo = inputRef.current.value;
        if (pageNo < 1 || pageNo > totalPages) {
            alert("Invalid Entry");
            return;
        }
        setCurrPage(Number(pageNo))
    }
    const fnNext = () => {
        setCurrPage(currPage + 1)
    }

    const fnPrev = () => {
        setCurrPage(currPage - 1)
    }
    return <div className="row">
        <div className="col-4">
            <span>Go To :<input ref={inputRef} type="number" /><button className="btn btn-primary" onClick={fnGo}>Go</button></span>
        </div>
        <div className="col-4 text-center">
            <button className="btn btn-danger" onClick={fnPrev} disabled={currPage == 1}>Prev</button ><b data-testid="currPage">{currPage}</b><button className="btn btn-danger" onClick={fnNext} disabled={currPage == totalPages}>Next</button>
        </div>
        <div className="col-4 text-end">
            <span>Total Pages:{totalPages}</span>
        </div>
    </div>
}