import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FileCard = ({ item, theme, closeFunction }) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.innerContainer}>
        {item.type === "pdf" ? (
          <View
            style={[
              styles.thumbnail,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Ionicons
              name="document-text-outline"
              size={40}
              color={theme.text}
            />
          </View>
        ) : (
          <Image source={{ uri: item.uri }} style={styles.thumbnail} />
        )}
        <Text style={[styles.fileName, { color: theme.text }]}>
          {item.name}
        </Text>
      </View>
      <TouchableOpacity onPress={closeFunction}>
        <Ionicons name="close" size={20} color={theme.muted} />
      </TouchableOpacity>
    </View>
  );
};

export default FileCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    paddingRight: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 5,
  },
  innerContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  fileName: {
    maxWidth: 200,
    fontSize: 14,
  },
});
