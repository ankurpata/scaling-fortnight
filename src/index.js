import pkg from "../package.json";
import schemas from "./schemas/index.js";
import i18n from "./i18n/index.js";
import resolvers from "./resolvers";

import preStartup from "./preStartup.js";
import publishProductToCatalog from "./publishProductToCatalog.js";

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
// export default async function register(app) {
//     await app.registerPlugin({
//         label: "Plugin Example",
//         name: "plugin-example",
//         version: pkg.version,
//         i18n,
//     });
// }
export default async function register(app) {
    await app.registerPlugin({
        label: "Plugin Example",
        name: "plugin-example",
        version: pkg.version,
        functionsByType: {
            preStartup: [preStartup],
        },
        graphQL: {
            schemas,
            resolvers
        },
        i18n
    });
}
