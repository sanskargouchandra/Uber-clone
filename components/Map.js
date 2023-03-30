import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';

import { GOOGLE_MAPS_APIKEY } from '@env';
import tw from "tailwind-react-native-classnames";
import { selectOrigin, selectDestination, setTravelTimeInformation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

const Map = () => {
const origin = useSelector(selectOrigin);
const destination = useSelector(selectDestination);
const mapRef = useRef(null);


useEffect(()=>{
  if (!origin || !destination) return;

  mapRef.current.fitToSuppliedMakers(["origin", "destination"],{
    edgePadding: { top: 50, right: 50, bottom: 50, left:50 },
  });
}, [origin , destination]);

  return (
    <MapView
    style={tw`flex-1`}
    mapType="mutedStandard"
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}
  >

{origin && destination && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    lineDashPattern={[1]}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}

        {origin?.location &&(
            <Marker
            coordinate={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"

            />
        )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});