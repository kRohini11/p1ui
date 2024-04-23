
import React from "react"
import styles from './Textarea.module.css'

const Textarea = ({ label, errMsg, isShowError, handleChange, name, value }) => {
    return (
        <div className='row mb-3'>
            <div className='col-sm-5 text-end'>
                <label>{label}</label>
            </div>
            <div className='col-sm-3'>
                <textarea name={name} value={value} onChange={handleChange} className="form-control" />

            </div>
            <div className='col-sm-4'>
                {isShowError && <b className='text-danger'>{errMsg}</b>}
            </div>
        </div>
    )
}

export default Textarea