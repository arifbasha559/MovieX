import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";

import { icons } from "@/constants/icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View
} from "react-native";
import { updateSearchCount } from "../../services/appwrite";
import "../globals.css";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("")
  const {
    data: movies,
    loading: loading,
    error: error,
    refresh: loadMovies,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      reset();
      if (searchQuery.trim()) {
        await loadMovies();

      } else {
        reset();
      }
    }, 1000)
    return () => {
      clearTimeout(timeoutId);
    }
  }
    , [searchQuery]);
  useEffect(() => {
    if (movies?.length > 0 && movies[0]) {

      updateSearchCount(searchQuery, movies[0])
    }
  }, [movies])
  return (
    <View className="flex-1 bg-primary relative">
      <Image source={images.bg} resizeMode="cover" className="absolute  w-full z-0" />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            {...item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 16,
          marginVertical: 16,
        }}
        numColumns={3}
        className="px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View className="flex-row mt-20  flex-1 justify-center px-5 items-center  ">
              <Image source={icons.logo} className="w-12 h-10 " />
            </View>
            <View className="my-5 ">

              <SearchBar
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                placeholder="What do you want to watch?"
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 text-center">
                {error.message}
              </Text>
            )}

            {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-white text-lg">
                Search Result for {" "}
                <Text className="text-accent font-semibold">
                  {searchQuery.trim() || "All Movies"}
                </Text>
              </Text>
            )}
          </>

        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="flex-1 justify-center items-center mt-20">

              <Text className="text-gray-500 text-center mt-5">
                {searchQuery.trim() ? "No movies found." : "Seach for movies to watch here."}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

