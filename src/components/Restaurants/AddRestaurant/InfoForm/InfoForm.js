import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { MapForm } from '../MapForm'
import { styles } from './InfoForm.styles';

export function InfoForm(props) {
    const { formik } = props;
    const [showMap, setshowMap] = useState(false)

    const onOpenCloseMap = () => setshowMap(prevState => !prevState)

    return (
        <ScrollView>
            <ScrollView style={styles.content}>
                <Input
                    placeholder='Name...'
                    onChangeText={(text) => formik.setFieldValue("name", text)}
                    errorMessage={formik.errors.name}
                />
                <Input
                    placeholder='Address...'
                    rightIcon={{
                        type: "material-community",
                        name: "map-marker-radius",
                        color: getColorIconMap(formik),
                        onPress: onOpenCloseMap
                    }}
                    onChangeText={(text) => formik.setFieldValue("address", text)}
                    errorMessage={formik.errors.address}
                />
                <Input placeholder='Telephone...'
                    onChangeText={(text) => formik.setFieldValue("phone", text)}
                    errorMessage={formik.errors.phone}
                />
                <Input
                    placeholder='Email...'
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    errorMessage={formik.errors.email}
                />
                {/* Instagram */}
                <Input
                    placeholder='Instagram...'
                    onChangeText={(text) => formik.setFieldValue("instagram", text)}
                    errorMessage={formik.errors.instagram}
                />
                <Input
                    placeholder='Description...'
                    multiline={true}
                    inputContainerStyle={styles.textArea}
                    onChangeText={(text) => formik.setFieldValue("description", text)}
                    errorMessage={formik.errors.description}
                />


            </ScrollView>
            <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
        </ScrollView>
    )
}

const getColorIconMap = (formik) => {
    if (formik.errors.location) return "#ff0000";
    if (formik.values.location) return "#00a680";
    return "#c2c2c2"
}