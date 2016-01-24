# Foundation / Jekyll Blog Template

This is a starter template for a Jekyll blog using Zurb Foundation 6. It uses Gulp to build the project

It is based on the Foundation Zurb Template https://github.com/zurb/foundation-zurb-template and includes

- Sass compilation and prefixing
- JavaScript concatenation
- Built-in BrowserSync server
- For production builds:
  - CSS compression
  - JavaScript compression
  - Image compression
  
(Panini page compilation has been removed as we're using Jekyll)

If you are only interested in the Foundation Sass components, it might be simpler just to use native Jekyll support for Sass

It uses a basic Foundation HTML blog template found here http://foundation.zurb.com/templates.html

## Prerequisites

You'll need:

- [NodeJS](https://nodejs.org/en/) (0.12 or greater)
- [Jekyll](http://jekyllrb.com/) 

## Installation

Clone the repo:

```bash
git clone https://github.com/zurb/foundation-zurb-template projectname
```

Open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Run `npm start` to run Gulp. Your finished site will be created in a folder called `dist`, viewable at this URL:

```
http://localhost:8000
```