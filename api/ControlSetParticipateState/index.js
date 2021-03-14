module.exports = async function (context, req) {
    const state = (req.body || {}).state;
    return {
        "target": "setState",
        "arguments": [ state ],
    };
}
