import { ElementDetailProps } from "../interfaces/elementDetail";
import { View, Image, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 10,
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
    marginBottom: 150,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginBottom: 10,
  },
  logoContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logo: {
    aspectRatio: 1,
    width: "100%",
    height: 160,
    resizeMode: "contain",
  },
});

const LogoDetail: React.FC<ElementDetailProps> = ({ name, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.logoContainer}>
        <Image
          testID="logo-image"
          style={styles.logo}
          source={{
            uri: value,
          }}
        />
      </View>
    </View>
  );
};

export default LogoDetail;
