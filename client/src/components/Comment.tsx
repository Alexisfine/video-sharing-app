import React from 'react';
import styled from "styled-components";

const Container = styled.div`
display:flex;
gap: 10px;
margin: 30px 0`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;  `

const Details =  styled.div`
display:flex;
  flex-direction: column;
gap: 10px;`

const Name =  styled.span`
font-size: 13px;
  font-weight: 500;
  color: ${({theme}) => theme.text}`

const Date =  styled.span`
font-size: 12px;
font-weight: 400;
color: ${({theme}) => theme.text};
margin-left: 5px;`

const Description =  styled.span`
font-size: 13px;
  color: ${({theme}) => theme.text}`

const Comment = () => {
    return (
        <Container>
            <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"/>
            <Details>
                <Name>John Lee</Name>
                <Date>1 day ago</Date>
                <Description>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Doloribus laborum delectus unde quaerat dolore culpa sit aliquam
                    at. Vitae facere ipsum totam ratione exercitationem. Suscipit
                    animi accusantium dolores ipsam ut.
                </Description>
            </Details>
        </Container>
    );
};

export default Comment;