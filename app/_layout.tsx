import { Stack } from "expo-router";

import LogoTitle from "@/src/features/LogoTitle";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }} />
  );
}
