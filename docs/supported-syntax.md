---
outline: false
---

# Variable Interpolation Syntaxes

When writing interpolation placeholders in your source files, you can choose between the following syntax styles:

| Syntax           | Example          |
| :--------------- | :--------------- |
| Shell-style      | <span v-pre>`${VAR_NAME}`</span>    |
| Handlebars-style | <span v-pre>`{{VAR_NAME}}`</span>   |
| GH Actions-style | <span v-pre>`${{VAR_NAME}}`</span>  |

All of them are supported at the same time, meaning you can have different placeholders written with different syntax styles even within the same source file.

::: info NOTE
This tool does not mandate any additional requirement on the actual variables syntax: 
- Variable names can include any allowed character and use any text case, e.g.:  
  <span v-pre>`${FOO}`, `{{bar}}`, `${{fooBar}}`</span>
- Whitespace inside brackets is ignored while capturing variable names, e.g.:  
  <span v-pre>`${ foo }`, `{{foo  }}`, `${{ foo}}`</span>
