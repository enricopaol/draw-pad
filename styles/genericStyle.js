import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const genericStyle = StyleSheet.create({
    applyFont: {
        fontFamily: 'circularStd'
    },
    marginTopBottom(top, bottom) {
        return {
            marginTop: top,
            marginBottom: bottom
        }
    }, 
    marginLeftRight(left, right) {
        return {
            marginLeft: left,
            marginRight: right
        }
    }, 
    paddingTopBottom(top, bottom) {
        return {
            paddingTop: top,
            paddingBottom: bottom
        }
    }, 
    paddingLeftRight(left, right) {
        return {
            paddingLeft: left,
            paddingRight: right
        }
    }, 
    fullScreen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    flex: {
        display: 'flex'
    },   
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexCentered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleButton: {
        height: 70,
        width: 70,
        backgroundColor: '#ebebeb',
        borderRadius: 70,
        borderWidth: 2,
        borderColor:'red'
    },    
}) 

export default genericStyle;