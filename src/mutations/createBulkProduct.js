import SimpleSchema from "simpl-schema";
import {decodeProductOpaqueId, decodeShopOpaqueId} from "../xforms/id.js";


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
export default async function createBulkProduct(context, input) {
    inputSchema.validate(input);
    const {data, shopId} = input;

    if (!data && !data.length) {
        return false;
    }

    const promisedResults = data.map(async (productVariantSet) => {
        const newProduct = await context.mutations.createProduct(context, {
            product: productVariantSet.product,
            shopId: shopId,
            shouldCreateFirstVariant: false
        });

        const productId = newProduct._id;
        // Bulk variant save
        const variants = await context.mutations.bulkInsertVariants(context, {
            productId: productId,
            shopId: shopId,
            variants: productVariantSet.variants
        });
        return productId;
    });
    const results = await Promise.all(promisedResults);

    console.log(results);
    if (!results) {
        return false;
    }

    return true;
}
