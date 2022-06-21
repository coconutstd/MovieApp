import React, {useState, useEffect} from "react";
import styled from 'styled-components/native'
import Swiper from "react-native-swiper"
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";
import {makeImgPath} from "../utils";
import { BlurView } from "expo-blur";
import useColorScheme from "expo-status-bar/build/useColorScheme";

const API_KEY = "2f7e1fdd60dee73dda1c0d7981150b8e"

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const View = styled.View`
  flex: 1;
`

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
`

const BgImg = styled.Image`
  flex: 1;
`

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`

const Poster = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 5px;
`

const Column = styled.View`
  width: 60%;
`

const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) => props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`

const Votes = styled(Overview)`
    font-size: 12px;
`

const Title = styled.Text<{ isDark: boolean}>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)}
`

const {height: SCREEN_HEIGHT} = Dimensions.get("window")

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const isDark = useColorScheme() === "dark";
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
                {nowPlaying.map((movie) => (
                    <View key={movie.id}>
                        <BgImg
                            style={StyleSheet.absoluteFill}
                            source={{uri: makeImgPath(movie.backdrop_path)}}
                        />
                        <BlurView tint={isDark ? "dark" : "light"} intensity={50} style={StyleSheet.absoluteFill}>
                            <Wrapper>
                                <Poster source={{ uri: makeImgPath(movie.poster_path) }}/>
                                <Column>
                                    <Title isDark={isDark}>{movie.original_title}</Title>
                                    {movie.vote_average > 0 ? (
                                        <Votes isDark={isDark}>⭐️ {movie.vote_average}/10</Votes>
                                    ) : null}
                                    <Overview isDark={isDark}>
                                        {movie.overview.slice(0, 100)}...
                                    </Overview>
                                </Column>
                            </Wrapper>
                        </BlurView>
                    </View>
                ))}
            </Swiper>
        </Container>
    );
}

export default Movies;