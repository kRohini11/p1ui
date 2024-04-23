import React, { useState } from 'react'
import styles from './Table.module.css'
import { Pagination } from './Pagination'

const Table = ({ headers, rows, tds }) => {
    const perPage = 5;
    const [currPage, setCurrPage] = useState(1)
    const [currData, setCurrData] = useState([])
    React.useEffect(() => {
        const end = currPage * perPage;
        const start = end - perPage;
        setCurrData(rows.slice(start, end))
    }, [currPage, rows])
    return (
        <div data-testid="tableCmp" className='table-responsive container-fluid'>
            {rows?.length > 0 ?
                <div>
                    <table className='table table-striped'>
                        <thead className={styles.tableDark}>
                            {
                                headers?.map((val, ind) => {
                                    return <th key={`th_${ind}`}>{val}</th>
                                })
                            }
                        </thead>
                        <tbody>
                            {
                                currData?.map((obj, ind) => {
                                    return <tr key={`tr_${ind}`}>
                                        {
                                            tds?.map((val, inx) => {
                                                return <td key={`td_${inx}`}>{obj[val]}</td>
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>

                    </table>
                    <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={Math.ceil(rows.length / perPage)} />
                </div>
                :
                <h5 data-testid="no-data" className='text-center'>No Data Found</h5>
            }

        </div>
    )
}

export default Table
