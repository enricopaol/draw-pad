import React, { useEffect, useState } from "react";

import * as ImagePicker from 'expo-image-picker';

import {
    View,
    Text,
    Pressable,
    Modal,
    Dimensions,
    ScrollView
} from "react-native";

import styles from "../styles/genericStyle";
import colorPicker from "../utils/colorPicker";
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Card from '../components/ui/Card';

const SelectProjectType = (props) => {

    const [state, setState] = useState({
        backgroundColor: '',
        modalVisible: false,
        availableColors: [],        
    })

    const focusScreen = () => {
          // Getting random color
          let colors = new colorPicker;
          let colorBackground = colors.getRandomColor();
  
          // Getting colors list
          let colorsList = colors.colors;
  
          setState({
              ...state,
              backgroundColor: colorBackground,
              availableColors: colorsList
          })
    }

    useEffect(() => {
        // Setting focus function
        const listener = props.navigation.addListener('focus', focusScreen);

        // Getting random color
        let colors = new colorPicker;
        let colorBackground = colors.getRandomColor();

        // Getting colors list
        let colorsList = colors.colors;

        setState({
            ...state,
            backgroundColor: colorBackground,
            availableColors: colorsList
        })
        
    }, []);

    const goToCamera = () => {
        props.navigation.navigate('CameraScreen', {
            projectName: props.route.params.projectName
        })
    }

    const goToGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
            base64: true
        });        

        if (result.cancelled === false) {                        
            props.navigation.navigate('DrawScreen', {
                projectName: props.route.params.projectName,
                image: result,
            })
        }
    }

    const goToColors = (color) => () => {
        props.navigation.navigate('DrawScreen', {
            projectName: props.route.params.projectName,           
            backgroundColor: color
        })
    }

    const showHideModalColors = () => {
        setState({
            ...state,
            modalVisible: !state.modalVisible
        })
    }  

    return (
        <View
            style={[
                styles.flex,
                styles.flexCentered,
                styles.paddingLeftRight(20, 20),
                {
                    flex: 1,
                    backgroundColor: state.backgroundColor
                }
            ]}
        >

            <View
                style={{
                    width: '100%'
                }}
            >
                <Text
                    style={[
                        {
                            fontSize: 40
                        }
                    ]}
                >
                    {props.route.params.projectName}
                </Text>

                <Text
                    style={[
                        styles.marginTopBottom(40, 0),
                        {
                            fontSize: 16
                        }
                    ]}
                >
                    Chose where you want to start:
                </Text>
            </View>

            <View
                style={[
                    styles.paddingTopBottom(40, 0),
                    {
                        width: '100%'
                    }
                ]}
            >

                <Pressable
                    style={[
                        styles.marginTopBottom(0, 20)
                    ]}
                    onPress={goToCamera}
                >
                    <Card>

                        <View
                            style={[
                                styles.flexRow,
                                {
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }
                            ]}
                        >
                            <View
                                style={[
                                    styles.flexRow,
                                    {
                                        alignItems: 'center'
                                    }
                                ]}
                            >
                                <MaterialIcons name="photo-camera" size={24} color="#415161" />

                                <Text
                                    style={[
                                        {
                                            fontSize: 20,
                                            marginLeft: 10,
                                            color: '#415161'
                                        }
                                    ]}
                                >Take a Photo</Text>

                            </View>

                            <AntDesign name="arrowright" size={30} color="#415161" />

                        </View>

                    </Card>
                </Pressable>

                <Pressable
                    style={[
                        styles.marginTopBottom(0, 20)
                    ]}
                    onPress={goToGallery}
                >
                    <Card>

                        <View
                            style={[
                                styles.flexRow,
                                {
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }
                            ]}
                        >
                            <View
                                style={[
                                    styles.flexRow,
                                    {
                                        alignItems: 'center'
                                    }
                                ]}
                            >
                                <Fontisto name="picture" size={24} color="#415161" />

                                <Text
                                    style={[
                                        {
                                            fontSize: 20,
                                            marginLeft: 10,
                                            color: '#415161'
                                        }
                                    ]}
                                >Start with a Picture</Text>

                            </View>

                            <AntDesign name="arrowright" size={30} color="#415161" />

                        </View>

                    </Card>
                </Pressable>

                <Pressable
                    style={[
                        styles.marginTopBottom(0, 20)
                    ]}
                    onPress={showHideModalColors}
                >
                    <Card>

                        <View
                            style={[
                                styles.flexRow,
                                {
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }
                            ]}
                        >
                            <View style={[
                                styles.flexRow,
                                {
                                    alignItems: 'center',
                                }
                            ]}>
                                <Ionicons name="color-palette-outline" size={24} color="#415161" />

                                <Text
                                    style={[
                                        {
                                            fontSize: 20,
                                            marginLeft: 10,
                                            color: '#415161'
                                        }
                                    ]}
                                >Start with a Color</Text>
                            </View>

                            <AntDesign name="arrowright" size={30} color="#415161" />

                        </View>

                    </Card>
                </Pressable>

                {/* Modal Colors */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={state.modalVisible}
                >
                    <View style={[
                        styles.flexCentered,
                        {
                            flex: 1
                        }
                    ]}>
                        <View
                            style={[
                                styles.flex,
                                {
                                    height: Dimensions.get('window').height * 0.8,
                                    width: '80%',
                                    borderRadius: 5,
                                    backgroundColor: '#fff',
                                    padding: 20
                                }
                            ]}
                        >

                            <View
                                style={[
                                    styles.flexRow,
                                    {
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingBottom: 5
                                    }
                                ]}
                            >
                                <Text>Select Color</Text>

                                <Pressable
                                    onPress={showHideModalColors}
                                >
                                    <MaterialIcons name="clear" size={24} color="#000" />

                                </Pressable>
                            </View>

                            {/* Colors wrapper */}
                            <ScrollView
                                style={[
                                    {
                                        flex: 1,
                                    }
                                ]}

                            >

                                <View
                                    style={[
                                        styles.flexRow,
                                        {
                                            flexGrow: 1,
                                            flexWrap: 'wrap'
                                        }
                                    ]}
                                >
                                    <View
                                        style={[
                                            {
                                                width: '50%',
                                                height: 200,
                                                backgroundColor: '#FFFFFF'
                                            }
                                        ]}
                                    >
                                        <Pressable
                                            style={{
                                                height: '100%',
                                                width: '100%'
                                            }}
                                            onPress={goToColors('#FFFFFF')}
                                        >
                                            <Text style={{padding: 10}}>#FFFFFF</Text>
                                        </Pressable>
                                    </View>

                                    <View
                                        style={[
                                            {
                                                width: '50%',
                                                height: 200,
                                                backgroundColor: '#000000'
                                            }
                                        ]}                                        
                                    >
                                        <Pressable
                                            style={{
                                                height: '100%',
                                                width: '100%'
                                            }}
                                            onPress={goToColors('#000000')}
                                        >
                                            <Text style={{padding: 10, color: '#ffffff'}}>#000000</Text>
                                        </Pressable>
                                    </View>

                                    {
                                        state.availableColors.map((color, index) => {
                                            return (
                                                <View
                                                    style={[
                                                        {
                                                            width: '50%',
                                                            height: 200,
                                                            backgroundColor: color
                                                        }
                                                    ]}
                                                    key={index}
                                                >
                                                    <Pressable
                                                        style={{
                                                            height: '100%',
                                                            width: '100%'
                                                        }}
                                                        onPress={goToColors(color)}
                                                    >
                                                        <Text style={{padding: 10}}>{color}</Text>
                                                    </Pressable>
                                                </View>
                                            )
                                        })
                                    }


                                </View>
                            </ScrollView>

                        </View>
                    </View>
                </Modal>

            </View>
        </View>
    )
}

export default SelectProjectType;