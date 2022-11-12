import React, { useState } from "react";
import { TabBarIOSItem, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { styles } from "./RegisterForm.styles";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { screen } from '../../../utils';
export function RegisterForm() {

  const [showPassword, setShowPassword] = useState(false);
  const navegation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth,
          formValue.email,
          formValue.password
        );
        navegation.navigate(screen.account.account)
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Registration error. Please try again later",

        })
      }
    },
  });

  const showHiddenPassword = () => setShowPassword((prevState) => !prevState)

  return (
    <View style={styles.content}>
      {/* EMAIL */}
      <Input
        placeholder="Enter email..."
        containerStyle={styles.input}
        rightIcon={<Icon type="material-community" name="at" iconStyle={styles.icon} />}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      {/* PASSWORD */}
      <Input
        placeholder="Enter password..."
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={<Icon type="material-community" name={showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.icon} onPress={showHiddenPassword} />}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      {/* REPEAT PASSWORD */}
      <Input
        placeholder="Confirm password..."
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={<Icon type="material-community" name={showPassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.icon} onPress={showHiddenPassword} />}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />

      <Button
        title="Sign up"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
