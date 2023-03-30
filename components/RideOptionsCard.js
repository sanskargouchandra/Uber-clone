import React from 'react'
import {
  Image,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useState } from "react";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Uber-Moto-123",
    title: "UberMoto",
    multiplier: 0.75,
    image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_150,h_150/v1649914539/assets/86/82f8b3-e2e6-45f8-a8f7-fdc511f709e0/original/Moto-150X150p4x.png",
},
    {
        id: "Uber-Auto-456",
        title: "UberAuto",
        multiplier: 1.2,
        image:
            "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_150,h_150/v1649914471/assets/89/8e4239-5e7d-4de7-bf71-00cc32d468db/original/Auto-150X150p4x.png",
    },
   
    { 
      id: "Uber-X-789",
      title: "UberCar",
      multiplier: 1.7,
      image:
        "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
  },

    {
        id: "Uber-LUX-987",
        title: "UberLUX", 
        multiplier: 2,
        image:
            "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png",
    },
];

const SURGE_CHARGE_RATE = 1.5;


const RideOptionsCard = () => {

  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  
  console.log(travelTimeInformation);

  return (
    <SafeAreaView stylw={tw`bg-white flex-grow`}>
      <View>
      <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={tw`absolute top-3 left-5 p-3 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
      <Text style={ tw`text-center py-5 text-xl`}>Select a ride- {travelTimeInformation?.distance?.text}</Text>
      </View>
      <View style={{ flex: 1 }}>
      <FlatList

style={{ flex: 1 }}
data={data}
keyExtractor={(item) => item.id}
renderItem={({ item: { id, title, image, multiplier }, item }) => {

    return (
        <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10
            ${id === selected?.id && "bg-gray-200"}`}
        >
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                }}
                source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
                                    <Text style={tw`text-xl font-semibold`}>{title}</Text>
                                    <Text>{travelTimeInformation?.duration?.text} Travel time</Text>
                                </View>
                                <Text style={tw`text-xl`}>
                                    {new Intl.NumberFormat("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                    }).format(
                                        (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE *   multiplier) / 100
                                    )}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity
                    disabled={!selected}
                    style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
                >
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})