/* global __dirname */
import chalk from 'chalk';
import util from 'gulp-util';
import notifier from 'node-notifier';

function removeBaseDir(path) {
  return path.replace(`${__dirname}/app/`, '');
}

export default function handleError(error) {
  notifier.notify({
    title: 'Build Error',
    message: error.message
  });
  if (error.filename) {
    const line = error.loc ? error.loc.line : '';
    const col = error.loc ? error.loc.column : '';
    util.log(
      `${chalk.red(error.name)} in ${chalk.white(
        removeBaseDir(error.filename)
      )}: Line ${chalk.magenta(line)} & Column ${chalk.magenta(
        col
      )} Message: ${chalk.yellow(error.message)}`
    );
  } else {
    util.log(`${chalk.red(error.name)}: ${chalk.yellow(error.message)}`);
    util.log(JSON.stringify(error));
  }
}
