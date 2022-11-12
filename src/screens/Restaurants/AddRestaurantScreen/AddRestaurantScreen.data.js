import * as Yup from 'yup';
export function initialValues() {
    return {
        name: "",
        address: "",
        phone: "",
        email: "",
        instagram: "",
        description: "",
        location: null,
        images: []
    }
}
export function validationSchema() {
    return Yup.object({

        name: Yup.string().required("Required field"),
        address: Yup.string().required("Required field"),
        phone: Yup.string().required("Required field"),
        email: Yup.string().required("Required field"),
        instagram: Yup.string().required("Required field"),
        description: Yup.string().required("Required field"),
        location: Yup.object().required("Location is required"),
        images: Yup.array().min(1, "At least one image is required").required("The image is required")
    })
}