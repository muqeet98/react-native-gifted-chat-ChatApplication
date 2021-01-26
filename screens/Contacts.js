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


const ContactsScr = ({navigation}) => {
  let [contactsData, setContacts] = useState([]);

  const renderItem = ({ item })=> {
  
    return (
        <View>
            <TouchableOpacity onPress={()=> navigation.navigate("ContactDetail", {item: item})}>
      <View style={styles.listItem}>
        <Image source={{ uri: item.url }} style={{ width: 70, height: 70, borderRadius: 0 }} />
        <View style={{ alignItems: 'flex-start', flex: 1, paddingLeft:10, justifyContent:'center' }}>
          <Text style={{ fontWeight: "bold", fontSize:18 }}>{item.name}</Text>
          <Text>{item.hobby}</Text>
        </View>

      </View>
      </TouchableOpacity>
      </View>
    );
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* <Text style={styles.header}>
          Access Contact List in React Native
        </Text> */}
        <TouchableOpacity onPress={()=> navigation.navigate("Paring")} >
          <Text>Pair</Text>
        </TouchableOpacity>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
export default ContactsScr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4591ed',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 20,
  },
  searchBar: {
    backgroundColor: '#f0eded',
    paddingHorizontal: 30,
    paddingVertical: Platform.OS === 'android' ? undefined : 15,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
});