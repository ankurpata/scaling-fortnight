// import schema from "./schema.graphql";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";

const schema = importAsString("./schema.graphql");
const attributesSchema = importAsString("./schema.attributes.graphql");


export default [schema, attributesSchema];
