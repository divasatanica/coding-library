function wordBreak(s: string, wordDict: string[]): boolean {
  const wordDictSet = new Set(wordDict);
  const dp = Array.from({ length: s.length + 1 }).fill(false);

  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDictSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  console.log("dp", dp);
  return dp[s.length];
}

console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));
