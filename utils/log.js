var log4js = require('log4js');


/*   打印日志管理   */
log4js.configure({
    appenders: {
        dateFileLog: {
            type: 'file',
            filename: 'logs/log.log',
            backups: 3,
            maxLogSize: 2048
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['dateFileLog'],
            level: 'error'
        },
        console: {
            appenders: ['console'],
            level: 'debug'
        }
    }
});

const logger = log4js.getLogger('console');

const log = log4js.getLogger();

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Comté.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
//


module.exports = {
   _console: logger,
   _log: log
};


