import React from "react";

import { TextInput } from "react-native";

const InputBox = (props) => {

    const handleCallbackOnChange = (e) => {
        if(props.callbackOnChange) {
            props.callbackOnChange(e)
        }
    } 

    const handleCallbackOnFocus = (e) => {        
        if(props.callbackOnFocus) {
            props.callbackOnFocus(e)
        }
    } 

    return(
        <TextInput
            placeholder={props.placeholder}
            autoCapitalize={props.autoCapitalize}
            caretHidden={props.caretHidden}
            keyboardType={props.keyboardType}
            selectionColor={props.selectionColor}
            onChangeText={handleCallbackOnChange}
            onFocus={handleCallbackOnFocus}
            style={[
                {
                    width: '100%',
                },                
                props.style        
            ]}
        />
    )
}

export default InputBox;