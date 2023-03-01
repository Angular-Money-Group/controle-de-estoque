const logsSchema = require("../models/logsSchema");

const addLogs = async (user, logs) => {
    user.logs = logs;
    const log = new logsSchema({ user: user.name, action: logs.action, date: logs.date, description: logs.description });
    
    try {
        await user.save();
        await log.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = addLogs;