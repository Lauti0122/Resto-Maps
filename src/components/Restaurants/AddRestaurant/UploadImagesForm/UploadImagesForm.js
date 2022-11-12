import React, { useState } from 'react'
import { Alert, ScrollView } from 'react-native';
import { Icon, Avatar, Text } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import { LoadingModal } from '../../../Shared';
import { map, filter } from 'lodash'
import { styles } from './UploadImagesForm.styles';


export function UploadImagesForm(props) {

    const { formik } = props;

    const [isLoading, setisLoading] = useState(false)

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setisLoading(true)
            uploadImage(result.uri)
        }

    }
    const uploadImage = async (uri) => {
        const response = await fetch(uri)
        const blob = await response.blob()
        const storage = getStorage();
        const storageRef = ref(storage, `restaurants/${uuid()}`)

        uploadBytes(storageRef, blob).then(snapshot => {
            updatePhotosRestaurant(snapshot.metadata.fullPath)
        })
    }

    const updatePhotosRestaurant = async (imagePath) => {
        const storage = getStorage();
        const imageRef = ref(storage, imagePath)

        const imageUrl = await getDownloadURL(imageRef)
        formik.setFieldValue("images", [...formik.values.images, imageUrl])
        setisLoading(false);
    }

    const removeImage = (img) => {
        Alert.alert(
            "Delete image",
            "Are you sure you want to delete this image?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        const result = filter(formik.values.images, (image) => image !== img)
                        formik.setFieldValue("images", result)
                    }
                }
            ],
            { cancelable: false }
        )
    }
    return (
        <>
            <ScrollView style={styles.viewImages} horizontal showsHorizontalScrollIndicator={false}>
                <Icon
                    type='material-community'
                    name='camera'
                    color='#a7a7a7'
                    containerStyle={styles.containerIcon}
                    onPress={openGallery}
                />

                {map(formik.values.images, (image) => (
                    <Avatar
                        key={image}
                        source={{ uri: image }}
                        containerStyle={styles.imageStyle}
                        onPress={() => removeImage(image)}
                    />
                ))}
            </ScrollView>
            <Text style={styles.error}>{formik.errors.images}</Text>
            <LoadingModal show={isLoading} text="Uploading image..." />
        </>
    )
}