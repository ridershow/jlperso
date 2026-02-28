/**
 * FTP Deployment Script
 *
 * Usage:
 *   1. Copy .env.example to .env and fill in your FTP credentials
 *   2. Run: npm run deploy:ftp
 *
 * The script uploads the contents of dist/ to your FTP server.
 * Requires Node.js 20+ (uses --env-file flag to load .env automatically).
 */

import FtpDeploy from 'ftp-deploy';

const requiredVars = ['FTP_HOST', 'FTP_USER', 'FTP_PASSWORD'];
const missing = requiredVars.filter((v) => !process.env[v]);
if (missing.length) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  console.error('Copy .env.example to .env and fill in your FTP credentials.');
  process.exit(1);
}

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: parseInt(process.env.FTP_PORT || '21', 10),
  localRoot: './dist',
  remoteRoot: process.env.FTP_REMOTE_DIR || '/',
  include: ['*', '**/*'],
  exclude: [],
  deleteRemote: false,
  forcePasv: true,
};

const ftpDeploy = new FtpDeploy();

ftpDeploy.on('uploading', (data) => {
  process.stdout.write(`Uploading ${data.transferredFileCount}/${data.totalFilesCount}: ${data.filename}\r`);
});

ftpDeploy
  .deploy(config)
  .then(() => console.log('\nFTP deploy complete.'))
  .catch((err) => {
    console.error('\nFTP deploy failed:', err.message);
    process.exit(1);
  });
