import React, {useEffect, useState} from "react";
import styled from 'styled-components/native'
import Swiper from "react-native-swiper"
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ActivityIndicator, Dimensions, FlatList, RefreshControl, View} from "react-native";
import Slide from "../components/Slide";
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { moviesApi } from "../api"
import {useQuery, useQueryClient} from "react-query";

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
    const queryClient = useQueryClient()
    const { isLoading: nowPlayingLoading, data: nowPlayingData, isRefetching: isRefetchingNowPlaying } = useQuery(
        "nowPlaying",
        moviesApi.nowPlaying
    );
    const { isLoading: upcomingLoading, data: upcomingData, isRefetching: isRefetchingUpcoming } = useQuery(
        "upcoming",
        moviesApi.upcoming
    );
    const { isLoading: trendingLoading, data: trendingData, isRefetching: isRefetchingTrending } = useQuery(
        "trending",
        moviesApi.trending
    );

    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending
    const onRefresh = async () => {}
    return loading ? (
        <Loader>
            <ActivityIndicator/>
        </Loader>
    ) : upcomingData ? (
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
                        {nowPlayingData.results.map((movie) => (<Slide
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
                            data={trendingData.results}
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
                    {upcomingData.results.map((movie) => (
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
            data={upcomingData.results}
            renderItem={({ item }) => (
            <HMedia
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                overview={item.overview}
                releaseDate={item.release_date}
            />
        )} keyExtractor={(item) => item.id + ""}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />} />
    ) : null;
}

export default Movies;