//app\(tabs)\_layout.jsx
import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'; // Import Tabs component from expo-router
import React, { useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import GlobalApi from '../../services/GlobalApi';
import {useUser} from '@clerk/clerk-expo'

export default function TabLayout() {


  const {user}=useUser()

  useEffect(()=>{
    user&&Verifyuser();
  },[user])

  const VerifyUser=async()=>{
  const result=await GlobalApi.GetUserInfo(user?.primaryEmailAddress?.emailAddress)
  console.log(result.data.data);

  if(result.data.data.length!=0)
  {
    return;
  }
  try{
    const data={
      userEmail:user?.primaryEmailAddress?.emailAddress,
      userName:user?.fullName
    }
    const result = await GlobalApi.CreateNewUser(data);
    console.log(result?.data.data);
  }catch(e){

  }
  }

  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:'red'
    }}>
        <Tabs.Screen name='home'
        options={{
          title:'Home',
          tabBarIcon:({color})=><Ionicons name="home" size={24} color="color" />
        }}
        />
        <Tabs.Screen name='collection'
        options={{
          title:'Collection',
          tabBarIcon:({color})=><Ionicons name="folder-open" size={24} color="black" />
        }}/>
        <Tabs.Screen name='profile'
        options={{
          title:'Profile',
          tabBarIcon:({color})=><FontAwesome name="user" size={24} color="black" />
        }}/>
    </Tabs>
  )
}