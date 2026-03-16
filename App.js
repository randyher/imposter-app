import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';

import { DAILY_QUESTION_COUNT } from './config/features';
import { fetchDailyChallenge } from './lib/fetchDailyChallenge';
import { getDailyResult, saveDailyResult, updateStreak } from './lib/dailyStorage';
import { parseCategoryFromURL } from './utils/deepLink';

import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import LobbyScreen from './screens/LobbyScreen';
import GameScreen from './screens/GameScreen';
import ResultsScreen from './screens/ResultsScreen';
import NoQuestionsScreen from './screens/NoQuestionsScreen';
import AlreadyPlayedScreen from './screens/AlreadyPlayedScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [dailyResult, setDailyResult] = useState(null); // already-played result

  function handleDeepLink(url) {
    const category = parseCategoryFromURL(url);
    if (category) {
      setSelectedCategory(category);
      setScreen('lobby');
    }
  }

  useEffect(() => {
    Linking.getInitialURL().then((url) => { if (url) handleDeepLink(url); });
    const sub = Linking.addEventListener('url', ({ url }) => handleDeepLink(url));
    return () => sub.remove();
  }, []);

  async function handleStartGame() {
    setScreen('loading');

    // Check if already played today
    const existing = await getDailyResult(selectedCategory);
    if (existing) {
      setDailyResult(existing);
      setScreen('alreadyplayed');
      return;
    }

    // Fetch daily questions from Supabase
    const qs = await fetchDailyChallenge(selectedCategory);
    if (!qs || qs.length === 0) {
      setScreen('noquestions');
      return;
    }

    setQuestions(qs.slice(0, DAILY_QUESTION_COUNT));
    setResult(null);
    setScreen('game');
  }

  async function handleEndGame(r) {
    setResult(r);
    await saveDailyResult(selectedCategory, r);
    await updateStreak(selectedCategory);
    setScreen('results');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {screen === 'loading' && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#111" />
        </View>
      )}

      {screen === 'home' && (
        <HomeScreen onPlay={() => setScreen('cats')} />
      )}

      {screen === 'cats' && (
        <CategoryScreen
          onSelect={(id) => { setSelectedCategory(id); setScreen('lobby'); }}
          onBack={() => setScreen('home')}
        />
      )}

      {screen === 'lobby' && (
        <LobbyScreen
          category={selectedCategory}
          onStart={handleStartGame}
          onBack={() => setScreen('cats')}
          showPrompt={showPrompt}
          onTogglePrompt={setShowPrompt}
        />
      )}

      {screen === 'game' && (
        <GameScreen qs={questions} onEnd={handleEndGame} showPrompt={showPrompt} />
      )}

      {screen === 'results' && result && (
        <ResultsScreen
          score={result.score}
          hist={result.hist}
          category={selectedCategory}
          showPrompt={showPrompt}
          onPlayAgain={() => setScreen('lobby')}
          onCategories={() => setScreen('cats')}
        />
      )}

      {screen === 'noquestions' && (
        <NoQuestionsScreen onBack={() => setScreen('cats')} />
      )}

      {screen === 'alreadyplayed' && (
        <AlreadyPlayedScreen
          dailyResult={dailyResult}
          onBack={() => setScreen('cats')}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
