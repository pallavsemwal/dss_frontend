import React from 'react'
import styled from 'styled-components'
import image from '../Images/emblem_big.png'
import backgroundImage from '../../Media/BackgroundLogin.jpg'
import { Label, Col, Input } from '@bootstrap-styled/v4'
import l2 from '../Images/l1.png'


export const LogSignPageDiv = styled.div `
  
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: 100% 100%; 
`
export const BackgroundColourLayer = styled.div `
  padding: 3% ;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%);
`

const NameSpan = styled.span `
  color: #FFF;
  font-size: 192px;
  font-family: 'Anton', sans-serif;
  vertical-align: middle;
  letter-spacing: 4px;
  margin: 8px 16px;
  background: -webkit-linear-gradient(#F89936, #FFF, #3E890E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const ImageSymbol = styled.img `
  width: 50%;
  vertical-align: middle;
  -webkit-filter: invert(100%);
  filter: invert(100%);
`
export const InputStyled = styled.input `
  width: 45%;
  background: transparent; 
  border: none; 
  border-radius:5px;
  border-bottom: 2px solid white; 
  color: white;
  padding: 4px 12px;
  text-align: center;
  font-size: 16px;
  font-family: 'Hind Siliguri', sans-serif;
  margin: 0px 0px 30px 0px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: white;
    opacity: 1;
  }
`
export const LoginSignupBox = styled.div `
  font-family: 'Poppins', sans-serif;
  background-color: rgb(255,255,255,0.2);
  padding: 5%;
  opacity: 100%;
  text-align: left;
  border-radius: 8px;
  margin: 16px;
  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`

export const ErrorSpan = styled.span `
  color: red;
  white-space: nowrap;
  font-size: 1em;
`

export const StyledButton = styled.button `
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.8rem 1rem;
  width: 11rem;
  height: 40px;
  background: transparent;
  color: white;
  font-weight:bold;
  border: 2px solid white;
  transition: 0.5s;
  cursor:pointer;
  :hover {
    background-color: rgb(255,255, 255, 0.4);
  }
  background: rgba(0,0,0,.6);
  border-radius: 10px;
`
export const Button = styled.a `
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  height: 40px;
  
  background: transparent;
  color: white;
  border: 2px solid white;
  transition: 0.5s;
  :hover {
    background-color: rgb(255,255,255,0.4);
  }
  font-weight:bold;
  background: rgba(0,0,0,.6);
  border-radius: 10px;
  text-decoration:none;
`

export const SpacedLabel = styled(Label)
`
  margin-top: 16px;
  color: white;
`

export const HideCol = styled(Col)
`
  @media (max-width: 768px) {
    display: none;
  }
`

export function LogoTitleDiv() {
    return ( <
        div > { /* <ImageSymbol src={image} style={{verticalAlign: 'middle'}}></ImageSymbol> */ } <
        NameSpan > DSS </NameSpan> </div>
    )
}