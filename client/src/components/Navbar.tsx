import React, {useState} from 'react';
import styled from "styled-components";
import {AccountCircleOutlined, SearchOutlined, VideoCallOutlined} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import {RootState} from "../redux/Store";
import Upload from "./Upload";

const Container = styled.div`
    position:sticky;
    top:0;
    background-color: ${({theme}) => theme.bgLighter};
    height: 56px`;

const Wrapper = styled.div`
    display:flex;
    align-items:center;
    height: 100%;
    padding: 0 20px;
    justify-content: flex-end;
    position: relative`;

const Input = styled.input`
border:none;
background-color:transparent;
outline: none;
width: 100%;
color: ${({theme}) => theme.text} `;


const Search = styled.div`
    position:absolute;
    width: 40%;
    left: 0;
    right: 0;
    margin:auto;
    display:flex;
    align-items: center;
    justify-content:space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  color:${({theme}) => theme.text}`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;`

const User = styled.div`
display: flex;
align-items: center;
gap:10px;
font-weight:500;
color:${({theme}) => theme.text}`

const Avatar = styled.img`
height: 32px;
width: 32px;
border-radius: 50%;
  background-color: #999;`

const Navbar = () => {
    const navigate = useNavigate();
    const {currentUser} = useSelector((state : RootState) => state.user);
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder='search' onChange={e=>setQuery(e.target.value)}/>
                        <SearchOutlined onClick={()=>navigate(`/search?q=${query}`)}/>
                    </Search>
                    {currentUser ?
                        (<User>
                            <VideoCallOutlined onClick={()=>setOpen(true)}/>
                            <Avatar src={currentUser.img}/>
                            {currentUser.name}
                        </User>)
                        : (<Link to='signin' style={{textDecoration: 'none'}}>
                            <Button>
                                <AccountCircleOutlined/>
                                SIGN IN
                            </Button>
                        </Link>)}
                </Wrapper>
            </Container>
            {open && <Upload setOpen={setOpen}/>}
        </>
    );
};

export default Navbar;