import SimpleSchema from "simpl-schema";
import ReactionError from "@reactioncommerce/reaction-error";

const inputSchema = new SimpleSchema({
    variants: {
        type: Object,
        blackbox: true,
        optional: true
    },
    productId: String,
    shopId: String
});

/**
 * @method bulkInsertVariants
 * @summary Bulk inserts a product's variant
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - Input arguments for the bulk operation
 * @param {String} input.field - product field to update
 * @param {String} input.productId - productId of product to update
 * @param {String} input.shopId - shopId of shop product belongs to
 * @param {String} input.value - value to update field with
 * @return {Promise<Object>} updateProduct payload
 */
export default async function bulkInsertVariants(context, input) {
    inputSchema.validate(input);
    console.log('@bulkInsertVariants@api-plugin-scaling-fortnight');
    const {appEvents, collections, simpleSchemas} = context;
    const {Product} = simpleSchemas;
    const {Products} = collections;
    const { productId, shopId, variants: productVariantInput } = input;

    // Check that user has permission to create product
    await context.validatePermissions("reaction:legacy:products", "create", {shopId});

    // See that parent product exists
    const parentProduct = await Products.findOne({_id: productId, shopId});
    if (!parentProduct) {
        throw new ReactionError("not-found", "Product not found");
    }

    let product;
    let parentVariant;
    if (parentProduct.type === "variant") {
        product = await Products.findOne({_id: parentProduct.ancestors[0], shopId});
        parentVariant = parentProduct;
    } else {
        product = parentProduct;
        parentVariant = null;
    }

    // Verify that parent is not deleted
    // Variants cannot be created on a deleted product
    if (await isAncestorDeleted(context, product, true)) {
        throw new ReactionError("server-error", "Unable to create product variant on a deleted product");
    }

    // get ancestors to build new ancestors array
    let {ancestors} = parentProduct;
    if (Array.isArray(ancestors)) {
        ancestors.push(productId);
    } else {
        ancestors = [productId];
    }

    let newVariantArray = [];
    for (const inputVariant of productVariantInput) {
        const initialProductVariantData = await cleanProductVariantInput(context, {
            inputVariant
        });

        // Generate a random ID, but only if one was not passed in
        const newVariantId = (inputVariant && inputVariant._id) || Random.id();

        const createdAt = new Date();
        const newVariant = {
            _id: newVariantId,
            ancestors,
            createdAt,
            isDeleted: false,
            isVisible: false,
            shopId,
            type: "variant",
            updatedAt: createdAt,
            workflow: {
                status: "new"
            },
            ...initialProductVariantData
        };

        newVariantArray.push(newVariant);
    }
    //
    // if (initialProductVariantData.isDeleted) {
    //     throw new ReactionError("invalid-param", "Creating a deleted product variant is not allowed");
    // }


    const isOption = ancestors.length > 1;

    // Apply custom transformations from plugins.
    for (const customFunc of context.getFunctionsOfType("mutateNewVariantBeforeCreate")) {
        // Functions of type "mutateNewVariantBeforeCreate" are expected to mutate the provided variant.
        // We need to run each of these functions in a series, rather than in parallel, because
        // we are mutating the same object on each pass.
        // eslint-disable-next-line no-await-in-loop
        for (const newVariant of newVariantArray) {
            await customFunc(newVariant, {context, isOption, parentVariant, product});
        }
    }

    for (const newVariant of newVariantArray) {
        ProductVariant.validate(newVariant);
    }
    //Bulk Insert
    await Products.insertMany(newVariant);


    Logger.debug(`createProductVariant: created variant: ${newVariantId} for ${productId}`);
    return newVariantArray;

}
