const { TableClient } = require('@azure/data-tables');

const connectionString = process.env.TableStorageConnectionString;
const tableClient = TableClient.fromConnectionString(connectionString, 'gamedata');

module.exports = async function (context, req) {
    const errors = [];
    for await (const entity of tableClient.listEntities()) {
        if (entity.partitionKey.startsWith('QUESTION_')) {
            try {
                await tableClient.deleteEntity(entity.partitionKey, entity.rowKey);
            } catch (error) {
                errors.push(error);
            }
        }
    }

    if (errors.length > 0) {
        const aggregateError = new Error('One or more errors occurred during delete operations');
        aggregateError.innerErrors = errors;
        throw aggregateError;
    }
};
