import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import { Image, ImageBackground, Text, View } from 'react-native'



const TabIcon = (props) => {
  if (props.focused) {

    return (
      <ImageBackground source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
        <Image source={props.icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary text-base ml-2 font-semibold">{props.name}</Text>
      </ImageBackground>
    )
  }
  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">

      <Image source={props.icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  )
}
export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle:{
          height: 100,
          width: 100,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          borderRadius: 50,
          backgroundColor: "#0f0d23",
          marginHorizontal: 20,
          marginBottom:36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderColor: "#0f0d23",
          borderWidth: 1,
          
        },
      
      }}
    >
      <Tabs.Screen name="index" options={{
        headerShown: false,
        title: "Home",
        tabBarIcon: ({ focused }) => (
          <TabIcon name="Home" focused={focused} icon={icons.home} />
        )
      }} />
      <Tabs.Screen name="Search" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon name="Search" focused={focused} icon={icons.search} />
        )

      }} />
      <Tabs.Screen name="Saved" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon name="Saved" focused={focused} icon={icons.save} />
        )

      }} />
      <Tabs.Screen name="Profile" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon name="Profile" focused={focused} icon={icons.person} />
        )

      }} />
    </Tabs>
  )
}