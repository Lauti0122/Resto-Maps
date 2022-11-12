import React from 'react'
import { View, ScrollView } from 'react-native'
import { Text, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils';
import { LoginForm } from '../../../components/Auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './LoginScreen.styles';
export function LoginScreen() {
  const navigation = useNavigation()
  const goToRegister = () => {
    navigation.navigate(screen.account.register)
  }
  return (
    <KeyboardAwareScrollView>
      <Image source={require('../../../../assets/img/resto.png')} style={styles.img} />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>
          Don't have an account yet?
          <Text style={styles.btnRegister} onPress={goToRegister}>Register</Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  )
}