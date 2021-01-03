import { makeHTTPRequest, makeHTTPSRequest } from '@dnpr/make-request';
import { Logger } from '@dnpr/logger';

/** Import libraries. */
/**
 * @category Library Internal
 */
const log = new Logger("notionapi-agent");

/**
 * @category Error
 */
class RequestError extends Error {
    constructor(message) {
        super();
        this.name = "RequestError";
        Object.setPrototypeOf(this, RequestError.prototype);
        this.message = message;
    }
}

/** Import libraries. */
const URL = (typeof window !== "undefined" && window.URL) ?
    window.URL : require("url").URL;
/**
 * @category Library Internal
 */
function post(url) {
    const myURL = new URL(url);
    if (myURL.protocol !== "http:" && myURL.protocol !== "https:") {
        throw new RequestError(`Unsupported protocol: ${myURL.protocol}`);
    }
    const port = myURL.port
        ? myURL.port : (myURL.protocol === "http:")
        ? 80 : 443;
    const agentOptions = {
        hostname: myURL.hostname,
        authority: myURL.hostname,
        port: port,
        path: myURL.pathname + myURL.search,
        method: "POST",
        headers: {}
    };
    return {
        setHeader: function (key, value) {
            agentOptions.headers[key] = value;
            return this;
        },
        sendAsJson: async function (body) {
            log.debug(`http-util.ts: ${agentOptions.method} ${agentOptions.hostname} \
${agentOptions.port} ${agentOptions.path}`);
            /** @dnpr/make-request only support these two. */
            this.setHeader("accept-encoding", "gzip, deflate");
            this.setHeader("content-type", "application/json");
            let payload = "";
            try {
                if (body)
                    payload = JSON.stringify(body);
            }
            catch (error) {
                throw error;
            }
            let response;
            try {
                if (myURL.protocol === "http:") {
                    response = await makeHTTPRequest(agentOptions, payload);
                }
                else {
                    response = await makeHTTPSRequest(agentOptions, payload);
                }
            }
            catch (error) {
                throw error;
            }
            try {
                return JSON.parse(response.responseBuffer);
            }
            catch (error) {
                throw error;
            }
        } // send
    }; // return
} // post

/**
 * @category Library Constant
 */
const Default = {
    server: "https://www.notion.so",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
};

/**
 * @category Error
 */
class APIError extends Error {
    constructor(error) {
        super();
        this.name = "APIError";
        Object.setPrototypeOf(this, APIError.prototype);
        this.message = `Server says "${error.name}: ${error.message}`;
        if (error.status) {
            this.message += ` Status: ${error.status}`;
        }
        this.message += "\"";
    }
}

/** Import other sripts. */
/**
 * Create an asynchronous Notion API function.
 * @param url The API's full URL.
 * @param token The API token for authentication.
 *
 * @category Library Internal
 */
function createAPI(url, token) {
    log.debug(`agent.ts: Create API function with\
 URL "${url}"`);
    return async function (req) {
        log.debug(`agent.ts: Call API "${url}".`);
        const result = await post(url)
            .setHeader("accept", "*/*")
            .setHeader("accept-language", "en-US,en;q=0.9")
            .setHeader("cookie", `token_v2=${token};`)
            .setHeader("origin", Default.server)
            .setHeader("referer", Default.server)
            .setHeader("user-agent", Default.userAgent)
            .sendAsJson(req);
        if (result.hasOwnProperty("errorId")) {
            const error = result;
            throw new APIError(error);
        }
        return result;
    };
}
/**
 * Create a Notion API agent.
 * @param opts A config object.
 *
 * @category Library
 */
function createAgent(opts = {}) {
    const token = opts.token ? opts.token : "";
    const server = opts.server ? opts.server : Default.server;
    if (opts.debug) {
        log.setLogLevel("debug");
    }
    log.debug(`agent.ts: Create API agent with\
 server "${server}" and token "${token.substr(0, 9)}..."`);
    const getActivityLog = createAPI(`${server}/api/v3/getActivityLog`, token);
    const getAssetsJson = createAPI(`${server}/api/v3/getAssetsJson`, token);
    const getRecordValues = createAPI(`${server}/api/v3/getRecordValues`, token);
    const getSnapshotsList = createAPI(`${server}/api/v3/getSnapshotsList`, token);
    const getUserSharedPages = createAPI(`${server}/api/v3/getUserSharedPages`, token);
    const loadPageChunk = createAPI(`${server}/api/v3/loadPageChunk`, token);
    const loadUserContent = createAPI(`${server}/api/v3/loadUserContent`, token);
    const queryCollection = createAPI(`${server}/api/v3/queryCollection`, token);
    const submitTransaction = createAPI(`${server}/api/v3/submitTransaction`, token);
    const enqueueTask = createAPI(`${server}/api/v3/enqueueTask`, token);
    const getTasks = createAPI(`${server}/api/v3/getTasks`, token);
    return {
        getActivityLog,
        getAssetsJson,
        getRecordValues,
        getSnapshotsList,
        getUserSharedPages,
        loadPageChunk,
        loadUserContent,
        queryCollection,
        submitTransaction,
        enqueueTask,
        getTasks,
    };
}

export { createAgent };
