//Importação de componentes utilizados
import React, { Component } from 'react';
import {
    Modal,
    Dimensions,
    StyleSheet,
    Text,
    View, 
    TouchableHighlight,
    Image, 
    Button,
    Alert
} from 'react-native';
import api from './services/api';
import FloatingLabelInput from './services/FloatingLabelInput';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';

//Váriaveis de uso
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
const inputColor = "rgba(0,150,136,1)";
const labelColor = "rgba(0,150,136,1)";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: null,
            user: null,
            first_name: null,
            first_name_valid: '',
            last_name: null,
            last_name_valid: '',
            phone: null,
            phone_valid: '',
            email: null,
            email_valid: '',
        };
    }

    //Modal de carregamento
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
            <Spinner visible={this.state.visibleModal === 1} textContent={'Enviando...'} animation={'slide'} textStyle={{color: '#FFF', fontFamily:"LOVES"}} />
        </View>
    );
    //Modal de sucesso no cadastro
    _renderModalSuccess = () => (
        <View      
            style={{
                backgroundColor: '#000',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image source={require('./assets/success.png')} style={styles.imageModal}/>
            <Text style={styles.textModal}>Usuario cadastrado com succeso!</Text>        
            <Button
                onPress={() => { this.setState({ visibleModal: 0 }), Actions.dashboard() }}
                title="Voltar"
                color={inputColor}
            />            
        </View>
    );
    //Modal de erro no cadastro
    _renderModalError = () => (
        <View      
            style={{
                backgroundColor: '#000',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image source={require('./assets/error.png')} style={styles.imageModal}/>
            <Text style={styles.textModal}>Ocorreu um erro ao cadastrar o usuario!</Text>        
            <Button
                onPress={() => { this.setState({ visibleModal: 0 }), Actions.dashboard() }}
                title="Voltar"
                color={inputColor}
            />            
        </View>
    );

    // Função de cadastro do novo usuário
    saveUser() {
        // Verificação se os dados inseridos são valídos
        if(this.state.first_name_valid && this.state.last_name_valid && this.state.phone_valid && this.state.email_valid){
            this.setState({
                visibleModal: 1,
            });

            let arr_user = [this.state.first_name, this.state.last_name, this.state.phone, this.state.email];
            //Chamada da api com a função saveUser() passando por parametro uma array com os dados
            api.saveUser((res) => {
                if(res.status == 200){
                    var response = JSON.parse(res._bodyInit).result;
                    if(response == 1){
                        this.setState({
                            visibleModal: 2,
                        });
                    }else{
                        this.setState({
                            visibleModal: 3,
                        });
                    }
                }            
            }, arr_user); 
        }else{
            Alert.alert(
                'Dados Inválidos!',
                'Confira os dados inseridos!',
                [
                  {text: 'Ok', style: 'cancel'},
                ],
                { cancelable: false }
            )
        }
    } 

    render() {
        return (
        <View style={styles.container}>
            <Text style={{ fontFamily: "LOVES", color: labelColor, alignSelf: "center", fontSize: 30 }}>Dados do Usuario</Text>
            {/* Formulário com os inputs necessários */}
            <View style={styles.groupInput}>
                {/* Nome */}
                <FloatingLabelInput
                    label="Nome *"
                    mask="name"
                    color={ inputColor }
                    textColor={ labelColor }
                    value={this.state.first_name}
                    onBlur={text => this.setState({first_name_valid: text})}
                    onChangeText={text => this.setState({first_name: text})}
                    error='O nome informado é inválido'
                />
                {/* Sobrenome */}
                <FloatingLabelInput
                    label="Sobrenome *"
                    mask="name"
                    color={ inputColor }
                    textColor={ labelColor }
                    value={this.state.last_name}
                    onBlur={text => this.setState({last_name_valid: text})}
                    onChangeText={text => this.setState({last_name: text})}
                    error='O nome informado é inválido'
                />
                {/* Telefone */}
                <FloatingLabelInput
                    label="Telefone *"
                    mask="cel-phone"
                    color={ inputColor }
                    textColor={ labelColor }
                    maxLength={14}
                    value={this.state.phone}
                    onBlur={text => this.setState({phone_valid: text})}
                    onChangeText={text => this.setState({phone: text})}
                    error='O número de telefone informado é inválido'
                    keyboardType='numeric'
                />
                {/* E-mail */}
                <FloatingLabelInput
                    label="E-mail *"
                    mask="e-mail"
                    color={ inputColor }
                    textColor={ labelColor }
                    value={this.state.email}
                    onBlur={text => this.setState({email_valid: text})}
                    onChangeText={text => this.setState({email: text})}
                    error='O e-mail informado é inválido'
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
            </View>
            {/* Botão de envio do form com informações do usuário */}
            <TouchableHighlight
                style={styles.button}
                onPress={() => { this.saveUser() }}
            >
                <Image source={require('./assets/sent.png')} style={{ alignSelf: 'center' }}/>
            </TouchableHighlight>  
            {/* Modal de carregamento */}
            <Modal
                transparent
                visible={this.state.visibleModal === 1}
                animationType={'slide'}
                onRequestClose={() => this.setState({ visibleModal: 0 })}
            >
                {this._renderModalSpinner()} 
            </Modal>    
            {/* Modal de sucesso no cadastro */}
            <Modal
                visible={this.state.visibleModal === 2}
                animationType={'slide'}
                onRequestClose={() => this.setState({ visibleModal: 0 })}
            >
                {this._renderModalSuccess()} 
            </Modal> 
            {/* Modal de erro no cadastro */}
            <Modal                
                visible={this.state.visibleModal === 3}
                animationType={'slide'}
                onRequestClose={() => this.setState({ visibleModal: 0 })}
            >
                {this._renderModalError()} 
            </Modal> 
        </View>
        );
    }
}

//Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    groupInput: {
        top: height*0.15,
        height: height*0.50,
    },
    button:{
        top: height*0.1,
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "rgba(255,255,255,0.05)", 
        borderRadius:7, 
        width: width*0.35,
        height: height*0.20
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    textModal:{
        fontFamily:"LOVES",
        fontSize: 18, 
        color: inputColor, 
        margin: 20
    },
    imageModal:{
        alignSelf: 'center', 
        width: 150, 
        height: 150
    }
});
