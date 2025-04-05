import type { DefaultTheme } from 'vitepress';

import type {
  E2eTestConfig,
  E2eTestFileNormalizedSetup,
} from '../../tests/e2e/e2e-config.js';
import { e2eFixtures } from '../../tests/e2e/e2e-fixtures.js';

export interface CLIUsageExampleParams {
  title: string;
  example: string;
  index: number;
}

interface CLIUsageExamplePageData {
  params: CLIUsageExampleParams;
}

function getCliUsageExampleTitle(testName: string): string {
  const lowerCaseWhitelist = ['to', 'with'];
  return testName
    .split(' ')
    .map((word) =>
      lowerCaseWhitelist.includes(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ');
}

function getCliUsageExampleFileMd(file: E2eTestFileNormalizedSetup): string {
  const filename = file.path.substring(file.path.lastIndexOf('/') + 1);
  const langSyntax = filename.startsWith('.')
    ? 'dotenv'
    : filename.substring(filename.lastIndexOf('.') + 1);
  return `
\`\`\`${langSyntax} [${filename}]
${file.content}
\`\`\`
`;
}

function getCliUsageExampleFilesTabsMd(
  files: E2eTestFileNormalizedSetup[],
): string {
  return `
::: code-group
${files.map(getCliUsageExampleFileMd).join('')}
:::
`;
}

function getCliUsageExampleContentMd({
  displayCmd,
  files,
}: E2eTestConfig): string {
  return `
With these files present in your working directory:
${getCliUsageExampleFilesTabsMd(files.input)}
When the following command is executed:
\`\`\`sh
$ ${displayCmd.replaceAll(/\s-q\s/g, ' ')}
\`\`\`
The interpolated output is written to the file(s) below:
${getCliUsageExampleFilesTabsMd(files.output)}
`;
}

const cliUsageExamplesPageData: CLIUsageExamplePageData[] = e2eFixtures.map(
  (config, index) => ({
    params: {
      title: getCliUsageExampleTitle(config.testName),
      example: config.fileName.replaceAll(/_+/g, '-'),
      index: index + 1,
    },
    content: `${getCliUsageExampleContentMd(config)}`,
  }),
);

export default {
  paths: (): CLIUsageExamplePageData[] => cliUsageExamplesPageData,
};

export const cliExamplesSidebarItems: Pick<
  DefaultTheme.SidebarItem,
  'text' | 'link'
>[] = cliUsageExamplesPageData.map(({ params }) => ({
  text: params.title,
  link: '/' + params.example,
}));
