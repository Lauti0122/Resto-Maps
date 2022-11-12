import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangeDisplayPasswordForm.data';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { styles } from './ChangeDisplayPasswordForm.styles';
export function ChangeDisplayPasswordForm(props) {

    const { onClose } = props

    const [showPassword, setshowPassword] = useState(false)
    const [showPasswordTwo, setshowPasswordTwo] = useState(false);
    const [showPasswordThree, setshowPasswordThree] = useState(false);

    const onShowPassword = () => setshowPassword((prevState) => !prevState)
    const onShowPasswordTwo = () => setshowPasswordTwo((prevState) => !prevState)
    const onShowPasswordThree = () => setshowPasswordThree((prevState) => !prevState)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema,
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser
                const credentials = EmailAuthProvider.credential(
                    currentUser.email,
                    formValue.password
                );
                reauthenticateWithCredential(currentUser, credentials);

                await updatePassword(currentUser, formValue.newPassword)

                onClose();
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error changing password"
                })
            }
        }
    })
    return (
        <View style={styles.content}>
            <Input
                placeholder='Current password...'
                containerStyle={styles.input}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: onShowPassword
                }}
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
            />

            <Input
                placeholder='New password...'
                containerStyle={styles.input}
                secureTextEntry={showPasswordTwo ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPasswordTwo ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: onShowPasswordTwo
                }}
                onChangeText={(text) => formik.setFieldValue("newPassword", text)}
                errorMessage={formik.errors.newPassword}
            />

            <Input
                placeholder='Repeat new password...'
                containerStyle={styles.input}
                secureTextEntry={showPasswordThree ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPasswordThree ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: onShowPasswordThree
                }}
                onChangeText={(text) => formik.setFieldValue("confirmNewPassword", text)}
                errorMessage={formik.errors.confirmNewPassword}
            />

            <Button
                title="Change password"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
            >
            </Button>
        </View>
    )
}