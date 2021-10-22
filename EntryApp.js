import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Home from './screens/Home';
import NewProject from "./screens/NewProject";
import SelectProjectType from "./screens/SelectProjectType";
import CameraScreen from "./screens/CameraScreen";
import DrawScreen from "./screens/DrawScreen";
import AllProjects from "./screens/AllProjects";

const EntryApp = (props) => {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={props.initialScreen}
                screenOptions={{ 
                    headerShown: false 
                }}
            >
                {/* Screens */}
                <Stack.Screen name="Home" component={Home} />  
                <Stack.Screen name="NewProject" component={NewProject} />                                                                              
                <Stack.Screen name="SelectProjectType" component={SelectProjectType} />                                                                              
                <Stack.Screen name="CameraScreen" component={CameraScreen} />                                                                              
                <Stack.Screen name="DrawScreen" component={DrawScreen} />
                <Stack.Screen name="AllProjects" component={AllProjects} />                                                                              

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default EntryApp;