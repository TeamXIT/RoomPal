//app.tsx
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/Screens/Authn/LoginScreen';
import RegisterScreen from './src/Screens/Authn/RegisterScreen';
import VerificationScreen from './src/Screens/Authn/VerificationScreen';
import ForgotPassword from './src/Screens/Authn/ForgotPassword';
import ResetPasswordScreen from './src/Screens/Authn/ResetPasswordScreen';
import SucessPasswordScreen from './src/Screens/Authn/SuccessPasswordScreen';
import UnsuccessPasswordScreen from './src/Screens/Authn/UnsuccessPasswordScreen';
import RoomPalIntro from './src/Screens/Authn/IntroScreen';
import RoomDetails from './src/Screens/Authn/RoomDetails';
import RoomCreateScreen from './src/Screens/Authn/RoomCreateScreen';
import { store } from './src/reducers/store';
import { Provider } from 'react-redux';
import ListOfRooms from './src/Screens/Authn/ListOfRooms';


const Stack = createStackNavigator();

const Authn = () => {
  // Stack Navigator for Login and Sign up Screen
  return (


    <Stack.Navigator initialRouteName="ListOfRooms">

      <Stack.Screen
        name="Intro"
        component={RoomPalIntro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="SucessPasswordScreen"
        component={SucessPasswordScreen}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="UnsuccessPasswordScreen"
        component={UnsuccessPasswordScreen}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="RoomDetails"
        component={RoomDetails}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="RoomCreateScreen"
        component={RoomCreateScreen}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="ListOfRooms"
        component={ListOfRooms}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

function App(): React.JSX.Element {

  return (

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Authn">

          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Authn"
            component={Authn}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}



export default App;