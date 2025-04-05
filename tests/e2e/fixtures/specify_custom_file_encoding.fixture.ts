import { E2eTestConfig } from '../e2e-config.js';

export default new E2eTestConfig(
  {
    cmd: 'dotenv-subst --encoding=ascii -q --env-file=minim.properties quis_magnavi.txt',

    files: {
      input: {
        'minim.properties': 'NON_LABORIS=ġ ħ œ ű ž',
        'quis_magnavi.txt': 'Ǿ deserunt elit ${NON_LABORIS} aliquip Ĳ',
      },
      output: {
        'quis_magnavi.txt': "G> deserunt elit ! ' S q ~ aliquip D2",
      },
    },
  },
  import.meta.filename,
);
