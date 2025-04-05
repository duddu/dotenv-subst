import type { E2eTestConfig } from './e2e-config.js';

import { default as fixture_1 } from './fixtures/overwrite_source_file_with_interpolated_content.fixture.js';
import { default as fixture_2 } from './fixtures/write_to_custom_output_file_path.fixture.js';
import { default as fixture_3 } from './fixtures/interpolate_multiple_source_files.fixture.js';
import { default as fixture_4 } from './fixtures/ignore_unset_variable_errors.fixture.js';
import { default as fixture_5 } from './fixtures/specify_custom_file_encoding.fixture.js';
import { default as fixture_6 } from './fixtures/provide_multiple_env_files.fixture.js';
import { default as fixture_7 } from './fixtures/provide_multiple_env_files_with_overload.fixture.js';

export const e2eFixtures: E2eTestConfig[] = [
  fixture_1,
  fixture_2,
  fixture_3,
  fixture_4,
  fixture_5,
  fixture_6,
  fixture_7,
];
