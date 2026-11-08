
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

const GOLD = '#E8BD65';
const CREAM = '#FFF0CC';
const DARK = '#10151D';

export default function App() {
  const [page, setPage] = useState('title');
  const [music, setMusic] = useState(true);
  const [effects, setEffects] = useState(true);
  const [mode, setMode] = useState('ソロ');

  const Button = ({ label, onPress, gold = false }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, gold && styles.goldButton]}
    >
      <Text
        style={[
          styles.buttonText,
          gold && styles.goldButtonText
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const Heading = ({ children }) => (
    <Text style={styles.heading}>{children}</Text>
  );

  const Menu = ({ icon, label, target }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => setPage(target)}
    >
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <View style={styles.topGlow} />

      <ScrollView
        contentContainerStyle={styles.content}
      >
        {page === 'title' && (
          <View style={styles.titleScreen}>
            <Text style={styles.titleSymbol}>⚔️</Text>
            <Text style={styles.title}>戦乱丸</Text>
            <Text style={styles.subtitle}>
              SENGOKU BATTLE
            </Text>
            <Text style={styles.motto}>
              天下を、その手に。
            </Text>
            <Button
              label="いざ、出陣準備"
              gold
              onPress={() => setPage('home')}
            />
          </View>
        )}

        {page === 'home' && (
          <View style={styles.home}>
            <View style={styles.topBar}>
              <View>
                <Text style={styles.logo}>戦乱丸</Text>
                <Text style={styles.smallGold}>
                  SENGOKU BATTLE
                </Text>
              </View>

              <View style={styles.coinBox}>
                <Text style={styles.coinText}>
                  🪙 0
                </Text>
              </View>
            </View>

            <View style={styles.heroArea}>
              <View style={styles.sun} />

              <Text style={styles.castle}>🏯</Text>

              <View style={styles.heroFrame}>
                <Text style={styles.heroSymbol}>
                  ⚔️
                </Text>
                <Text style={styles.heroName}>
                  戦国武将
                </Text>
                <Text style={styles.heroDetail}>
                  天下統一への道
                </Text>
              </View>

              <Text style={styles.heroCaption}>
                己の武で、天下を掴め
              </Text>
            </View>

            <View style={styles.bottomArea}>
              <View style={styles.modeBox}>
                <Text style={styles.sectionLabel}>
                  対戦モード
                </Text>
                <View style={styles.modeRow}>
                  {['ソロ', 'デュオ', 'トリオ', '1対1'].map(
                    item => (
                      <TouchableOpacity
                        key={item}
                        onPress={() => setMode(item)}
                        style={[
                          styles.modeChip,
                          mode === item &&
                            styles.modeSelected
                        ]}
                      >
                        <Text
                          style={[
                            styles.modeText,
                            mode === item &&
                              styles.modeSelectedText
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.deployButton}
                onPress={() => setPage('battle')}
              >
                <Text style={styles.deployText}>
                  ⚔️ 出 陣
                </Text>
                <Text style={styles.deploySub}>
                  {mode}で戦場へ
                </Text>
              </TouchableOpacity>

              <View style={styles.menuRow}>
                <Menu
                  icon="👥"
                  label="フレンド"
                  target="friends"
                />
                <Menu
                  icon="🛍️"
                  label="ショップ"
                  target="shop"
                />
                <Menu
                  icon="⚙️"
                  label="設定"
                  target="settings"
                />
                <Menu
                  icon="🛡️"
                  label="管理"
                  target="admin"
                />
              </View>

              <TouchableOpacity
                onPress={() => setPage('title')}
              >
                <Text style={styles.backLink}>
                  タイトルへ戻る
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {page === 'battle' && (
          <View style={styles.panel}>
            <Heading>⚔️ 出陣</Heading>
            <Text style={styles.description}>
              選択モード：{mode}
            </Text>
            <Text style={styles.description}>
              対戦システムは開発予定
            </Text>
            <Text style={styles.description}>
              ソロ・デュオ・トリオ・1対1
            </Text>
            <Button
              label="ホームに戻る"
              onPress={() => setPage('home')}
            />
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
              label={
                '効果音：' + (effects ? 'ON' : 'OFF')
              }
              onPress={() => setEffects(!effects)}
            />
            <Text style={styles.description}>
              音声機能は今後実装
            </Text>
            <Button
              label="ホームに戻る"
              onPress={() => setPage('home')}
            />
          </View>
        )}

        {page === 'friends' && (
          <View style={styles.panel}>
            <Heading>👥 フレンド</Heading>
            <Text style={styles.description}>
              フレンド検索・申請（開発予定）
            </Text>
            <Text style={styles.description}>
              パーティー招待（開発予定）
            </Text>
            <Button
              label="ホームに戻る"
              onPress={() => setPage('home')}
            />
          </View>
        )}

        {page === 'shop' && (
          <View style={styles.panel}>
            <Heading>🛍️ ショップ</Heading>
            <Text style={styles.description}>
              コイン・キャラ・スキン（開発予定）
            </Text>
            <Text style={styles.description}>
              課金機能は未実装
            </Text>
            <Button
              label="ホームに戻る"
              onPress={() => setPage('home')}
            />
          </View>
        )}

        {page === 'admin' && (
          <View style={styles.panel}>
            <Heading>🛡️ ADMIN PANEL</Heading>
            <Text style={styles.warning}>
              開発用プレビュー・管理操作不可
            </Text>
            <Text style={styles.description}>
              👥 プレイヤー管理
            </Text>
            <Text style={styles.description}>
              🪙 コイン管理
            </Text>
            <Text style={styles.description}>
              📅 イベント管理
            </Text>
            <Text style={styles.description}>
              ⚔️ 対戦管理
            </Text>
            <Text style={styles.description}>
              📜 操作履歴
            </Text>
            <Button
              label="ホームに戻る"
              onPress={() => setPage('home')}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK
  },
  topGlow: {
    position: 'absolute',
    top: -120,
    alignSelf: 'center',
    width: 500,
    height: 300,
    borderRadius: 250,
    backgroundColor: '#392B25',
    opacity: 0.55
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14
  },
  titleScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300
  },
  titleSymbol: {
    fontSize: 58
  },
  title: {
    color: GOLD,
    fontSize: 58,
    fontWeight: '900',
    letterSpacing: 8,
    textShadowColor: '#7A411C',
    textShadowRadius: 15
  },
  subtitle: {
    color: CREAM,
    fontSize: 15,
    letterSpacing: 5,
    marginTop: 6
  },
  motto: {
    color: '#D2B994',
    fontSize: 18,
    marginVertical: 28
  },
  home: {
    width: '100%',
    maxWidth: 950,
    alignSelf: 'center'
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#78613D',
    paddingBottom: 8
  },
  logo: {
    color: GOLD,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 4
  },
  smallGold: {
    color: '#BFA678',
    fontSize: 9,
    letterSpacing: 3
  },
  coinBox: {
    backgroundColor: '#252A30',
    borderWidth: 1,
    borderColor: '#8B7448',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8
  },
  coinText: {
    color: GOLD,
    fontWeight: 'bold'
  },
  heroArea: {
    minHeight: 190,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#5B4933',
    backgroundColor: '#1B242C',
    borderRadius: 12
  },
  sun: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#A05B32',
    opacity: 0.5,
    top: -65,
    right: 45
  },
  castle: {
    position: 'absolute',
    right: 28,
    bottom: 20,
    fontSize: 95,
    opacity: 0.3
  },
  heroFrame: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9E7C44',
    backgroundColor: '#172029',
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 8
  },
  heroSymbol: {
    fontSize: 42
  },
  heroName: {
    color: CREAM,
    fontSize: 21,
    fontWeight: 'bold',
    letterSpacing: 3
  },
  heroDetail: {
    color: '#BCA982',
    fontSize: 11,
    marginTop: 5
  },
  heroCaption: {
    color: GOLD,
    marginTop: 10,
    fontSize: 13,
    letterSpacing: 3
  },
  bottomArea: {
    alignItems: 'center',
    paddingTop: 12
  },
  modeBox: {
    alignItems: 'center'
  },
  sectionLabel: {
    color: '#D8C5A1',
    fontSize: 12,
    marginBottom: 8
  },
  modeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  modeChip: {
    borderWidth: 1,
    borderColor: '#7A684C',
    backgroundColor: '#222831',
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 15,
    marginHorizontal: 4,
    marginBottom: 5
  },
  modeSelected: {
    backgroundColor: GOLD,
    borderColor: '#FFF0BB'
  },
  modeText: {
    color: '#D9C9AD',
    fontSize: 13,
    fontWeight: 'bold'
  },
  modeSelectedText: {
    color: '#241B13'
  },
  deployButton: {
    backgroundColor: '#D8A94E',
    borderColor: '#FFF0B3',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 80,
    paddingVertical: 12,
    marginTop: 9,
    alignItems: 'center',
    shadowColor: '#E9A947',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8
  },
  deployText: {
    color: '#25180E',
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 5
  },
  deploySub: {
    color: '#5C3919',
    fontSize: 11,
    marginTop: 3
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 12
  },
  menuItem: {
    alignItems: 'center',
    backgroundColor: '#242A33',
    borderWidth: 1,
    borderColor: '#6C593E',
    borderRadius: 9,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    marginBottom: 5,
    minWidth: 86
  },
  menuIcon: {
    fontSize: 22
  },
  menuText: {
    color: CREAM,
    fontSize: 11,
    marginTop: 4,
    fontWeight: 'bold'
  },
  backLink: {
    color: '#A99B85',
    fontSize: 11,
    marginTop: 10,
    marginBottom: 8
  },
  panel: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 520,
    padding: 18,
    borderWidth: 1,
    borderColor: '#75603D',
    borderRadius: 12,
    backgroundColor: '#1A222C'
  },
  heading: {
    color: GOLD,
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
    marginBottom: 15,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#963D32',
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginTop: 9,
    minWidth: 230,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C87855'
  },
  goldButton: {
    backgroundColor: GOLD,
    borderColor: '#FFF0BB'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  goldButtonText: {
    color: '#271A10'
  }
});
