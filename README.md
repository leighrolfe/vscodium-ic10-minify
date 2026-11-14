# IC10 Minify

A VSCodium / VS Code extension that minifies [Stationeers](https://store.steampowered.com/app/544550/Stationeers/) IC10 scripts, so more logic fits in the chip's line and character limits.

## Example

Before (19 lines):

```
# Turns a pump on while the tank pressure is below target.
alias Pump d0
alias Tank d1
alias Reading r0
alias Running r1
define Target 5000 # kPa

# Main loop.
main:
yield
jal readTank
slt Running Reading Target # 1 if below target
s Pump On Running
j main

# Reads the tank pressure into Reading.
readTank:
l Reading Tank Pressure
j ra
```

After (9 lines):

```
define daa 5000
dlaa:
yield
jal dlab
slt r1 r0 daa
s d0 On r1
j dlaa
dlab:
l r0 d1 Pressure
j ra
```

## What it does

Steps run in this order:

1. **Strip comments**: full-line and inline `#` comments. A `#` inside a quoted string is kept.
2. **Strip whitespace**: indentation, trailing spaces, repeated spaces and blank lines.
3. **Inline register aliases**: `alias Name r0` is removed and `Name` is replaced by `r0` everywhere. Covers `r0`–`r15`, `ra` and `sp`.
4. **Inline device aliases**: the same for `d0`–`d5` and `db`.
5. **Compress defines**: define names become `daa`, `dab`, … `dzz`, in order of definition.
6. **Compress labels**: label names become `dlaa`, `dlab`, … `dlzz`, in order of definition, and every reference (`j`, `jal`, branches) is updated.

Details:

- Aliases are processed top to bottom, so redefining an alias (`alias Dev d0` … `alias Dev d1`) and alias chains (`alias B A`) work.
- Aliases to anything else, such as `alias Tank HASH("Tank")`, are left as they are.
- Text inside quoted strings is never modified.
- Generated names skip any name already used in your script. If more than 676 defines or labels exist, the extras keep their original names.

## Usage

Open an IC10 script and run one of these from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

- **IC10: Minify to File**
- **IC10: Minify to Clipboard**

Both work on the current selection if there is one, otherwise on the whole file. Your original file is never modified.

**Minify to File** saves the result next to the original as `<name>.min.<ext>` (for example `pump.ic10` becomes `pump.min.ic10`) and opens it beside the original. If that file already exists you are asked whether to overwrite it. If you decline, or the document hasn't been saved yet, the result opens in an untitled editor instead.

## Install

Download the `.vsix` file, then either:

```
codium --install-extension ic10-minify-<version>.vsix
```

or open the Extensions view, choose **⋯ → Install from VSIX…**, and pick the file. It also works in VS Code (`code --install-extension …`).

## Limitations

- **Absolute line-number jumps break.** Removing comments, blank lines and alias lines shifts line numbers, so `j 12` or `beq r0 r1 12` will point at the wrong line. Jumps by label are safe, because labels are renamed along with their references.
- Renaming is based on whole-word matches and assumes alias, define and label names are unique identifiers. Indirect forms such as `dr0` / `rr0` are not treated as aliases.
- Always test a minified script in game before relying on it.

## Build from source

Requires Node.js and npm.

```
npm install
npm test            # compile and run the tests
npm run package     # produces ic10-minify-<version>.vsix
```

To debug, open the folder in VS Code / VSCodium and press `F5` to launch an Extension Development Host.

### Project layout

```
src/
  extension.ts         registers the commands
  commands/            one module per command (openMinified, copyMinified)
  editor.ts            getEditor, registerEditorCommand, minifyEditor
  minifiedFile.ts      saved-file handling: target path, overwrite prompt, write
  minPath.ts           name.ext -> name.min.ext
  openDocument.ts      open a file or an untitled editor beside the current one
  minify.ts            the ordered list of steps
  steps/               one module (and test) per step
  names.ts             short-name generator shared by the define and label steps
  tokenize.ts          quote-aware tokenizer
```

To add a step, create a module in `src/steps/` that exports a `Step` (`(lines: string[]) => string[]`) and add it to the list in `src/minify.ts`.

## License

MIT. See the `LICENSE` file.
