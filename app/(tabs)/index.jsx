import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { Link, useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "../globals.css";
import TrendingCard from "../../components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: MoviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary relative">
      <Image source={images.bg} className="absolute  w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="white"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        ) : MoviesError || trendingError ? (
          <Text className="text-white text-center mt-5">
            Error:
            {MoviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/(tabs)/Search")}
              placeholder="What do you want to watch?"
              value={undefined}
              onChangeText={undefined}
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-white text-lg mt-5 mb-3 ">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                  renderItem={({ item, index }) => <TrendingCard {...item} index={index} />}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  ItemSeparatorComponent={() => <View className="w-4 " />}
                  showsHorizontalScrollIndicator={false}
                  // className="h-60"
                  contentContainerStyle={{ columnGap: 15 }}
                />
              </View>
            )}
            <>
              <Text className="text-white text-lg mt-5 mb-3 ">
                Popular Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32 "
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

