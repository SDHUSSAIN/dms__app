import React , { useState, useEffect }  from 'react';
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { StyleSheet,ScrollView, ImageBackground,Text,ActivityIndicator,Image, View,Button,TouchableOpacity,SafeAreaView, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import {Camera} from 'expo-camera'





export default function CameraScreen ({navigation}){
    const [selectedValue, setSelectedValue] = useState("Select Category");
    const [startCamera,setStartCamera] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [image, setImage] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [categories,setCategories] = useState([]);
    const [uploadfiles, setUploadFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let camera = Camera ;

    const __startCamera = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync()
        if (status === 'granted') {
          // start the camera
          setStartCamera(true)
        } else {
          Alert.alert('Access denied')
        }
    }
    function handleFileDelete(index){
        let value = imageFiles[index] ;
        let uploadfile = uploadfiles[index];
        let newimageFiles = imageFiles.filter((file)=>{
            return file !== value ;
        })
        let newUploadFiles = uploadfiles.filter((file)=>{
            return file !== uploadfile ;
        })
        setImageFiles(newimageFiles);
        setUploadFiles(newUploadFiles);
    }
    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('userData')
          let newData = JSON.parse(jsonValue);
          
        
          Axios.get(`${newData.partyurl}/api/ShopApi/GetCategory?username=${newData.loginID}&password=${newData.password}`)
            .then((res)=>{
                if(res.status===200){
                    setCategories(res.data);   
                }
            })
            .catch((error)=>{
                alert("Please enter valid credentials");
            });
         
        } catch(e) {
          // error reading value
        }
    }
    
    const postData = async () => {
        if(selectedValue === "Select Category" && uploadfiles.length<1 ){
            alert("Please Select Document Category and Files to upload");
        }else if(selectedValue === "Select Category"){
            alert("Please Select Document Category");
        }else if(uploadfiles.length<1){
            alert("Please Select File or Files to upload");
        }
        setIsLoading(true);
        
        try {
          const jsonValue = await AsyncStorage.getItem('userData');
          let newData = JSON.parse(jsonValue);
          let shopcode = newData.loginID ;
        //   console.log(newData.loginID);  
        //   console.log(selectedValue);
        //   console.log(uploadfiles);
         
          
          Axios.post(`${newData.partyurl}/api/ShopApi/Save`,
            {

              shopcode:shopcode,
              category:selectedValue,
              image:uploadfiles,
            }
            ).then((res)=>{
                if(res.status===200){
                    setIsLoading(false);
                    alert("Files uploaded successfully");
                    setImageFiles([]);
                    setUploadFiles([]);
                    navigation.navigate('Home');
                }
            }).catch((error)=>{
                setIsLoading(false);
                // alert(error);
            });
         
        } catch(e) {
          // error reading value
        }
    }

    useEffect(()=>{
        getData();

    },[])
   

    useEffect(()=>{
        __startCamera();
        
    },[]);

      const __takePicture = async () => {
        if (!camera) return
        const photo = await camera.takePictureAsync();
        setImageFiles((prev)=>[...prev,photo]);
        let documentToUpload = await FileSystem.readAsStringAsync(photo.uri,{ encoding: FileSystem.EncodingType.Base64 });
        setUploadFiles((prev)=>[...prev,documentToUpload]);
               
      }
    
    return (
        isLoading ?<View style={{ alignItems: 'center',width:"100%",justifyContent:'center' }}><ActivityIndicator size="large" color="#00ff00" /></View>  : 
        <>
            <View style={{ alignItems: 'center',width:"100%" }}>

            <View style={{alignItems: 'center',width:"100%",padding:10,borderWidth:1,bottom:0,borderRadius: 6,borderColor:"#cecece",position:'relative',marginBottom:5,width:'100%',minHeight:'62%'}}>
                {startCamera && <Camera type={type} autoFocus={Camera.Constants.AutoFocus.on} whiteBalance={Camera.Constants.WhiteBalance.auto} style={{flex: 1,width:"100%"}} ref={(r) => {camera = r}}></Camera>}
                {image && imageFiles.map((imageFile,index)=>{
                    return ( <ListItem key={index} fileName = {imageFile} iconName={"trash-sharp"} iconColor={"red"} />
                    )
                })}
            </View >
            <View style={{display:'flex',flexDirection:'row',width:'95%',alignItems:'center',justifyContent:'center', marginBottom:5}}>
                <TouchableOpacity onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }} style={{justifyContent:'center', flexDirection:'row',paddingHorizontal:2,borderRadius:50}}>
                    <Ionicons name="md-reload-circle" size={40} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={__takePicture} style={{alignItems:'center',justifyContent:'center',flexDirection:'row',paddingHorizontal:10,borderRadius:6}}>
                    <Ionicons name="add-circle-sharp" size={70} color="#201E55" />
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent:'center', flexDirection:'row',paddingHorizontal:2,borderRadius:50}}>
                    <Ionicons name="md-reload-circle" size={40} color="#fff" />
                </TouchableOpacity>
                

            </View>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'95%',marginBottom:5}} >
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    
                >
                    <Picker.Item label="Select Category" value="" />
                    {
                        categories?.map((item,index)=>{
                            return (<Picker.Item key={index} label={item.categoryname} value={item.categoryname} />)
                        })
                    }
                   
                    {/* <Picker.Item label="P O" value="java" />
                    <Picker.Item label="Sale Bill" value="salebill" />
                    <Picker.Item label="Inventory Doc" value="inventory" />
                    <Picker.Item label="New Doc" value="newdoc" />
                    <Picker.Item label="Other Doc" value="otherdoc" /> */}
                </Picker>
                <TouchableOpacity onPress={postData} style={{backgroundColor:"#201E55",alignItems:'center',justifyContent:'center',flexDirection:'row',paddingTop:15,paddingBottom:15,paddingHorizontal:25,borderRadius:6}}>
                    <Text style={{color:"#ffff"}} >Send</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <ScrollView horizontal={true}>
                {
                    imageFiles && imageFiles.map((image,i)=>{
                        return (
                            <View key={i} style={{alignItems:'center',borderWidth:1,margin:1,borderColor:"#cecece35"}}>
                                <Image  style={{width:80,height:80,margin:5,borderRadius:50}} source={{uri:image.uri}}  />
                                <TouchableOpacity onPress={()=>handleFileDelete(i)} ><Text style={{color:'red'}}>Remove</Text></TouchableOpacity>
                            </View>
                        )

                    })
                }
            </ScrollView>
                
            </View>
            
            
        </View>
        </>
    )
}