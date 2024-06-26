
function getDate(days) {
    const now = new Date();
    now.setDate(now.getDate() + days)
    return now;
}

function getCookieObject(cookies) {
    const cookieArr = cookies.split(";");
    return cookieArr.reduce((init, cookieValue) => {
        const [key, value] = cookieValue?.split("=");
        init[key?.trim()] = value?.trim();
        return init;

    }, {})
}

export class Cookies {
    static setCookie(key, value, days) {
        if (typeof window !== 'undefined') {
            if (days) {
                window.document.cookie = `${key}=${value};expires=${getDate(days)}`
            }
            else {
                window.document.cookie = `${key}=${value}`
            }
        }
    }
    static getCookie(key) {
        if (typeof window !== 'undefined') {
            const cookieObj = getCookieObject(window.document.cookie)
            return cookieObj[key];
        }
    }
    static deleteCookie(key) {
        if (typeof window !== 'undefined') {
            window.document.cookie = `${key}=;expires=${getDate(-1)}`
        }
    }
    static clearCookie() {
        if (typeof window !== 'undefined') {
            const cookieObj = getCookieObject(window.document.cookie)
            for (let key in cookieObj) {
                window.document.cookie = `${key}=;expires=${getDate(-1)}`
            }
        }
    }
    static hasActiveSession() {
        return this.getCookie('token') ? true : false;
    }
}