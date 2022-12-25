import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {
    AddTaskOutlined,
    ReplyOutlined,
    ThumbDown,
    ThumbDownOutlined,
    ThumbUp,
    ThumbUpOutlined
} from "@mui/icons-material";
import Comments from "../components/Comments";
import Card from "../components/Card";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/Store";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {dislike, fetchFailure, fetchStart, fetchSuccess, like} from "../redux/VideoSlice";
import {format} from "timeago.js";
import {IUser} from "../dataTypes/DataTypes";
import {subscription} from "../redux/UserSlice";
import Recommendation from "../components/Recommendation";


const Container = styled.div`
display:flex;
gap: 24px`

const Content = styled.div`
flex: 5`

const VideoWrapper = styled.div`
`

const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 18px;
margin-bottom: 8px;
color: ${({theme}) => theme.text}`

const Details = styled.div`
display: flex;
align-items:center;
justify-content: space-between`

const Info = styled.span`
color: ${({theme}) => theme.textSoft}`

const Buttons = styled.div`
display: flex;
gap: 15px;
color: ${({theme}) => theme.text}`

const Button = styled.div`
display: flex;
align-items: center;
gap: 5px;
cursor: pointer;`

const Hr = styled.hr`
margin: 15px 0px;  
border: 0.5px solid ${({theme}) => theme.soft};`




const Channel = styled.div`
display:flex;
justify-content:space-between;
`

const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`

const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;  
`
const ChannelDetail = styled.div`
display: flex;
  flex-direction: column;
  color: ${({theme}) => theme.text}
`
const ChannelName = styled.span`
font-weight: 500;
  
`

const ChannelCounter = styled.span`
margin-top: 3.5px;
  margin-bottom: 15px;
  font-size:12px;
  color: ${({theme}) => theme.textSoft}
`

const ChannelDescription = styled.p`
font-size: 13.5px;
`

const ChannelSubscribe = styled.button`
background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`

const VideoFrame = styled.video`
max-height: 480px;
width: 100%;
object-fit:cover;`

const Video = () => {
    const {currentUser} = useSelector((state : RootState)=>state.user);
    const {currentVideo} = useSelector((state : RootState)=>state.video);

    const dispatch = useDispatch();

    // get video id
    const path = useLocation().pathname.split('/')[2];

    const [channel, setChannel] = useState<IUser>({});

    useEffect(()=>{
        const fetchData = async () => {
            dispatch(fetchStart());
            try {
                const videoRes = await axios.get(`/videos/find/${path}`);
                const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`);
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data))
            } catch (err) {
                console.log(err);
                dispatch(fetchFailure());
            }
        }
        fetchData();
    },[path, dispatch]);

    const handleLike = async () => {
        await axios.put(`/users/like/${currentVideo?._id}`);
        dispatch(like(currentUser?._id));
    }

    const handleDislike = async () => {
        await axios.put(`/users/dislike/${currentVideo?._id}`);
        dispatch(dislike(currentUser?._id));
    }

    const handleSub = async () => {
        console.log(currentUser?.subscribeUsers);
        currentUser?.subscribeUsers?.includes(channel._id!)
            ? await axios.put(`/users/unsub/${channel._id}`)
            : await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(channel._id));
    }
    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <VideoFrame src={currentVideo?.videoUrl} controls/>
                </VideoWrapper>
                <Title>{currentVideo?.title}</Title>
                <Details>
                    <Info>{currentVideo?.videoViews} views - {format(currentVideo?.createdAt!)}</Info>
                    <Buttons>
                        <Button onClick={handleLike}>
                            {currentVideo?.likes?.includes(currentUser?._id!) ?
                                <ThumbUp/> : <ThumbUpOutlined/>}
                            {currentVideo?.likes?.length}
                        </Button>
                        <Button onClick={handleDislike}>
                            {currentVideo?.dislikes.includes(currentUser?._id!) ?
                            <ThumbDown/> : <ThumbDownOutlined/>} Dislike</Button>
                        <Button><ReplyOutlined/> Share</Button>
                        <Button><AddTaskOutlined/> Save</Button>

                    </Buttons>
                </Details>
                <Hr/>
                <Channel>
                    <ChannelInfo>
                        <Image src={channel.img}></Image>
                        <ChannelDetail>
                            <ChannelName>{channel.name}</ChannelName>
                            <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                            <ChannelDescription>
                                {currentVideo?.description}
                            </ChannelDescription>
                        </ChannelDetail>
                    </ChannelInfo>
                    <ChannelSubscribe onClick={handleSub}>
                        {currentUser?.subscribeUsers?.includes(channel._id!) ?
                    "SUBSCRIBED" : "SUBSCRIBE"}</ChannelSubscribe>
                </Channel>
                <Hr/>
                <Comments videoId={currentVideo?._id!}></Comments>
            </Content>
            <Recommendation tags={currentVideo?.tags!}/>
        </Container>
    );
};

export default Video;