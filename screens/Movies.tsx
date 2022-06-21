import React, {useState, useEffect} from "react";
import styled from 'styled-components/native'
import Swiper from "react-native-swiper"
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import {makeImgPath} from "../utils";
import { BlurView } from "expo-blur";
import useColorScheme from "expo-status-bar/build/useColorScheme";
import Slide from "../components/Slide";

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

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {

    const [loading, setLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState([])
    const getNowPlaying = async () => {
        const { results } = await(await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json()
        setNowPlaying(results )
        setLoading(false)
    }
    useEffect(() => {
        getNowPlaying()
    }, [])
    return loading ? (
        <Loader>
            <ActivityIndicator/>
        </Loader>
    ) : (
        <Container>
            <Swiper
                horizontal
                loop
                autoplay
                autoplayTimeout={3.5}
                showsButtons={false}
                showsPagination={false}
                containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4}}
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
        </Container>
    );
}

export default Movies;