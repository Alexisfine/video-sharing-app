import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import {IVideo} from "../dataTypes/DataTypes";

interface RecommendationProps  {
    tags: string[]
}
const Container = styled.div`
flex: 2`

const Recommendation = ({tags}:RecommendationProps) => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    useEffect(()=>{
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/tags?=${tags}`);
            setVideos(res.data);
        }
        fetchVideos();

    }, [tags])
    return (
        <Container>
            {videos.map(video => (
                <Card key={video._id} video={video} type='sm'/>
                )
            )}
        </Container>
    );
};

export default Recommendation;