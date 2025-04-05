# [`dotenv-subst`](https://dotenv-subst.duddu.dev)

<!-- #region intro -->
A CLI tool and library for **interpolating variables in any file**, using `.env` files (or any file structured as `key=value` pairs) to define the replacement values.

It leverages [Dotenvx](https://dotenvx.com) to read variables values from file(s) and applies them to interpolate any provided static file(s). This allows you to use variables from `key=value` configuration files in both **runtime** code *and* **build-time** files—where it wouldn't be possible to access those variables from the runtime environment.
<!-- #endregion intro -->

<!-- TODO link to docs site -->

## 🚀 Features

- Simple & Lightweight – No other runtime dependencies besides Dotenvx
- Works with any File Format – Interpolates variables in any text-based file (e.g. md, json, yml etc.)
- Flexible & Configurable – Supports various interpolation [syntaxes](#%EF%B8%8F-variable-interpolation-syntaxes) and configuration [options](#%EF%B8%8F-cli-options)
- CLI & API Support – Use it in scripts, pipelines, or as a library directly in code

## 📦 Installation

### Npm

```sh
# install as global package
npm install -g dotenv-subst

# or as local dependency
npm install -D dotenv-subst
```

## 💻 CLI Usage

`$ dotenv-subst [options] <source...>`

Each positional argument is interpreted as the path to a source file containing variable placeholders for interpolation. All the available options are documented in the dedicated [section](#%EF%B8%8F-cli-options) further down.

### In-place Replacement Example

<!-- #region cli-basic-example -->
With these files in your working directory:

📄 `.env.test`
```properties
USERNAME=jaydoe
GREETING=Hello
```
📄 `my-test-file.md`
```markdown
{{GREETING}}, my name is ${USERNAME}.
```

Running the following command:

```sh
dotenv-subst --env-file=.env.test my-test-file.md
```

Updates the file with the interpolated content:

📄 `my-test-file.md`
```markdown
Hello, my name is jaydoe.
```
<!-- #endregion cli-basic-example -->

### Custom Output File Example

Given the same starting files of the [previous example](#in-place-replacement-example), if the following command is run instead:

```sh
dotenv-subst --env-file=.env.test --output=my-output.md my-test-file.md
```

The interpolated output is written to `my-output.md`, while `my-test-file.md` is left intact.

> [!TIP]
> For a more comprehensive list of **usage examples**, head over to the [CLI Examples](https://dotenv-subst.duddu.dev/cli-examples) section of the documentation website.

### 🛠️ CLI Options

<!-- #region cli-options-table -->
| Option                       | Default                 | Description                                                                                                                                         |
| :--------------------------- | :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-o, --output <path>`        | *same as source file*   | Optional output file path–if omitted defaults to in-place interpolation<br/><sub>⚠️ Only applicable when a **single** source file is provided</sub>  |
| `-f, --env-file <paths...>`  | `[]`                    | Path(s) to your env file(s)<br/><sub>ℹ️ Forwarded to dotenvx without additional processing</sub>                                                     |
| `--ignore-unset-vars`        | `false`                 | Do not abort if source file(s) contain variables not defined in env file(s)<br/>(by default, throws the first unset variable error encountered)     |
| `--encoding <name>`          | `'utf-8'`               | Encoding of your source and env file(s)<br/><sub>ℹ️ Both used internally and forwarded to dotenvx</sub>                                              |
| `--env-keys-file <path>`     | *same as env file*      | Path to your .env.keys file<br/><sub>ℹ️ Forwarded to dotenvx without additional processing</sub>                                                     |
| `--overload`                 | `false`                 | Override existing env variables<br/><sub>ℹ️ Forwarded to dotenvx without additional processing</sub>                                                 |
| `--convention <name>`        | `undefined`             | Load a .env convention (available conventions: `['nextjs', 'flow']`)<br/><sub>ℹ️ Forwarded to dotenvx without additional processing</sub>            |
| `-v, --verbose`              | `false`                 | Sets log level to verbose<br/><sub>ℹ️ Both used internally and forwarded to dotenvx</sub>                                                            |
| `-q, --quiet`                | `false`                 | Sets log level to error<br/><sub>ℹ️ Both used internally and forwarded to dotenvx</sub>                                                              |
| `-V, --version`              | –                       | Output the version number                                                                                                                           |
| `-h, --help`                 | –                       | Display help for command                                                                                                                            |
<!-- #endregion cli-options-table -->

For more details on **options forwarded to** `dotenvx`, see the official [Dotenvx CLI Documentation](https://dotenvx.com/docs/advanced#cli).

## ✍️ Variable Interpolation Syntaxes

You can use any of the following syntax styles for interpolation placeholders in your source files:

| Syntax           | Example          |
| :--------------- | :--------------- |
| Shell-style      | `${VAR_NAME}`    |
| Handlebars-style | `{{VAR_NAME}}`   |
| GH Actions-style | `${{VAR_NAME}}`  |

> [!NOTE]
> This tool imposes no strict rules on variables syntax: 
> - Variable names can use any text case (e.g.: `${FOO}`, `{{bar}}`, `${{fooBar}}`)
> - Whitespace inside brackets is ignored (e.g.: `${ foo }`, `{{foo  }}`, `${{ foo}}`)

<!-- #region contribution -->
## 🧑‍💻 Contribution

Contributions are welcome! Also please feel free to submit issues, bug reports, or requests in the [Issues](https://github.com/duddu/dotenv-subst/issues) section.
<!-- #endregion contribution -->

<!-- #region license -->
## ⚖️ License

This project is licensed under the BSD-3-Clause License. See the [LICENSE](https://github.com/duddu/dotenv-subst/blob/main/LICENSE) file for details.
<!-- #endregion license -->
