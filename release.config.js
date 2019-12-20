module.exports = {
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { breaking: true, release: 'major' },
          { type: 'breaking', release: 'major' },
          { type: 'new', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'upd', release: 'patch' }
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/github'
  ]
}
