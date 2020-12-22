import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({name, products}) => (
    <div className='collection-preview'>
        <h1 className='title'>{name.toUpperCase()}</h1>
        <div className='preview'>
            {
                products
                .filter((item, index) => index < 4)
                .map((item) => (
                    <CollectionItem key={item._id} item={item} />
                ))
            }
        </div>
    </div>
);

export default CollectionPreview;