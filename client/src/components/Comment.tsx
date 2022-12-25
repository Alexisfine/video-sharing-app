import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {IComment, IUser} from "../dataTypes/DataTypes";
import axios from "axios";

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

type CommentProps = {
    key: string,
    comment: IComment
}
const Comment = ({key, comment}:CommentProps) => {
    const [channel, setChannel] = useState<IUser>({});
    useEffect(()=>{
        const fetchComment = async () => {
            const res = await axios.get(`/users/find/${comment.userId}`);
            setChannel(res.data);
        }
        fetchComment();
    },[comment.userId])
    return (
        <Container>
            <Avatar src={channel.img}/>
            <Details>
                <Name>{channel.name}</Name>
                <Date>1 day ago</Date>
                <Description>
                    {comment.description}
                </Description>
            </Details>
        </Container>
    );
};

export default Comment;