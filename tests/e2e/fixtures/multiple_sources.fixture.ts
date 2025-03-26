import { E2eTestConfig } from '../cli.test';

export default new E2eTestConfig({
  cmd: 'dotenv-subst --env-file=env-test2 src1 src2 src3 -q',
  files: {
    input: {
      'env-test2':
        'var1 = deserunt velit\nvar2 = officia ea ad\nvar3 = tempor excepteur',
      src1: '--${var1}-${var2}-${var3}--',
      src2: '--${ var2}--',
      src3: '--${var3 }--',
    },
    output: {
      src1: '--deserunt velit-officia ea ad-tempor excepteur--',
      src2: '--officia ea ad--',
      src3: '--tempor excepteur--',
    },
  },
});
