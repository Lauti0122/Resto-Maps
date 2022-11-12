import React from 'react';
import { ScrollView } from 'react-native';
import { InfoForm, UploadImagesForm, ImageRestaurant } from '../../../components/Restaurants'
import { Button } from 'react-native-elements'
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './AddRestaurantScreen.data'
import { v4 as uuid } from 'uuid';
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../utils'
import { styles } from './AddRestaurantScreen.styles';
import { useNavigation } from '@react-navigation/native'
export function AddRestaurantScreen() {

  const navigation = useNavigation()
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      try {
        const newData = formValue
        newData.id = uuid()
        newData.createdAt = new Date();

        const myDB = doc(db, "restaurants", newData.id)
        await setDoc(myDB, newData);
        navigation.goBack();

      } catch (error) {
        console.log(error)
      }
    }
  });

  return (
    <ScrollView>
      <ImageRestaurant formik={formik} />

      <InfoForm formik={formik} />

      <UploadImagesForm formik={formik} />


      <Button title="Add Restaurant" buttonStyle={styles.addRestaurant} onPress={formik.handleSubmit} loading={formik.isSubmitting} />
    </ScrollView>
  )
}