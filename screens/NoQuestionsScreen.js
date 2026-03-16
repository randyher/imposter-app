import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function NoQuestionsScreen({ onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🕵️</Text>
      <Text style={styles.title}>Today's challenge{'\n'}is on its way.</Text>
      <Text style={styles.sub}>Check back soon!</Text>
      <TouchableOpacity style={styles.btn} onPress={onBack} activeOpacity={0.8}>
        <Text style={styles.btnText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  icon: {
    fontSize: 48,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 10,
  },
  sub: {
    fontSize: 15,
    color: '#888',
    marginBottom: 40,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});
