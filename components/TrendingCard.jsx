import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "../constants/images";
export default function TrendingCard({
  id,
  title,
  poster_url,
  vote_average,
  release_date,
  index,
}) {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: poster_url,
          }}
          className="w-32 h-48  rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-11  -left-3 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-white text-6xl font-bold">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text className="text-white text-sm mt-2" numberOfLines={2}>
          {title}
        </Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-gray-400 text-xs">Movie</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
