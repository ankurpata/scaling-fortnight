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
        },
        productWebsites: {
            type: String,
            optional: true
        },
        taxClassName: {
            type: String,
            optional: true
        },
        visibility: {
            type: String,
            optional: true
        },
        originalPrice: {
            type: String,
            optional: true
        },
        specialPrice: {
            type: String,
            optional: true
        },
        specialPriceFromDate: {
            type: String,
            optional: true
        },
        specialPriceToDate: {
            type: String,
            optional: true
        },
        newFromDate: {
            type: String,
            optional: true
        },
        newToDate: {
            type: String,
            optional: true
        },
        displayProductOptionsIn: {
            type: String,
            optional: true
        },
        mapPrice: {
            type: String,
            optional: true
        },
        msrpPrice: {
            type: String,
            optional: true
        },
        mapEnabled: {
            type: String,
            optional: true
        },
        giftMessageAvailable: {
            type: String,
            optional: true
        },
        customDesign: {
            type: String,
            optional: true
        },
        customDesignFrom: {
            type: String,
            optional: true
        },
        customDesignTo: {
            type: String,
            optional: true
        },
        customLayoutUpdate: {
            type: String,
            optional: true
        },
        pageLayout: {
            type: String,
            optional: true
        },
        productOptionsContainer: {
            type: String,
            optional: true
        },
        msrpDisplayActualPriceType: {
            type: String,
            optional: true
        },
        countryOfManufacture: {
            type: String,
            optional: true
        },
        additionalAttributes: {
            type: String,
            optional: true
        },
        qty: {
            type: String,
            optional: true
        },
        outOfStockQty: {
            type: String,
            optional: true
        },
        useConfigMinQty: {
            type: String,
            optional: true
        },
        isQtyDecimal: {
            type: String,
            optional: true
        },
        allowBackorders: {
            type: String,
            optional: true
        },
        useConfigBackorders: {
            type: String,
            optional: true
        },
        minCartQty: {
            type: String,
            optional: true
        },
        useConfigMinSaleQty: {
            type: String,
            optional: true
        },
        maxCartQty: {
            type: String,
            optional: true
        },
        useConfigMaxSaleQty: {
            type: String,
            optional: true
        },
        isInStock: {
            type: String,
            optional: true
        },
        notifyOnStockBelow: {
            type: String,
            optional: true
        },
        useConfigNotifyStockQty: {
            type: String,
            optional: true
        },
        manageStock: {
            type: String,
            optional: true
        },
        useConfigManageStock: {
            type: String,
            optional: true
        },
        useConfigQtyIncrements: {
            type: String,
            optional: true
        },
        qtyIncrements: {
            type: String,
            optional: true
        },
        useConfigEnableQtyInc: {
            type: String,
            optional: true
        },
        enableQtyIncrements: {
            type: String,
            optional: true
        },
        isDecimalDivided: {
            type: String,
            optional: true
        },
        websiteId: {
            type: String,
            optional: true
        },
        relatedSkus: {
            type: String,
            optional: true
        },
        relatedPosition: {
            type: String,
            optional: true
        },
        crosssellSkus: {
            type: String,
            optional: true
        },
        crosssellPosition: {
            type: String,
            optional: true
        },
        upsellSkus: {
            type: String,
            optional: true
        },
        upsellPosition: {
            type: String,
            optional: true
        },
        additionalImages: {
            type: String,
            optional: true
        },
        additionalImageLabels: {
            type: String,
            optional: true
        },
        hideFromProductPage: {
            type: String,
            optional: true
        },
        customOptions: {
            type: String,
            optional: true
        },
        bundlePriceType: {
            type: String,
            optional: true
        },
        bundleSkuType: {
            type: String,
            optional: true
        },
        bundlePriceView: {
            type: String,
            optional: true
        },
        bundleWeightType: {
            type: String,
            optional: true
        },
        bundleValues: {
            type: String,
            optional: true
        },
        bundleShipmentType: {
            type: String,
            optional: true
        },
        associatedSkus: {
            type: String,
            optional: true
        },
        configurableVariations: {
            type: String,
            optional: true
        },
        configurableVariationLabels: {
            type: String,
            optional: true
        },

    });
}
