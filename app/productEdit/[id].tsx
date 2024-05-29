import React from 'react';
import { View } from 'react-native';
import HeaderScreen from '@/src/features/HeaderScreen';
import ProductEditLayout from '@/src/components/ProductEditLayout';

const ProductEdit = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        marginTop: 0,
        padding: 0,
      }}
      testID="product-edit-view"
    >
      <HeaderScreen testID="HeaderScreen"/>
      <ProductEditLayout testID="ProductEditLayout"/>
    </View>
  );
};

export default ProductEdit;