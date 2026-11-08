
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, StatusBar, Dimensions
} from 'react-native';

const GOLD = '#F5C86B';
const CREAM = '#FFF0C8';
const DARK = '#11121F';
const W = Dimensions.get('window').width;

function Button({ children, onPress, style, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      style={[s.button, style, disabled && { opacity: 0.4 }]}
    >
      <Text style={s.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

function Background() {
  return (
    <View pointerEvents="none" style={s.background}>
      <View style={s.sun} />
      <View style={[s.mountain, {
        left: -100, bottom: 30,
        backgroundColor: '#3B405B'
      }]} />
      <View style={[s.mountain, {
        right: -100, bottom: 5,
        backgroundColor: '#292D47'
      }]} />
      <View style={s.castle}>
        <Text style={s.castleEmoji}>🏯</Text>
      </View>
      <View style={s.ground} />
    </View>
  );
}

function Warrior({ enemy }) {
  return (
    <View style={s.warrior}>
      <Text style={s.warriorHead}>
        {enemy ? '👹' : '🥷'}
      </Text>
      <Text style={s.warriorWeapon}>
        {enemy ? '🗡️' : '⚔️'}
      </Text>
      <View style={[
        s.warriorBody,
        enemy && { backgroundColor: '#A93E47' }
      ]} />
      <View style={s.legs}>
        <View style={s.leg} />
        <View style={s.leg} />
      </View>
      <Text style={s.warriorName}>
        {enemy ? '敵将' : '自軍'}
      </Text>
    </View>
  );
}

export default function App() {
  const [page, setPage] = useState('title');
  const [mode, setMode] = useState('ソロ');
  const [music, setMusic] = useState(true);
  const [effects, setEffects] = useState(true);

  const [hp, setHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [pos, setPos] = useState(15);
  const [enemyPos, setEnemyPos] = useState(80);
  const [heals, setHeals] = useState(3);
  const [turn, setTurn] = useState(1);
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [slash, setSlash] = useState(false);

  function startBattle() {
    setHp(100);
    setEnemyHp(100);
    setPos(15);
    setEnemyPos(80);
    setHeals(3);
    setTurn(1);
    setResult('');
    setSlash(false);
    setMessage('左右に動いて敵将に近づこう！');
    setPage('battle');
  }

  function move(direction) {
    if (result) return;
    setPos(p =>
      Math.max(8, Math.min(92, p + direction * 9))
    );
    setSlash(false);
    setMessage(direction > 0
      ? '前進！ 敵将に近づいた！'
      : '後退！ 敵将から距離を取った！'
    );
  }

  function enemyAction(currentHp, defended, log) {
    if (Math.abs(pos - enemyPos) > 25) {
      setEnemyPos(p => Math.max(8, p - 12));
      setMessage(log + '\n敵将が近づいてきた！');
    } else {
      const damage = defended
        ? 3
        : 9 + Math.floor(Math.random() * 8);
      const next = Math.max(0, currentHp - damage);
      setHp(next);
      setMessage(log + '\n敵の反撃！ ' + damage + 'ダメージ');
      if (next === 0) setResult('敗北');
    }
    setTurn(t => t + 1);
  }

  function attack() {
    if (result) return;

    const distance = Math.abs(pos - enemyPos);
    setSlash(distance <= 23);

    if (distance > 23) {
      enemyAction(hp, false, '攻撃が届かない！');
      return;
    }

    const damage = 17 + Math.floor(Math.random() * 11);
    const next = Math.max(0, enemyHp - damage);
    setEnemyHp(next);

    if (next === 0) {
      setMessage('敵将を討ち取った！');
      setResult('勝利');
      return;
    }

    enemyAction(
      hp, false,
      '⚔️ 一閃！ ' + damage + 'ダメージ！'
    );
  }

  function defend() {
    if (result) return;
    setSlash(false);
    enemyAction(hp, true, '🛡️ 防御の構え！');
  }

  function heal() {
    if (result || heals <= 0) return;
    const amount = Math.min(25, 100 - hp);
    const next = hp + amount;
    setHp(next);
    setHeals(h => h - 1);
    setSlash(false);
    enemyAction(
      next, false,
      '💚 ' + amount + '回復した！'
    );
  }

  function Menu({ emoji, label, target }) {
    return (
      <TouchableOpacity
        style={s.menu}
        onPress={() => setPage(target)}
      >
        <Text style={s.menuEmoji}>{emoji}</Text>
        <Text style={s.menuText}>{label}</Text>
      </TouchableOpacity>
    );
  }

  function HpBar({ value, enemy }) {
    return (
      <View style={s.hpTrack}>
        <View style={{
          height: '100%',
          width: value + '%',
          backgroundColor: enemy ? '#F16D70' : '#70DF91'
        }} />
      </View>
    );
  }

  return (
    <View style={s.root}>
      <StatusBar hidden />

      {page === 'title' && (
        <View style={s.titlePage}>
          <Background />
          <Text style={s.crest}>◆ 天下布武 ◆</Text>
          <Text style={s.title}>戦乱丸</Text>
          <Text style={s.english}>
            S E N G O K U  B A T T L E
          </Text>
          <Text style={s.motto}>
            乱世を斬り、天下を掴め。
          </Text>
          <View style={{ flex: 1 }} />
          <Button
            style={s.goldButton}
            onPress={() => setPage('home')}
          >
            ⚔️ いざ、出陣準備
          </Button>
          <Text style={s.version}>VER. 0.5</Text>
        </View>
      )}

      {page === 'home' && (
        <ScrollView contentContainerStyle={s.home}>
          <View style={s.topRow}>
            <View>
              <Text style={s.logo}>戦乱丸</Text>
              <Text style={s.smallEnglish}>
                SENGOKU BATTLE
              </Text>
            </View>
            <Text style={s.coins}>🪙 0</Text>
          </View>

          <View style={s.hero}>
            <Background />
            <Text style={s.heroTop}>
              ✦ 天下統一への道 ✦
            </Text>
            <View style={s.heroCard}>
              <Text style={{ fontSize: 43 }}>⚔️</Text>
              <Text style={s.heroTitle}>
                戦 国 武 将
              </Text>
              <Text style={s.heroSub}>
                THE LEGEND BEGINS
              </Text>
            </View>
            <Text style={s.heroBottom}>
              己の武で、天下を掴め
            </Text>
          </View>

          <View style={s.modePanel}>
            <Text style={s.section}>
              ◆ 出陣モード選択 ◆
            </Text>
            <View style={s.modeRow}>
              {['ソロ', 'デュオ', 'トリオ', '1対1'].map(m => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMode(m)}
                  style={[
                    s.mode,
                    mode === m && s.selectedMode
                  ]}
                >
                  <Text style={{
                    color: mode === m ? DARK : CREAM,
                    fontWeight: 'bold',
                    fontSize: 13
                  }}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button
              style={s.goldButton}
              onPress={startBattle}
            >
              ⚔️ 出 陣 ⚔️
            </Button>

            <Text style={s.modeNote}>
              {mode === 'ソロ'
                ? '一人で敵将に挑め！'
                : mode + 'は準備中・ソロ練習戦を開始'}
            </Text>
          </View>

          <View style={s.menuRow}>
            <Menu emoji="👥" label="フレンド" target="friends" />
            <Menu emoji="🛍️" label="ショップ" target="shop" />
            <Menu emoji="⚙️" label="設定" target="settings" />
            <Menu emoji="🛡️" label="管理" target="admin" />
          </View>

          <Button
            style={s.backButton}
            onPress={() => setPage('title')}
          >
            タイトルへ戻る
          </Button>
        </ScrollView>
      )}

      {page === 'battle' && (
        <ScrollView contentContainerStyle={s.battle}>
          <View style={s.battleHeader}>
            <Text style={s.battleTitle}>
              ⚔️ 戦乱の合戦場
            </Text>
            <Text style={s.turn}>第{turn}合</Text>
          </View>

          <View style={s.hpRow}>
            <View style={s.hpBox}>
              <Text style={s.hpLabel}>
                🛡️ 自軍 {hp}/100
              </Text>
              <HpBar value={hp} />
            </View>
            <View style={s.hpBox}>
              <Text style={s.hpLabel}>
                👹 敵軍 {enemyHp}/100
              </Text>
              <HpBar value={enemyHp} enemy />
            </View>
          </View>

          <View style={s.arena}>
            <Background />
            <Text style={s.arenaTitle}>
              天下分け目の決戦
            </Text>

            <View style={[
              s.fighterPosition,
              { left: pos + '%' }
            ]}>
              <Warrior />
            </View>

            <View style={[
              s.fighterPosition,
              { left: enemyPos + '%' }
            ]}>
              <Warrior enemy />
            </View>

            {slash && !result && (
              <Text style={[
                s.slash,
                { left: Math.min(88, pos + 12) + '%' }
              ]}>💥</Text>
            )}

            {!!result && (
              <View style={s.resultOverlay}>
                <Text style={s.resultTitle}>
                  {result === '勝利'
                    ? '🏆 勝 利！'
                    : '敗 北…'}
                </Text>
                <Text style={s.resultSub}>
                  {result === '勝利'
                    ? '敵将を討ち取った！'
                    : '再び挑戦しよう！'}
                </Text>
              </View>
            )}
          </View>

          <View style={s.log}>
            <Text style={s.logText}>{message}</Text>
          </View>

          {!result ? (
            <>
              <Text style={s.controlTitle}>
                ◆ 武将を動かす ◆
              </Text>
              <View style={s.controls}>
                <Button
                  style={s.moveButton}
                  onPress={() => move(-1)}
                >
                  ◀ 左へ
                </Button>
                <Button
                  style={s.moveButton}
                  onPress={() => move(1)}
                >
                  右へ ▶
                </Button>
              </View>

              <Text style={s.controlTitle}>
                ◆ 戦闘アクション ◆
              </Text>
              <View style={s.controls}>
                <Button
                  style={s.attackButton}
                  onPress={attack}
                >
                  ⚔️ 攻撃
                </Button>
                <Button
                  style={s.actionButton}
                  onPress={defend}
                >
                  🛡️ 防御
                </Button>
                <Button
                  style={s.actionButton}
                  onPress={heal}
                  disabled={heals === 0}
                >
                  💚 回復{heals}
                </Button>
              </View>
            </>
          ) : (
            <Button
              style={s.goldButton}
              onPress={startBattle}
            >
              ⚔️ もう一度戦う
            </Button>
          )}

          <Button
            style={s.backButton}
            onPress={() => setPage('home')}
          >
            🏯 ホームへ戻る
          </Button>
        </ScrollView>
      )}

      {['friends', 'shop', 'settings', 'admin'].includes(page) && (
        <View style={s.subPage}>
          <Text style={s.subDecoration}>
            ✦ 戦乱丸 ✦
          </Text>

          <Text style={s.subTitle}>
            {page === 'friends' ? '👥 フレンド'
              : page === 'shop' ? '🛍️ ショップ'
              : page === 'settings' ? '⚙️ 設定'
              : '🛡️ 管理画面'}
          </Text>

          {page === 'settings' ? (
            <>
              <Button
                style={s.subButton}
                onPress={() => setMusic(!music)}
              >
                BGM：{music ? 'ON' : 'OFF'}
              </Button>
              <Button
                style={s.subButton}
                onPress={() => setEffects(!effects)}
              >
                効果音：{effects ? 'ON' : 'OFF'}
              </Button>
              <Text style={s.subInfo}>
                音声機能は今後実装予定
              </Text>
            </>
          ) : (
            <Text style={s.subInfo}>
              {page === 'friends'
                ? 'フレンド検索・招待機能は開発予定！'
                : page === 'shop'
                ? '武将・衣装・アイテムのショップを準備中！'
                : '開発用プレビュー\n管理機能は今後実装予定'}
            </Text>
          )}

          <Button
            style={s.goldButton}
            onPress={() => setPage('home')}
          >
            🏯 ホームへ戻る
          </Button>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#383D56',
    borderWidth: 1,
    borderColor: '#8D91A6'
  },
  buttonText: {
    color: CREAM,
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center'
  },
  goldButton: {
    width: '100%',
    marginTop: 12,
    backgroundColor: GOLD,
    borderColor: '#FFF4CD',
    borderWidth: 2
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#704C61'
  },
  sun: {
    position: 'absolute',
    right: 30,
    top: 32,
    width: 155,
    height: 155,
    borderRadius: 80,
    backgroundColor: '#F6A45D'
  },
  mountain: {
    position: 'absolute',
    width: 320,
    height: 220,
    transform: [{ rotate: '45deg' }],
    borderRadius: 25
  },
  castle: {
    position: 'absolute',
    right: 20,
    bottom: 18
  },
  castleEmoji: {
    fontSize: 130
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 22,
    backgroundColor: '#171A2C'
  },
  titlePage: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 22,
    paddingBottom: 35
  },
  crest: {
    color: CREAM,
    fontSize: 17,
    letterSpacing: 4,
    fontWeight: 'bold'
  },
  title: {
    color: GOLD,
    fontSize: 62,
    fontWeight: '900',
    letterSpacing: 8,
    marginTop: 15,
    textShadowColor: '#653C2B',
    textShadowRadius: 12
  },
  english: {
    color: CREAM,
    fontSize: 10,
    marginTop: 8
  },
  motto: {
    color: CREAM,
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 45
  },
  version: {
    color: CREAM,
    fontSize: 12,
    marginTop: 16
  },
  home: {
    paddingHorizontal: 15,
    paddingTop: 35,
    paddingBottom: 30,
    alignItems: 'center'
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  logo: {
    color: GOLD,
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: 4
  },
  smallEnglish: {
    color: '#C6A875',
    fontSize: 10,
    letterSpacing: 2
  },
  coins: {
    color: GOLD,
    fontWeight: 'bold',
    padding: 10,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 20
  },
  hero: {
    width: '100%',
    height: 285,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: GOLD,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 20
  },
  heroTop: {
    color: CREAM,
    fontWeight: '900',
    letterSpacing: 3
  },
  heroCard: {
    marginTop: 20,
    padding: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GOLD,
    borderRadius: 10,
    backgroundColor: 'rgba(15,16,30,0.85)'
  },
  heroTitle: {
    color: GOLD,
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 4
  },
  heroSub: {
    color: CREAM,
    fontSize: 10,
    marginTop: 5
  },
  heroBottom: {
    color: CREAM,
    fontWeight: 'bold',
    marginTop: 17
  },
  modePanel: {
    width: '100%',
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9E8150',
    backgroundColor: '#252533',
    alignItems: 'center'
  },
  section: {
    color: GOLD,
    fontWeight: '900',
    marginBottom: 14
  },
  modeRow: {
    width: '100%',
    flexDirection: 'row'
  },
  mode: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 11,
    marginHorizontal: 3,
    backgroundColor: '#191D2D',
    borderWidth: 1,
    borderColor: '#827150',
    borderRadius: 7
  },
  selectedMode: {
    backgroundColor: GOLD
  },
  modeNote: {
    color: CREAM,
    fontSize: 11,
    marginTop: 10,
    textAlign: 'center'
  },
  menuRow: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 16
  },
  menu: {
    flex: 1,
    marginHorizontal: 3,
    alignItems: 'center',
    paddingVertical: 13,
    backgroundColor: '#282B3A',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#987B4D'
  },
  menuEmoji: {
    fontSize: 24
  },
  menuText: {
    color: CREAM,
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 6
  },
  backButton: {
    marginTop: 17,
    backgroundColor: '#262938',
    borderColor: '#777085'
  },
  battle: {
    paddingHorizontal: 12,
    paddingTop: 28,
    paddingBottom: 30,
    alignItems: 'center'
  },
  battleHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 17
  },
  battleTitle: {
    color: GOLD,
    fontSize: 20,
    fontWeight: '900'
  },
  turn: {
    color: CREAM,
    fontSize: 13
  },
  hpRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14
  },
  hpBox: {
    width: '47%'
  },
  hpLabel: {
    color: CREAM,
    fontSize: 12,
    marginBottom: 7,
    fontWeight: 'bold'
  },
  hpTrack: {
    height: 13,
    borderRadius: 8,
    backgroundColor: '#4D3544',
    overflow: 'hidden'
  },
  arena: {
    width: Math.min(W - 24, 430),
    height: 260,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: GOLD,
    borderRadius: 10
  },
  arenaTitle: {
    position: 'absolute',
    alignSelf: 'center',
    top: 12,
    color: CREAM,
    fontWeight: '900',
    letterSpacing: 2
  },
  fighterPosition: {
    position: 'absolute',
    bottom: 26,
    marginLeft: -28
  },
  warrior: {
    width: 56,
    alignItems: 'center'
  },
  warriorHead: {
    fontSize: 35
  },
  warriorWeapon: {
    position: 'absolute',
    top: 30,
    right: -10,
    fontSize: 25
  },
  warriorBody: {
    width: 30,
    height: 35,
    marginTop: -3,
    borderRadius: 7,
    backgroundColor: '#3B65A0',
    borderWidth: 2,
    borderColor: '#D3C6A1'
  },
  legs: {
    flexDirection: 'row',
    gap: 8
  },
  leg: {
    width: 10,
    height: 19,
    backgroundColor: '#25263A'
  },
  warriorName: {
    color: CREAM,
    fontSize: 11,
    fontWeight: '900',
    backgroundColor: '#222333',
    paddingHorizontal: 5
  },
  slash: {
    position: 'absolute',
    bottom: 115,
    fontSize: 36
  },
  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,20,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resultTitle: {
    color: GOLD,
    fontSize: 40,
    fontWeight: '900'
  },
  resultSub: {
    color: CREAM,
    marginTop: 14
  },
  log: {
    width: '100%',
    minHeight: 70,
    padding: 12,
    marginTop: 14,
    backgroundColor: '#292B3C',
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#8C744D',
    justifyContent: 'center'
  },
  logText: {
    color: CREAM,
    textAlign: 'center',
    lineHeight: 21
  },
  controlTitle: {
    color: GOLD,
    fontWeight: '900',
    marginTop: 17,
    marginBottom: 9
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    gap: 8
  },
  moveButton: {
    flex: 1,
    backgroundColor: '#354866',
    paddingVertical: 17
  },
  attackButton: {
    flex: 1.2,
    backgroundColor: '#AE5636',
    borderColor: '#F5B578'
  },
  actionButton: {
    flex: 1
  },
  subPage: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subDecoration: {
    color: GOLD,
    fontSize: 17,
    marginBottom: 22
  },
  subTitle: {
    color: GOLD,
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 30
  },
  subInfo: {
    color: CREAM,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26
  },
  subButton: {
    width: '100%',
    marginBottom: 12
  }
});
