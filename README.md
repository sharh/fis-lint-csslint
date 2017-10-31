# Usage

> `fis-conf.js`

```JavaScript
fis.match( '*.css', {
    lint: fis.plugin('css', {
        rules: {},// rules: https://github.com/CSSLint/csslint/wiki/Rules
        formatter: {
            formatterId: 'formatterId', // formatterId
            options: {} //formatter options
        }
    })
})
```

> rules如果没提供使用默认的rules，见[csslint rules](https://github.com/CSSLint/csslint/wiki/Rules).
> formatter根据`csslint`提供的`formatterId`，如果没有默认使用`formatters`目录下的`csslint-friendly-formatter`，此插件是基于`eslint-friendly-formatter改造`