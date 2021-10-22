import React from "react";

import { 
    Pressable,
    Text
} from "react-native";

import styles from "../../styles/genericStyle";

const Button = (props) => {

    const handleCallbackOnPress = () => {
        if(props.callback) {
            props.callback()
        }
    }

    return(
        <Pressable
            style={[
                styles.paddingTopBottom(15, 15),
                styles.paddingLeftRight(20, 20),                
                {
                    backgroundColor: '#abcfe7', 
                    borderRadius: 5                   
                }
            ]}
            onPress={handleCallbackOnPress}
        >
            <Text
                style={[
                    styles.applyFont,
                    {
                        color: '#fff',
                        fontSize: 20,
                        fontWeight: '500'
                    }
                ]}
            >
                {props.label}
            </Text>
        </Pressable>
    )
}

export default Button;