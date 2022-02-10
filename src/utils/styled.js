import styled from "styled-components/native";
import { StatusBar, SafeAreaView } from "react-native";

export const SafeArea = styled(SafeAreaView)`
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`}
`;

export const PageContainer = styled.View`
  align-items: center;
  justify-content: center;
  align-items: center;
`;

export const Heading = styled.Text`
  font-size: 28px;
`;

export const TimerTitle = styled.Text`
  color: #7e7e7e;
  font-size: 18px;
`;

export const TimerValue = styled.Text`
  color: #333;
  font-size: 28px;
`;
export const TimerValueEdit = styled.TextInput`
  color: #333;
  font-size: 28px;
  border: none;
`;

export const PourTitle = styled.Text`
  color: #7e7e7e;
  font-size: 24px;
`;

export const PourValue = styled.Text`
  color: #333;
  font-size: 40px;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-vertical: 10px;
`;

export const Logo = styled.Text`
  font-weight: 100;
  font-size: 30px;
  letter-spacing: 5px;
  margin-bottom: 20px;
`;
