import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Comment from './Comment';
import axios from "axios";
import {IComment} from "../dataTypes/DataTypes";
import {useSelector} from "react-redux";
import {RootState} from "../redux/Store";

const Container = styled.div``
const NewComment = styled.div`
display: flex;
align-items: center;
gap:10px;`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;  `

const Input = styled.input`
border: none;
  background-color: transparent;

  border-bottom: 1px solid ${({theme}) => theme.soft}
outline: none;
padding: 5px;
width: 100%; 
  color:${({theme}) => theme.text}`

type CommentsProps = {
    videoId: string,
}

const Comments = ({videoId}:CommentsProps) => {
    const {currentUser} = useSelector((state : RootState)=>state.user);
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(()=>{
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchComments();
    },[videoId])
    return (
        <Container>
            <NewComment>
                <Avatar src={currentUser?.img}/>
                <Input placeholder='add a comment'></Input>
            </NewComment>
            {comments.map(comment=>(
                <Comment key={comment._id} comment={comment}/>
            ))}


        </Container>
    );
};

export default Comments;