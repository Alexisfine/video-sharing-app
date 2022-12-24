import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {IUser, IVideo} from "../dataTypes/DataTypes";
import {format} from 'timeago.js';
import axios from "axios";

type CardProps = {
    type? : 'sm';
    key? :string;
    video?: IVideo;
}

type ContainerProps = {
    type? : 'sm';
}

type ImgProps = {
    type? : 'sm';
}

type DetailsProps = {
    type? : 'sm';
}

type ChannelImgProps = {
    type? : 'sm';
}

const Container = styled.div<ContainerProps>`
width: ${(props) => props.type !== 'sm' && '280px'};
margin-bottom: ${(props) => props.type === 'sm' ? "10px" : "25px"};
cursor: pointer;
display:${(props) => props.type === 'sm' && "flex"};
gap: 10px;`


const Img = styled.img<ImgProps>`
width: 100%;
height: ${(props) => props.type === 'sm' ? "120px" : "202px"};
background-color: #999;
border-radius: 6%;
flex:1.2`;

const Details = styled.div<DetailsProps>`
display: flex;
margin-top: ${(props) => props.type !== 'sm' && '10px'};
gap: 12px;
flex:1`;

const ChannelImg = styled.img<ChannelImgProps>`
width: 35px;
height: 35px;
background-color: #999;
border-radius: 50%;
display: ${(props) => props.type === 'sm' && 'none'}`;

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


const Card = ({type, video}:CardProps) => {
    const [channel, setChannel] = useState<IUser>({});
    useEffect(()=>{
        const fetchChannel = async () => {
            const res = await axios.get(`/users/find/${video?.userId}`);
            setChannel(res.data);
        }
        fetchChannel();
    },[video?.userId])

    return (
        <Link to='/video/test' style={{textDecoration: "none"}}>
            <Container type={type}>
                <Img type={type} src={video?.imgUrl}/>
                <Details type={type}>
                    <ChannelImg type={type} src={channel.img}/>
                    <Text>
                        <Title>{video?.title}</Title>
                        <ChannelName>{channel.name}</ChannelName>
                        <Info>{video?.videoViews} views - {format(video?.createdAt!)}</Info>
                    </Text>
                </Details>
            </Container>
        </Link>

    );
};

export default Card;