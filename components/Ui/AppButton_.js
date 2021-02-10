import React from 'react';
import { StyleSheet , Text, TouchableOpacity } from 'react-native';

const AppButton = ({title, style, textStyle, ...rest}) => {
    return (
        <TouchableOpacity style={[styles.root, style]} {...rest} activeOpacity={0.9}>
            <Text style={[styles.txt, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 10,
        width: 100,
        borderRadius: 13,
    },
    txt: {
        textAlign: 'center'
    }
});

export default AppButton;