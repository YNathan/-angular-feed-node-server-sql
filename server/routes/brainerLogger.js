var dateFormat = require('dateformat');

infoLog = function(str){
    console.log(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss:l"), "INFO", str);
};

errorLog = function(str,errReceive){
    console.log(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss:l"), "ERROR", str+": ",errReceive);
};

module.exports = infoLog;

module.exports = errorLog;


class barinerLogger{
    static infoLog(str){
        console.log(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss:l"), "INFO", str);
    }

    static errorLog(str,errReceive){
        console.log(dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss:l"), "ERROR", str+": ",errReceive);
    }

}

module.exports = barinerLogger;
