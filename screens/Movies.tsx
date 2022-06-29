import React, {useEffect, useState} from "react";
import styled from 'styled-components/native'
import Swiper from "react-native-swiper"
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ActivityIndicator, Dimensions, FlatList, RefreshControl, View} from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";

const API_KEY = "2f7e1fdd60dee73dda1c0d7981150b8e"

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
`

const {height: SCREEN_HEIGHT} = Dimensions.get("window")

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`

const ListContainer = styled.View`
  margin-bottom: 40px;
`

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [trending, setTrending] = useState([])

    const getTrending = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
            )
        ).json()
        setTrending(results)
    }
    const getUpcoming = async () => {
        const {results} = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
            )
        ).json();
        setUpcoming(results);
    };
    const getNowPlaying = async () => {
        const {results} = await (await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json()
        setNowPlaying(results)
        setLoading(false)
    }
    const getData = async () => {
        await Promise.all([getTrending(), getUpcoming(), getNowPlaying()])
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])
    const onRefresh = async () => {
        setRefreshing(true)
        await getData()
        setRefreshing(false)
    }
    return loading ? (
        <Loader>
            <ActivityIndicator/>
        </Loader>
    ) : (
        <FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={
                <>
                    <Swiper
                        horizontal
                        loop
                        autoplay
                        autoplayTimeout={3.5}
                        showsButtons={false}
                        showsPagination={false}
                        style={{marginBottom: 500}}
                        containerStyle={{marginBottom: 30, width: "100%", height: SCREEN_HEIGHT / 4}}
                    >
                        {nowPlaying.map((movie) => (<Slide
                                key={movie.id}
                                backdropPath={movie.backdrop_path}
                                posterPath={movie.poster_path}
                                originalTitle={movie.original_title}
                                voteAverage={movie.vote_average}
                                overview={movie.overview}
                            />
                        ))}
                    </Swiper>
                    <ListContainer>
                        <ListTitle>Trending Movies</ListTitle>
                        <TrendingScroll
                            data={trending}
                            horizontal
                            keyExtractor={(item) => item.id + ""}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal: 30}}
                            ItemSeparatorComponent={() => <View style={{width: 30}}/>}
                            renderItem={({item}) => (
                                <VMedia
                                    key={item.id}
                                    posterPath={item.poster_path}
                                    originalTitle={item.original_title}
                                    voteAverage={item.vote_average}/>
                            )}
                        />
                    </ListContainer>
                    <ComingSoonTitle>Coming Soon</ComingSoonTitle>
                    {upcoming.map((movie) => (
                        <HMedia
                            key={movie.id}
                            posterPath={movie.poster_path}
                            originalTitle={movie.original_title}
                            overview={movie.overview}
                            releaseDate={movie.release_date}
                        />
                    ))}
                </>
            }
            data={upcoming}
            renderItem={({ item }) => (
            <HMedia
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                overview={item.overview}
                releaseDate={item.release_date}
            />
        )} keyExtractor={(item) => item.id + ""}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />} />
    );
}

export default Movies;