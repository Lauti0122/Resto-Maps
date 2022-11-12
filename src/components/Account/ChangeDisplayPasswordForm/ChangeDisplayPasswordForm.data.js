import * as Yup from "yup";

export function initialValues() {
    return {
        password: "",
        newPassword: "",
        confirmNewPassword: ""
    };
}

export function validationSchema() {
    return Yup.object({
        password: Yup.string().required("Required field"),
        newPassword: Yup.string().required("Required field"),
        confirmNewPassword: Yup.string().required("Required field")
            .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
    });
}