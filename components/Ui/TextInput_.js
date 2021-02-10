import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextInput_ = ({style, ...rest}) => {
    return (
        <TextInput 
        style={[styles.root, style]}
        {...rest}
        />
    );
}

const styles = StyleSheet.create({
   root: {
       backgroundColor: 'rgba(255,255,255,0.7)',
       padding: 15,
       fontSize: 20,
       borderRadius: 13,
   } 
});

export default TextInput_;