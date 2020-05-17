const prepareShopItemsData = (apiReturn) => {
  const finalSet = [];

  const buildShopItemObj = (item) => {
    return {
      id: item.id,
      title: item.title,
      price: item.price,
      imgUrl: item.images[0]
    }
  };
 
  apiReturn.map(item => finalSet.push(buildShopItemObj(item)));

  return finalSet;
};

export default prepareShopItemsData;