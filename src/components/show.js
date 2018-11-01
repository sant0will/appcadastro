import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, TouchableHighlight, Dimensions, Modal, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Accordion from 'react-native-collapsible/Accordion';
import api from './services/api';
let width = Dimensions.get('window').width;

export default class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
          visibleModal: null,
          users: [],
          activeSections: []
        };
    }

    _renderModalSpinner = () => (
        <View      
            style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                backgroundColor: 'transparent'
            }}
        >
            <Spinner visible={this.state.visibleModal === 1} textContent={'Buscando...'} animation={'slide'} textStyle={{color: '#FFF'}} />
        </View>
    );

    getUsers() {
        this.setState({
            visibleModal: 1,
            users: [],
        });

        if(this.state.users.length === 0){
            api.getAllUsers((res) => {
                if(res.status == 200){
                    this.setState({
                        visibleModal: 0,
                        users: res.data
                    });
                }            
            });            
        }
    }    

    _renderHeader = section => {
        return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{section.first_name+" "+section.last_name}</Text>
            <Image source={require('./assets/seta.png')} style={{ alignSelf: 'center', width: 10, height: 10 }}/>
        </View>
        );
    };

    _renderContent = section => {
        return (
        <View style={styles.content}>
            <Text style={styles.contentText}>Telefone: {section.phone}</Text>
            <Text style={styles.contentText}>E-mail: {section.email}</Text>
        </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (

            <View style={styles.container}>
                <StatusBar
                    backgroundColor={ "#000000" }
                />                
                <ScrollView>
                    <Accordion
                        sections={this.state.users}
                        activeSections={this.state.activeSections}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                    />
                </ScrollView>       
                <TouchableHighlight
                    style={styles.button}
                    onPress={() => { this.getUsers() }}
                >
                    <Image source={require('./assets/search.png')} style={{ alignSelf: 'center', width: 30, height: 30 }}/>
                </TouchableHighlight>     
                <Modal
                    transparent
                    visible={this.state.visibleModal === 1}
                    animationType={'slide'}
                    onRequestClose={() => this.setState({ visibleModal: 0 })}
                >
                    {this._renderModalSpinner()} 
                </Modal>             
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    button:{
        backgroundColor: 'rgba(0,150,136,1)', 
        borderRadius:7, 
        width: width*0.25,
        padding: 30, 
        margin: 15,
    },
    textButton:{
        color: "#000", 
        alignSelf: 'center',
        fontSize: 20
    },
    header:{
        justifyContent: 'center',
        width: width,
        height: 40,
    },
    headerText:{
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    },
    contentText:{
        justifyContent: 'center',
        fontSize: 18,
        color: "#000",
        alignSelf: "center",
    },
    content:{
        fontSize:14,
        backgroundColor: 'rgba(0,150,136,1)',
        width: width,
        height: 60,
    }

});