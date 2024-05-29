import { Stack } from "expo-router";

import ProductProvider from "@/src/services/ProductContextProvider";

export default function RootLayout() {
  return (
    <ProductProvider>
      <Stack screenOptions={{ headerTitleAlign: "center" }} />
    </ProductProvider>
  );
}
