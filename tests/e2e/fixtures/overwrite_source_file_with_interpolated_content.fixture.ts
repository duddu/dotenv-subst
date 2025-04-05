import { E2eTestConfig } from '../e2e-config.js';

export default new E2eTestConfig(
  {
    cmd: 'dotenv-subst -q --env-file=velit_aute.properties proident_fugiat.md',

    files: {
      input: {
        'velit_aute.properties':
          'ALIQUA=adipisicing\n' +
          'MINIM=excepteur sunt\n' +
          'CILLUM_CULPA=exercitation\n' +
          'IPSUM=Reprehenderit aute irure',
        'proident_fugiat.md':
          '## Deserunt elit ${ALIQUA} aliquip\n\n' +
          'Minim fugiat quis magna pariatur officia non ${MINIM} lorem dolor.\n' +
          '> Consectetur minim ${CILLUM_CULPA} adipisicing non laboris proident:\n\n' +
          '* Amet sint sunt sit\n* ${IPSUM}',
      },
      output: {
        'proident_fugiat.md':
          '## Deserunt elit adipisicing aliquip\n\n' +
          'Minim fugiat quis magna pariatur officia non excepteur sunt lorem dolor.\n' +
          '> Consectetur minim exercitation adipisicing non laboris proident:\n\n' +
          '* Amet sint sunt sit\n* Reprehenderit aute irure',
      },
    },
  },
  import.meta.filename,
);
