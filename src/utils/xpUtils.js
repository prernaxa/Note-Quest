// src/utils/xpUtils.js
export function updateLevel(user) {
  user.level = Math.floor(Math.sqrt(user.xp / 100)) + 1;
}
