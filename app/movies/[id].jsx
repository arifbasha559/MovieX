import { View, Text } from 'react-native'
import React from 'react'
import { Link, useLocalSearchParams } from 'expo-router'

export default function Details() {
    const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>movie details: {id}</Text>
    <Link href="/(tabs)">
      <Text>Go to Home</Text>
    </Link>
    </View>

  )
}