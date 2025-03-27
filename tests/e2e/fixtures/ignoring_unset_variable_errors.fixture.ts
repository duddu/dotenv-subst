import { E2eTestConfig } from '../e2e-config.js';

export default new E2eTestConfig({
  cmd: 'dotenv-subst --ignore-unset-vars -q --env-file=cillum_eu.properties irure_quis.txt',

  files: {
    input: {
      'cillum_eu.properties':
        'OCCAECAT=mollit dolor anim\n' +
        'DESERUNT=\n' +
        'CUPIDATAT',
      'irure_quis.txt':
        'OCCAECAT\'s value is: ${OCCAECAT}; whereas DESERUNT is empty: "${DESERUNT}".\n' +
        'Since CUPIDATAT is declared but not assigned in cillum_eu.properties, and ' +
        "given that the --ignore-unset-vars flag is enabled, this variable won't be " +
        'replaced: ${CUPIDATAT}.\nSame thing for INCIDIDUNT, which is not even declared ' +
        'at all: ${INCIDIDUNT}.',
    },
    output: {
      'irure_quis.txt':
        'OCCAECAT\'s value is: mollit dolor anim; whereas DESERUNT is empty: "".\n' +
        'Since CUPIDATAT is declared but not assigned in cillum_eu.properties, and ' +
        "given that the --ignore-unset-vars flag is enabled, this variable won't be " +
        'replaced: ${CUPIDATAT}.\nSame thing for INCIDIDUNT, which is not even declared ' +
        'at all: ${INCIDIDUNT}.',
    },
  },
});
