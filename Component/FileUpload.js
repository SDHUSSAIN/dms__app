import React , { useState, useEffect }  from 'react';
import { StyleSheet, Text,Image, View,Button,TouchableOpacity,SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import ListItem from './ListItem';


const Fileupload = () =>{

    
    const [doc, setDoc] = useState(null);
    const [files, setFiles] = useState([]);

    const _pickDocument = async () => {
            let result = await DocumentPicker.getDocumentAsync({
                multiple:true
            });
            if (!result.cancelled) {
                setDoc(result.uri);
                setFiles((prev)=>[...prev,result.name]);
            }
    }
    return(
        <>
        <View style={{ alignItems: 'center',width:"100%" }}>        
            <View style={{alignItems: 'center',width:"100%",padding:10,borderWidth:1,bottom:0,borderRadius: 6,borderColor:"#cecece",position:'relative',marginBottom:5,width:'100%',minHeight:'65%'}}>
                {!doc && <Ionicons name="ios-cloud-upload" size={200} color="lightblue" style={{flexGrow:1}}/>}
                {doc && files.map((fileName,index)=>{
                    return ( <ListItem key={index} fileName = {fileName} iconName={"trash-sharp"} iconColor={"red"} />
                    )
                })}
            </View >
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'80%'}} >
                <TouchableOpacity  onPress={_pickDocument} style={{backgroundColor:"#201E55",width:'45%',alignItems:'center',justifyContent:'center',flexDirection:'row',padding:10,borderRadius:6}}>
                    <Text style={{color:"#ffff"}} >Upload Document</Text>
                </TouchableOpacity>
                <Text>--OR--</Text>
                <TouchableOpacity  style={{backgroundColor:"#201E55",alignItems:'center',width:'45%',justifyContent:'center',flexDirection:'row',padding:10,borderRadius:6}}>
                    <Text style={{color:"#ffff"}} >Click Photo</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        </>
    )
}




export default Fileupload ;