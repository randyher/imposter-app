import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

export default function Logo({ size = 80 }) {
  // Glasses just slightly wider than the T crossbar so they sit snugly on it
  const svgW = size * 0.46;
  const svgH = svgW * (46 / 72); // maintain viewBox aspect ratio
  const containerW = size * 0.52;
  const svgLeft = -(svgW - containerW) / 2 + size * 0.008; // center SVG over T with slight right nudge

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
          viewBox="0 0 74 46"
        >
          {/* Left lens */}
          <Rect x="2" y="0" width="29" height="21" rx="10" fill="#fff" />
          <Rect x="5" y="3" width="23" height="15" rx="7" fill="#aad4f5" opacity="0.6" />
          {/* Right lens */}
          <Rect x="45" y="0" width="29" height="21" rx="10" fill="#fff" />
          <Rect x="48" y="3" width="23" height="15" rx="7" fill="#aad4f5" opacity="0.6" />
          {/* Bridge */}
          <Rect x="31" y="8" width="14" height="6" rx="3" fill="#fff" />
          {/* Mustache */}
          <Path
            d="M17 38 C17 28 25 22 35 26 C39 28 41 28 43 26 C51 22 63 28 65 38 C61 44 49 44 41 40 C37 36 35 36 31 40 C23 44 17 44 17 38 Z"
            fill="#111"
            stroke="#fff"
            strokeWidth="2"
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
