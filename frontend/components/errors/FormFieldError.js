import { StyleSheet, Text } from "react-native";

const FormFieldError = ({ error }) => {
  return error ? <Text style={styles.errorMessage}>{error}</Text> : null;
};

export default FormFieldError;

const styles = StyleSheet.create({
  errorMessage: {
    color: "#dc3545",
    marginBottom: 10,
    marginTop: -10,
  },
});
