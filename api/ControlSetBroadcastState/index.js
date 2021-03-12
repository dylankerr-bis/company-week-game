module.exports = async function (context, req) {
    const state = (req.body || {}).state;

    if (!state) {
        context.res = {
            status: 400,
            body: "Missing `state` field"
        };
        return;
    }

    return {
        "target": "setState",
        "arguments": [ state ],
    };
}
