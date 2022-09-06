import React , { useState, useEffect }  from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import Axios from 'axios'
import {Text,View,TouchableOpacity,ActivityIndicator,} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import ListItem from '../Component/ListItem';


const DocumentUpload = ({navigation}) =>{

    const [selectedValue, setSelectedValue] = useState("Select Category");
    const [doc, setDoc] = useState(null);
    const [files, setFiles] = useState([]);
    const [uploadfiles, setUploadFiles] = useState([]);

    const [categories,setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
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
                    setFiles([]);
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
    
      
    const sendFiles = () =>{
        postData();
    }
    const _pickDocument = async () => {
            let documentToUpload;
            let result = await DocumentPicker.getDocumentAsync({
                base64:true,
                multiple:true,
               
            });
            if (!result.cancelled) {
                // console.log(result);
                setDoc(result.uri);
                documentToUpload = await FileSystem.readAsStringAsync(result.uri,{ encoding: FileSystem.EncodingType.Base64 });
                setUploadFiles((prev)=>[...prev,documentToUpload]);
                setFiles((prev)=>[...prev,result.name]);
            }
    }

    function handleFileDelete(index){
        
        let value = files[index] ;
        let uploadfile = uploadfiles[index];
        let newFiles = files.filter((file)=>{
            return file !== value ;
        })
        let newUploadFiles = uploadfiles.filter((file)=>{
            return file !== uploadfile ;
        })
        setFiles(newFiles);
        setUploadFiles(newUploadFiles);
    }

    return(
        isLoading ?<View style={{ alignItems: 'center',width:"100%",justifyContent:'center'}}><ActivityIndicator size="large" color="#00ff00" style={{top:50}}/></View>  :
        <>
        <View style={{ alignItems: 'center',width:"100%" }}>        
            <View style={{alignItems: 'center',width:"100%",padding:10,borderWidth:1,bottom:0,borderRadius: 6,borderColor:"#cecece",position:'relative',marginBottom:5,width:'100%',minHeight:'65%'}}>
                {!doc && <Ionicons name="ios-cloud-upload" size={200} color="lightblue" style={{flexGrow:1}}/>}
                {doc && files.map((fileName,index)=>{
                    return ( <ListItem key={index} fileName = {fileName} delFunction={handleFileDelete} id={index} iconName={"trash-sharp"} iconColor={"red"} />
                    )
                })}
            </View >
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:'95%'}} >
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
                <TouchableOpacity  onPress={_pickDocument} style={{backgroundColor:"#201E55",alignItems:'center',justifyContent:'center',flexDirection:'row',paddingTop:15,paddingBottom:15,paddingHorizontal:10,borderRadius:6}}>
                    <Text style={{color:"#ffff"}} >Add Document</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center',width:"100%",padding:10,borderWidth:1,bottom:0,borderRadius: 6,borderColor:"#cecece",position:'relative',marginBottom:5,minHeight:'27%'}} >
                 <TouchableOpacity onPress={sendFiles} style={{backgroundColor:"#4AB26E",bottom:0,position:'absolute',width:"100%", alignItems:'center',justifyContent:'center',flexDirection:'row',paddingTop:15,paddingBottom:15,paddingHorizontal:10,borderRadius:6}}>
                    <Text style={{color:"#201E55",fontSize:20}} >Send</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        </>
    )
}

export default DocumentUpload ;