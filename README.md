# Responsive App with BareKit 

A HTML app using the CSS framework BareKit and Gulp for workflow.

## Build

   Clone the repo.
   *npm install* 
   *gulp*

## Workflow

Do all your work in dev. Monitor & build by executing _gulp_. Distribute the 'dist' folder

## Deploy on Heroku

Add the following buildpack:

    heroku config:set BUILDPACK_URL=https://github.com/CHH/heroku-buildpack-php

Deploy the _dist_ folder:

    git subtree push --prefix dist heroku master

If you don't have subtree installed (in case you're running an old version of git), execute the following commands:

    git clone git://github.com/apenwarr/git-subtree.git
    cd git-subtree
    sudo sh install.sh
