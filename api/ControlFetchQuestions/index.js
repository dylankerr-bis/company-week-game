module.exports = async function (context, req, questions) {
    context.res = {
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            questions,
        },
    };
};
