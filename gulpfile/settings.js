import { argv } from 'yargs';

const settings = {};

settings.env = argv.production ? 'prod' : argv.qa ? 'qa' : argv.prod ? 'prod' : 'dev';

settings.sourceFolder = 'src';
settings.destinationFolder = 'build';
settings.uglify = settings.env !== 'dev';

if (settings.env === 'prod') {
  settings.destinationFolder = 'build-prod';
}

export default settings;
