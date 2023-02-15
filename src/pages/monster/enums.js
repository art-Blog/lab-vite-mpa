const healRule = (HP, healHP) => HP + healHP >= 100 ? 100 : HP + healHP
const attackRule = (HP, damage) => HP - damage <= 0 ? 0 : HP - damage
export const action = {
    attack: {name: '攻擊', power: [5, 12], rule: attackRule},
    heavyAttack: {name: '重擊', power: [10, 25], rule: attackRule},
    heal: {name: '治療', power: [8, 20], rule: healRule},
    monsterAttack: {name: '攻擊', power: [8, 15], rule: attackRule},
}
export const gameResult = {
    lose: '玩家失敗',
    win: '玩家獲勝',
    draw: '平手'
}