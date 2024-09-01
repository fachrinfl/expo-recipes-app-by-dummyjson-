import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SearchRecipeScreen = () => {
    return (
        <View style={style.screen}>
            <Text>Searc hRecipe Screen</Text>
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

export default SearchRecipeScreen;