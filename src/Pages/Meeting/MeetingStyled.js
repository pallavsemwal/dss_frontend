import styled from 'styled-components'

export const MeetingContainer = styled.div`
position: relative;
`

export const MeetingDiv = styled.tr`
display: grid;	
border-radius: 4px;
min-width: 300px;
font-size: 1.2em;
padding: 8px;
margin: ${props => props.highlight ? '12px 8px 8px 32px' : '8px'};
border-left: ${props => props.highlight ? '6px #F19934 solid' : ''};
border-right: ${props => props.highlight ? '6px #F19934 solid' : ''};
font-family: 'Sen', sans-serif;
box-shadow: 0 2px 2px 0px rgba(0, 0, 0, 0.1);
&:hover{
  border: ${props => props.highlight ? '' : '3px #F19934 solid'};
}
`

export const TimeSpan = styled.div`
font-size: 1.5em;
margin-right: 8px;
color: #F19934;
`

export const Vline = styled.span`
border-left: 1px solid gray;
height: 90vh;
position: absolute;
left: 50%;
margin-left: -3px;
top: 8px;
@media (max-width: 768px) {
  display: none;
}
`

export const DateDiv = styled.div`
font-size: 1.4em;
padding: 16px;
`

export const BriefDiv = styled.div`
width: 90%;
min-width: 300px;
font-size: 1.2em;
line-height: 2em;
padding: 16px 5%;
margin-bottom: 8px;
margin-top: 2em;
font-family: 'Hind Siliguri', sans-serif;
box-shadow: 0 4px 4px 4px rgba(0, 0, 0, 0.1);
`

export const TextEditorDiv = styled.div`
padding: 12px;
background-color: white;
margin-top: 8px;
min-height: 100px;
font-size: 0.8em;
`

export const StyledAnchor = styled.div`
  text-decoration: none;
  cursor: pointer;
  font-size: 0.9em;
  &:hover {
    color: #f0ad52;
  }
`

export const LTD = styled.td`
  text-align: left;
  padding: 0px 4px;
`

export const RTD = styled.td`
  text-align: left;
  padding: 0px 8px;
  color: #F19934;
`

export const Hline = styled.div`
  height: 1px;
  width: 100%;
  background-color: gray;
  margin: 0px;

`