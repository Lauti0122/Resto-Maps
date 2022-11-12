import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { screen, db } from '../../../utils'
import { size } from "lodash";
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { styles } from './BtnReviewForm.styles'

export function BtnReviewForm(props) {
    const { idRestaurant } = props
    const [hasLogged, setHasLogged] = useState(false)
    const [hasReview, setHasReview] = useState(false)
    const navegation = useNavigation();
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false)
        })
    }, [])

    useEffect(() => {
        if (hasLogged) {
            const q = query(
                collection(db, "reviews"),
                where("idRestaurant", "==", idRestaurant),
                where("idUser", "==", auth.currentUser.uid)
            );
            onSnapshot(q, async (snapshot) => {
                if (size(snapshot.docs) > 0) setHasReview(true)

            })
        }
    }, [hasLogged])

    const goToLogin = () => {
        navegation.navigate(screen.account.tab, {
            screen: screen.account.login
        })
    }

    const goToAddReview = () => {
        navegation.navigate(screen.restaurant.addReviewRestaurant, {
            idRestaurant
        })
    }
    if (hasLogged && hasReview) {
        return (
            <View style={styles.content}>
                <Text style={styles.textSendReview}>
                    You have already reviewed this restaurant
                </Text>

            </View>
        )
    }
    return (
        <View style={styles.content}>
            {hasLogged ? (
                <Button
                    title="Escribe una opinion"
                    icon={{ type: "material-community", name: "square-edit-outline", color: "#00a680" }}
                    buttonStyle={styles.btn}
                    titleStyle={styles.titleBTN}
                    onPress={goToAddReview}
                />
            ) : (
                <Text style={styles.text}>to write a review you must be registered, {" "}
                    <Text style={styles.textClick} onPress={goToLogin}>Press HERE to login</Text>

                </Text>
            )}
        </View>
    )
}