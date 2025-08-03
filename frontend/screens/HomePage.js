import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "../hooks/useTheme";
import GenerateButton from "../components/buttons/GenerateButton";
import UploadArea from "../components/buttons/UploadArea";
import { useState } from "react";
import Toast from "react-native-toast-message";

const HomePage = () => {
  const { theme } = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const submitForAnalysis = async (uploadedFiles, theme) => {
    if (uploadedFiles.length === 0) {
      Toast.show({
        type: "error",
        text1: "No files selected",
        text2: "Please upload files first",
      });
      return;
    }

    try {
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("files", {
          uri: file.uri,
          name: file.name,
          type: file.type === "pdf" ? "application/pdf" : "image/jpeg",
        });
      });

      const response = await fetch("http://192.168.0.101:5000/api/analyze", {
        method: "POST",
        body: formData, // Don't set Content-Type manually
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("API Error", result);
        Toast.show({
          type: "error",
          text1: "Summary Error",
          text2: result?.error || "Try again later",
        });
      } else {
        console.log("Summary:", result);
        // Optional: Handle/display result here
      }
    } catch (err) {
      console.error("Summary Request Failed", err);
      Toast.show({
        type: "error",
        text1: "Request Failed",
        text2: err.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <GenerateButton
        label="Enter Data Manually"
        theme={theme}
        action={() => console.log("Manual Entry pressed")}
      />
      <Text style={[styles.text, { color: theme.text }]}>or</Text>
      <UploadArea
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
      <GenerateButton
        label="Get Summary"
        theme={theme}
        action={() => submitForAnalysis(uploadedFiles, theme)}
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
    fontStyle: "italic",
  },
});
