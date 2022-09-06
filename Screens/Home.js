import React from 'react';
import {Text,Image, View,TouchableOpacity } from 'react-native';



export default function Home ({navigation}){
    return (
        <>
            <View style={{backgroundColor:"#F2F7F6",width:"100%",height:"100%",paddingHorizontal:5,alignItems:'center'}}>
               
                <View>
                    <Image source={require("../assets/3-02.png")} style={{width:350,height:350}}></Image>
                </View>
                <View style={{display:'flex',flexDirection:'column',backgroundColor:'#fff',height:'40%',position:'absolute',borderRadius:12, bottom:10,alignItems:'center',justifyContent:'space-between',width:'90%',paddingHorizontal:10}}  >
                    <Text style={{fontSize:35,fontWeight:'bold',marginTop:5,marginBottom:0,textAlign:'center'}} >Organize your file easily</Text>
                    <Text style={{fontSize:18,marginTop:0,textAlign:'center'}} >Go and manage your files by your own hands</Text>
                    <View style={{display:'flex',flexDirection:'row',marginBottom:10,boxWithShadow: {shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5}}} >
                        <TouchableOpacity onPress={() => navigation.navigate('DocumentUpload')} style={{backgroundColor:"#FC9D49",width:'45%',alignItems:'center',justifyContent:'center',flexDirection:'row',padding:10,borderRadius:6}}>
                            <Text style={{color:"#ffff"}} >Upload Document</Text>
                        </TouchableOpacity>
                        <Text>--OR--</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={{backgroundColor:"#FC9D49",alignItems:'center',width:'45%',justifyContent:'center',flexDirection:'row',padding:10,borderRadius:6}}>
                            <Text style={{color:"#ffff"}} >Go To Camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

