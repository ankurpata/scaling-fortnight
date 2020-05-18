import SimpleSchema from "simpl-schema";
import Logger from "@reactioncommerce/logger";
import _ from "lodash";
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
    const {AttributesMapper, AttributeGroup, Attributes} = collections;
    const {attributeSetId, shopId} = input;

    const attributeGroupMap = await AttributesMapper.find({attribute_set_id: +attributeSetId}).toArray();

    //Get group key, value pair
    const groupKeys = _.map(attributeGroupMap, 'attribute_group_id');
    let attributeGroupNames = await AttributeGroup.find({
        attribute_group_id: {
            $in: groupKeys
        }
    }, {attribute_group_name: 1}).toArray();

    attributeGroupNames = _.mapKeys(attributeGroupNames, 'attribute_group_id');

    //Get attribute key value pair
    const attributeKeys = _.map(attributeGroupMap, 'attribute_id');
    let attributeKeyNames = await Attributes.find({
        attribute_id: {
            $in: attributeKeys
        }
    }, {attribute_code: 1}).toArray();

    attributeKeyNames = _.mapKeys(attributeKeyNames, 'attribute_id');

    let attributeGroups = [];
    let tmpObj = {};

    attributeGroupMap.forEach(attributeMapRow => {
        let attributeId = attributeMapRow.attribute_id;
        let attributeGroupId = attributeMapRow.attribute_group_id;
        let attributeObj = {id: attributeId, label: attributeKeyNames[attributeId].attribute_code};
        if (tmpObj[attributeGroupId]) {
            tmpObj[attributeGroupId].push(attributeObj);
        } else {
            tmpObj[attributeGroupId] = [attributeObj];
        }
    });

    const tmpGroupIds = Object.keys(tmpObj);
    for (const groupId of tmpGroupIds) {
        attributeGroups.push({
            attributeGroupLabel: attributeGroupNames[groupId].attribute_group_name,
            attributeGroupId: groupId,
            attributes: tmpObj[groupId]
        });
    }

    //TODO: clientMutationId to be removed.
    return {attributeGroups, clientMutationId: ""};

}
