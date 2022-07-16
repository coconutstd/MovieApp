import React, {useState} from "react";
import { useQuery} from "react-query";
import styled from "styled-components/native";
import {moviesApi, tvApi} from "../api";

const Container = styled.ScrollView``

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`

const Search = () => {
    const [query, setQuery] = useState("")
    const onChangeText = (text: string) => setQuery(text)
    const {
        isLoading: moviesLoading,
        data: moviesData,
        refetch: searchMovies,
    } = useQuery(["searchMovies, query"], moviesApi.search, {
        enabled: false
    })

    const onSubmit = () => {
        if (query === "") {
            return
        }
        searchMovies()
    }

    return (
        <Container>
            <SearchBar
                placeholder="Search for Movie or TV show"
                placeholderTextColor="grey"
                returnKeyType="search"
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />
        </Container>
    )
}


export default Search;