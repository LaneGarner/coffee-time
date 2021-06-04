import styled from "styled-components/native";

export const PourContainer = styled.View`
  margin-top: 10%;
  margin-bottom: 20%;
  align-items: center;
`;

export const TimerContainer = styled.View`
  margin: 15px 20px;
  align-items: center;
`;

export const TimerContainerAlt = styled.View`
  flex-direction: row;
`;

export const Btn = styled.TouchableOpacity`
  background-color: dodgerblue;
  border-radius: 30px;
  margin-vertical: 30px;
`;

export const BtnText = styled.Text`
  font-size: 30px;
  text-align: center;
  color: white;
  padding: 10px 60px;
`;

export const CountdownNumbers = styled.Text`
  font-size: 90px;
  font-weight: 100;
  color: #333;
  padding: 20px;
  font-variant: tabular-nums;
  /* font-family: ""; */
  /* width: 80%; */
`;
