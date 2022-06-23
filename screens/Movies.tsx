import React, {useState, useEffect} from "react";
import styled from 'styled-components/native'
import Swiper from "react-native-swiper"
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ActivityIndicator, Dimensions} from "react-native";
import Slide from "../components/Slide";
import Poster from "../components/Poster";
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

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`

const ListContainer = styled.View`
  margin-bottom: 40px;
`

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const [loading, setLoading] = useState(true)
    const [nowPlaying, setNowPlaying] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [trending, setTrending] = useState([])

    const getTrending = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
            )
        ).json()
        setTrending(results)
    }
    const getUpcoming = async () => {
        const { results } = await (
            await fetch(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
            )
        ).json();
        setUpcoming(results);
    };
    const getNowPlaying = async () => {
        const { results } = await(await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)).json()
        setNowPlaying(results )
        setLoading(false)
    }
    const getData = async () => {
        await Promise.all([getTrending(), getUpcoming(), getNowPlaying()])
        setLoading(false)
    }
    useEffect(() => {
        getData()
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
                style={{marginBottom: 500}}
                containerStyle={{marginBottom:30, width: "100%", height: SCREEN_HEIGHT / 4}}
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
                <TrendingScroll contentContainerStyle={{ paddingLeft: 30 }} horizontal showsHorizontalScrollIndicator={false}>
                    {trending.map(movie => <VMedia
                        key={movie.id}
                        posterPath={movie.poster_path}
                        originalTitle={movie.original_title}
                        voteAverage={movie.vote_average} />)}
                </TrendingScroll>
            </ListContainer>
            <ListTitle>Coming Soon</ListTitle>

        </Container>
    );
}

export default Movies;