import React from 'react';
import './Edit.css';
import '../App.js'
//import App from '../App.js';
import {Button, Form, Input} from 'antd';

const apiUrl = "http://localhost:44343/api/Comic";

const comicEntry = {
    id: 0,
    title: "",
    series: "",
    publisher: "",
    issueNumber: ""
}

function Edit(comicInfo) {
    //const [showEditPopup, setEditPopup] = useState(false);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    // useEffect(() =>{}, [])

    const updateComic = () => {
        //edit entity - PUT
        //e.preventDefault();
        fetch(`${apiUrl}/${comicEntry.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({
                id: comicEntry.id,
                title: comicEntry.title,
                series: comicEntry.series,
                publisher: comicEntry.publisher,
                issueNumber: comicEntry.issueNumber,
            }),
            })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            })
            .then(() => comicEntry.title = "", comicEntry.series = "", comicEntry.publisher = "", comicEntry.issueNumber = ""
            )
            .catch((err) => {
                console.log(err);
            });
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = values => {
        console.log(values);
        comicEntry.title = (values.title);
        comicEntry.series = (values.series);
        comicEntry.publisher = (values.publisher);
        comicEntry.issueNumber = (values.issueNumber);
        updateComic();
    }

    const renderEditPopup = () => {

        comicEntry.id = (comicInfo.id);
        comicEntry.title = (comicInfo.title);
        comicEntry.series = (comicInfo.series);
        comicEntry.publisher = (comicInfo.publisher);
        comicEntry.issueNumber = (comicInfo.issueNumber);

        return (
        //onCancel={() => setEditPopup(false)}
            <Form {...layout} name="basic" initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item label="Title" name="title" rules={[{ required: true, message: 'missing Title:' }]} initialValue={comicEntry.title} ><Input /></Form.Item>
                    <Form.Item label="Series" name="series" rules={[{ required: true, message: 'missing Series:' }]} initialValue={comicEntry.series} ><Input /></Form.Item>
                    <Form.Item label="Publisher" name="publisher" rules={[{ required: true, message: 'missing Publisher:' }]} initialValue={comicEntry.publisher} ><Input /></Form.Item>
                    <Form.Item label="IssueNumber" name="issueNumber" rules={[{ required: true, message: 'missing Issue Number:' }]} initialValue={comicEntry.issueNumber}><Input /></Form.Item>
                    <Form.Item {...tailLayout}><Button type="primary" htmlType="submit" >Save</Button></Form.Item>
                </Form>
        )
    }

    return (
        <div>
            {renderEditPopup()}
        </div>
        
    )
}

export default Edit;