import React from 'react';
import {ProductsContext} from '../../context/products-context'
import Card from '../UI/Card';
import './ProductItem.css';

const ProductItem = props => {
  const toggleFavorite = React.useContext(ProductsContext).toggleFav

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={() => toggleFavorite(props.id)}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
