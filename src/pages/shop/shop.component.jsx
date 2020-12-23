import React from 'react';

import SHOP_DATA from './shop.data.js';
import axios from 'axios';

import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { HEROKU_SERVER } from '../../constants/urls.js';

class ShopPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collections: []
        }
    }

    getData = async () => {
        let data = null;
        try {
            const response = await axios.get(`${HEROKU_SERVER}/products`);

            data = response.data;
            
        } catch (e) {
            console.log(e);
        }

        return data;
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`${HEROKU_SERVER}/categories`);

            this.setState({ collections: response.data });
            
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { collections } = this.state;
        return (
            <div>
                {
                    collections.map(({_id, ...otherCollectionsProps}) => (
                        <CollectionPreview key={_id} {...otherCollectionsProps}/>
                    ))
                }
            </div>
        )
    }
}

export default ShopPage;