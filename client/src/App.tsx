import React, {useState} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import {darkTheme, lightTheme} from "./utils/Theme";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";

const Container = styled.div`
  display: flex;`

const Main = styled.div`
  flex: 7;
  background-color: ${({theme}) => theme.bgLighter}`

const Wrapper = styled.div`
  padding: 22px 25px`


function App() {
  const [darkMode, setDarkMode] = useState<Boolean>(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container>
            <BrowserRouter>
                <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
                <Main>
                    <Navbar/>
                    <Wrapper>
                        <Routes>
                            <Route path='/'>
                                <Route index element={<Home/>}/>
                                <Route path='signin' element={<Signin/>}/>
                                <Route path='video'>
                                    <Route path=':id' element={<Video/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    </Wrapper>
                </Main>
            </BrowserRouter>
        </Container>
    </ThemeProvider>
  );
}

export default App;
