const shrinkSizes = (sizes) => {
  let newSizes = [];

  sizes.forEach(sizeObj => {newSizes.push(sizeObj.size)});

  return newSizes;
};

const prepareItemDetailsData = (apiReturn) => {
  return {
    id: apiReturn.id,
    title: apiReturn.title,
    imgUrl: apiReturn.images[0],
    sku: apiReturn.sku,
    manufacturer: apiReturn.manufacturer,
    price: apiReturn.price,
    color: apiReturn.color,
    material: apiReturn.material,
    season: apiReturn.season,
    reason: apiReturn.reason,
    sizes: shrinkSizes(apiReturn.sizes.filter(size => size.avalible === true))
  }
};

export default prepareItemDetailsData;