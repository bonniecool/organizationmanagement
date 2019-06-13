import * as c from "./constant";
import alert from "react-s-alert";
import * as helper from "../../Helpers";

export const loading = (key, set = true) => {
    if (!key) {
        return { type: c.CLEAR_LOADING };
    }

    if (set) {
        return { type: c.SET_LOADING, key };
    }

    return { type: c.DONE_LOADING, key };
};

export const apiError = response => {
    if (!response) {
        alert.error("Whoops, looks like something went wrong.");
        return false;
    }

    if (!response.status) {
        alert.error("Response status not found, Please check your connection.");
        return true;
    }

    if (response.status === 422) {
        const errors = (response.data) ? response.data.errors : response.errors;
        alert.error(helper.getFirstMessage(errors));
        return true;
    }

    if (response.status === 400) {
        alert.error(response.data ? response.data.message : response.message);
        return true;
    }

    if (response.status === 404) {
        alert.error(response.message);
        return true;
    }

    if (response.status === 403) {
        let msg = response.message;
        alert.error(msg);

        switch (msg) {
            case "Token Expired":
            case "Invalid Token":
                sessionStorage.clear();
                return true;
            default:
                return true;
        }
    }

    if (response.status !== 200) {
        alert.error(
            `Unregistered status "${response.status}", ${response.message}`
        );
    }

    return false;
};
