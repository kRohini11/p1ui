export const regExp = {
    "REQUIRED": (val) => {
        const exp = /\S/
        if (!exp.test(val)) {
            return "please Enter value"
        }
    },
    "EMAIL": (val) => {
        const exp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!exp.test(val)) {
            return "Please enter valid email"
        }
    },
    "MIN5CHARS": (val) => {
        const exp = /\S{5,}/
        if (!exp.test(val)) {
            return "should be min 5 chars"
        }
    }
}

const setErrorMsg = (criteria, inputControlObj, value) => {
    for (let i = 0; i < criteria?.length; i++) {
        const reExpFn = regExp[criteria[i]];
        const errMsg = reExpFn(value)
        if (errMsg) {
            inputControlObj.errMsg = errMsg;
            inputControlObj.isShowError = true;
            break;
        }
    }
}
export const validateInputControl = (eve, inputControlsArr, setInputControlsArr) => {
    const { name, value, type, checked } = eve?.target
    const clonedinputControlsArr = JSON.parse(JSON.stringify(inputControlsArr))
    const inputControlObj = clonedinputControlsArr.find((obj) => {
        return obj.name === name;
    })
    inputControlObj.isShowError = false;
    if (type === 'checkbox') {
        const checkedValues = inputControlObj.value ? inputControlObj.value.split(',') : [];
        if (checked) {
            checkedValues.push(value)
        }
        else {
            const index = checkedValues.indexOf(value)
            checkedValues.splice(index, 1)
        }
        inputControlObj.value = checkedValues.join()
    }
    else {
        inputControlObj.value = value;
    }
    const { criteria } = inputControlObj;
    setErrorMsg(criteria, inputControlObj, value)
    setInputControlsArr(clonedinputControlsArr)
}

export const validateForm = (inputControlsArr, setInputControlsArr) => {
    var dataObj = {}
    const clonedinputControlsArr = JSON.parse(JSON.stringify(inputControlsArr))
    clonedinputControlsArr.forEach((inputControlObj) => {
        const { value, name, criteria } = inputControlObj;
        dataObj[name] = value;
        inputControlObj.errMsg = "";
        inputControlObj.isShowError = false;
        setErrorMsg(criteria, inputControlObj, value)
    })
    const isFormInvalid = clonedinputControlsArr.some((obj) => {
        return obj.errMsg
    })
    setInputControlsArr(clonedinputControlsArr);
    return [isFormInvalid, dataObj]
}

export const resetForm = (inputControlsArr, setInputControlsArr) => {
    const clonedinputControlsArr = JSON.parse(JSON.stringify(inputControlsArr));
    clonedinputControlsArr.forEach((inputControlObj) => {
        inputControlObj.value = "";
    })
    setInputControlsArr(clonedinputControlsArr)
}