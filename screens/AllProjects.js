import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    Pressable
} from "react-native"

import styles from "../styles/genericStyle";
import colorPicker from "../utils/colorPicker";

const AllProjects = (props) => {

    const [state, setState] = useState({
        projectsList: [],
        backgroundColor: ''
    })    

    useEffect(() => {
        // Setting focus function
        const listener = props.navigation.addListener('focus', focusScreen);        

        let colors = new colorPicker;
        let colorBackground = colors.getRandomColor();

        setState({
            ...state,
            backgroundColor: colorBackground
        })

        getData()
    }, [])

    const focusScreen = () => {
        getData()
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('projects')
            let projects = jsonValue != null ? JSON.parse(jsonValue) : [];

            setState({
                ...state,
                projectsList: projects
            })

        } catch (e) {
            console.log(e)
        }
    }

    const openProject = (projectName, imageUri) => async () => {
        
        const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });        

        let image = {
            uri: imageUri,
            base64: base64
        }
        
        props.navigation.navigate('DrawScreen', {
            projectName: projectName,
            image: image,
        })
    }

    return (
        <ScrollView
            style={[
                {
                    flex: 1
                }
            ]}
        >
            <View
                style={[
                    {
                        padding: 20
                    }
                ]}
            >
                <Text
                    style={[
                        {
                            fontSize: 30
                        }
                    ]}
                >
                    All Projects
                </Text>
            </View>

            <View
                style={[
                    styles.flexRow,
                    {
                        flexWrap: 'wrap'
                    }
                ]}
            >
                {
                    state.projectsList.map((el, index) => {
                        return (
                            <View
                                key={index}
                                style={[
                                    {
                                        width: Dimensions.get('window').width / 2,
                                        height: Dimensions.get('window').width / 2,
                                        // backgroundColor: 'red',                                        
                                        position: 'relative',
                                        padding: 1
                                    }
                                ]}
                            >
                                <Pressable
                                    onPress={openProject(el.projectName, el.path)}
                                >
                                    <Image
                                        style={[
                                            {
                                                height: '100%',
                                                width: '100%',
                                            }
                                        ]}
                                        source={{
                                            uri: el.path,
                                        }}
                                    />

                                    <Text
                                        style={[
                                            {
                                                position: 'absolute',
                                                top: 10,
                                                left: 10
                                            }
                                        ]}
                                    >
                                        {el.projectName}
                                    </Text>

                                </Pressable>
                            </View>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default AllProjects;