import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SavedRecipesScreen = () => {
    return (
        <View style={style.screen}>
            <Text>Saved Recipes Screen</Text>
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

export default SavedRecipesScreen;