import React, { useMemo, useState } from "react";
import { View, Image as RNImage, ActivityIndicator } from "react-native";
import { useTheme } from "../themes";

const CustomImage = ({ style, source, resizeMode, resizeMethod }) => {

    const {colors} = useTheme()
    
  const [loading, setLoading] = useState(true);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  const memorizedImage = useMemo(() => (
      <RNImage
        style={[style, {backgroundColor:colors.background, overflow: "hidden"}]}
        source={source}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onLoad={handleLoad}
        resizeMode={resizeMode}
        resizeMethod={resizeMethod}
      />
  ), [source])

  return (
    <View style={{alignItems:'center', justifyContent:'center'}} >
      {memorizedImage}
      {loading && (
        <ActivityIndicator color={colors.border} style={{ ...style, position: 'absolute'}}/>
      )}
    </View>
  );
};

export default CustomImage;