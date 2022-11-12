import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen } from '../utils';
import { RestaurantsScreen } from '../screens/Restaurants/RestaurantsScreen';
import { AddRestaurantScreen } from '../screens/Restaurants/AddRestaurantScreen';
import { RestaurantScreen } from '../screens/Restaurants/RestaurantScreen'
import { AddReviewRestaurantScreen } from '../screens/Restaurants/AddReviewRestaurantScreen'
const Stack = createNativeStackNavigator();
export function RestaurantStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.restaurant.restaurants} component={RestaurantsScreen} options={{ title: "Restaurants" }} />
            <Stack.Screen name={screen.restaurant.addRestaurant} component={AddRestaurantScreen} options={{ title: "New Restaurant" }} />
            <Stack.Screen name={screen.restaurant.restaurant} component={RestaurantScreen} options={{ title: "Restaurant" }} />
            <Stack.Screen name={screen.restaurant.addReviewRestaurant} component={AddReviewRestaurantScreen} options={{ title: "New comment" }} />

        </Stack.Navigator>

    )
}