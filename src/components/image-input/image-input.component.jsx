import React from 'react';
import { uploadImage } from '../../firebase/firebase.utils';
class ImageInput extends React.Component {

    constructor() {
        super();

        this.state = {
            image: "https://firebasestorage.googleapis.com/v0/b/clwn-clothing-8618c.appspot.com/o/photos%2Fdownload.png?alt=media&token=b18c1271-df8c-43fb-8e0a-dec4f2151b3a"
        }
    }

    handChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    image: e.target.result
                })
            };
            uploadImage(event.target.files[0])
            reader.readAsDataURL(event.target.files[0]);
        };
    }

    render() {
        return (
        <div className='group'>
            <input className='fileType' 
                    id='group_image' 
                    type='file' 
                    onChange={this.handChange}/>
                <img id='target' src={this.state.image}/>
            </div>
        );
    }
}

export default ImageInput;

    