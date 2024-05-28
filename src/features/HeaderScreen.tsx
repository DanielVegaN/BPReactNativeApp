import { Stack } from "expo-router";
import LogoTitle from "./LogoTitle";

const HeaderScreen = () => {
  return (
    <Stack.Screen
      options={{
        headerTitle: () => <LogoTitle />,
      }}
    />
  );
};

export default HeaderScreen;
