import React, { useState, useEffect } from 'react';
import './Add.css';
import '../App.js'
//import App from '../App.js';
import {Button, Form, Input, Modal} from 'antd';

const apiUrl = "http://localhost:43443/api/Comic";

const comicEntry = {
    title: "",
    series: "",
    publisher: "",
    issueNumber: 0
}


function Add()  {
    const [showPopup, setPopup] = useState(false);
    // const [refreshForm, setRefresh] = useState(false);
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };



    useEffect(() =>{

    }, [])

    const addComic = () => {
        // add entity - POST
        //e.preventDefault();
        //console.log(comicEntry.title + " from: " + comicEntry.series + " by: " + comicEntry.publisher + " issue number: " + comicEntry.issueNumber);
        fetch(apiUrl, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            accept: "application/json",
        },
        body: JSON.stringify({
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
        .then(() => comicEntry.title = "", comicEntry.series = "", comicEntry.publisher = "", comicEntry.issueNumber = 0
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
        comicEntry.issueNumber = parseInt(values.issueNumber);
        addComic();
        onReset();
    }

    const onReset = () => {
        form.resetFields();
    };


    const renderPopup = () => {
            return (
            <Modal title="Add a Comic!" visible={showPopup} onCancel={() => setPopup(false)} onOk={() => addComic()} footer={[]}>
                <Form {...layout}  form={form} name="basic" initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'missing Title:' }]} initialValue={""} ><Input /></Form.Item>
                        <Form.Item label="Series" name="series" rules={[{ required: true, message: 'missing Series:' }]} initialValue={""} ><Input /></Form.Item>
                        <Form.Item label="Publisher" name="publisher" rules={[{ required: true, message: 'missing Publisher:' }]} initialValue={""} ><Input /></Form.Item>
                        <Form.Item label="IssueNumber" name="issueNumber" type="number" rules={[{ required: true, message: 'missing Issue Number:' }]} initialValue={""}><Input /></Form.Item>
                        <Form.Item {...tailLayout}><Button type="primary" htmlType="submit" >Submit</Button></Form.Item>
                    </Form>
            </Modal>
            )
    }

    return (
        <span>
            <Button type="primary" onClick={() => setPopup(true)} disabled={showPopup}>Add a Comic</Button>
            {renderPopup()}
        </span>
        
    )
}

export default Add;