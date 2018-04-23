import React from 'react';
import { Button, Form, Radio } from 'antd';

const FormItem = Form.Item;

function QiXiForm({ dispatch, form }) {

    const { getFieldDecorator } = form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 2,
            },
        },
    };

    function handleSubmit(e) {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const staticContent = {
                    side: values.side === "正方" ? true : false,
                    choice: values.choice
                }
                dispatch({
                    type: 'contest/startQiXi',
                    payload: { ...staticContent }
                })
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit} >
            <FormItem
                {...formItemLayout}
                label="选择一方"
            >
                {getFieldDecorator('side', {
                    initialValue: "正方",
                })(
                    <Radio.Group >
                        <Radio.Button value="正方">正方</Radio.Button>
                        <Radio.Button value="反方">反方</Radio.Button>
                    </Radio.Group>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="奇袭方式"
            >
                {getFieldDecorator('choice', {
                    initialValue: 0,
                })(
                    <Radio.Group >
                        <Radio.Button value={0}>陈词</Radio.Button>
                        <Radio.Button value={1}>盘问</Radio.Button>
                    </Radio.Group>
                )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
        </Form>
    );
}

export default Form.create()(QiXiForm);
