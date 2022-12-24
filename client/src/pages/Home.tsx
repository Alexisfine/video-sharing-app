import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import {IVideo} from "../dataTypes/DataTypes";


const Container = styled.div`
display:flex;
justify-content:space-between;
flex-wrap: wrap`;



type HomeProps = {
    type: 'random' | 'trend' | 'sub'
}



const Home = ({type}:HomeProps) => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    useEffect(()=>{
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/${type}`);
            setVideos(res.data);
        }
        fetchVideos();
    },[type])

    return (
        <Container>
            {videos.map(video =>(
                <Card key={video._id} video={video}/>
            ))}


        </Container>
    );
};

export default Home;