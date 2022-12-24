import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

type CardProps = {
    type? : 'sm';
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


const Card = ({type}:CardProps) => {
    return (
        <Link to='/video/test' style={{textDecoration: "none"}}>
            <Container type={type}>
                <Img type={type}
                    src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"/>
                <Details type={type}>
                    <ChannelImg type={type}/>
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