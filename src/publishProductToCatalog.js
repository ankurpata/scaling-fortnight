/*

 */
export default async function publishProductToCatalog(catalogProduct, {context, product, shop, variants}) {

    catalogProduct.myf = product.myf;
    // Also set on each catalogProduct.variants if necessary
}
