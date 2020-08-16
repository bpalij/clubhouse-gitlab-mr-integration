# Clubhouse gitlab merge request integration
Tampermonkey script, copies correct link for gitlab merge request integration with clubhouse

# WARNING! PROJECT NOT MAINTAINED BECAUSE AUTHOR DOES NOT WORK WITH CLUBHOUSE NOW

## Installation

1. Install [Tampermonkey](http://www.tampermonkey.net/) for your browser
2. Go to [this link](https://github.com/bpalij/clubhouse-gitlab-mr-integration/raw/master/clubhouse-gitlab-mr-integration.user.js)
3. Allow installation of the script
4. Ready

## Usage

1. Go to clubhouse story
2. Click "Copy" button ![Clubhouse screenshot](/illustrations/clubhouse.PNG)
3. Create gitlab merge request or edit existing gitlab merge request
4. Insert copied text in description ![Gitlab screenshot](/illustrations/gitlab.PNG)
5. Save merge request
6. Ready

## For developers

To use eslint you need to have node version ^10.12.0 || >=12.0.0, husky needs Node >= 10 and Git >= 2.13.0.

1. `npm i`
2. `npm run eslint` for check; `npm run eslint-fix` for autofix

If you want to integrate VS code or other IDE/editor with Tampermonkey, you can use [this instruction](https://stackoverflow.com/a/55568502)

