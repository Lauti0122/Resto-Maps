import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { screen, db } from '../../../utils';
import { LoadingModal } from '../../../components/Shared';
import { ListRestaurants } from '../../../components/Restaurants'
import { styles } from './RestaurantsScreen.styles';

export function RestaurantsScreen(props) {
    const { navigation } = props

    const [currentUser, setcurrentUser] = useState(null);
    const [restaurants, setRestaurants] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setcurrentUser(user)
        })
    }, [])

    useEffect(() => {
        const q = query(collection(db, "restaurants"),
            orderBy("createdAt", "desc")
        );

        onSnapshot(q, (snapshot) => {
            setRestaurants(snapshot.docs)
        })
    }, [])


    const goToAddRestaurant = () => {
        navigation.navigate(screen.restaurant.addRestaurant)
    }

    return (
        <View style={styles.content}>

            {!restaurants ? (
                <LoadingModal show text="Loading..." />
            ) : (
                <ListRestaurants restaurants={restaurants} />
            )}


            {currentUser && (


                <Icon
                    reverse
                    type='material-community'
                    name='plus'
                    color='#00a680'
                    containerStyle={styles.btnContainer}
                    onPress={goToAddRestaurant}
                />
            )}
        </View>
    )
}