import React from "react";
import { Dimensions, View } from "react-native";

import styles from "../../styles/genericStyle";

const Card = (props) => {
    return(
        <View
            style={{                
                width: '100%'                
            }}
        >
            <View
                style={[
                    {
                        borderWidth: 2,
                        borderColor: '#415161',
                        padding: 10
                    }
                ]}
            >
                {
                    props.children
                }
            </View>
        </View>
    )
}

export default Card;