import React from "react"
import { Component } from "react";
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';

import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
    Dimensions
} from "react-native"

import styles from "../styles/genericStyle";

class CameraScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {           
            type: Camera.Constants.Type.front,
            cameraOn: true
        }

        this.projectName = props.route.params.projectName;        

        this.globalCamera = React.createRef();
        this.listener = props.navigation.addListener('focus', this.focusScreen)
    }    

    focusScreen = () => {
        this.setState({
            cameraOn: true
        })
    }    

    setCameraType = () => {
        let type = this.state.type;
        type === Camera.Constants.Type.back ? type = Camera.Constants.Type.front : type = Camera.Constants.Type.back
        this.setState({
            type: type
        })
    }

    takePhoto = async () => {
        if (this.globalCamera) {
            const image = await this.globalCamera.current.takePictureAsync({
                base64: true
            });            
            
            this.goToDrawScreen(image)
        }
    }

    goToDrawScreen = (image) => {
        this.setState({
            cameraOn: false
        })

        this.props.navigation.navigate('DrawScreen', {
            projectName: this.projectName,
            image: image
        })        
    }

    componentWillUnmount = () => {
        this.listener()
    }

    render() {
        return (
            <View
                style={[
                    {
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',                        
                    }
                ]}
            >

                <View>

                    {
                        this.state.cameraOn === true &&
                        <Camera
                            style={{
                                height: Dimensions.get('window').height,
                                width: Dimensions.get('window').height * 9 / 16,
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'flex-end'
                            }}
                            ref={this.globalCamera}
                            type={this.state.type}
                            autoFocus="on"
                            ratio="16:9"
                        />
                    }

                </View>

                <View
                    style={[
                        styles.flexRow,
                        styles.paddingLeftRight(20, 20),
                        {
                            marginTop: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            position: 'absolute',
                            left: 0,
                            bottom: 40
                        }
                    ]}
                >
                    <Pressable
                        style={[
                            styles.marginLeftRight(0, 40)
                        ]}
                    >
                        <MaterialIcons name="aspect-ratio" size={30} color="#fff" />
                    </Pressable>

                    <Pressable
                        style={styles.circleButton}
                        onPress={this.takePhoto}
                    />

                    <View
                        style={[
                            styles.marginLeftRight(40, 0)
                        ]}
                    >
                        <TouchableOpacity
                            onPress={this.setCameraType}>
                            <MaterialIcons name="flip-camera-android" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

export default CameraScreen;