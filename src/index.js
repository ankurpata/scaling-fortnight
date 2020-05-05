import pkg from "../package.json";
import schemas from "./schemas";

import preStartup from "./preStartup.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
    await app.registerPlugin({
        label: "Plugin Example",
        name: "plugin-example",
        version: pkg.version,
        functionsByType: {
            preStartup: [preStartup]
        },
        graphQL: {
            schemas
        },
    });
}
