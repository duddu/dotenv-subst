# `dotenv-subst`

A CLI tool and library for interpolating variables in any file, using .env files (or any key=value format) to define replacement values.

It leverages [Dotenvx](https://dotenvx.com) to read the variables values from file, and uses them to interpolate any static file(s) provided. So you can use variables defined in key=value files both in your runtime code *and* in files you have to deal with at build-time (where it wouldn't be possible to access them from the runtime environment).

## 🚀 Features

- Simple & Lightweight – No other runtime dependencies besides Dotenvx
- Works with any File Format – Interpolates variables in any text-based file (e.g. md, json, yml etc.)
- Flexible & Configurable – Supports various interpolation [syntaxes](#%EF%B8%8F-variable-interpolation-syntaxes) and configuration [options](#%EF%B8%8F-cli-options)
- CLI & API Support – Use it in scripts, pipelines, or as a library directly in code

## 📦 Installation

### Npm

```bash
# Install globally
npm install -g dotenv-subst

# Install in local project
npm install -D dotenv-subst

# Install on the fly
npx dotenv-subst ...
```

### Brew

Homebrew formula (nodejs-free) coming soon!

## 💻 CLI Usage

`$ dotenv-subst [options] <source...>`

Each positional argument is interpreted as the path to a source file containing variable placeholders for interpolation. All the available options are documented in the dedicated [section](#%EF%B8%8F-cli-options) further down.

### In-place Replacement Example

Given these two files:

📄 `./.env.test`
```properties
USERNAME=jaydoe
GREETING=Hello
```
📄 `./my-test-file.md`
```markdown
{{GREETING}}, my name is ${USERNAME}.
```

Running this command:

```bash
dotenv-subst --env-file=.env.test my-test-file.md
```

Replaces the initial content:

📄 `./my-test-file.md`
```markdown
Hello, my name is jaydoe.
```

### Custom Output File Example

Given the same starting files of the [previous example](#in-place-replacement-example), if the following command is run instead:

```bash
dotenv-subst --env-file=.env.test --output=my-output.md my-test-file.md
```

The interpolated output is written to `./my-output.md`, while `./my-test-file.md` is left intact.

> [!TIP]
> For **more examples**, take a look at the e2e tests fixtures: each file in [this folder](https://github.com/duddu/dotenv-subst/tree/main/tests/e2e/fixtures) contains the same information as the examples above (command, source files, output), which are used there to configure and prepare the correspondent test suite.

### 🛠️ CLI Options

| Option                       | Default                 | Description                                                                                                                                                            |
| :--------------------------- | :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-o, --output <path>`        | *same as source file*   | Optional output file path–if omitted defaults to in-place interpolation<br><sub>⚠️ Only applicable when a *single* source file is provided</sub>    |
| `-f, --env-file <paths...>`  | `[]`                    | Path(s) to your env file(s)<br><sub>ℹ️ Forwarded to dotenvx without additional processing</sub>                                                  |
| `--ignore-unset-vars`        | `false`                 | Do not abort if source file(s) contain variables not defined in env file(s)                                                                                    |
| `--encoding <name>`          | `'utf-8'`               | Encoding of your source and env file(s)<br><sub>ℹ️ Both used internally and forwarded to dotenvx</sub>                                      |
| `--env-keys-file <path>`     | *same as env file*      | Path to your .env.keys file<br><sub>ℹ️ Forwarded to dotenvx without additional processing</sub>                            |
| `--convention <name>`        |                         | Load a .env convention (available conventions: `['nextjs', 'flow']`)<br><sub>ℹ️ Forwarded to dotenvx without additional processing</sub>                         |
| `-v, --verbose`              | `false`                 | Sets log level to verbose<br><sub>ℹ️ Both used internally and forwarded to dotenvx</sub>                                                                         |
| `-q, --quiet`                | `false`                 | Sets log level to error<br><sub>ℹ️ Both used internally and forwarded to dotenvx</sub>                                                                           |

For more information on options forwarded to Dotenvx please refer to its CLI [documentation](https://dotenvx.com/docs/advanced#cli).

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

## 🧑‍💻 Contribution

Contributions are welcome! Also please feel free to submit issues, bug reports, or requests in the [Issues](https://github.com/duddu/dotenv-subst/issues) section.

## ⚖️ License

This project is licensed under the BSD-3-Clause License. See the [LICENSE](https://github.com/duddu/dotenv-subst/blob/main/LICENSE) file for details.
