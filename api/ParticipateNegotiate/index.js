module.exports = async function (context, req, connectionInfo) {
    context.res = {
        headers: {
            'Content-Type': 'application/json'
        },
        body: connectionInfo,
    };
};
