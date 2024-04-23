"use client"

import React, { useEffect, useState } from 'react'
import styles from './Students.module.css'
import { ServerCall } from '@/common/api/ServerCall'
import Table from '@/common/reusableComponents/Table/Table'
import { useDispatch } from 'react-redux'

const Students = () => {
    const [students, setStudents] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        const fnGetStudents = async () => {
            try {
                dispatch({ type: "LOADER", payload: true, })
                const res = await ServerCall.sendGetReq("std/get-std");
                if (Array.isArray(res?.data)) {
                    setStudents(res?.data)
                }
            }
            catch(e) {
                console.error(e)
            }
            finally {
                dispatch({ type: "LOADER", payload: false })
            }
        }
        fnGetStudents();

    }, [dispatch])


    return (
        <div data-testid="student-div">
            <h4 className='my-3 text-center'>Students</h4>
            <Table
                headers={["NAME", "UID", "ROLLNO", "ADDRESS"]}
                rows={students}
                tds={["name", "uid", "rollno", "address"]}

            />



        </div>
    )
}

export default Students
