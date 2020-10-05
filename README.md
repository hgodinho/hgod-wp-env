# HGod-wp-env

A WordPress development environment.

***
Go to: [Changelog](changelog.md) | [License](license.txt) | [References](references.md)
***

#### Table of Contents

  1. [Features](#features)
  2. [Requirements](#requirements)
  3. [Install](#install)
  4. [Usage](#usage)
  5. [Node scripts](#node-scripts)
  6. [Composer scripts](#composer-scripts)

## 1. Features

* [wp-env](https://developer.wordpress.org/block-editor/packages/packages-env/)
* [eslint](https://eslint.org/)
* [gulp](https://gulpjs.com/)
* [phpcs](https://github.com/squizlabs/PHP_CodeSniffer)
* [wpcs](https://github.com/WordPress/WordPress-Coding-Standards)

## 2. Requirements

* [Docker](https://www.docker.com/) installed
* [Composer](https://getcomposer.org/)
* [node and npm](https://nodejs.org/)

## 3. Install

Start with a simple clone

`git clone https://github.com/hgodinho/hgod-wp-env.git`

Then do a `npm install`, this may take a time — go grab a coffee.

Finally, `composer install` and you are good to go.

**recommended: remove the git tracker from this environment, so you can `git init` your own project*

`rm -rf .git`

## 4. Usage

1. **Start Environment**

    To start the environment you just need to `npm run wp-env start` — this will instantiate the docker image and create a wordpress site at `http://localhost:8888/`.

    To access the admin, go to `http://localhost:8888/wp-admin` and pass the user `admin` with the pass `password`. [See wp-env docs](https://developer.wordpress.org/block-editor/packages/packages-env/).

    Your plugin will be already installed and activated.

    You can now do your magic!

2. **Edit Files**
   
   Edit the files from the `src/` folder. You must maintain the same folder structure to ensure the correct functioning of the environment.

   **Folder structure:**

    ```
        hgod-wp-env
    ├── .eslintrc.json
    ├── .wp-env.json
    ├── CHANGELOG.md [EDIT this with your own changelog]
    ├── README.md [EDIT this with your own readme]
    ├── REFERENCES.md [EDIT this with your own references]
    ├── composer.json [EDIT to add your deps]
    ├── composer.lock
    ├─> dist [The folder that you are going to distribute]
    ├─> gulpfile.babel.js [Gulp taks]
    │   ├── index.js
    │   └─> modules
    │       ├── assets.babel.js
    │       ├── clean.babel.js
    │       ├── clean.css.tmp.babel.js
    │       ├── clean.js.tmp.babel.js
    │       ├── clean.tmp.babel.js
    │       ├── css.babel.js
    │       ├── eslint.babel.js
    │       ├── js.babel.js
    │       └── php.babel.js
    ├── hgod-wp-env.php [EDIT this, this is the entry point for your wordpress plugin on DEV mode]
    ├── license.txt
    ├── package-lock.json
    ├── package.json [EDIT this to add your deps]
    ├─> src [Here's where the magic happens.]
    │   ├─> assets [Keep this folder if you have images]
    │   │   └── image-1.jpg
    │   ├─> js
    │   │   └── scripts.js [This is the main entry for the js, don't rename this, unless you also rename in the gulp tasks]
    │   ├─> php [the folder to put your php files]
    │   │   ├── class-my-class.php [the main plugin file, rename this with your plugin name]
    │   │   └─> templates [template parts for plugin]
    │   │       └── template-part.php
    │   └─> scss [sass files]
    │       ├─> components
    │       │   └── teste1.scss
    │       └── styles.scss
    └─> tmp [temporary folder used by some gulp tasks]
    ```


3. **Stop Environment**

   `npm run wp-env stop` to stop the environment from docker and liberate the ports.

4. ***Optional: More environment options***

    You can always pass some more options to `run npm wp-env` just like passed in the [wp-env docs](https://developer.wordpress.org/block-editor/packages/packages-env/)

## 5. Node scripts

To run the following scripts prepend the script name with `npm run`

**File:** `package.json`

```json
"scripts": {
        "wp-env": "node ./node_modules/@wordpress/env/bin/wp-env",
        "build": "node ./node_modules/gulp/bin/gulp.js default",
        "php": "node ./node_modules/gulp/bin/gulp.js phpCopy",
        "assets": "node ./node_modules/gulp/bin/gulp.js assetsFunction",
        "css": "node ./node_modules/gulp/bin/gulp.js cssFunction",
        "eslint": "node ./node_modules/gulp/bin/gulp.js eslintFunction",
        "js": "node ./node_modules/gulp/bin/gulp.js jsFunction",
        "js-build": "node ./node_modules/gulp/bin/gulp.js jsBuild",
        "js-deps": "node ./node_modules/gulp/bin/gulp.js jsDeps",
        "js-concat": "node ./node_modules/gulp/bin/gulp.js jsConcat",
        "js-concat-min": "node ./node_modules/gulp/bin/gulp.js jsConcatMin",
        "clean": "node ./node_modules/gulp/bin/gulp.js cleanFunction",
        "clean-tmp": "node ./node_modules/gulp/bin/gulp.js cleanTmpFunction",
        "clean-js-tmp": "node ./node_modules/gulp/bin/gulp.js cleanJsTmpFunction",
        "clean-css-tmp": "node ./node_modules/gulp/bin/gulp.js cleanCssTmpFunction"
    }
```

* **`npm run wp-env`** use with the options: `start`, `stop` or `restart`.
* **`npm run build`** *Gulp task* to build the project, this tasks loops thru all the other tasks to build the entire project. Use with the flag `--prod` to build minified versions of the css and the js files.
* **`npm run php`** *Gulp task* to copy the php files from the `src/php` to `dist/**/*`.
* **`npm run assets`** Gulp task to minify the images at the `src/assets` folder and save to `dist/assets`.
* **`npm run css`** *Gulp task* to convert the `sass` files to `css`. If the flag `--prod` is passed, the css will be cleaned, autoprefixed and minified.
* **`npm run eslint`** *Gulp task* to eslint your js files.
* **`npm run js`** *Gulp task* to call all the js tasks below, pass the flaf `--prod` to produce uglified versions of the js files.
* **`npm run js-build`** *Gulp task* that do babel on files, concat all the files into one, and if the flag `--prod` is passed, the files will be uglified.
* **`npm run js-deps`** *Gulp Taks* to concat all deps into one file.
* **`npm run js-concat`** and **`npm run js-concat-min`** *Gulp tasks* to concatenate all the build js and deps files into one, if the `js-concat-min` is called than the results will be minified.
* **`npm run clean`** *Gulp task* to clean the `dist/` folder.
* **`npm run clean-tmp`** *Gulp task* to clean the `tmp/` folder.
* **`npm run clean-js-tmp`** *Gulp task* to delete all the js files from the `tmp/` folder.
* **`npm run clean-css-tmp`** *Gulp task* to delete all the css files from the `tmp/` folder.

*all the gulp tasks can be found at the ***`gulp.babel.js/`*** folder*

## 6. Composer scripts

**File:** `composer.json`

To run the following scripts prepend the script name with `composer run-script`

```json
"scripts": {
    "phpcs": "php vendor/squizlabs/php_codesniffer/bin/phpcs --standard=WordPress",
    "phpcbf": "php vendor/squizlabs/php_codesniffer/bin/phpcbf --standard=WordPress"
}
```

After the script name insert your file path.

Example: `composer run-script phpcs src/php/class-my-class.php`

* **`composer run-script phpcs`** do the codesniffer for php, it will throw all the problems with your code at the terminal.
* **`composer run-script phpcbf`** similar `phpcs`, but also fix all the fixable problems.
