import React from 'react';

const CatalogNavBar = ({currCatId, categoriesList, switchCurrCatId}) => {
  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
          <p
            className={(currCatId === null) ? `nav-link active` : `nav-link`}
            onClick={() => switchCurrCatId(null)}
          >
            Все
          </p>
      </li>
      {categoriesList.map(category =>
        <li className="nav-item" key={category.id}>
          <p
            className={(category.id === currCatId) ? `nav-link active` : `nav-link`}
            onClick={() => switchCurrCatId(category.id)}
          >
            {category.title}
          </p>
        </li>
      )}
    </ul>
  )
};

export default CatalogNavBar;
