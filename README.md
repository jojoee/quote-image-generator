# quote-image-generator
FREE Quote Image Generator

[![Screenshot](https://raw.githubusercontent.com/jojoee/quote-image-generator/gh-pages/screenshot.jpg "Screenshot")](http://jojoee.github.io/quote-image-generator/)

## Note
- Inspiration by [freelance.splendith.com](http://freelance.splendith.com/)
- Default width & height: 520px
- Support 5 maximum lines
- Image or solid background selection 
- Font style and color selection

## Getting Started
1. Set path (e.g. `cd C:\xampp\htdocs\jojoee.com\quote-image-generator`)
2. Install bower `npm install -g bower`
3. Install dependencies `bower install && npm install`
4. Start `gulp`

## TODO
- [x] Add background colors / images (keep last 5 colors / images both on localStorage and web url)
- [x] Add font size
- [x] Add font color
- [ ] Login via `facebook` for publishing (also keep login session / detail)
- [ ] Automatically publish into your `facebook` status / your `facebook` page (with message)
- [ ] Add multi font weight
- [ ] Add page name input
- [ ] Add page avatar input
- [ ] Remove unused files / configs
- [x] Support multi-lines
- [ ] Detect `empty` line
- [ ] Detect input width (prevent text-overflow on the canvas)
- [x] Update algorithm
- [ ] Correct algorithm for even number of lines
- [ ] Add english font
- [ ] Port to `Angular`
- [ ] Clear canvas on `text area` only (instead clear all canvas area)
- [ ] Update default canvas width / height to 690px;

## Thanks
- [Simple Gulp](https://github.com/jojoee/simple-gulp)
