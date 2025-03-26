import { E2eTestConfig } from '../cli.test';

export default new E2eTestConfig({
  cmd: 'dotenv-subst --env-file=env1 --output=out2 src2 -q',
  files: {
    input: {
      env1: 'var3=odikms\nvar2=jpiuboyguy6gf8 kjnlkj',
      src2: '--${var3}--',
    },
    output: {
      out2: '--odikms--',
    },
  },
});
