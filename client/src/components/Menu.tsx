import React from 'react';
import styled from "styled-components";
import AlexTube from '../img/logo.png';
import HomeIcon from '@mui/icons-material/Home';
import {
    AccountCircleOutlined,
    ArticleOutlined,
    ExploreOutlined, FlagOutlined, HelpOutlineOutlined,
    HistoryOutlined,
    LibraryMusicOutlined,
    LiveTvOutlined,
    MovieOutlined, SettingsBrightnessOutlined,
    SettingsOutlined,
    SportsBasketballOutlined,
    SportsEsportsOutlined,
    SubscriptionsOutlined,
    VideoLibraryOutlined
} from "@mui/icons-material";
import {Link} from "react-router-dom";

const Container = styled.div`
  position: sticky;
  overflow: scroll;
  flex:1;
  background-color:${({theme}) => theme.bg};
  width: 100vh;
  color: ${({theme}) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0`


const Wrapper = styled.div`
  padding: 18px 26px`

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;`

const Img = styled.img`
  height: 25px;`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 5px 0;
  &:hover {
    background-color: ${({theme}) => theme.soft}
  }`

const Hr = styled.hr`
  margin: 10px 0px;
  border: 0.5px solid ${({theme}) => theme.soft}`

const Login = styled.div`
`

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;`

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px`

type MenuProps = {
    darkMode: Boolean,
    setDarkMode: (darkMode : Boolean) => void;
}




const Menu = ({darkMode, setDarkMode}:MenuProps) => {
    return (
        <Container>
            <Wrapper>
                <Link to='/' style={{textDecoration: "none", color:"inherit"}}>
                    <Logo>
                        <Img src={AlexTube} alt=''/>
                        AlexTube
                </Logo>
                </Link>
                <Item>
                    <HomeIcon/>
                    Home
                </Item>
                <Item>
                    <ExploreOutlined/>
                    Explore
                </Item>
                <Item>
                    <SubscriptionsOutlined/>
                    Subscriptions
                </Item>
                <Hr/>
                <Item>
                    <VideoLibraryOutlined/>
                    Library
                </Item>
                <Item>
                    <HistoryOutlined/>
                    History
                </Item>
                <Hr/>
                <Login>
                    Sign in to like videos, comment, and subscribe
                    <Link to='signin' style={{textDecoration:'none'}}>
                        <Button><AccountCircleOutlined/>SIGN IN</Button>
                    </Link>
                </Login>
                <Hr/>
                <Title>BEST OF ALEXTUBE</Title>
                <Item>
                    <LibraryMusicOutlined/>
                    Music
                </Item>
                <Item>
                    <SportsBasketballOutlined/>
                    Sports
                </Item>
                <Item>
                    <SportsEsportsOutlined/>
                    Gaming
                </Item>
                <Item>
                    <MovieOutlined/>
                    Movies
                </Item>
                <Item>
                    <ArticleOutlined/>
                    News
                </Item>
                <Item>
                    <LiveTvOutlined/>
                    Live
                </Item>
                <Hr/>
                <Item>
                    <SettingsOutlined/>
                    Settings
                </Item>
                <Item>
                    <FlagOutlined/>
                    Report
                </Item>
                <Item>
                    <HelpOutlineOutlined/>
                    Help
                </Item>
                <Item onClick={()=>setDarkMode(!darkMode)}>
                    <SettingsBrightnessOutlined/>
                    {darkMode ? 'Light' : 'Dark'} Mode
                </Item>

            </Wrapper>
        </Container>
    );
};

export default Menu;