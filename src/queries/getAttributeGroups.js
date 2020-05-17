import SimpleSchema from "simpl-schema";
import Logger from "@reactioncommerce/logger";
// import * as Schemas from "./schemas";
// import Reaction from "/imports/plugins/core/core/server/Reaction";

// const AttributesMapper = new Mongo.Collection("AttributesMapper");

// const AttributesMapper = new Mongo.Collection("AttributesMapper");
// AttributesMapper.attachSchema({});

const inputSchema = new SimpleSchema({
    "attributeSetId": String,
    "shopId": String
});




/**
 * @method getAttributeGroups
 * @summary Returns attribute groups for a given attribute set id
 * @param {Object} context -  an object containing the per-request state
 * @param {Object} input - Input arguments for the bulk operation
 * @param {String} input.field - product field to update
 * @param {String} input.attributeSetId - productId of product to update
 * @param {String} input.shopId - shopId of shop product belongs to
 * @param {String} input.value - value to update field with
 * @return {Promise<Object>} updateProduct payload
 */
export default async function getAttributeGroups(context, input) {
    //TODO: to be removed - logs
    console.log('@getAttributeGroups@api-plugin-scaling-fortnight', input);
    Logger.info(`getAttributeGroups@api-plugin-scaling-fortnight:  ${JSON.stringify(input)}`);

    // inputSchema.validate(input);
    const {collections} = context;
    const {AttributesMapper} = collections;
    const {attributeSetId, shopId} = input;

    const attributeGroupMap = AttributesMapper.find({
        attribute_set_id: attributeSetId,
    }).toArray();
    Logger.info(`getAttributeGroups:  ${JSON.stringify(attributeGroupMap)}`);

    let retArray = [];
    let tmpObj = {};
    // const attributeName = await Attributes.findOne({attribute_id: attributeMapRow.attribute_id}, {frontend_label: 1});
    // const attributeGroupName = await Attributes.findOne({attribute_id : attributeMapRow.attribute_id}, {frontend_label: 1});

    for (const attributeMapRow of attributeGroupMap) {
        if (tmpObj[attributeMapRow.attribute_group_id]) {
            tmpObj[attributeMapRow.attribute_group_id].push(attributeMapRow.attribute_id);
        } else {
            tmpObj[attributeMapRow.attribute_group_id] = [attributeMapRow.attribute_id];
        }
    }

    Logger.info(`createProductVariant: created variant: ${JSON.stringify(tmpObj)} for ${attributeGroupMap}`);
    return newVariantArray;

}
