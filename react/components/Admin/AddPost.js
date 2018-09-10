// ./components/Home.jsx
import React, { Component } from 'react';
import {
    Button,
    Row,
    Col,
    Panel,
    Form,
    FormControl,
    FormGroup,
    ControlLabel,
} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import ReactCrop, { makeAspectCrop } from 'react-image-crop';


class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            src: null,
            crop: {},
            cropped:''
        }; // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onSelectFile = this.onSelectFile.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);

    }

    onSelectFile (e) {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener(
                'load',
                () =>
                    this.setState({
                        src: reader.result,
                    }),
                false
            );
            reader.readAsDataURL(e.target.files[0])
        }
    };

    onImageLoaded(image) {
       // console.log('onCropComplete', image);
        this.setState({
            crop: makeAspectCrop({
                x: 0,
                y: 0,
                aspect: 1 / 1,
                width: 50,
            }, image.width / image.height),
        });
    };

    onCropComplete(crop, pixelCrop) {
        var myImage = new Image();
        myImage.src = this.state.src;
        var canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        var ctx = canvas.getContext('2d');

        ctx.drawImage(
            myImage,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        // Base64
        const base64Image = canvas.toDataURL('image/jpeg');
        this.setState({cropped: base64Image});
        var resultDiv = document.getElementsByClassName('crop-result');         // Create a text node
        resultDiv[0].innerHTML = '';
        var node = document.createElement("img");                 // Create a <li> node
        node.setAttribute('src', base64Image);
        resultDiv[0].appendChild(node);
    }

    onCropChange(crop) {
        this.setState({ crop })
    };

    handleChange(value) {
        this.setState({ text: value })
    }
    handleSubmit(event) {
        //event.preventDefault();
        const self = this;
        const data = new FormData(event.target);
        console.log(data.get('title'));
        console.log(data.get('simple-title'));
        console.log(data.get('short-description'));
        console.log(this.state.text);
        console.log(this.state.cropped);
        $.ajax({
            type: 'POST',
            url: '/admin/add-post',
            data: {
                _title: data.get('title'),
                _simpleTitle: data.get('simple-title'),
                _description: data.get('short-description'),
                _body: this.state.text,
                _image: this.state.cropped
            },
            success: function(username){
                console.log(username);
                //self.props.commentsHandler(username, data.get('comment'))
            },
            error: function(error){
                // console.log(error);
                if(error.responseJSON) {
                    //console.log(error.responseJSON);
                }
            }
        });

    };

    render() {
        return (
            <Col sm={12}>
                <Panel>
                    <Panel.Heading>Dodaj Post</Panel.Heading>
                    <Panel.Body>
                        <Form onSubmit={e => {
                            e.preventDefault();
                            this.handleSubmit(e);}}
                        >
                                <FormControl
                                    type="text"
                                    name="title"
                                    placeholder="Tytuł"
                                />
                                <FormControl
                                    type="text"
                                    name="simple-title"
                                    placeholder="Nazwa uproszczona (URL)"
                                />
                            <FormGroup controlId="shortDescription">
                                <FormControl componentClass="textarea" name="short-description" placeholder="Krótki opis (1000 znaków)" />
                            </FormGroup>
                            <ReactQuill value={this.state.text}
                                        onChange={this.handleChange}
                                        theme="snow"
                            />
                            <div>
                                <input type="file" onChange={this.onSelectFile} />
                            </div>
                            {this.state.src && (
                                <ReactCrop
                                    src={this.state.src}
                                    crop={this.state.crop}
                                    onImageLoaded={this.onImageLoaded}
                                    onComplete={this.onCropComplete}
                                    onChange={this.onCropChange}
                                />
                            )}
                            <div className="crop-result">

                            </div>
                            {/*<Col className="text-right" xs={12}>*/}
                            <div className="text-right">
                                <Button type="submit">Wyślij</Button>
                            </div>
                            {/*</Col>*/}
                        </Form>
                        {/*<Col className="text-center login-error" xs={12}>*/}
                        {/*<p>error</p>*/}
                        {/*</Col>*/}
                    </Panel.Body>
                </Panel>
            </Col>
        );
    }
}

export default AddPost