# Dev tools
### Build android
//TODO



### Ignore a Flow error
To ignore a flow error use the comment `$FlowFixMe`.
```javascript
    // $FlowFixMe
    const someLineError = new MyObject();
```

### Disable a Es-Lint check for a line
Use the comment `eslint-disable-line` or `eslint-disable-line` followed by the name
of the rule you are breaking.

```javascript
    //eslint-disable-next-line no-var
    var someLineError = new MyObject();

    console.log('teste'); //eslint-disable-line no-console

```

### VsCode Plug-ins
- Prettier formatter for Visual Studio Code _(esbenp.prettier-vscode)_
- Flow Language Support _(flowtype.flow-for-vscode)_
- ESLint _(dbaeumer.vscode-eslint)_

### VsCode config
```json
{
    "javascript.validate.enable": false,
    "flow.useNPMPackagedFlow": true,
    "editor.rulers": [80, 100],
    "prettier.trailingComma": "es5",
    "prettier.singleQuote": true,
    "prettier.tabWidth": 4,
    "prettier.eslintIntegration": true,
    "extensions.ignoreRecommendations": true,
    "eslint.autoFixOnSave": true,
    "files.associations": {
        "*.js": "javascriptreact"
    }
}
```