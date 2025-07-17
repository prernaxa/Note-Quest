export function updateStreakAndXP(user) {
  const today = new Date();
  const last = new Date(user.lastActiveDate);
  const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));

  let xpChange = 0;
  let action = '';

  if (diffDays === 1) {
    // Logged in next day → streak continues
    user.dailyStreak += 1;
    xpChange = 10;
    action = 'daily_streak_bonus';
  } else if (diffDays > 1 && diffDays < 3) {
    // Missed 1 day
    user.dailyStreak = 0;
    xpChange = -5;
    action = 'missed_streak_penalty';
  } else if (diffDays >= 3) {
    // Inactive 3+ days
    user.dailyStreak = 0;
    xpChange = -10;
    action = 'inactive_penalty';
  } else {
    // Same day login → no streak change, no XP
    return user;
  }

  // Apply XP change
  user.xp = Math.max(0, user.xp + xpChange);

  // Log to xpHistory
  if (!user.xpHistory) user.xpHistory = []; // in case undefined
  user.xpHistory.push({
    amount: xpChange,
    action,
    timestamp: today,
  });

  user.lastActiveDate = today;
  user.level = Math.floor(Math.sqrt(user.xp / 100)) + 1;

  return user;
}
