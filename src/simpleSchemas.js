import {
    CatalogProduct,
    CatalogVariantSchema,
    Product,
    ProductVariant,
    VariantBaseSchema
} from "/imports/collections/schemas";

const schemaExtension = {
    myf: {
        type: String,
        optional: true
    }
};

// Extend the Product database schema, if your custom property will be on products
Product.extend(schemaExtension);


// Extend the Variant database schema, if your custom property will be on variants
ProductVariant.extend(schemaExtension);

// Extend the CatalogProduct database schema, if your custom property will be on products
CatalogProduct.extend(schemaExtension);

// Extend the catalog variant database schemas, if your custom property will be on variants. There are two schemas for this one.
VariantBaseSchema.extend(schemaExtension);
CatalogVariantSchema.extend(schemaExtension);
