import { E2eTestConfig } from '../e2e-config.js';

export default new E2eTestConfig(
  {
    cmd: 'dotenv-subst --overload --env-file=.env --env-file=.env.dolor --env-file=lorem.properties -q pariatur.yaml',

    files: {
      input: {
        '.env': 'ALIQUIP=laboris',
        '.env.dolor': 'VOLUPTATE=voluptate et amet',
        'lorem.properties': 'ALIQUIP=non laboris',
        'pariatur.yaml':
          'commodo: Dolor ipsum tempor ${ALIQUIP}\nmollit:\n\t- officia ${VOLUPTATE} minim',
      },
      output: {
        'pariatur.yaml':
          'commodo: Dolor ipsum tempor non laboris\nmollit:\n\t- officia voluptate et amet minim',
      },
    },
  },
  import.meta.filename,
);
