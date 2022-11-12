import React from 'react'
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, Button, Image } from 'react-native-elements';
import { screen } from '../../../utils';
import { styles } from './UserGuestScreen.styles';
export function UserGuestScreen() {

  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screen.account.login)
  }

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image source={require("../../../../assets/img/consulta.jpg")}
        style={styles.image}
      />
      <Text style={styles.title}> Check Profile</Text>
      <Text style={styles.description}>
        How would you describe your best restaurant? Search and view the best restaurants in a simple way, vote which one you liked the most and comment on your experience.</Text>
      <Button title="Check my profile" onPress={goToLogin} buttonStyle={styles.button} />



    </ScrollView>
  )
}