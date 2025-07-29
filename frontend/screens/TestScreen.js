/*
This is a Test Screen, meant to act as a placeholder.
Delete this during production.
*/

import { StyleSheet, Text, View } from 'react-native';

const TestScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
    },
});

export default TestScreen;
