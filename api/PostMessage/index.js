module.exports = async function (context, req) {
    const message = (req.body || {}).message;

    if (!message) {
        context.res = {
            status: 400,
            body: "Missing `message` field"
        };
        return;
    }

    return {
        "target": "newMessage",
        "arguments": [ message ],
    };
}
