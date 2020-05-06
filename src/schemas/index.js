// import schema from "./schema.graphql";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";

const schema = importAsString("./schema.graphql");
// const productInput = importAsString("./product-input.graphql");


export default [schema];
