import React from 'react';
import styled from "styled-components";
import {AddTaskOutlined, ReplyOutlined, ThumbDownOutlined, ThumbUpOutlined} from "@mui/icons-material";
import Comments from "../components/Comments";
import Card from "../components/Card";


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


const Recommendation = styled.div`
flex: 2`

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

const Video = () => {
    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <iframe
                        width="100%"
                        height="500"
                        src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </VideoWrapper>
                <Title>Test Video</Title>
                <Details>
                    <Info>732,967 views - Jun 22, 2022</Info>
                    <Buttons>
                        <Button><ThumbUpOutlined/> 123</Button>
                        <Button><ThumbDownOutlined/> Dislike</Button>
                        <Button><ReplyOutlined/> Share</Button>
                        <Button><AddTaskOutlined/> Save</Button>

                    </Buttons>
                </Details>
                <Hr/>
                <Channel>
                    <ChannelInfo>
                        <Image src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"></Image>
                        <ChannelDetail>
                            <ChannelName>Alex Xue</ChannelName>
                            <ChannelCounter>200K subscribers</ChannelCounter>
                            <ChannelDescription>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                Doloribus laborum delectus unde quaerat dolore culpa sit aliquam
                                at. Vitae facere ipsum totam ratione exercitationem. Suscipit
                                animi accusantium dolores ipsam ut.
                            </ChannelDescription>
                        </ChannelDetail>
                    </ChannelInfo>
                    <ChannelSubscribe>Subscribe</ChannelSubscribe>
                </Channel>
                <Hr/>
                <Comments></Comments>
            </Content>
            <Recommendation>
                <Card type='sm'/>
                <Card type='sm'/>
                <Card type='sm'/>
                <Card type='sm'/>
                <Card type='sm'/>
                <Card type='sm'/>

            </Recommendation>
        </Container>
    );
};

export default Video;