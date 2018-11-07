import React, { Component } from 'react';
import {
  View,
  TextInput,
  Animated,
  Text
} from 'react-native';

import { TextInputMask, MaskService } from 'react-native-masked-text';

export default class FloatingLabelInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
      fieldValid: null,
      rawValue: null
    };
  }

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 150,
    }).start();
  }

  emailValidate(email) {
    let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    //{ reg.test(email) ? this.setState({fieldValid: true}) : this.setState({fieldValid: false}) }
    if(reg.test(email)){
      this.setState({fieldValid: true})
      return true
    }else{
      this.setState({fieldValid: false})
      return false
    }
  }

  nameValidate(arg) {
    if(arg !== '' && arg !== undefined && arg !== null){
      this.setState({fieldValid: true})
      return true
    }else{
      this.setState({fieldValid: false})
      return false
    }

    // let reg = /^[A-Za-z\s]+$/
    // if(reg.test(arg)){
    //   this.setState({fieldValid: true})
    //   return true
    // }else{
    //   this.setState({fieldValid: false})
    //   return false
    // }
  }

  isValid(arg){
    this.setState({fieldValid: this.refs[arg].isValid()})
    let valid = this.refs[arg].isValid()
    this.setState({rawValue: this.refs[arg].getRawValue()})

    return valid
	}

  render() {
    const { 
      label, 
      mask,
      options, 
      color = '#000', 
      textColor = '#000',
      error = 'Error',
      errorColor = 'red',
      onChangeText,
      onBlur,
      ...props 
    } = this.props;

    const labelStyle = {
      position: 'absolute',
      left: 4,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [22, 0],
      }),
      fontSize: 20,
      color: textColor,
      fontFamily: "LOVES",
    };

    return (
      <View style={{ paddingTop: 14 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        {this.props.mask !== undefined && 
          this.props.mask !== 'e-mail' && 
          this.props.mask !== 'name' ?
          <TextInputMask
            {...props}
            ref={mask}
            selectionColor={color}
            underlineColorAndroid={color}
            style={{ fontSize: 18, color: color, paddingTop: 5 }}
            onFocus={this.handleFocus}
            onBlur={() => {this.handleBlur(), onBlur(this.isValid(mask))}}
            onChangeText={text => onChangeText(text)}
            blurOnSubmit
            type={mask}
            options={options}
          />
          :
          <TextInput
            {...props}
            ref={mask}
            selectionColor={color}
            underlineColorAndroid={color}
            style={{ fontSize: 16, color: color, paddingTop: 5 }}
            onFocus={this.handleFocus}
            onBlur={() => {this.handleBlur(), 
              this.props.mask === 'e-mail' ? onBlur(this.emailValidate(this.props.value)) : 
              this.props.mask === 'name' ? onBlur(this.nameValidate(this.props.value)) : null 
            }}
            onChangeText={text => onChangeText(text)}
            blurOnSubmit
          />
        }
        {this.state.fieldValid === null || this.state.fieldValid === true ? null : <Text style={{color: errorColor, fontSize: 14, left: 4, marginTop: -6}}>{error}</Text> }
      </View>
    );
  }
}
