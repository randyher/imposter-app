import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';

import { generateGame } from './utils/questionEngine';
import { parseCategoryFromURL } from './utils/deepLink';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import LobbyScreen from './screens/LobbyScreen';
import GameScreen from './screens/GameScreen';
import ResultsScreen from './screens/ResultsScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  // Handle deep link → jump straight to lobby
  function handleDeepLink(url) {
    const category = parseCategoryFromURL(url);
    if (category) {
      setSelectedCategory(category);
      setScreen('lobby');
    }
  }

  useEffect(() => {
    // Cold start: app opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    // Warm start: app already open when link is tapped
    const sub = Linking.addEventListener('url', ({ url }) => handleDeepLink(url));
    return () => sub.remove();
  }, []);

  function handleStartGame() {
    const qs = generateGame(selectedCategory);
    setQuestions(qs);
    setResult(null);
    setScreen('game');
  }

  function handleEndGame(r) {
    setResult(r);
    setScreen('results');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      {screen === 'home' && (
        <HomeScreen onPlay={() => setScreen('cats')} />
      )}
      {screen === 'cats' && (
        <CategoryScreen
          onSelect={(id) => {
            setSelectedCategory(id);
            setScreen('lobby');
          }}
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
          onPlayAgain={handleStartGame}
          onCategories={() => setScreen('cats')}
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
});
