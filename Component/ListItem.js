import React , { useState, useEffect }  from 'react';
import { StyleSheet, Text,Image, View,Button,TouchableOpacity,SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ListItem = ({fileName,iconName,iconColor,delFunction,id}) =>{
    // console.log(id);

    function deleteTheItem (){
        delFunction(id)
    }

    return(
        <>
        <View key={id} style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:"#CFD7EE30",justifyContent:'center',width:'90%',padding:10,borderWidth:1,borderRadius: 6,borderColor:"#cecece",marginBottom:5}}>
            <Text style={{flexGrow:1}} >{fileName}</Text>
            <TouchableOpacity onPress={deleteTheItem} ><Ionicons name={iconName} size={22} color={iconColor} /></TouchableOpacity>
        </View>
        </>
    )
}

export default ListItem ;