import React, { useState, useEffect } from "react";
import { AntDesign } from '@expo/vector-icons';

import {
    View,
    Text,
    Pressable
} from "react-native";

import InputBox from "../components/ui/InputBox";

import styles from "../styles/genericStyle";
import colorPicker from "../utils/colorPicker";

const NewProject = (props) => {

    const [state, setState] = useState({
        backgroundColor: '',
        inputAlert: false,
        projectName: ''
    })

    useEffect(() => {
        let colors = new colorPicker;
        let colorBackground = colors.getRandomColor();

        setState({
            ...state,
            backgroundColor: colorBackground
        })
    }, []);

    const handleCallbackChange = (e) => {
        let obj = { ...state };
        obj.projectName = e;

        if (e.length > 0) {
            obj.inputAlert = false;
        }

        setState(obj)
    }

    const goNextStep = () => {       
        
        if (state.projectName.length >= 1) {
            props.navigation.navigate('SelectProjectType', {
                projectName: state.projectName.replace(/\s/g,'')
            })
        } else {
            setState({
                ...state,
                inputAlert: true
            })
        }
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
                }]}
        >
            <View>
                <Text
                    style={{
                        fontSize: 40,
                    }}
                >
                    Enter Your Project's Name:
                </Text>
            </View>

            <InputBox
                style={[
                    styles.marginTopBottom(30, 0),
                    styles.paddingTopBottom(10, 10),
                    {
                        // height: 40,
                        fontSize: 30,
                        borderColor: state.inputAlert === true ? 'red' : '#415161',
                        borderBottomWidth: 1,
                        color: '#415161'
                    }
                ]}
                selectionColor="#415161"
                callbackOnChange={handleCallbackChange}
            />

            <View
                style={[
                    styles.marginTopBottom(30, 0),
                    styles.flexRow,
                    {
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                ]}
            >
                <Text>
                    {
                        state.inputAlert === true &&
                        <Text
                            style={{
                                color: 'red'
                            }}
                        >
                            Insert a project name.
                        </Text>
                    }
                </Text>

                <View>
                    <Pressable
                        onPress={goNextStep}
                    >
                        <AntDesign name="arrowright" size={30} color="#415161" />
                    </Pressable>
                </View>
            </View>


        </View>
    )
}

export default NewProject;