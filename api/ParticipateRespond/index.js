const { TableClient } = require('@azure/data-tables');

const connectionString = process.env.TableStorageConnectionString;
const tableClient = TableClient.fromConnectionString(connectionString, 'gamedata');

module.exports = async function (context, req) {
    const user = req.headers["x-ms-client-principal"];
    const body = req.body || {};
    const questionId = body.questionId;
    const optionId = body.optionId;

    if (!user) {
        context.res = {
            status: 400,
            body: "Missing `x-ms-client-principal` header"
        };
        return;
    }
    if (!questionId) {
        context.res = {
            status: 400,
            body: "Missing `questionId` field"
        };
        return;
    }
    if (!Number.isInteger(optionId)) {
        context.res = {
            status: 400,
            body: "Missing or invalid `optionId` field"
        };
        return;
    }

    try {
        await tableClient.createEntity({
            PartitionKey: `QUESTION_${questionId}`,
            RowKey: user,
            OptionId: optionId,
        });
    } catch (err) {
        // HTTP 409 Conflict should be passed through as-is.
        if (err.statusCode !== 409) {
            throw err;
        }
        context.res = {
            status: 409,
            body: 'Matching response already exists',
        };
    }
};
