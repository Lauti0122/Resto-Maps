import * as Yup from 'yup';

export function initialValues() {
    return {
        email: "",
        password: "",
        repeatPassword: ""
    }
}

export function validationSchema() {
    return Yup.object({
        email: Yup.string()
            .email("Invalid email")
            .required("email is required"),
        password: Yup.string()
            .required("Password is required"),
        repeatPassword: Yup.string()
            .required("Confirm your password")
            .oneOf([Yup.ref("password")], "passwords do not match"),
    })
}