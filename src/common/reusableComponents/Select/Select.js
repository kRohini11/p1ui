
import React from "react"
import styles from './Select.module.css'

const Select = ({ label, errMsg, isShowError, handleChange, values, name, value, options }) => {
    return (
        <div className='row mb-3'>
            <div className='col-sm-5 text-end'>
                <label>{label}</label>
            </div>
            <div className='col-sm-3'>
                <select className="form-control" value={value} name={name} onChange={handleChange}>
                    <option value="">---Please Select---</option>
                    {
                        options.map((val, ind) => {
                            return <option value={values[ind]} key={`options_${ind}`}>{val}</option>
                        })
                    }

                </select>
            </div>
            <div className='col-sm-4'>
                {isShowError && <b className='text-danger'>{errMsg}</b>}
            </div>
        </div>
    )
}

export default Select