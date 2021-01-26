import React, {useState, useEffect} from 'react';

// Import all required component
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput, Image,TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const DATA = [
    {
      id: '1',
      name: 'Zia',
      hobby: 'I Love Chating',
      url: 'https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/article/public/RS8096_GettyImages-170036776-hig.jpg?itok=Jx2vLQIH'
    },
    {
      id: '2',
      name: 'Muqeet',
      hobby: 'I Love Playing',
      url: 'https://s35691.pcdn.co/wp-content/uploads/2018/12/meta-teaching-181210.jpg'
    },
    {
      id: '3',
      name: 'Waqar',
      hobby: 'I Love my Mobbile',
      url: 'https://cdn.shopify.com/s/files/1/0045/5104/9304/t/27/assets/AC_ECOM_SITE_2020_REFRESH_1_INDEX_M2_THUMBS-V2-1.jpg?v=8913815134086573859'
    },
  ];


const ContactDetail = (props,{navigation}) => {
  console.log(props.route.params)
  const { item } = props.route.params;
  let [contactsData, setContacts] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      {/* <Icon name="ellipsis-vertical" size={25} color="#000"/> */}
         <View style={{marginTop: ("5%"), backgroundColor:'#d7d7d7', width: wp("75%"), height: hp("26%"), alignSelf:'center', alignItems:'center'}}>
         <Image source={{ uri: item.url  }} style={{ width: wp("20%"), height: hp("10%"), borderRadius: 30, alignSelf:'center', marginTop:15,marginBottom:15 }} />
          <Text style={styles.HeaderText1}>{item.name}</Text>

         </View>

         <View style={{marginTop: ("5%"), backgroundColor:'#d7d7d7', width: wp("75%"), height: hp("26%"), alignSelf:'center', alignItems:'center'}}>
         <View style={{flexDirection:'row'}}>
         <Image source={{ uri: item.url  }} style={styles.ImageStyle} />
         <Image source={{ uri: item.url  }} style={styles.ImageStyle} />
         </View>

         <View style={{flexDirection:'row'}}>
         <Image source={{ uri: item.url  }} style={styles.ImageStyle} />
         <Image source={{ uri: item.url  }} style={styles.ImageStyle} />
         </View>
         
         </View>

         <View style={{marginTop: ("5%"), backgroundColor:'#fff', width: wp("75%"), height: hp("15%"), alignSelf:'center', alignItems:'flex-start'}}>
             <Text>{item.hobby}</Text>
         </View>

         <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center'}}>
           <TouchableOpacity style={styles.Button} onPress={()=> props.navigation.navigate("RoomScreen",{item: item})}>
                <Text>Ping Me</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.Button2} onPress={()=> props.navigation.navigate("Contacts")}>
                <Text>Forget It</Text>
           </TouchableOpacity>
         </View>
         {/* <TouchableOpacity style={styles.Button2} onPress={()=> props.navigation.navigate("Recording")}>
                <Text>Click</Text>
           </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};
export default ContactDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  HeaderText1:{
    fontSize: RFValue(20),
    fontWeight:'bold'
  },
  Button:{
    backgroundColor:'#bbbcbc',
    width: wp("33%"),
    height:hp("5%"),
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal: 10,
    borderRadius:5
  },
  Button2:{
    backgroundColor:'#d7d7d7',
    width: wp("33%"),
    height:hp("5%"),
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal: 10,
    borderRadius:5
  },
  ImageStyle:{ width: wp("20%"), height: hp("10%"), alignSelf:'center', marginTop:15,marginBottom:5, marginHorizontal:10 }

 
});