import React, {useEffect} from "react";
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import image1 from '../Images/welcome_background.jpg'
import image from '../Images/logo.png'
import l2 from '../Images/l1.png'
import emblem from '../Images/emblem_big.png'

const WelcomeDiv = styled.div`
  text-align: center;
  background-image: url(${image1});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`
export const BackgroundColourLayer = styled.div `
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%);
`

const ImageLogo= styled.img`
width:10%;
vertical-align: top;
-webkit-filter: invert(100%);
filter: invert(100%);
margin-left:78%;
filter: drop-shadow(2px 4px 6px black);
margin-top:50px;
`

const ImageSymbol = styled.img`
  width: 8%;
  vertical-align: top;
  -webkit-filter: invert(100%);
  filter: invert(100%);
  opacity:0.7;
  
  margin-top:40px;
`

const Imagel1 = styled.img`
  width: 13%;
  vertical-align: top;
  -webkit-filter: invert(100%);
  filter: invert(100%);
  opacity:0.7;
  filter: drop-shadow(2px 4px 6px black);
  margin-bottom:10px;
  margin-top : 15px;
`

const NameSpan = styled.span`
  font-size: 100px;
  font-family: 'Conv_Coving01';
  // color:white
  background: -webkit-linear-gradient(#F89936, #FFF, #3E890E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: white;
  font-weight: bold;
  opacity: 0.8;
  line-height: 70px;
`
const NameSpan2 = styled.span`
  font-size: 3em;
  font-family: 'Conv_Coving01';
  // color:white
  background: -webkit-linear-gradient(#F89936, #FFF, #3E890E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: white;
  font-weight: bold;
  opacity: 0.8;
`

const NameSpan3 = styled.span`
  font-size: 1.5em;
  font-family: 'Conv_Coving01';
  // color:white
  background: -webkit-linear-gradient(#F89936, #FFF, #3E890E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: white;
  font-weight: bold;
  opacity: 0.8;
  line-height: 60px;
`

const LinkS = styled(Link)`
/* This renders the buttons above... Edit me! */
display: inline-block;
border-radius: 3px;
padding: 0.5rem 0;
font-family: 'Conv_Coving01';
margin: 1.5rem 2.5rem;
width: 8rem;
background: transparent;
color: white;
border: 1.5px solid white;
transition: 0.5s;
:hover {
  background-color: rgb(255,255,255,0.4);
}
font-weight:bold;
background: rgba(0,0,0,.6);
border-radius: 10px;
text-decoration:none;
`

function Welcome() {
  useEffect(() => {
    document.body.style.backgroundImage = image1;
    return () => (document.body.style.backgroundImage=image1);
  })
  return (
    <WelcomeDiv>
      <BackgroundColourLayer>
      <ImageSymbol src={emblem}></ImageSymbol>
      <ImageLogo src={image}></ImageLogo>
      <br/>
      <NameSpan> Welcome</NameSpan>
      <br/>
      <NameSpan3> To </NameSpan3>
      <br/>
      <NameSpan2> Decision Support System </NameSpan2>
      <br/>
      <Imagel1 src={l2}></Imagel1>
      <br/>
      <LinkS to="/login">Login</LinkS>
      <LinkS to="/signup">Sign up</LinkS>
      </BackgroundColourLayer>
    </WelcomeDiv>
  );
}

export default Welcome;
