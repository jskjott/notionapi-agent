/** Import typings. */
import { API } from "./interfaces";
/**
 * Options to config a Notion API agent instance.
 *
 * @category Library
 */
interface CreateAgentOptions {
    /** Web address of the API server. Default: `"https://www.notion.so"`. */
    server?: string;
    /**
     * Notion API token. Default: `""`.
     * {@link https://github.com/dragonman225/notionapi-agent/blob/master/documentation/obtain-token/obtain-token.md | How to get it ?}
     */
    token?: string;
    /** Whether to trun on debug message. Default: `false`. */
    debug?: boolean;
}
/**
 * Notion API agent instance.
 *
 * @category Library
 */
interface Agent {
    /**
     * POST /api/v3/getActivityLog
     *
     * Get user activities of a navigable block, e.g. a page.
     * Equivalent to the "Updates" button in Notion's UI.
     *
     * @remark Must be authenticated even for public blocks.
     */
    getActivityLog: (req: API.GetActivityLog.Request) => Promise<API.GetActivityLog.Response>;
    /**
     * POST /api/v3/getAssetsJson
     *
     * Get a list of static asset paths, current version number, and more.
     */
    getAssetsJson: (req: API.GetAssetsJson.Request) => Promise<API.GetAssetsJson.Response>;
    /**
     * POST /api/v3/getRecordValues
     *
     * Get records by table name and id.
     *
     * If a {@link RecordRequest} is the i<sup>th</sup> element
     * of {@link GetRecordValues.Request.requests}, its result is
     * the i<sup>th</sup> element of {@link GetRecordValues.Response.results}.
     */
    getRecordValues: (req: API.GetRecordValues.Request) => Promise<API.GetRecordValues.Response>;
    /**
     * POST /api/v3/getSnapshotsList
     *
     * @remark Must be authenticated even for public blocks.
     */
    getSnapshotsList: (req: API.GetSnapshotsList.Request) => Promise<API.GetSnapshotsList.Response>;
    /**
     * POST /api/v3/getUserSharedPages
     *
     * Get ids of pages created with **+ New Page** button at the top level
     * of the user's workspace *AND* those not created at the top level of
     * the user's workspace but had been moved to the top level some time
     * after created.
     *
     * To always get the top level pages of the user's workspace,
     * use {@link Agent.loadUserContent}.
     */
    getUserSharedPages: (req: API.GetUserSharedPages.Request) => Promise<API.GetUserSharedPages.Response>;
    /**
     * POST /api/v3/loadPageChunk
     *
     * Load some data related to a page.
     */
    loadPageChunk: (req: API.LoadPageChunk.Request) => Promise<API.LoadPageChunk.Response>;
    /**
     * POST /api/v3/loadUserContent
     *
     * Get top level page blocks (`block` in
     * {@link LoadUserContent.Response.recordMap}),
     * user information, and workspace information.
     */
    loadUserContent: (req: API.LoadUserContent.Request) => Promise<API.LoadUserContent.Response>;
    /**
     * POST /api/v3/queryCollection
     *
     * Query a collection by id, view id,
     * with aggregate, filter, sort functions.
     *
     * To configure aggregate, filter, sort parameters, see
     * {@link QueryCollection.Request.query}.
     *
     * Set `limit` in {@link QueryCollection.Request.loader}
     * to limit maximum number of items in response data.
     */
    queryCollection: (req: API.QueryCollection.Request) => Promise<API.QueryCollection.Response>;
    /**
     * POST /api/v3/submitTransaction
     *
     * Make changes to documents and settings.
     */
    submitTransaction: (req: API.SubmitTransaction.Request) => Promise<API.SubmitTransaction.Response>;
    enqueueTask: (req: API.EnqueueTask.Request) => Promise<API.EnqueueTask.Response>;
    getTasks: (req: API.GetTasks.Request) => Promise<API.GetTasks.Response>;
}
/**
 * Create a Notion API agent.
 * @param opts A config object.
 *
 * @category Library
 */
declare function createAgent(opts?: CreateAgentOptions): Agent;
export { createAgent };
//# sourceMappingURL=agent.d.ts.map