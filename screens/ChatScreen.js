import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ImagePropTypes, LogBox ,Modal,TouchableHighlight, TouchableOpacity} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import  uuidv4  from 'uuid';
import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Video from 'react-native-video';
import Recording from './Recording';
import Constant from './constant';
const RoomScreen = (props, { navigation }) => {
  const { item } = props.route.params;
  // console.log(props.route.params)
  const [filePath, setFilePath] = useState('');
  const [videofilePath, setVideoFilePath] = useState('');
  const [audioPath, setaudioPath] = useState('')
  const [rand, setRandom] = useState(4);
  const [counter, setCounter] = useState(18);
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState('');
  const [pathName,setpathName]= useState('')
  const [messages, setMessages] = useState([

    {
      _id: 0,
      //text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true
    },

    // {
    //     _id: 1,
    //     text: 'Hello Muqeet!',
    //     // image: 'https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    //     createdAt: new Date().getTime(),
    //     user: {
    //         _id: 1,
    //         name: 'Zia'
    //     }
    // },
    // {
    //     _id: 2,
    //     text: 'Hai Asim',
    //     image: filePath,
    //     createdAt: new Date().getTime(),
    //     user: {
    //         _id: 2,
    //         name: 'Zia'
    //     }
    // }


  ]);

  // const Audio = () => {
  //   SendTextMessage(Constant.audioPath);
  // }
  const onItemClick = useCallback(event => {
    console.log(Constant.audioPath);
    setaudioPath(Constant.audioPath);
    setpathName(Constant.audioPath.split("/")[6]);
    setTime(Constant.timeConst)
    var time = rand + 1
    setRandom(rand + 1);
    //  Audio();
  }, []);

  const play = (props) => {
    setTimeout(() => {
      var sound = new Sound(props, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        sound.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  const renderCustomView = (props, newMessage = []) => {
    if (props.currentMessage.audio != null) {
      return (
        <View style={props.containerStyle}>
          {/* <Text>{props.currentMessage.audiodetails.audio}</Text> */}
          <Icon name="mic" size={40} color="#000" style={{ paddingRight: 10 }} onPress={() => play(props.currentMessage.audio)}
        
          />
          
        </View>
      );
    }
   
    return null
  }

  const counterFun= ()=> {
      console.log(counter);
      setCounter(counter+1);
     
  }

  // const handleAudioSend = async (newMessage = []) => {

  //   setTimeout(function () {
  //     setMessages(GiftedChat.append(messages, {
  //       _id: 0,
  //       audio: newMessage,

  //       // image: filePath,
  //       createdAt: new Date().getTime(),
  //       user: {

  //         _id: 2,
  //         name: 'Zia'
  //       }
  //     }

  //     ))

  //     setaudioPath('');

  //   }, 1000);
  //    await setCounter(counter+1);
   
  //    console.log("Counter Call:", counter);

  // }

  const handleImageSend = (newMessage = []) => {

    if (filePath != '' || newMessage != []) {
      setMessages(GiftedChat.append(messages, {
        _id: 2,
        image: newMessage,

        // image: filePath,
        createdAt: new Date().getTime(),
        user: {

          _id: 2,
          name: 'Zia'
        }
      }
      ))
     
      console.log(messages);
      setFilePath('');
    }
  }

  const handleVideoSend = (newMessage = []) => {
    console.log("hai Zia")

    setMessages(GiftedChat.append(messages, {
      _id: counter,
      // image: newMessage,
       video: newMessage,
      // image: filePath,
      createdAt: new Date().getTime(),
      user: {

        _id: 2,
        name: 'Zia'
      }
    }
    
    ))

    console.log(messages);

  }

  const SendTextMessage = (newMessage = []) => {
      if(audioPath!= ''){
        newMessage[0].audio=audioPath
        newMessage[0].text=''
        setMessages(GiftedChat.append(messages, newMessage
          ))
          console.log(newMessage);
          setaudioPath('');
      }
      else{
    setMessages(GiftedChat.append(messages, newMessage));
    console.log(newMessage)
    console.log("fdsfdfdf ");
    }
  }

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 200,
      maxHeight: 350,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response.uri);

      handleImageSend(response.uri);
      setModalVisible(!modalVisible);
    }

    );

  };

  const chooseVideoFile = (type) => {
    let options = {
      mediaType: type

    };
    launchImageLibrary(options, (res) => {
      console.log('Response = ', res);

      if (res.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (res.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (res.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (res.errorCode == 'others') {
        alert(res.errorMessage);
        return;
      }
      console.log('base64 -> ', res.base64);
      console.log('uri -> ', res.uri);
      console.log('width -> ', res.width);
      console.log('height -> ', res.height);
      console.log('fileSize -> ', res.fileSize);
      console.log('type -> ', res.type);
      console.log('fileName -> ', res.fileName);
   setVideoFilePath(res.uri);
      console.log("render");
       handleVideoSend(res.uri);
       setModalVisible(!modalVisible);
    }
    );
    // handleVideoSend(response.uri);

  };

  const renderBubble = (newItem = []) => {
    return (
      <View style={{ position: 'relative', height: 150, width: 250 }}>
        <Video
        
        source={{ uri: videofilePath }}
         controls={true}
        fullscreen
        style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: 150,
            width: 250,
            borderRadius: 20,
          }}
         
          height={150}
          width={250}
        
         
           />
      </View>
    );
  }

  const OnSendCheck= () =>{
return(
<View style={{flexDirection:'row'}}>
  <TouchableOpacity style={{marginHorizontal: 55, backgroundColor:'red', borderRadius: 25,width:wp("19%"), height: hp("4%"), justifyContent:'center'}}
  onPress={OnCancel} >
    <Text style={styles.HeaderText1}>Cancel</Text>
  </TouchableOpacity>
  <Text>Recorded {time} seconds</Text>
  
  </View>
)
  }
  const OnCancel=() =>{
    setpathName('');
    setaudioPath('');
  }

  return (
    <View style={styles.container}>
      <GiftedChat
       isAnimated
        renderMessageAudio={renderCustomView}
        alwaysShowSend={true}
        messages={messages}
        text={pathName}
        onInputTextChanged={text=>{
          setpathName(text)
        }

        }
        renderMessageVideo={renderBubble}
        onSend={SendTextMessage}
        user={{ _id: 2 }}
      />

      <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
          <TouchableOpacity style={{justifyContent:'center', marginHorizontal:wp("5%")}}>
          <Text style={{color:'red'}}> {audioPath!='' ? OnSendCheck() : null}</Text>
          </TouchableOpacity>
         
        <Recording onaudioStart={onItemClick} onPress={counterFun} />
        <Icon name="camera" size={30} color="#000" style={{ alignSelf: 'flex-end', paddingRight: 10 }}  onPress={() => {
          setModalVisible(true);
        }} />
        {/* <Icon name="camera" size={30} color="#000" style={{ alignSelf: 'flex-end', paddingRight: 10 }} onPress={() => chooseVideoFile('video')} /> */}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}></Text>
           
            
            <TouchableOpacity style={{backgroundColor: '#2196F3', width: wp("50%"), height: hp("7%"), borderRadius:30, justifyContent:'center'}} 
             onPress={() => chooseFile('photo')}>
                <Text style={styles.HeaderText1}>Pictures</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor: '#2196F3',marginTop:20, width: wp("50%"), height: hp("7%"), borderRadius:30, justifyContent:'center'}}
             onPress={() => chooseVideoFile('video')}>
                <Text style={styles.HeaderText1}>Videos</Text>
            </TouchableOpacity>
            <TouchableHighlight
              style={{ ...styles.openButton, width: wp("30%"), height: hp("7%"), backgroundColor: "red",marginTop:20, borderRadius:30,justifyContent:'center' }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.HeaderText1}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
  const onPressButtonChildren = () => {
    console.log("_data")
    //press button chilldre  
  }
}

export default RoomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  HeaderText1: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    color: '#fff',
    alignSelf:'center'
  },
  modalView: {
      
    marginTop: "30%",
    marginLeft: "5%",
    marginRight:"5%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }


});


// import React from 'react';
// import {View, Text, Pla, TouchableOpacity} from 'react-native';
// import ImagePicker from "react-native-image-picker";
// import {GiftedChat} from "react-native-gifted-chat-video-support";

// const uuidv4 = require('uuid/v4');

// export default class RoomScreen extends React.Component {

//     constructor(state) {
//         super(state);
//         this.state = {
//             item:undefined,
//             image:'',
//             video:'',
//             messages: []
//         }
//     }

//     chooseImage() {
//         const options = {
//             title: null,
//             takePhotoButtonTitle: "Take photo",
//             chooseFromLibraryButtonTitle: "Choose from library",
//             cancelButtonTitle: "cancel",
//             cameraType: 'front',
//             mediaType: 'photo',
//             aspectX: 1,
//             aspectY: 1,
//             quality: 1.0,
//         };
//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);
//             if (response.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 if (response.customButton === 'remove') {
//                     console.log('User tapped custom button: ', response.customButton);
//                     this.setState({ Images: undefined });
//                 }
//             } else {
//                 const source = { uri: response.uri };
//                 let msg = {

//                     _id: uuidv4(),
//                     createdAt: new Date(),
//                     user: {
//                         _id: 1,
//                         name: "test",
//                     },
//                     image: source.uri,
//                 }
//                 this.onSend(msg)
//             }
//         });
//     }

//     chooseVideo() {
//         console.log("choose vids called ");
//         const options = {
//             title: null,
//             takePhotoButtonTitle: "Take video",
//             chooseFromLibraryButtonTitle: "choose video",
//             cancelButtonTitle: "cancel",
//             cameraType: 'front',
//             mediaType: 'video',
//             videoQuality:'medium',
//             aspectX: 1,
//             aspectY: 1,
//             allowsEditing: true,
//             quality: 1.0,
//         };
//         ImagePicker.showImagePicker(options, (response) => {
//             console.log('Response = ', response);
//             if (response.didCancel) {
//                 console.log('User cancelled video picker');
//             } else if (response.error) {
//                 console.log('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//                 if (response.customButton === 'remove') {
//                     console.log('User tapped custom button: ', response.customButton);
//                     this.setState({ Vids: undefined });
//                 }
//             } else {
//                 const source = { uri: response.uri };
//                 let msg = {
//                     _id: uuidv4(),
//                     createdAt: new Date(),
//                     user: {
//                         _id: 1,
//                         name: "test",
//                     },
//                     video: source.uri,
//                 }
//                 this.onSend(msg)
//             }
//         });
//     }

//     renderLeftIcon = () =>{
//         return(
//             <View  style={{ height:'100%',alignItems:'center'  , justifyContent:'flex-start' , flexDirection:'row' , paddingLeft:5,paddingRight: 5}}>

//                 <TouchableOpacity onPress={this.chooseVideo.bind(this)} >
//                     <Text>Video</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={this.chooseImage.bind(this)} >
//                     <Text>Image</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }


//     onSend(messages = []) {
//         this.setState(previousState => ({
//             messages: GiftedChat.append(previousState.messages, messages),
//         }))
//     }

//     render() {
//         return (
//                 <View style={{
//                     flex: 1,
//                     flexDirection: 'column',
//                     backgroundColor: '#fff',
//                 }}>

//                     <GiftedChat
//                         messages={this.state.messages}
//                         alwaysShowSend
//                         isAnimated
//                         renderActions={this.renderLeftIcon}
//                         showAvatarForEveryMessage
//                         onSend={messages => this.onSend(messages)}
//                         user={{
//                             _id: 1,
//                         }}
//                     />
//                 </View>
//         );
//     }
// }