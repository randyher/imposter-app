import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import Logo from '../components/Logo';

export default function HomeScreen({ onPlay }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoWrap}>
        <Text style={styles.dailyLabel}>DAILY</Text>
        <Logo size={80} />
      </View>
      <Text style={styles.tagline}>
        3 belong. 1 doesn't.{'\n'}Figure it out.
      </Text>
      <View style={styles.rulesRow}>
        <Text style={styles.rule}><Text style={styles.bold}>+1</Text> correct</Text>
        <Text style={styles.rule}><Text style={styles.bold}>−1</Text> wrong</Text>
        <Text style={styles.rule}><Text style={styles.bold}>−0.5</Text> skip</Text>
      </View>
      <TouchableOpacity style={styles.btnMain} onPress={onPlay} activeOpacity={0.85}>
        <Text style={styles.btnMainText}>PLAY</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoWrap: {
    alignItems: 'center',
  },
  dailyLabel: {
    fontFamily: Platform.select({ ios: 'Impact', android: 'sans-serif-condensed', default: 'Impact' }),
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 6,
    color: '#111',
    marginBottom: -4,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  tagline: {
    fontSize: 15,
    color: '#666',
    marginTop: 16,
    marginBottom: 12,
    lineHeight: 22,
    textAlign: 'center',
  },
  rulesRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 36,
  },
  rule: {
    fontSize: 13,
    color: '#666',
  },
  bold: {
    fontWeight: '700',
    color: '#111',
  },
  btnMain: {
    backgroundColor: '#111',
    paddingVertical: 14,
    paddingHorizontal: 52,
    borderRadius: 8,
  },
  btnMainText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
