import SimpleSchema from "simpl-schema";


const inputSchema = new SimpleSchema({
    "data": Array,
    "data.$": {
        type: Object,
        blackbox: true,
        optional: true
    },
    "shopId": String
});

/**
 * @method createProductBulk
 * @summary creates an empty product, with an empty variant
 * @param {Object} context - an object containing the per-request state
 * @param {Object} input - Input arguments for the operation
 * @param {String} [input.product] - product data
 * @param {Boolean} [input.shouldCreateFirstVariant=true] - Auto-create one variant for the product
 * @param {String} input.shopId - the shop to create the product for
 * @return {String} created productId
 */
export default async function updateProductBySku(context, input) {
    const {collections} = context;
    const {Products} = collections;

    inputSchema.validate(input);
    const {data, shopId} = input;

    if (!data && !data.length) {
        return false;
    }

    const promisedResults = data.map(async (updateRow) => {
        const {sku, price, upload_price, ranking} = updateRow;
        // TODO: Add ranking and upload_price.
        await Products.updateOne({
            sku,
        }, {
            $set: {
                "price": price
            }
        });
    });

    const results = await Promise.all(promisedResults);

    console.log(results, "@updateProductBySku::results");
    if (!results) {
        return false;
    }

    return results;
}
