import { E2eTestConfig } from '../cli.test';

export default new E2eTestConfig({
  cmd: 'dotenv-subst --env-file=env-test1 src1 -q',
  files: {
    input: {
      'env-test1':
        'var1=voluptate\nvar2=reprehenderit officia elit\nvar3=labore occaecat 987',
      src1: '--${var1}-$var2-${var3}--',
    },
    output: {
      src1: '--voluptate-$var2-labore occaecat 987--',
    },
  },
});
