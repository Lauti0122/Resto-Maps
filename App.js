import { AppNavegation } from './src/navegation/AppNavegation';
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { initFirebase } from './src/utils';
import "react-native-get-random-values"
export default function App() {
  return (
    <>
      <NavigationContainer>
        <AppNavegation />
      </NavigationContainer>
      <Toast />
    </>
  );
}


