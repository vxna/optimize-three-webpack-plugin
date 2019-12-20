module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { breaking: true, release: 'major' },
          { type: 'breaking', release: 'major' },
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' }
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}
