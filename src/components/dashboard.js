//Importação de componentes utilizados
import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

//Váriaveis de uso
let width = Dimensions.get('window').width;


//Criação do componente
export default class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={ "#000000" }
                />
                <View>
                    {/* Logo */}
                    <Image source={require('./assets/icon.png')} style={{ alignSelf: 'center', width: 200, height: 200, bottom: 50 }}/>
                    <View>
                        {/* Botão de Cadastro */}
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => { Actions.usercreate() }}
                        >
                            <Text style={styles.textButton}> Cadastrar </Text>
                        </TouchableHighlight>
                        {/* Botão de visualização */}
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

//Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    button:{
        backgroundColor: 'rgba(0,150,136,0.7)', 
        borderRadius:5, 
        width: width*0.80,
        padding: 30, 
        margin: 15,
    },
    textButton:{
        color: "#000", 
        alignSelf: 'center',
        fontSize: 20
    }
});