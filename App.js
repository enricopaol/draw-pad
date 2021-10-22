import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StatusBar
} from "react-native";

import { useFonts } from 'expo-font';

// Permissions
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

import EntryApp from "./EntryApp";

const App = () => {

    const [state, setState] = useState({
        cameraPermission: false,
        mediaPermission: false,
    })

    useEffect(() => {
        requestPermissions()
    }, []);

    const requestPermissions = async () => {
        const camera = await Camera.requestPermissionsAsync();
        const media = await MediaLibrary.requestPermissionsAsync();        

        setState({
            ...state,
            cameraPermission: camera.status === 'granted',
            mediaPermission: media.status === 'granted',
        })
    }

    const [loaded] = useFonts({
        circularStd: require('./assets/fonts/circular-std-medium-500.ttf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        state.cameraPermission && state.mediaPermission && loaded &&

        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar />
            <EntryApp
                initialScreen="Home"                
            />
        </SafeAreaView>
    );
}

export default App;