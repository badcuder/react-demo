import React, {Component} from "react";
import {
    Card, CardHeader, CardBody,
    FormGroup, Label, Input,
    Form, Row, Col
} from 'reactstrap';
import axios, {post, get} from 'axios';

import '../styles/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        }
    }

    render() {
        return (
            <div className="container" style={{paddingTop: 30}}>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <CardHeader>
                                TẢI AVATAR LÊN
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col sm={12}>
                                        <Form
                                            encType="multipart/form-data"
                                        >
                                            <FormGroup>
                                                <Label for="avatar">Chọn Avatar</Label>
                                                <Input
                                                    onChange={(evt) => {
                                                        evt.preventDefault();
                                                        this.setState({
                                                            file: evt.target.files[0],
                                                        })
                                                    }}
                                                    type="file" name="avatar" id="avatar"
                                                    placeholder="chọn file"/>
                                            </FormGroup>
                                            <button
                                                className="btn btn-primary"
                                                onClick={(evt) => {
                                                    evt.preventDefault()
                                                    if (!this.state.file) {
                                                        alert('Bạn chưa chọn file.')
                                                        return;
                                                    }
                                                    const formData = new FormData();
                                                    formData.append("avatar", this.state.file);
                                                    const config = {
                                                        headers: {
                                                            'content-type': 'multipart/form-data'
                                                        }
                                                    }
                                                    post('http://localhost:8082/api/upload/avatar', formData, config).then(res => {
                                                        console.log('RES', res.data.fileNameInServer)
                                                        let filePath = res.data.fileNameInServer
                                                        if (filePath) {
                                                            filePath = filePath.split('\\')[1]
                                                        }
                                                        this.setState({
                                                            imageUrl: 'http://localhost:8082/api/view-image/' + filePath
                                                        })
                                                    })
                                                }}
                                                type="button"
                                            >
                                                UPLOAD
                                            </button>
                                        </Form>
                                    </Col>
                                    <Col sm={12} style={{paddingTop: 30}}>
                                        AVATAR Ở ĐÂY <br/>
                                        {
                                            this.state.imageUrl ? (
                                                <img src={this.state.imageUrl} alt=""/>
                                            ) : null
                                        }
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;