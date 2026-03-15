import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

export default function Logo({ size = 80 }) {
  // Glasses just slightly wider than the T crossbar so they sit snugly on it
  const svgW = size * 0.54;
  const svgH = svgW * (46 / 72); // maintain viewBox aspect ratio
  const containerW = size * 0.52;
  const svgLeft = -(svgW - containerW) / 2; // center SVG over T

  return (
    <View style={styles.row}>
      <Text style={[styles.logoText, { fontSize: size }]}>IMPOS</Text>
      {/* Container holds the glasses SVG (absolute) + the "T" glyph */}
      <View style={{ width: containerW, height: size * 1.12 }}>
        <Text
          style={[
            styles.logoText,
            {
              fontSize: size,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              textAlign: 'center',
            },
          ]}
        >
          T
        </Text>
        <Svg
          style={{ position: 'absolute', top: size * 0.12, left: svgLeft }}
          width={svgW}
          height={svgH}
          viewBox="0 0 72 46"
        >
          {/* Left lens */}
          <Rect x="0" y="0" width="29" height="21" rx="10" fill="#fff" />
          <Rect x="3" y="3" width="23" height="15" rx="7" fill="#aad4f5" opacity="0.6" />
          {/* Right lens */}
          <Rect x="43" y="0" width="29" height="21" rx="10" fill="#fff" />
          <Rect x="46" y="3" width="23" height="15" rx="7" fill="#aad4f5" opacity="0.6" />
          {/* Bridge */}
          <Rect x="29" y="8" width="14" height="6" rx="3" fill="#fff" />
          {/* Mustache */}
          <Path
            d="M10 34 C10 26 21 23 29 29 C31 31 33 31 35 29 C43 23 58 26 60 34 C56 42 44 39 36 34 C34 32 32 32 30 34 C22 39 14 42 10 34 Z"
            fill="#fff"
          />
        </Svg>
      </View>
      <Text style={[styles.logoText, { fontSize: size }]}>ER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: Platform.select({
      ios: 'Impact',
      android: 'sans-serif-condensed',
      default: 'Impact',
    }),
    fontWeight: '900',
    letterSpacing: -2,
    color: '#111',
  },
});
