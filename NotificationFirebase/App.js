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
    
     //const FIREBASE_API_KEY = "AIzaSyCK7mopOZN4D4NbiR2kyH-4u5xQ86DPELA";
    const FIREBASE_API_KEY = "AAAA7z9ZhFQ:APA91bHjVPB2R3Ifb27Bvn73bC7s0ijYwAo2_3OYunTuXdF9_61fi5nrVsc3Or9V2Yklh57ZYUYgrG_xgrtlCAcC-oEYTwAKXkGp1NZmNTx-te2jzlSg4slpcs_HO6oQfySRwZbZoh_J";
    const message = {
      "to": "ezSyFQtlS4O4Flj2ml5RQ0:APA91bH8wInISQ_28m3E2iDhkOkLrZwLNe-9KqBe_6fSKQERzBPk2-8NJ6fb5SvO01xxF5NAUxUu_OVRB5ZvCv4CD5tPU0_f0sqa-iQ2Xs4-VJwfw0Wh2N_xgR8sGuAufACM-MDP64eA", 
     "notification": {
      "body" : "Test notification avec succèstryjrtjtyj",
     "title" : "TCHOUTCHOU Notificationtyjtyjtyjj",
      "priority": "high",
      "content_available": true 
  }
  
}
  // alert(data);
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