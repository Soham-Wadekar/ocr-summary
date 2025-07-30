import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import FileCard from "../cards/FileCard";
import Toast from "react-native-toast-message";

const UploadArea = ({ uploadedFiles, setUploadedFiles, disabled = false }) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const { theme, toggleTheme } = useTheme();

  const buttonPressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const buttonPressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        multiple: true,
      });

      if (result.canceled) return;

      const selectedFiles = result.assets.map((file) => ({
        uri: file.uri,
        name: file.name,
        type: file.mimeType.includes("pdf") ? "pdf" : "image",
      }));

      setUploadedFiles((prev) => [...prev, ...selectedFiles]);
    } catch (error) {
      console.error("File upload failed", error);
    }
  };

  const removeFile = (fileToRemove) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.uri !== fileToRemove.uri)
    );
  };

  const handleError = () => {
    Toast.show({
      type: "error",
      text1: "Insufficient Balance",
      text2: "Please subscribe to access the features.",
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.tertiary }]}>
      {uploadedFiles.length === 0 ? (
        <Pressable
          onPressIn={!disabled ? buttonPressIn : null}
          onPressOut={!disabled ? buttonPressOut : null}
          onPress={!disabled ? handleUpload : handleError}
          style={[styles.uploadContainer, { backgroundColor: !disabled ? theme.tertiary : theme.disabled, }]}
        >
          <View style={styles.placeholderContainer}>
            <Ionicons name="cloud-upload" size={30} color={theme.text} />
            <Text style={[styles.placeholderText, { color: theme.text }]}>
              Tap to upload PDFs or Images
            </Text>
          </View>
        </Pressable>
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: 10,
              height: Math.min(uploadedFiles.length * 60, 600),
            }}
          >
            <FlatList
              data={uploadedFiles}
              keyExtractor={(item) => item.uri}
              renderItem={({ item }) => (
                <FileCard
                  item={item}
                  theme={theme}
                  closeFunction={() => removeFile(item)}
                />
              )}
            />
          </View>
          <Pressable
            onPressIn={buttonPressIn}
            onPressOut={buttonPressOut}
            onPress={handleUpload}
            style={[
              styles.uploadContainer,
              { backgroundColor: theme.tertiary },
            ]}
          >
            <Ionicons name="add" size={30} color={theme.text} />
            <Text style={[styles.placeholderText, { color: theme.text }]}>
              Tap to upload more
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default UploadArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadContainer: {
    borderRadius: 10,
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  placeholderContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
