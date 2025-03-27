import { E2eTestConfig } from '../e2e-config.js';

export default new E2eTestConfig({
  cmd: 'dotenv-subst --env-file=.env --env-file=.env.dolor --env-file=lorem.properties -q pariatur.txt',

  files: {
    input: {
      '.env': 'ALIQUIP=laboris',
      '.env.dolor': 'VOLUPTATE=voluptate et amet',
      'lorem.properties': 'ALIQUIP=non laboris',
      'pariatur.txt':
        'Dolor ipsum tempor ${ALIQUIP} minim officia ${VOLUPTATE}.',
    },
    output: {
      'pariatur.txt':
        'Dolor ipsum tempor non laboris minim officia voluptate et amet.',
    },
  },
});
