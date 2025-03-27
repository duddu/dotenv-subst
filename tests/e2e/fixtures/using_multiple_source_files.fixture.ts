import { E2eTestConfig } from '../e2e-config.js';

export default new E2eTestConfig({
  cmd: 'dotenv-subst -q --env-file=consequat.properties ullamco_1.txt ullamco_2.txt ullamco_3.txt',

  files: {
    input: {
      'consequat.properties': 'ALIQUA=adipisicing\nSUNT=excepteur sunt\nCILLUM_CULPA=exercitation',
      'ullamco_1.txt': 'Deserunt elit ${ALIQUA} aliquip',
      'ullamco_2.txt': 'Minim fugiat quis magna pariatur officia non ${SUNT} lorem dolor.',
      'ullamco_3.txt': 'Consectetur minim ${CILLUM_CULPA} ${ALIQUA} non laboris proident.',
    },
    output: {
      'ullamco_1.txt': 'Deserunt elit adipisicing aliquip',
      'ullamco_2.txt': 'Minim fugiat quis magna pariatur officia non excepteur sunt lorem dolor.',
      'ullamco_3.txt': 'Consectetur minim exercitation adipisicing non laboris proident.',
    },
  },
});
