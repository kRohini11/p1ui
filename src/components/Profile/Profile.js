
"use client"

import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import configuration from './configuration.json'
import { Input } from '@/common/reusableComponents/Input'
import { validateForm, validateInputControl, resetForm } from '@/common/validations/validations'
import { Select } from '@/common/reusableComponents/Select'
import { Textarea } from '@/common/reusableComponents/Textarea'
import { ServerCall } from '@/common/api/ServerCall'
import { Cookies } from '@/common/api/Cookies'
import { useDispatch } from 'react-redux'
import { Modal } from '@/common/reusableComponents/Modal'
import { useRouter } from 'next/navigation'


const Profile = () => {

    const [inputControls, setInputControls] = useState(configuration);
    const dispatch = useDispatch()
    const [isShowModal, setIsShowModal] = useState(false)
    const router = useRouter()
    useEffect(() => {
        async function getUsersById() {
            try {
                dispatch({ type: "LOADER", payload: true })
                const res = await ServerCall.sendGetReq(`std/get-user-by-id?id=${Cookies.getCookie("id")}`)
                const userInfo = res?.data?.[0]
                const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
                clonedInputControls?.forEach((obj) => {
                    obj.value = userInfo[obj.name]
                })
                setInputControls(clonedInputControls)
            }
            catch (e) {
                console.log("Profile", e)
            }
            finally {
                dispatch({ type: "LOADER", payload: false })
            }
        }
        getUsersById();
    }, [])

    const handleChange = (eve) => {
        // console.log(eve)
        validateInputControl(eve, inputControls, setInputControls)
    }

    const handleUpdate = () => {
        const [isFormInvalid, dataObj] = validateForm(inputControls, setInputControls);
        if (isFormInvalid) { return };
        // console.log(dataObj)
        dispatch({ type: "LOADER", payload: true })
        ServerCall.sendPutReq(`std/update-std/${Cookies.getCookie("id")}`, { data: dataObj })
            .then((res) => {
                // console.log("then", res)
                const { acknowledged, modifiedCount } = res.data;
                if (acknowledged && modifiedCount) {
                    // resetForm(inputControls, setInputControls)
                    dispatch({
                        type: "TOASTER",
                        payload: { isShowToaster: true, message: "Successfully updated", bgColor: "green" }
                    })
                }
                else {
                    dispatch({
                        type: "TOASTER",
                        payload: { isShowToaster: true, message: "Not Upadted", bgColor: "yellow" }
                    })
                }

            })
            .catch((res) => {
                console.log("catch", res)
                dispatch({
                    type: "TOASTER",
                    payload: { isShowToaster: true, message: "Something went wrong...", bgColor: "red" }
                })
            })
            .finally(() => {
                dispatch({ type: "LOADER", payload: false })
            })
    }
    const handleDelete = () => {
        setIsShowModal(true)
    }

    const fnClose = () => {
        setIsShowModal(false)
    }

    const fnOK = async () => {
        // alert("should delete");
        try {
            setIsShowModal(false);
            const res = await ServerCall.sendDeleteReq(`std/delete-std?id=${Cookies.getCookie('id')}`)
            console.log(res);
            const { acknowledged, deletedCount } = res?.data;
            if (acknowledged && deletedCount) {
                dispatch({
                    type: "TOASTER",
                    payload: { isShowToaster: true, message: "Successfully deleted", bgColor: "green" }
                })
                Cookies.clearCookie();
                dispatch({ type: "LOGOUT" })
                router.push('/login')
            }
            else {
                dispatch({
                    type: "TOASTER",
                    payload: { isShowToaster: true, message: "Not deleted", bgColor: "info" }
                })
            }
        }
        catch (e) {
            dispatch({
                type: "TOASTER",
                payload: { isShowToaster: true, message: "Something went wrong...", bgColor: "red" }
            })
        }
        finally {
        }
    }

    return (
        <div data-testid="profile-div" className='container-fluid'>
            <h3 className='my-3 text-center'>Profile</h3>
            {
                inputControls.map((obj, index) => {
                    switch (obj.tag) {
                        case 'input':
                            return <Input key={`input_${index}`} {...obj} handleChange={handleChange} />
                        case 'select':
                            return <Select key={`select_${index}`} {...obj} handleChange={handleChange} />
                        case 'textarea':
                            return <Textarea key={`ta_${index}`} {...obj} handleChange={handleChange} />

                    }
                })
            }
            <div className='row'>
                <div className='offset-sm-5 col-sm-7'>
                    <button className='btn btn-primary me-3' onClick={handleUpdate}>Update</button>
                    <button className='btn btn-primary me-3' onClick={handleDelete}>Delete</button>
                </div>

            </div>
            {isShowModal && <Modal text="Are u sure..." isShowOk={true} fnOK={fnOK} fnClose={fnClose} />}

        </div>
    )
}

export default Profile
