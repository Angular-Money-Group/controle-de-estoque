const logsSchema = require("../models/logsSchema");

const addLogs = async (user, logs) => {
    user.logs = logs;
    const log = new logsSchema({ user: user.name, ...user.logs });

    try {
        await user.save();
        await log.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = addLogs;