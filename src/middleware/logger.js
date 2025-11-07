const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '..', '..', 'logs', 'server.log');

const ensureLogsDirectory = () => {
    const logsDir = path.dirname(logFile);
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }
};

const logger = {
    info: (message) => {
        ensureLogsDirectory();
        const timestamp = new Date().toISOString();
        const logMessage = `[INFO] [${timestamp}] ${message}\n`;
        
        console.log(logMessage.trim());
        fs.appendFileSync(logFile, logMessage);
    },
    
    error: (message) => {
        ensureLogsDirectory();
        const timestamp = new Date().toISOString();
        const logMessage = `[ERROR] [${timestamp}] ${message}\n`;
        
        console.error(logMessage.trim());
        fs.appendFileSync(logFile, logMessage);
    },
    
    warn: (message) => {
        ensureLogsDirectory();
        const timestamp = new Date().toISOString();
        const logMessage = `[WARN] [${timestamp}] ${message}\n`;
        
        console.warn(logMessage.trim());
        fs.appendFileSync(logFile, logMessage);
    }
};

module.exports = logger;