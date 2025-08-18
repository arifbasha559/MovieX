import { icons } from '@/constants/icons'
import { Image, TextInput, View } from 'react-native'

export default function Searchbar({placeholder, onPress}) {
  return (
    <View className="flex-row items-center bg-dark-200 px-5 py-4 rounded-full"> 
    <Image source={icons.search} className="size-5" resizeMode='contain' tintColor="#ab8bff" />
      <TextInput 
      onPress={onPress} placeholder={placeholder} placeholderTextColor={"#ab85db"} onChange={()=>{}} 
      className='flex-1 text-white ml-2'/>
    </View>
  )
}