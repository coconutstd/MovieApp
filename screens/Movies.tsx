import React, {useState, useEffect} from "react";
import styled from 'styled-components/native'
import Swiper from "react-native-web-swiper";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import { ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import {makeImgPath} from "../utils";
import { BlurView } from "expo-blur";


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

const Title = styled.Text``

const {height: SCREEN_HEIGHT} = Dimensions.get("window")

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [loading, setLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState([])
    const getNowPlaying = async () => {
        const { results } = await(await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json()
        setNowPlaying(results)
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
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4}}
            >
                {nowPlaying.map((movie) => (
                    <View key={movie.id}>
                        <BgImg
                            style={StyleSheet.absoluteFill}
                            source={{uri: makeImgPath(movie.backdrop_path)}}
                        />
                        <BlurView intensity={50} style={StyleSheet.absoluteFill}>
                            <Title>{movie.original_title}</Title>
                        </BlurView>
                    </View>
                ))}
            </Swiper>
        </Container>
    );
}

export default Movies;