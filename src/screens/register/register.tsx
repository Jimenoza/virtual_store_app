import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableHighlight,
    ImageBackground,
    TextInputSubmitEditingEventData
} from 'react-native';
import { Colors, alert } from '../../common';
import {Props} from '../../interfaces';
import LoadingButton from '../../common/loadingButton';
import { UserService } from '../../services';

interface State {
    userName?: string,
    email?: string,
    password?: string,
    loading : boolean
}

class Register extends Component<Props>{
  service = new UserService();
  state : State = {
    loading : false,
  }

  /**
   * Display an alert with title and Ok option
   * @param message 
   */
  getDisplayAlert(message: string){
    alert({
      title : 'Iniciar Sesión',
      message : message,
      options : [
        {
          text : 'Ok'
        }
      ]
    });
  }

  /**
   * Verifies that an email and a password is typed and checks that email is valid,
   * if not valid indicates, otherwise make http request
   * return true if ok, false otherwise
   */
  checkInputs(){
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(this.state.email && this.state.password && this.state.userName){
      if (!reg.test(this.state.email)){
        this.getDisplayAlert('Dirección de correo no válida');
        return false;
      }
    }
    else {
      this.getDisplayAlert('Ingresa primero un nombre de usuario, correo y contraseña');
      return false;
    }
    return true;
  }

  /**
   * Makes a http request to login, if API sends an error, displays message
   */
   signUp(){
    if(this.checkInputs()){
      this.setState({
        loading : true
      });
      this.service.signUp(this.state.userName!,this.state.email!,this.state.password!).then(() => {
        this.getDisplayAlert('Usuario creado, ya puede iniciar sesión');
        this.props.navigation.navigate('login');
      }).catch( err => {
        this.getDisplayAlert('Usuario o contraseña son incorrectos');
        this.setState({
          loading : false
        });
      });
    }
    
    // this.props.navigation.navigate('Modal',modal);
    
  }

  handleEmail(event: string){
    this.setState({
      email : event
    });
  }

  handlePassword(event: string){
    this.setState({
      password : event
    });
  }

  handleName(event: string){
      this.setState({
          userName : event,
      })
  }

  render() {
    return (
        <View style={{flex:1}}>
            <ImageBackground source={require('../../../assets/images/banner.jpeg')} style={styles.container}>
            <Text style={styles.logo}>
              Tienda Virtual
            </Text>
            <TextInput style={styles.input} autoCapitalize={'none'} placeholder="Nombre"  onChangeText={ e => {this.handleName(e)}}/>
            <TextInput style={styles.input} autoCapitalize={'none'} placeholder="Correo" autoCompleteType={'email'} onChangeText={ e => {this.handleEmail(e)}}/>
            <TextInput style={styles.input} autoCapitalize={'none'} placeholder="Contraseña" secureTextEntry={true} onChangeText={ e => {this.handlePassword(e)}}/>
            <LoadingButton style={styles.login} onPress={ () => {this.signUp()}} loading={this.state.loading}>
              <Text style={styles.text}>Registrarme</Text>
            </LoadingButton>
            <TouchableHighlight style={styles.guest} underlayColor={Colors.darkBlue} onPress={ () => { this.props.navigation.goBack()}}>
              <Text style={styles.textGuest}>Atrás</Text>
            </TouchableHighlight>
          </ImageBackground>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    logo : {
      height: 72,
      fontSize: 36,
      fontWeight: '500',
      fontFamily: 'Rubik',
      color: Colors.bluePrimary,
    },
    input: {
      height: 50,
      width: 350,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      backgroundColor: 'white',
      fontSize: 20,
      paddingLeft: 10,
      color: Colors.darkGray
    },
    login : {
      backgroundColor: Colors.bluePrimary,
      width:200,
      height: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    text : {
      fontSize: 18,
      color: 'white'
    },
    guest : {
      backgroundColor: Colors.bluePrimary,
      width:150,
      height: 37.5,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    textGuest : {
      fontSize: 14,
      color: 'white'
    }
  });

export default Register;