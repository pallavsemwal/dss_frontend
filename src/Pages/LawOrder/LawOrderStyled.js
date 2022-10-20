import styled from "styled-components";
import { Col, InputGroup, Input } from "@bootstrap-styled/v4";

export const InputZIndexed = styled(Input)`
  z-index: 0 !important;
`;

export const TitleTypeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const InnerContainer = styled.div`
  width: 350px;
`;

export const SpacedCol = styled(Col)`
  margin-top: 16px;
`;

export const ShadowBox = styled.div`
  box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.2);
  padding: 16px;
  margin: 16px 0px;
`;

export const SpacedInputGroup = styled(InputGroup)`
  margin: 2px 0px;
`;

export const LawOrderContainer = styled.div`
  display: block;
  width: 100%;
  minHeight: 100vh;
  position: "relative;
  `;
