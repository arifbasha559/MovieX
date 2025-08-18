import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

export default function MovieCard({ id, title, poster_path, vote_average, release_date, }) {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image source={{
                    uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`: 'https://via.placeholder.com/500x750?text=No+Image+Available'
                }} className='w-full h-52 rounded-lg' resizeMode='cover' />
                <Text className='text-white text-sm mt-2'>{title}</Text>

            </TouchableOpacity>
        </Link>
    )
}