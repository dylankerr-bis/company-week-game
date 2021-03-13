module.exports = async function (context, req, responses) {
    const validResponses = responses.filter(
        response => Number.isInteger((response || {}).OptionId)
    );
    const aggregatedResponses = validResponses.reduce(
        (acc, response) => {
            acc[response.OptionId] = (acc[response.OptionId] || 0) + 1;
            return acc;
        },
        {}
    );

    context.res = {
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            responseCount: validResponses.length,
            aggregatedResponses,
        },
    };
};
