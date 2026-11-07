
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, StatusBar, ScrollView
} from 'react-native';

export default function App() {
  const [page, setPage] = useState('title');
  const [music, setMusic] = useState(true);
  const [effects, setEffects] = useState(true);

  const Button = ({ label, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  const Heading = ({ children }) => (
    <Text style={styles.heading}>{children}</Text>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ScrollView contentContainerStyle={styles.content}>
        {page === 'title' && (
          <View style={styles.panel}>
            <Text style={styles.symbol}>⚔️</Text>
            <Text style={styles.title}>戦乱丸</Text>
            <Text style={styles.subtitle}>SENGOKU BATTLE</Text>
            <Button label="出陣準備" onPress={() => setPage('home')} />
          </View>
        )}

        {page === 'home' && (
          <View style={styles.panel}>
            <Heading>🏯 戦乱丸 ホーム</Heading>
            <Text style={styles.description}>🪙 所持コイン：0</Text>
            <Button label="⚔️ 出陣" onPress={() => setPage('battle')} />
            <Button label="⚙️ 設定" onPress={() => setPage('settings')} />
            <Button label="👥 フレンド" onPress={() => setPage('friends')} />
            <Button label="🛍️ ショップ" onPress={() => setPage('shop')} />
            <Button label="🛡️ 管理画面プレビュー" onPress={() => setPage('admin')} />
            <Button label="タイトルに戻る" onPress={() => setPage('title')} />
          </View>
        )}

        {page === 'battle' && (
          <View style={styles.panel}>
            <Heading>⚔️ 出陣</Heading>
            <Text style={styles.description}>対戦モード（開発予定）</Text>
            <Text style={styles.description}>ソロ・デュオ・トリオ・1対1</Text>
            <Button label="ホームに戻る" onPress={() => setPage('home')} />
          </View>
        )}

        {page === 'settings' && (
          <View style={styles.panel}>
            <Heading>⚙️ 設定</Heading>
            <Button
              label={'BGM：' + (music ? 'ON' : 'OFF')}
              onPress={() => setMusic(!music)}
            />
            <Button
              label={'効果音：' + (effects ? 'ON' : 'OFF')}
              onPress={() => setEffects(!effects)}
            />
            <Text style={styles.description}>音声機能は今後実装</Text>
            <Button label="ホームに戻る" onPress={() => setPage('home')} />
          </View>
        )}

        {page === 'friends' && (
          <View style={styles.panel}>
            <Heading>👥 フレンド</Heading>
            <Text style={styles.description}>フレンド検索・申請（開発予定）</Text>
            <Text style={styles.description}>パーティー招待（開発予定）</Text>
            <Button label="ホームに戻る" onPress={() => setPage('home')} />
          </View>
        )}

        {page === 'shop' && (
          <View style={styles.panel}>
            <Heading>🛍️ ショップ</Heading>
            <Text style={styles.description}>コイン・キャラ・スキン（開発予定）</Text>
            <Text style={styles.description}>課金機能は未実装</Text>
            <Button label="ホームに戻る" onPress={() => setPage('home')} />
          </View>
        )}

        {page === 'admin' && (
          <View style={styles.panel}>
            <Heading>🛡️ ADMIN PANEL</Heading>
            <Text style={styles.warning}>開発用プレビュー・管理操作不可</Text>
            <Text style={styles.description}>👥 プレイヤー管理</Text>
            <Text style={styles.description}>🪙 コイン管理</Text>
            <Text style={styles.description}>📅 イベント管理</Text>
            <Text style={styles.description}>⚔️ 対戦管理</Text>
            <Text style={styles.description}>📜 操作履歴</Text>
            <Button label="ホームに戻る" onPress={() => setPage('home')} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101923'
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  panel: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 520
  },
  symbol: {
    fontSize: 50
  },
  title: {
    color: '#F6D58A',
    fontSize: 52,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 25
  },
  heading: {
    color: '#F6D58A',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center'
  },
  warning: {
    color: '#FFCC88',
    fontSize: 14,
    marginBottom: 15
  },
  button: {
    backgroundColor: '#B84235',
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginTop: 9,
    minWidth: 230,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
