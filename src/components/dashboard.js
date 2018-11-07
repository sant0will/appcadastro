//Importação de componentes utilizados
import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Carousel, { Pagination } from 'react-native-snap-carousel';

//Váriaveis de uso
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

//Criação do componente
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [
                {
                    id: 0,
                    title: 'Seja bem-vindo!',
                    icon: null,
                },
                {
                    id: 1,
                    title: 'Cadastrar',
                    icon: require('./assets/add.png'),
                },
                {
                    id: 2,
                    title: 'Visualizar',
                    icon: require('./assets/show.png'),
                },
            ],
            slideActive: 0,

        };
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <TouchableOpacity
                    style={{height:height*0.40, width:width, alignItems:"center", justifyContent:"center"}}
                    onPress={() => { item.id == 1 ? Actions.usercreate() : item.id == 2 ? Actions.usershow() : null }}
                >
                    <Image source={item.icon} style={{ alignSelf: 'center', width: 80, height: 80}}/>
                    <Text style={styles.title}>{ item.title }</Text>
                </TouchableOpacity>                
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={ "#000000" }
                />              

                <Image source={require('./assets/icon.png')} style={{ alignSelf: 'center', width: 200, height: 200}}/>
                <View style={{height: height*0.60}}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        itemWidth={width}
                        onSnapToItem={(index) => this.setState({ slideActive: index }) }
                    />
                    <Pagination
                        dotsLength={this.state.entries.length}
                        activeDotIndex={this.state.slideActive}
                        containerStyle={styles.paginationContainer}
                        dotColor={'rgba(0,150,136,1)'}
                        dotStyle={styles.paginationDot}
                        inactiveDotColor={'rgba(0,150,136,0.85)'}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        carouselRef={this._carousel}
                        tappableDots={!!this._carousel}
                    />
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
    }, 
    title:{
        top: 15,
        color: 'rgba(0,150,136,1)',
        fontSize: 40,
        fontFamily: "LOVES"
    },
    slide:{
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});