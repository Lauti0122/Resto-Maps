import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import { Modal } from '../../../Shared'
import * as Location from 'expo-location';
import { Button } from 'react-native-elements'
import Toast from 'react-native-toast-message';
import MapView from 'react-native-maps';
import { styles } from './MapForm.styles';

export function MapForm(props) {
    const { show, close, formik } = props
    const [location, setlocation] = useState({
        latitude: 0.001,
        longitude: 0.001,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,

    })

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Toast.show({
                    type: "info",
                    position: "bottom",
                    text1: "Debes activar la localización desde tu configuración"
                });
                return;
            }
            const locationTemp = await Location.getCurrentPositionAsync({})
            setlocation({
                latitude: locationTemp.coords.latitude,
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            })
        })()

    }, [])

    const saveLocation = () => {
        formik.setFieldValue("location", location)
        close();
    }

    return (
        <Modal show={show} close={close}>

            <MapView initialRegion={location} showsUserLocation={true} onRegionChange={(locationTemp) => setlocation(locationTemp)} style={styles.mapStyle}>
                <MapView.Marker draggable coordinate={location} />
            </MapView>

            <View style={styles.mapActions}>
                <Button title="Save" containerStyle={styles.btnMapContainerSave} buttonStyle={styles.btnMapSave} onPress={saveLocation} />
                <Button title="Close" containerStyle={styles.btnMapContainerCancel} buttonStyle={styles.btnMapCancel} onPress={close} />
            </View>
        </Modal>
    )
}