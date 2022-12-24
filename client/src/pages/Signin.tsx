import axios from 'axios';
import React, {useState} from 'react';
import styled from "styled-components";

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}


const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: calc(100vh - 56px);
  color: ${({theme}) => theme.text};
flex-direction: column`;

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
  border: 1px solid ${({theme}) => theme.soft};
  background-color: ${({theme}) => theme.bgLighter};
  gap: 10px;

  padding: 20px 50px;`;

const Title = styled.h1`
font-size: 24px;`

const SubTitle = styled.h2`
  font-size: 20px;
font-weight: 300`

const Input = styled.input`
border:1px solid ${({theme}) => theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 100%`

const Button = styled.button<ButtonProps>`
border-radius: 3px;
border: none;
padding: 10px 20px;
cursor: pointer;
  font-weight: 500;
  background-color: ${({theme}) => theme.soft}
color:${({theme}) => theme.textSoft};`

const More = styled.div`
display: flex;
font-size: 12px;
  margin-top: 10px;
  color: ${({theme}) => theme.textSoft};`

const Links = styled.div`
margin-left: 50px;`

const Link = styled.span`
margin-left: 30px;`


const Signin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/signin', {
                name,
                password,
            })

        } catch (err) {

        }
    }

    const handleSignUp = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <SubTitle>To Continue To AlexTube</SubTitle>
                <Input placeholder='username' onChange={e=>setName(e.target.value)}/>
                <Input type='password' placeholder='password'
                       onChange={e=>setPassword(e.target.value)}/>
                <Button onClick={handleLogin}>Sign In</Button>
                <Title>or</Title>
                <Input placeholder='username' onChange={e=>setName(e.target.value)}/>
                <Input type='email' placeholder='email' onChange={e=>setEmail(e.target.value)}/>
                <Input type='password' placeholder='password'
                       onChange={e=>setPassword(e.target.value)}/>
                <Button onClick={handleSignUp}>Sign Up</Button>
            </Wrapper>
            <More>English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    );
};

export default Signin;