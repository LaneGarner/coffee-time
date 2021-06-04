import React from "react";
import { View, Text } from "react-native";

import { PageContainer, Heading, SafeArea } from "../../utils/styled";

import { Header } from "../../utils/Header";

export const SettingsScreen = () => {
    return (
        <SafeArea>
            <Header />
            <PageContainer>
                <Heading>settings</Heading>
            </PageContainer>
        </SafeArea>
    );
};
