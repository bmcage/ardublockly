# To update

Did you do changes in the blockly core? Then update the typings

    cd blockly
    npm run typings

the last will only work if you did once `sudo apt install npm` to install npm, and if you installed dependencies in the blockly directory:

    npm install

To build blockly again

    npm run build

the last will only work if you installed gulp

    sudo npm install gulp-cli -g
    npm install gulp

# How to Update to the latest version of blockly ?

You want to update to latest upstream blockly? Then do the following

    cd blockly
    git remote add -f blockly https://github.com/google/blockly.git
    git fetch blockly master
    git subtree pull --prefix blockly blockly master

Now, fix all the merge errors, then commit.
Remove the upstream afterward.


# Do development

Do you changes, then build

    cd blockly
    npm run build

See package.json for other argumens for run. External dependencies must be given in directory externs.

# closure compiler

Part of npm now, becomes available on `npm install`, no need to include in git ...

You need to annotate functions, see [annotating Javascript](https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#type-type)

