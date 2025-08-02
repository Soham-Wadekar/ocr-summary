import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "../hooks/useTheme";
import GenerateButton from "../components/buttons/GenerateButton";
import UploadArea from "../components/buttons/UploadArea";
import { useState } from "react";

const HomePage = () => {
  const { theme } = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  return (
    <View style={styles.container}>
      <GenerateButton
        label="Enter Data Manually"
        theme={theme}
        action={() => console.log("Manual Entry pressed")}
      />
      <Text style={[styles.text, {color: theme.text}]}>or</Text>
      <UploadArea
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
      <GenerateButton
        label="Get Summary"
        theme={theme}
        action={() => console.log("Get Summary pressed")}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: StatusBar.currentHeight + 4,
    alignItems: "center",
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    fontStyle: "italic"
  },
});
