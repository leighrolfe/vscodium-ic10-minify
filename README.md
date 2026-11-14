# IC10 Minify

Minifies Stationeers IC10 code:

1. Strips `#` comments (full-line and inline)
2. Strips whitespace (indentation, trailing space, repeated spaces, blank lines)

Commands (Command Palette):

- **IC10: Minify (Open in New Editor)**
- **IC10: Minify (Copy to Clipboard)**

Both act on the selection if there is one, otherwise the whole file.

Note: jumps by absolute line number (`j 12`, `beq r0 r1 12`) will break because line numbers shift. Labels are unaffected.
