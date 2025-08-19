import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function MovieCard({ id, title, poster_path, vote_average, release_date, genre }) {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[30%] relative'>
                <Image source={{
                    uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image+Available'
                }} className='w-full h-52 rounded-lg' resizeMode='cover' />

                <Text className='text-white text-sm mt-2' numberOfLines={1} >{title}</Text>
                <View className='flex-row items-center mt-1'>
                    <Image source={icons.star} className='size-4' />
                    <Text className='text-white text-sm ml-1'>{Math.round(vote_average / 2)}</Text>
                </View>
                <View className='flex-row items-center mt-1'>
                <Text className='text-gray-400 text-xs'>{new Date(release_date).getFullYear()}</Text>
                </View>

            </TouchableOpacity>
        </Link>
    )
}