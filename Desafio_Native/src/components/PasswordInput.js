import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";

const PasswordInput = ({
  value,
  setValue,
  showSenha,
  setShowSenha,
}) => {
  return (
    <TextInput
      style={styles.textInput}
      label="Senha"
      value={value}
      onChangeText={(text) => setValue(text)}
      left={<TextInput.Icon name="lock" size={25} color="black" />}
      secureTextEntry={showSenha}
      right={
        showSenha ? (
          <TextInput.Icon
            name="eye"
            size={25}
            color="black"
            onPress={() => setShowSenha(!showSenha)}
          />
        ) : (
          <TextInput.Icon
            name="eye-off"
            size={25}
            color="black"
            onPress={() => setShowSenha(!showSenha)}
          />
        )
      }
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10,
  },
});

export default PasswordInput;