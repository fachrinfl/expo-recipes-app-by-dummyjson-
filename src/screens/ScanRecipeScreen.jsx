import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ScanRecipeScreen = () => {
    return (
        <View style={style.screen}>
            <Text>Scan Recipe Screen</Text>
        </View>
    );
}

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ScanRecipeScreen;