import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import MapView from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';

const MapScreen = () => {
  const Stack = createStackNavigator();

  return (
    <View>


      <View>style={tw`h-1/2`}
      <Map />
      </View>

      <View>style={tw`h-1/2`}
      <Stack.Navigator
         name="NavigateCard"
         component={NavigateCard}
         options={{
          headerShown: false,
         }}
         />
         <Stack.Navigator
         name="RideOptionsCard"
         component={RideOptionsCard}
         options={{
          headerShown: false,
         }}
         />
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})