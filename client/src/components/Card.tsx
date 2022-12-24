import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";


const Container = styled.div`
width: 280px;
margin-bottom: 25px;
cursor: pointer`;


const Img = styled.img`
width: 100%;
height: 202px;
background-color: #999;
border-radius: 6%`;

const Details = styled.div`
display: flex;
margin-top: 10px;
gap: 12px`;

const ChannelImg = styled.img`
width: 35px;
height: 35px;
background-color: #999;
border-radius: 50%`;

const Text = styled.div`
`;

const Title = styled.h1`
font-size: 15px;
font-weight: 500;
color: ${({theme}) => theme.text}`;

const ChannelName = styled.h2`
font-size: 12px;
color: ${({theme}) => theme.textSoft};
margin: 5px 0px`;

const Info = styled.div`
display: flex;
margin-top: 10px;
gap: 12px;
font-size: 12px;
color: ${({theme}) => theme.textSoft}`;

const Card = () => {
    return (
        <Link to='/video/test' style={{textDecoration: "none"}}>
            <Container>
                <Img src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"/>
                <Details>
                    <ChannelImg/>
                    <Text>
                        <Title>Test Video</Title>
                        <ChannelName>Alex</ChannelName>
                        <Info>660,902 views - 1 day ago</Info>
                    </Text>
                </Details>
            </Container>
        </Link>

    );
};

export default Card;