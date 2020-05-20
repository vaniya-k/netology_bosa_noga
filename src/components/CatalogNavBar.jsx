import React from 'react';

const LiItem = ({onLiItemClick, isActive, title}) => {
  return (
    <li className="nav-item">
      <p className={(isActive) ? `nav-link active` : `nav-link`} onClick={onLiItemClick}>
        {title}
      </p>
    </li>
  )
};

const CatalogNavBar = ({currCatId, categoriesList, onCurrCatIdSwitch}) => {
  return (
    <ul className="catalog-categories nav justify-content-center">
      <LiItem onLiItemClick={() => onCurrCatIdSwitch(null)} isActive={(currCatId === null) ? true : false} title={`Все`}/>
      {categoriesList.map(category =>
        <LiItem
          key={category.id}
          onLiItemClick={() => onCurrCatIdSwitch(category.id)} isActive={(category.id === currCatId) ? true : false}
          title={category.title}
        />
      )}
    </ul>
  )
};

export default CatalogNavBar;
