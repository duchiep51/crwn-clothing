import React from 'react';

import './directory.styles.scss';

import MenuItem from '../menu-item/menu-item.component';

class Directory extends React.Component {
    constructor() {
        super();

        this.state = {
            sections: [
                {
                    title: 'hats',
                    imgURL: 'https://i.ibb.co/cvpntL1/hats.png',
                    id: 1,
                    linkURL: 'hats'
                },
                {
                    title: 'jackets',
                    imgURL: 'https://i.ibb.co/px2tCc3/jackets.png',
                    id: 2,
                    linkURL: 'jackets'
                },
                {
                    title: 'sneakers',
                    imgURL: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                    id: 3,
                    linkURL: 'sneakers'
                },
                {
                    title: 'mens',
                    imgURL: 'https://i.ibb.co/GCCdy8t/mens.png',
                    size: 'large',
                    id: 4,
                    linkURL: 'mens'
                },
                {
                    title: 'womens',
                    imgURL: 'https://i.ibb.co/R70vBrQ/womens.png',
                    size: 'large',
                    id: 5,
                    linkURL: 'womens'
                }
            ]
        }
    }

    render() {
        return (
            <div className='directory-menu'>
                {
                    this.state.sections.map(({id, ...otherSectionProps}) => (
                        <MenuItem key={id} {...otherSectionProps} />
                    ))
                }
            </div>
        )
    }
}

export default Directory;