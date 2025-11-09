import { spawn } from 'node:child_process';

const isWin = process.platform === 'win32';
const procs = [];
let shuttingDown = false;

function run(label, command, args) {
  console.log(`[dev] starting ${label}: ${command} ${args.join(' ')}`.trim());

  const child = spawn(command, args, {
    stdio: 'inherit',
    shell: isWin,
    env: process.env,
  });

  procs.push({ label, child });

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    if (code !== 0) {
      console.error(`[dev] ${label} exited with code ${code}`);
    } else if (signal) {
      console.error(`[dev] ${label} exited after receiving ${signal}`);
    } else {
      console.log(`[dev] ${label} exited`);
    }

    shutdown(code ?? 0);
  });

  child.on('error', (err) => {
    console.error(`[dev] Failed to start ${label}:`, err);
    shutdown(1);
  });
}

function shutdown(exitCode = 0) {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;

  for (const { child, label } of procs) {
    if (child.killed) continue;
    const signal = isWin ? undefined : 'SIGINT';
    console.log(`[dev] stopping ${label}...`);
    child.kill(signal);
  }

  // Give children a moment to exit gracefully before forcing exit
  setTimeout(() => {
    for (const { child } of procs) {
      if (!child.killed) {
        child.kill('SIGTERM');
      }
    }
    process.exit(exitCode);
  }, 250);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
process.on('uncaughtException', (err) => {
  console.error('[dev] uncaught exception', err);
  shutdown(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('[dev] unhandled rejection', reason);
  shutdown(1);
});
process.on('exit', () => shutdown(0));

run('server', 'npm', ['run', 'dev:server']);
run('client', 'npm', ['run', 'dev:client']);

