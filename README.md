# Generate email template

## Installation
1. Install [node.js](https://nodejs.org/en/)
2. Install [gulp-cli](http://gulpjs.com/): `sudo npm install -g gulp-cli`
3. [Download archive](https://github.com/sa2rn/email-template-generator/archive/master.zip). And extract it.
4. Run `npm install`

## Configure
Copy config.json.dist to config.json and configure it.

## Tasks
- `gulp` - Run [browsersync](https://www.browsersync.io/) to test your templates in different devices
- `gulp build` - Build templates
- `gulp send:index` - Send email. Where "index" is your template name

## Recommendation

You can use [Foundation for Emails](http://foundation.zurb.com/emails/docs.html).

