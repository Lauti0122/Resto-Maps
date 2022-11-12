import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, AirbnbRating, ListItem, Avatar } from "react-native-elements";
import { collection, query, onSnapshot, where, orderBy } from 'firebase/firestore'
import { db } from '../../../utils'
import { styles } from './Reviews.styles'
import { Loading } from '../../Shared'
import { map } from 'lodash'
import { DateTime } from 'luxon';
import "intl";
import "intl/locale-data/jsonp/es";

export function Reviews(props) {
    const { idRestaurant } = props
    const [reviews, setReviews] = useState(null)
    useEffect(() => {
        const q = query(
            collection(db, "reviews"),
            where("idRestaurant", "==", idRestaurant),
            orderBy("createdAt", "desc")
        )
        onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs)
        });
    }, [])
    if (!reviews) return <Loading show text="Loading..." />;
    return (

        < View style={styles.content}>
            {map(reviews, (review) => {
                const data = review.data()
                const createReview = new Date(data.createdAt.seconds * 1000)
                return (
                    <ListItem key={data.id} bottomDivider containerStyle={styles.review}>
                        <Avatar source={{ uri: data.avatar }} size={50} rounded />
                        <ListItem.Content>

                            <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>

                            <View style={styles.subtitle}>
                                <Text style={styles.comment}>{data.comment}</Text>
                                <View style={styles.contentRatingDate}>
                                    <AirbnbRating
                                        defaultRating={data.rating}
                                        showRating={false}
                                        size={15}
                                        isDisabled
                                        starContainerStyle={styles.starContainer}
                                    />
                                    <Text style={styles.date}>{DateTime.fromISO(createReview.toISOString()).toFormat("yyyy/LL/dd --hh:mm")}</Text>
                                </View>
                            </View>

                        </ListItem.Content>
                    </ListItem>
                )
            })}
        </View >
    )
}