import React,{useState} from 'react'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text,Image, View,TouchableOpacity,SafeAreaView, TextInput } from 'react-native';




export default function LoginScreen({ navigation }){

    const [loginID,setLoginID] = useState(null);
    const [password,setPassword] = useState(null);
    


    const storeData = async (data={shopCode,pswd}) => {
        try {
          const jsonValue = JSON.stringify(data)
          await AsyncStorage.setItem('userData', jsonValue)
        } catch (e) {
          // saving error
        }
    }
    
    const checkAuthentication =()=>{
        console.log(loginID);
        console.log(password);
   
        Axios.get(`https://winegraph.vaimssolutions.com/api/ShopApi/GetUrl?username=${loginID}&password=${password}`)
        .then((res)=>{
            if(res.status===200){
                let partyurl = res.data[0].url;
                // console.log(partyurl)
                storeData(data={loginID,password,partyurl});
                navigation.navigate('Home');
            }
        })
        .catch((error)=>{
            alert("Please enter valid credentials");
        });
       
        
    }

    // console.log(loginID);
    // console.log(password);

    return (
        <>
        <SafeAreaView>
            <ScrollView>
            <View style={{width:"100%", flexDirection:'column',marginBottom:20}}>
                <View style={{width:"100%",height:"70%",alignItems:'center',justifyContent:'center'}}>
                    <Image source={{uri:"https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg?t=st=1645943004~exp=1645943604~hmac=39e1c292ad26b31edeff3cc4978e621af684717195cb61062ee32d46e88e112e&w=740"}} style={{width:380,height:460}}/>
                </View>
                <View style={{padding:10,height:"30%"}}>
                    <TextInput value={loginID} focusable placeholder='Login ID' onChangeText={value=> setLoginID(value)} style={{borderWidth:2,borderColor:"#cecece",width:"100%",marginBottom:5,fontSize:20,padding:15,borderRadius:6}}/>
                    <TextInput value={password} placeholder='Password'onChangeText={value=> setPassword(value)} style={{borderWidth:2,borderColor:"#cecece",width:"100%",fontSize:20,padding:15,borderRadius:6}}/>
                    <TouchableOpacity onPress={checkAuthentication} style={{backgroundColor:"#201E55",marginTop:10,padding:15,paddingTop:20,borderRadius:6,alignItems:'center'}}><Text style={{color:"#fff",fontSize:20,fontWeight:'bold'}}>Login</Text></TouchableOpacity>
                    <Text style={{marginBottom:10,color:'#201E55',textAlign:'center',marginTop:5,fontSize:12}}>Powered by VAIMS SOLUTIONS PVT LTD</Text>
                </View>
            </View>
            
            </ScrollView>
        </SafeAreaView>
        </>
    )
}