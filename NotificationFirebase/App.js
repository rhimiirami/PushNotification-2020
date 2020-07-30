import React, {Component} from 'react'
import {View, Text, Button} from 'react-native'
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state={
    }
  }

  async componentDidMount(){
    PushNotification.configure({

      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
    });
  }


  async NotiPermission(){
    firebase.messaging().requestPermission()
    .then(() => {
      console.log("User has authorised");
      // user has authorised
    })
     .catch (error => {
      console.log('User has rejected permissions');
      // user has rejected permissions 
     
    });
  }
  

  async componentDidMount(){
    firebase.messaging().hasPermission()
    .then(enabled  => {
      if (enabled){
        console.log("user has permission");
        // user has permissions
      } else {
        console.log("user doesn't have permission");
        this.NotiPermission();

      }    
    });

  
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log("fcmToken from AsyncStorge:", fcmToken);
    if (!fcmToken) {
      fcmToken= await firebase.messaging().getToken();
    if (fcmToken) {
      console.log("fcmToken from firebase:", fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }}
  }

  async sendNotification(){
    
    const FIREBASE_API_KEY = "AIzaSyCK7mopOZN4D4NbiR2kyH-4u5xQ86DPELA";
    const message = {
     to: "eKpHICzPLqE:APA91bHzsQUfiqTF1X0LH84TKReWkVOPf5X7lWolt4nsqs0leW9kjMPQ6-5olhoLjJghnfUKNrSNrz07XQ_xryZjo5-CK6i8W8Sd5oxEvs79ORv8Ju5zAxIpgdP3yz8QkopKVQsjuAT0", 
    notification: {
      title: "TCHOUTCHOU Notification",
      body: "Test notification avec succès",
      "vibrate": 1,
      "sound": 1,
      "show_in_foreground": true,
      "priority": "high",
      "content_available": true
  } 
  
}
   
  let headers = new Headers({
    "Content-Type": "application/json",
    "Authorization": "key=" + FIREBASE_API_KEY
  });

  let response = await fetch("https://fcm.googleapis.com/fcm/send", { method: "POST", headers, body: JSON.stringify(message) })
  response = await response.json();
  console.log(response);
}

  render() {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:"pink"}}>
        <Text> RECEIVED PUSH NOTIFICATION   </Text>
        <Button title="Send Notification"
         onPress={()=> this.sendNotification()}>  
        </Button>
      </View>
    );
  }
}