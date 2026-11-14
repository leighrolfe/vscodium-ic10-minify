# IC10 Minify

Minifies Stationeers IC10 code. Steps, in order:

1. Strip `#` comments (full-line and inline; `#` inside quoted strings is kept)
2. Strip whitespace (indentation, trailing space, repeated spaces, blank lines)
3. Replace register aliases (`r0`–`r15`, `ra`, `sp`) with the register; drop the alias line
4. Replace device aliases (`d0`–`d5`, `db`) with the device; drop the alias line
5. Rename `define` names to `daa`, `dab`, … `dzz` in order of definition

Aliases to anything else (e.g. `HASH("...")`) are left as is. Alias redefinitions and alias chains are handled top to bottom.

Commands (Command Palette):

- **IC10: Minify (Open in New Editor)**
- **IC10: Minify (Copy to Clipboard)**

Both act on the selection if there is one, otherwise the whole file.

Note: jumps by absolute line number (`j 12`, `beq r0 r1 12`) will break because line numbers shift. Labels are unaffected.
