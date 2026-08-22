# Attribution — "adminlte-classic" template ("Classic Admin")

The visual identity of this template was inspired by the open source
project AdminLTE (https://github.com/ColorlibHQ/AdminLTE), licensed
under MIT. No AdminLTE source code was copied; the files in this
directory are original specifications derived by observing the
project's public visual identity.

## What was observed, and what was done with it

The values in `tokens/*.json` (colors, typography, spacing, border
radii, shadows, breakpoints) were obtained by reverse-engineering
publicly available AdminLTE artifacts (the project's public SCSS
source code, used only as a source for observing values — not copied
into this repository) and were written from scratch, with our own
naming and format (W3C Design Tokens), in this repository.

The files in `specs/*.md` and `patterns/*.md` are 100% original text,
written by observing the behavior and anatomy of the components,
without copying any excerpt of AdminLTE's documentation or code.

The display name of this template is **"Classic Admin"**. The
technical folder identifier `adminlte-classic` is used only
internally, as a provenance reference, and must not be presented to
end users as if it were the AdminLTE project or had any official
association with it, with Colorlib, or with AdminLTE.io.

No icon, image, binary font, or other AdminLTE asset was reused in
this template. Should it become necessary to reuse any AdminLTE
binary asset in the future, that requires a separate license check
before being incorporated (some third-party plugins historically
bundled with AdminLTE have, in the past, carried licenses other than
MIT).

## Original AdminLTE license

The text below is the original MIT license of the AdminLTE project
(ColorlibHQ), reproduced in full as required by the terms of the MIT
license, to preserve the copyright notice of the parts whose visual
identity was observed to create this template.

```
MIT License

Copyright (c) 2014-2023 ColorlibHQ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## License of this directory's content

Everything else in this directory (`tokens/*.json`, `specs/*.md`,
`patterns/*.md`, `README.md`, the demo app in `demo/`) is original,
produced by deep-ion-ai, and is licensed under MIT — see `/LICENSE`
at the root of this repository.
