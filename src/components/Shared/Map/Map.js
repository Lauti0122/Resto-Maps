import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import openMaps from 'react-native-open-maps'
import { styles } from './Map.styles'


export function Map(props) {
    const { location, name } = props

    const openAppMap = () => {
        openMaps({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 19,
            query: name
        })
    }
    return (
        <MapView style={styles.mapContent} initialRegion={location} onPress={openAppMap}>
            <Marker coordinate={location} />
        </MapView>
    )
}