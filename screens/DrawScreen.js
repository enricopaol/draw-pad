import React, { Component } from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    Text,
    Pressable,
    Modal,
    ScrollView
} from 'react-native';

import { Dimensions } from 'react-native';

import SignatureScreen from "react-native-signature-canvas";
import styles from '../styles/genericStyle';
import colorPicker from '../utils/colorPicker';

class DrawScreen extends Component {
    constructor(props) {
        super(props)

        this.globalDraw = React.createRef();       

        this.image = props.route.params.image;        

        this.projectName = props.route.params.projectName;

        this.availableColors = [];

        this.state = {
            currentColor: '#fff',
            modalVisible: false,
            selectedBackgroundColor: props.route.params.backgroundColor
        }
    }

    componentDidMount() {
        const colorsPicked = new colorPicker;
        this.availableColors = colorsPicked.colors;        
    }

    handleClear = () => {
        this.globalDraw.current.clearSignature();
    }

    handleConfirm = () => {
        this.globalDraw.current.readSignature();
    }

    // Save image
    handleOK = async (signature) => {
        const base64Code = signature.split("data:image/png;base64,")[1];

        const filename = FileSystem.documentDirectory + this.projectName + '.png';

        await FileSystem.writeAsStringAsync(filename, base64Code, {
            encoding: FileSystem.EncodingType.Base64,
        });

        const mediaResult = await MediaLibrary.createAssetAsync(filename);        

        const newImage = {
            path: mediaResult.uri,
            projectName: mediaResult.filename
        }

        // Save project on Storage
        await this.storeData(newImage)

        this.props.navigation.navigate('AllProjects');
    };

    changeColor = (color) => () => {               
        this.globalDraw.current.changePenColor(color);
        this.setState({
            currentColor: color,
            modalVisible: false
        })
    }

    unDoStroke = () => {
        this.globalDraw.current.undo()
    }

    showHideModalColors = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    storeData = async (value) => {
        try {        
            // Get    
            const jsonValue = await AsyncStorage.getItem('projects')
            let projects = jsonValue != null ? JSON.parse(jsonValue) : [];            
            
            // Push
            projects.push(value);

            // Set
            const newJson = JSON.stringify(projects)
            await AsyncStorage.setItem('projects', newJson)

        } catch (e) {
            console.log(e)
        }        
    }


    render() {

        const webStyle = `
            .m-signature-pad--footer {
                display: none; 
                margin: 0px; 
                width: 100%
            }
            body, html, * {                   
                height: 100%;
                padding: 0,
                border: none           
            }
        `

        return (
            <View
                style={[
                    styles.flexCentered,
                    {
                        flex: 1,
                    }
                ]}
            >
                <View
                    style={{
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').height * 9 / 16,
                        position: 'relative',
                    }}
                >

                    <View
                        style={[
                            styles.flex,
                            styles.flexCentered,
                            {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                zIndex: 1
                            }
                        ]}
                    >
                        <View
                            style={[
                                {
                                    width: '100%',
                                    maxWidth: Dimensions.get('window').width,
                                }
                            ]}
                        >
                            <View
                                style={[
                                    {
                                        height: 30,
                                        width: 30,
                                        borderRadius: 30,
                                        backgroundColor: this.state.currentColor,
                                        margin: 20
                                    }
                                ]}
                            >

                            </View>
                        </View>
                    </View>

                    <SignatureScreen
                        ref={this.globalDraw}
                        dataURL={this.image ? 'data:image/png;base64,' + this.image.base64 : null}
                        webStyle={webStyle}
                        minWidth={0.5}
                        maxWidth={5}
                        onOK={this.handleOK}
                        penColor="#fff"
                        backgroundColor={this.state.selectedBackgroundColor}
                    />

                    <View style={[
                        styles.flexRow,
                        {
                            width: '100%',
                            position: 'absolute',
                            left: 0,
                            bottom: 40,
                            justifyContent: "center"
                        }
                    ]}>
                        <View
                            style={[
                                styles.flexRow,
                                {
                                    width: '100%',
                                    maxWidth: Dimensions.get('window').width,
                                    justifyContent: 'space-around',
                                }
                            ]}
                        >

                            {/* Clear */}
                            <Pressable
                                style={[
                                    {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        padding: 5
                                    }
                                ]}
                                onPress={this.handleClear}
                            >
                                <MaterialIcons name="clear" size={24} color="#fff" />
                            </Pressable>

                            {/* Undo */}
                            <Pressable
                                style={[
                                    {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        padding: 5
                                    }
                                ]}
                                onPress={this.unDoStroke}
                            >
                                <Ionicons name="arrow-undo-sharp" size={24} color="#fff" />
                            </Pressable>

                            {/* Colors */}
                            <Pressable
                                style={[
                                    {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        padding: 5
                                    }
                                ]}
                                onPress={this.showHideModalColors}
                            >
                                <Ionicons name="color-palette" size={24} color="#fff" />
                            </Pressable>

                            {/* Modal Colors */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
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
                                                onPress={this.showHideModalColors}
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

                                                {
                                                    this.availableColors.map((color, index) => {
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
                                                                    onPress={this.changeColor(color)}
                                                                >

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

                            {/* Confirm */}
                            <Pressable
                                style={[
                                    {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        padding: 5,
                                        borderRadius: 4
                                    }
                                ]}
                                onPress={this.handleConfirm}
                            >
                                <Feather name="check" size={24} color="#fff" />
                            </Pressable>

                        </View>
                    </View>
                </View>

            </View>
        )
    }
}

export default DrawScreen;