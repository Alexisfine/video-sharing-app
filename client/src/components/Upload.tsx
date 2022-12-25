import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import styled from 'styled-components';
import {getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../firebase';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top:0;
left:0;
  background-color: #000000a7;
display:flex;
align-items: center;
justify-content: center;`

const Wrapper = styled.div`
width: 600px;
height: 600px;
background-color: ${({theme}) => theme.bgLighter};
color:${({theme}) => theme.text};
padding: 20px;
  display: flex;
flex-direction: column;
gap: 20px;
position: relative;`

const Close = styled.div<CloseProps>`
position: absolute;
top:10px;
right: 10px;
cursor: pointer;`

const Title = styled.h1`
text-align:center;`

const Input = styled.input<InputProps>`
border: 1px solid ${({theme}) => theme.soft};
color: ${({theme}) => theme.text};
border-radius: 3px;
padding: 10px;
  background-color: transparent;`

const Description = styled.textarea<DescProps>`
  border: 1px solid ${({theme}) => theme.soft};
  color: ${({theme}) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;`

const Button = styled.button<ButtonProps>`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};`

const Label = styled.label`
  font-size: 14px;`

type CloseProps = {
    onClick: () => void;
}

type UploadProps = {
    setOpen: (open:boolean) => void
}

interface InputProps  {
    onChange?: (e : React.ChangeEvent<HTMLInputElement> ) => void
}

interface DescProps {
    onChange? : (e: ChangeEvent<HTMLTextAreaElement> ) => void,
}

interface ButtonProps {
    onClick? : React.MouseEventHandler<HTMLButtonElement>
}



const Upload = ({setOpen}:UploadProps) => {
    const [img, setImg] = useState<File|undefined>(undefined);
    const [video, setVideo] = useState<File|undefined>(undefined);
    const [imgPerc, setImgPerc] = useState<number>(0);
    const [videoPerc, setVideoPerc] = useState<number>(0);
    const [inputs, setInputs] = useState<Object>({});
    const [tags, setTags] = useState<string[]>([]);

    const navigate = useNavigate()

    const handleTags = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value.split(','))
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setInputs(prev=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    }

    const uploadFile = (file: File, urlType: 'imgUrl'|'videoUrl') => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );

    }

    useEffect(()=>{
        video && uploadFile(video!, 'videoUrl')
        console.log(inputs);

    },[video])

    useEffect(()=>{
        img && uploadFile(img!, 'imgUrl')
        console.log(inputs);

    },[img]);

    const handleUpload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log({...inputs, tags})
        const res = await axios.post('/videos', {...inputs, tags});
        setOpen(false);
        res.status === 200 && navigate(`/video/${res.data._id}`)
    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a new video</Title>
                <Label>Video:</Label>
                {videoPerc > 0 ? ('Uploading ' + videoPerc + '%')
                    : (
                        <Input
                            type='file'
                            accept='video/*'
                            onChange={e=>setVideo(e.target.files![0])}/>)}
                <Input type='text'
                       placeholder='title'
                       onChange={handleChange} name='title'/>
                <Description
                    placeholder='Description'
                    rows={8} name='description'
                    onChange={e=>handleChange(e)}/>
                <Input type='text' placeholder='Seperate the tags with commas' onChange={handleTags}/>
                <Label>Image:</Label>
                {imgPerc > 0 ? ('Uploading: ' + imgPerc + '%')
                    : (<Input type='file' accept='image/*' onChange={e=>setImg(e.target.files![0])}/>)}
                <Button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleUpload(e)}>Upload</Button>

            </Wrapper>

        </Container>
    );
};

export default Upload;