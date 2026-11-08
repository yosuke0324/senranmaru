
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

  // Ver.0.4 ソロ対戦
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [turn, setTurn] = useState(1);
  const [battleOver, setBattleOver] = useState(false);
  const [battleMessage, setBattleMessage] = useState(
    '敵武将が現れた！'
  );

  const startBattle = () => {
    setPlayerHp(100);
    setEnemyHp(100);
    setTurn(1);
    setBattleOver(false);
    setBattleMessage('敵武将が現れた！ 行動を選ぼう。');
    setPage('battle');
  };

  const battleAction = action => {
    if (battleOver) return;

    let nextPlayerHp = playerHp;
    let nextEnemyHp = enemyHp;
    let message = '';

    if (action === 'attack') {
      const damage = 15 + Math.floor(Math.random() * 11);
      nextEnemyHp = Math.max(0, enemyHp - damage);
      message = `攻撃！ 敵に${damage}ダメージ！`;
    }

    if (action === 'guard') {
      message = '防御の構え！ 敵の攻撃を軽減！';
    }

    if (action === 'heal') {
      const heal = 12 + Math.floor(Math.random() * 9);
      const actualHeal = Math.min(100 - playerHp, heal);
      nextPlayerHp = playerHp + actualHeal;
      message = `体力を${actualHeal}回復！`;
    }

    setEnemyHp(nextEnemyHp);

    if (nextEnemyHp <= 0) {
      setBattleMessage('🏆 勝利！ 敵武将を倒した！');
      setBattleOver(true);
      return;
    }

    const baseDamage = 10 + Math.floor(Math.random() * 9);
    const enemyDamage =
      action === 'guard'
        ? Math.max(1, baseDamage - 10)
        : baseDamage;

    nextPlayerHp = Math.max(
      0,
      nextPlayerHp - enemyDamage
    );

    setPlayerHp(nextPlayerHp);

    if (nextPlayerHp <= 0) {
      setBattleMessage('敗北… 敵武将に倒された。');
      setBattleOver(true);
      return;
    }

    setBattleMessage(
      `${message}\n敵の反撃！ ${enemyDamage}ダメージ！`
    );
    setTurn(previous => previous + 1);
  };

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

      <ScrollView contentContainerStyle={styles.content}>
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
                onPress={startBattle}
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
            <Heading>⚔️ ソロ対戦</Heading>

            <Text style={styles.description}>
              選択モード：{mode}
            </Text>

            {mode !== 'ソロ' && (
              <Text style={styles.warning}>
                現在はソロ練習戦です。
                オンライン対戦は開発予定。
              </Text>
            )}

            <Text style={styles.turnText}>
              第{turn}ターン
            </Text>

            <Text style={styles.battleFighter}>
              🏯 敵武将
            </Text>
            <Text style={styles.hpText}>
              HP {enemyHp} / 100
            </Text>
            <View style={styles.hpTrack}>
              <View
                style={[
                  styles.enemyHpFill,
                  { width: `${enemyHp}%` }
                ]}
              />
            </View>

            <Text style={styles.battleVs}>
              ⚔️ VS ⚔️
            </Text>

            <Text style={styles.battleFighter}>
              🛡️ 自分
            </Text>
            <Text style={styles.hpText}>
              HP {playerHp} / 100
            </Text>
            <View style={styles.hpTrack}>
              <View
                style={[
                  styles.playerHpFill,
                  { width: `${playerHp}%` }
                ]}
              />
            </View>

            <Text style={styles.battleLog}>
              {battleMessage}
            </Text>

            {!battleOver ? (
              <View style={styles.battleActions}>
                <Button
                  label="⚔️ 攻撃"
                  gold
                  onPress={() => battleAction('attack')}
                />
                <Button
                  label="🛡️ 防御"
                  onPress={() => battleAction('guard')}
                />
                <Button
                  label="💚 回復"
                  onPress={() => battleAction('heal')}
                />
              </View>
            ) : (
              <Button
                label="⚔️ もう一度戦う"
                gold
                onPress={startBattle}
              />
            )}

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
  },

  // Ver.0.4 追加スタイル
  turnText: {
    color: GOLD,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  battleFighter: {
    color: CREAM,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8
  },
  hpText: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 6,
    marginBottom: 5
  },
  hpTrack: {
    height: 15,
    width: '100%',
    borderRadius: 9,
    backgroundColor: '#4A3030',
    overflow: 'hidden'
  },
  enemyHpFill: {
    height: '100%',
    backgroundColor: '#E57865'
  },
  playerHpFill: {
    height: '100%',
    backgroundColor: '#74C78A'
  },
  battleVs: {
    color: GOLD,
    fontSize: 25,
    marginVertical: 15
  },
  battleLog: {
    color: CREAM,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    minHeight: 45
  },
  battleActions: {
    alignItems: 'center',
    width: '100%'
  }
});
