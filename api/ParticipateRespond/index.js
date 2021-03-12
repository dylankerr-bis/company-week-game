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

    return {
        PartitionKey: `QUESTION_${questionId}`,
        RowKey: user,
        OptionId: optionId,
    };
};
