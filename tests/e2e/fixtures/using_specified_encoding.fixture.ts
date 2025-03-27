import { E2eTestConfig } from '../e2e-config.js';

export default new E2eTestConfig({
  cmd: 'dotenv-subst --encoding=ascii -q --env-file=minim.properties quis_magnavi.rtf',

  files: {
    input: {
      'minim.properties': 'NON_LABORIS=ġ ħ œ ű ž',
      'quis_magnavi.rtf': 'Ǿ deserunt elit ${NON_LABORIS} aliquip Ĳ',
    },
    output: {
      'quis_magnavi.rtf': 'G> deserunt elit ! \' S q ~ aliquip D2',
    },
  },
});
