module.exports = async function (context, req, responses) {
    const aggregatedResponses = responses
        .filter(response => Number.isInteger((response || {}).OptionId))
        .reduce(
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
            aggregatedResponses,
        },
    };
};
