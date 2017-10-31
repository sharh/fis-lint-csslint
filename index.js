var CssLint = require('csslint').CSSLint;
var defaultFormatter = require('./formatters/csslint-friendly-formatter.js');
module.exports = function (content, file, conf) {
    var report,
        infoStr = '',
        messages,
        rules = conf.rules;
    report = CssLint.verify(content, rules);
    if (!report || !report.messages.length) {
        fis.log.info(' %s %s\n', file.id, 'pass!'.green);
        return;
    }
    if(conf.formatter && conf.formatter.formatterId && CssLint.hasFormat(conf.formatter.id)){
        messages = CssLint.format(report, file.id, conf.formatter.formatterId, conf.formatter.options);
    }else{
        var resMessages = [];
        var results = [];
        var errorCount = warningCount = 0;
        for(var i = 0, len = report.messages.length; i < len; i++){
            var msg = report.messages[i];
            var severity = 0;
            if(msg.type === 'warning'){
                warningCount++;
                severity = 1;
            }else if(msg.type === 'error'){
                errorCount++;
                severity = 2;
            };
            resMessages.push({
                ruleId: msg.rule.id,
                severity: severity,
                message: msg.message,
                nodeType: msg.rule.name,
                source: msg.evidence,
                line: msg.line,
                column: msg.col
            });
        }
        results.push({
            messages: resMessages,
            filePath: file.origin,
            errorCount: errorCount,
            warningCount: warningCount,
            fixableErrorCount: 0,
            fixableWarningCount: 0,
            output: content
        })
        messages = defaultFormatter(results);
    }
    fis.log.warning(' %s \n ', messages.yellow);
}