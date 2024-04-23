"use client"

import React, { useState } from 'react'
import styles from './Login.module.css'
import { Input } from '@/common/reusableComponents/Input'
import inputControls from './configuration.json'
import { validateForm, validateInputControl } from '@/common/validations/validations'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { ServerCall } from '@/common/api/ServerCall'
import { useRouter } from 'next/navigation'
import { Cookies } from '@/common/api/Cookies'

const Login = () => {

    const [inputControlsArr, setInputControlsArr] = useState(inputControls)
    const dispatch = useDispatch()
    const router = useRouter()
    const handleLogin = async (eve) => {
        eve.preventDefault();
        try {
            const [isFormInvalid, dataObj] = validateForm(inputControlsArr, setInputControlsArr);
            if (isFormInvalid) {
                return;
            }
            dispatch({ type: "LOADER", payload: true })
            const res = await ServerCall.sendPostReq("std/login", { data: dataObj })
            if (res.data?.length) {
                console.log(res.data[0])
                Cookies.setCookie("token", res?.data?.[0]?.token)
                Cookies.setCookie("id", res?.data?.[0]?._id)
                dispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: res.data[0] } })
                router.push("/")
            }
            else {
                dispatch({ type: "TOASTER", payload: { isShowToaster: true, message: "please check entered uid or password", bgColor: "red" } })
            }
        }
        catch (e) {
            console.error(e);
            dispatch({ type: "TOASTER", payload: { isShowToaster: true, message: e.message, bgColor: "red" } })
        }
        finally {
            dispatch({ type: "LOADER", payload: false })
        }
    }
    const handleChange = (eve) => {
        validateInputControl(eve, inputControlsArr, setInputControlsArr)

    }

    return (
        <div data-testid="loginTest" className='container-fluid'>
            <h3 className='text-center my-3'>Login</h3>
            <form onSubmit={handleLogin}>
                {
                    inputControlsArr.map((obj, index, oa) => {
                        return <Input key={`Input_${index}`} {...obj} handleChange={handleChange} />
                    })
                }
                <div className='row'>
                    <div className='offset-sm-5 col-sm-7'>
                        <button className='btn btn-primary me-3'>Login</button>
                        <Link href="/register">To Register</Link>
                    </div>
                </div>

            </form>
        </div>

    )
}

export default Login
