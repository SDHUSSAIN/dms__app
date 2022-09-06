import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CameraScreen from './Screens/Camera';
import DocumentUpload from './Screens/DocumentUpload';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';

const Stack = createNativeStackNavigator();


export default function App() {
  const[isUserExist, setIsUserExist] = useState(false);
  const getData = async () => {
    
    try {
      
      const jsonValue = await AsyncStorage.getItem('userData');
      
      let newData = JSON.parse(jsonValue);
      
      if(newData){
        setIsUserExist(true);
      }
    } catch(e) {
      console.log(e);
      // error reading value
    }
}


useEffect(()=>{
 
  getData();

},[])
 

  return (
//       isUserExist ? <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home" >
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="DocumentUpload" component={DocumentUpload} />
//         <Stack.Screen name="Camera" component={CameraScreen} />  
//       </Stack.Navigator>
//     </NavigationContainer>
//  :
//       <NavigationContainer>
//         <Stack.Navigator initialRouteName="Login" >
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Home" component={Home} />
//           <Stack.Screen name="DocumentUpload" component={DocumentUpload} />
//           <Stack.Screen name="Camera" component={CameraScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
<NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DocumentUpload" component={DocumentUpload} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
   
   
  );
}


