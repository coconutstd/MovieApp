import React from "react";
import styled from "styled-components/native";

interface VoteProps {
    votes: number;
}

const Text = styled.Text`
  color: rgba(255, 255, 255, 0.8);
`

const Votes: React.FC<VoteProps> = ({ votes }) => (
    <Text>{votes > 0 ? `⭐️ ${votes}/10` : `Coming soon`}</Text>
)

export default Votes;