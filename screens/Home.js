import React, { Component } from "react";

import {
    View,
    Text,
    Pressable,
    Dimensions
} from "react-native";

import styles from "../styles/genericStyle";
import { AntDesign } from '@expo/vector-icons';
import colorPicker from "../utils/colorPicker";

// Components
import Card from "../components/ui/Card";
import SignatureScreen from "react-native-signature-canvas";

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            backgroundColor: '#000',
        }

        this.draw = React.createRef();

        this.interval = null;
        this.listener = props.navigation.addListener('focus', this.focusScreen)
    }

    focusScreen = () => {
        this.interval = setInterval(this.changeColorInterval(this.draw), 1000)
    }

    componentDidMount = () => {          
        let colorBackground = this.getRandomColor();        

        this.setState({
            backgroundColor: colorBackground
        })        
    }    

    changeColorInterval = (draw) => () => {                                        
        draw.current.changePenColor(this.getRandomColor())  
    }

    getRandomColor = () => {
        let colors = new colorPicker;
        return colors.getRandomColor();
    }

    goNewProject = () => {
        clearInterval(this.interval);        
        this.props.navigation.navigate('NewProject')
    }

    goAllProjects = () => {
        clearInterval(this.interval);        
        this.props.navigation.navigate('AllProjects')
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
                padding: 0;
                border: none; 
                background-color: ${this.state.backgroundColor}                                                                 
            }
        `

        return (
            <View style={[{ flex: 1 }], styles.flexCentered}>

                <View
                    style={[
                        styles.flex,
                        styles.flexCentered,
                        {
                            position: 'relative',   
                            height: Dimensions.get('window').height + 10,
                            width: Dimensions.get('window').height * 9 / 16,                                                    
                        }
                    ]}
                >
                    <SignatureScreen
                        ref={this.draw}
                        webStyle={webStyle}
                        minWidth={0.5}
                        maxWidth={5}
                        penColor="red"                                                                       
                    />

                    <View
                        style={{
                            position: 'absolute',
                            width: Dimensions.get('window').width - 40
                        }}
                    >
                        <Text
                            style={[
                                {
                                    fontSize: 40,                                    
                                },
                                styles.marginTopBottom(0, 20)
                            ]}
                        >
                            Draw Pad
                        </Text>

                        <Text
                            style={[
                                {
                                    fontSize: 16,
                                },
                                // styles.applyFont, 
                                styles.marginTopBottom(0, 40)
                            ]}
                        >
                            The App to costumize your photos and draw on them
                        </Text>

                        <Pressable
                            style={[
                                styles.marginTopBottom(0, 20)
                            ]}
                            onPress={this.goNewProject}
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
                                        <Text
                                            style={[
                                                {
                                                    fontSize: 20,
                                                    marginLeft: 10,
                                                    color: '#415161'
                                                }
                                            ]}
                                        >New Project</Text>

                                    </View>

                                    <AntDesign name="arrowright" size={30} color="#415161" />

                                </View>

                            </Card>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.marginTopBottom(0, 20)
                            ]}
                            onPress={this.goAllProjects}
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
                                        <Text
                                            style={[
                                                {
                                                    fontSize: 20,
                                                    marginLeft: 10,
                                                    color: '#415161'
                                                }
                                            ]}
                                        >See all Projects</Text>

                                    </View>

                                    <AntDesign name="arrowright" size={30} color="#415161" />

                                </View>

                            </Card>
                        </Pressable>
                    </View>

                </View>

            </View>
        )

    }
}

export default Home;