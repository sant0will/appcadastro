import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

let width = Dimensions.get('window').width;

export default class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={ "#000000" }
                />
                <View>
                    <Image source={require('./assets/icon.png')} style={{ alignSelf: 'center', width: 200, height: 200, bottom: 50 }}/>
                    <View>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => { Actions.usercreate() }}
                        >
                            <Text style={styles.textButton}> Cadastrar </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => { Actions.usershow() }}
                        >
                            <Text style={styles.textButton}> Visualizar </Text>
                        </TouchableHighlight>
                    </View>                    
                </View>                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    button:{
        backgroundColor: 'rgba(0,150,136,1)', 
        borderRadius:7, 
        width: width*0.80,
        padding: 40, 
        margin: 15,
    },
    textButton:{
        color: "#000", 
        alignSelf: 'center',
        fontSize: 20
    }
});