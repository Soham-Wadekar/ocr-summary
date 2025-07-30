// Import React hooks
import { useState, useEffect } from "react";

// Importing React Native components
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Import utility components
import FormFieldError from "../errors/FormFieldError";

// Importing Icons
import { Ionicons } from "@expo/vector-icons";

// Text Input Field
const TextInputField = ({
  text,
  setText,
  error,
  label = "",
  type,
  placeholder = "",
  required = false,
  isEditable = true,
  onFocus = () => {},
  onBlur = () => {},
  theme,
}) => {
  // Password component
  const [showPassword, setShowPassword] = useState(false);

  // TextInput Fields
  let inputTextStyle = styles.input;
  let inputContainerStyle = {};
  let keyboardType = "default";
  let autoCapitalize = "words";
  let multiline = false;
  let secureTextEntry = false;

  // Validates type
  switch (type) {
    case "email-address":
      keyboardType = "email-address";
      autoCapitalize = "none";
      placeholder = "johndoe@somemail.com";
      break;
    case "number":
      keyboardType = "phone-pad";
      autoCapitalize = "none";
      placeholder = "XXXXXXXXXX";
      break;
    case "password":
      inputTextStyle = [
        styles.inputWithIcon,
        { backgroundColor: theme.primary },
      ];
      inputContainerStyle = styles.iconContainer;
      autoCapitalize = "none";
      placeholder = "";
      secureTextEntry = !showPassword;
      break;
    case "multiline":
      inputTextStyle = styles.inputMultiline;
      autoCapitalize = "sentences";
      multiline = true;
      break;
    default:
      break;
  }

  // Handling edit logic
  if (!isEditable) {
    inputTextStyle = styles.disabled;
    inputContainerStyle = {};
  }

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.text }]}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View
        style={[
          inputContainerStyle,
          type && type === "password"
            ? { backgroundColor: theme.tertiary }
            : null,
        ]}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          style={[
            inputTextStyle,
            { color: theme.text, backgroundColor: theme.tertiary },
          ]}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          placeholder={placeholder}
          placeholderTextColor={theme.muted}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          editable={isEditable}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={theme.primary}
            />
          </TouchableOpacity>
        )}
      </View>
      <FormFieldError error={error} />
    </View>
  );
};

export default TextInputField;

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  input: {
    minHeight: 45,
    fontSize: 16,
    borderColor: "#0077c6",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: "top",
    fontSize: 16,
    borderColor: "#0077c6",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  required: {
    color: "#dc3545",
  },
  iconContainer: {
    minHeight: 45,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0077c6",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingRight: 10,
    marginBottom: 10,
  },
  inputWithIcon: {
    width: "80%",
    fontSize: 16,
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: "#f8f9fa",
    fontSize: 16,
    paddingHorizontal: 5,
    paddingRight: 10,
    marginBottom: 10,
  },
});
