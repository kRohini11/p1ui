import { Cookies } from "@/common/api/Cookies"

export const init = {
    user: {},
    isLoggedIn: Cookies.hasActiveSession(),
    isShowLoader: false,
    toaster: {
        isShowToaster: false,
        message: "",
        bgColor: ""
    }
}