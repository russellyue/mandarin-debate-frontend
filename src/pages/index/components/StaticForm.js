import React from 'react';
import { Button, Form, Input } from 'antd';
// import styles from './StaticForm.less';
import cookie from 'react-cookies'

const FormItem = Form.Item;

function StaticForm({ dispatch, tournament, proposition, opposition, title, form }) {

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
                    tournament: {
                        name: values.name,
                        subtitle: values.subtitle
                    },
                    title: values.title,
                    proposition: values.proposition,
                    opposition: values.opposition
                }
                dispatch({
                    type: 'contest/setStaticContent',
                    payload: { ...staticContent }
                })
                cookie.save('staticContent', staticContent);
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit} >
            <FormItem
                {...formItemLayout}
                label="比赛名字"
            >
                {getFieldDecorator('name', {
                    initialValue: tournament.name,
                    rules: [{
                        required: true, message: '请输入比赛名字！',
                    }],
                })(
                    <Input placeholder="例：媒体杯" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="比赛阶段"
            >
                {getFieldDecorator('subtitle', {
                    initialValue: tournament.subtitle,
                    rules: [{
                        required: true, message: '请输入比赛阶段!',
                    }],
                })(
                    <Input placeholder="例：决赛" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="比赛题目"
            >
                {getFieldDecorator('title', {
                    initialValue: title,
                    rules: [{
                        required: true, message: '请输入比赛题目!',
                    }],
                })(
                    <Input placeholder="例：英雄造时势/时势造英雄" />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="正方"
            >
                {getFieldDecorator('proposition', {
                    initialValue: proposition,
                    rules: [{
                        required: true, message: '请输入正方名字!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label="反方"
            >
                {getFieldDecorator('opposition', {
                    initialValue: opposition,
                    rules: [{
                        required: true, message: '请输入反方名字!',
                    }],
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
        </Form>
    );
}

export default Form.create()(StaticForm);
