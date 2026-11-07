
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Text style={styles.symbol}>⚔️</Text>

      <Text style={styles.title}>戦乱丸</Text>

      <Text style={styles.subtitle}>
        SENGOKU BATTLE
      </Text>

      {started ? (
        <View style={styles.panel}>
          <Text style={styles.heading}>出陣準備完了！</Text>
          <Text style={styles.description}>
            武将：見習い侍
          </Text>
          <Text style={styles.description}>
            所持コイン：0 🪙
          </Text>
          <Text style={styles.description}>
            戦国の街と剣バトルは開発中！
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setStarted(false)}
          >
            <Text style={styles.buttonText}>
              タイトルに戻る
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setStarted(true)}
        >
          <Text style={styles.buttonText}>
            出陣する
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.version}>Ver.0.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172332',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  symbol: {
    fontSize: 58,
    marginBottom: 12,
  },
  title: {
    fontSize: 54,
    fontWeight: '900',
    color: '#F6D58A',
  },
  subtitle: {
    color: '#E5E7EB',
    fontSize: 16,
    letterSpacing: 3,
    marginBottom: 45,
  },
  panel: {
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    color: '#F6D58A',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#B84235',
    paddingVertical: 17,
    paddingHorizontal: 35,
    borderRadius: 14,
    marginTop: 18,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  version: {
    position: 'absolute',
    bottom: 35,
    color: '#AAB4C3',
    fontSize: 13,
  },
});
