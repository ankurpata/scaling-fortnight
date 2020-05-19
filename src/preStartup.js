/**
 * @summary Called before startup
 * @param {Object} context Startup context
 * @returns {undefined}
 */
export default async function preStartup(context) {
    context.simpleSchemas.Product.extend({
        myf: {
            type: String,
            optional: true
        },
        storeViewCode: {
            type: String,
            optional: true
        },
        attributeSetCode: {
            type: String,
            optional: true
        }
    });
}
