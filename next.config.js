const { version } = require('./package.json')

function getGitInfo() {
  try {
    const execSync = require('child_process').execSync
    const gitBranch = execSync('git rev-parse --abbrev-ref HEAD')?.toString()?.trim() ?? ''
    const gitCommitHash = execSync('git rev-parse HEAD')?.toString()?.trim() ?? ''
    const buildId = `${gitBranch} - ${gitCommitHash.substring(0, 7)}`
    return { gitBranch, gitCommitHash, buildId }
  } catch (error) {
    console.log('get git info failed.')
    return undefined
  }
}

/** @type {import('next').NextConfig} */
module.exports = () => {
  const gitInfo = getGitInfo()

  return {
    productionBrowserSourceMaps: true,
    output: 'export',
    reactStrictMode: true,
    trailingSlash: true,
    eslint: {
      ignoreDuringBuilds: true
    },
    images: {
      unoptimized: true
    },
    env: {
      version,
      ...gitInfo
    }
  }
}
