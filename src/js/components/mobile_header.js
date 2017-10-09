import React from 'react';

import {Row, Col, Menu, Icon, Form, Input, Button, CheckBox, Modal, Tabs, message} from 'antd';

class MobileHeader extends React.Component {

    constructor() {
        super()
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            nickName: '',
            userid: 0
        }
    }

    componentWillMount() {
        if (localStorage.userid != '') {
            this.setState({
                hasLogined:true,
                nickName:localStorage.nickName,
                userid:localStorage.userid
            })

        }
    }

    setModalVisible(value) {
        this.setState({
            modalVisible:value
        })
    }

    handleClick(ev) {
        if (ev.key="register") {
            this.setState({
                current:'register'
            })
            this.setModalVisible(true)
        }
        else {
            this.setState({
                current:ev.key
            })
        }
    }

    handleSubmit(ev) {

        // 阻止事件冒泡
        ev.preventDefault()
        var myFetchOptions = {
            method: 'GET'
        }
        var formData = this.props.form.getFieldsValue()
        console.log(formData)
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_username + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirm, myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                userNickName:json.NickUserName, userid: json.UserId
            })
            localStorage.userid = json.UserId
            localStorage.nickName = json.NickUserName
        })
        if (this.state.action="login") {
            this.setState({
                hasLogined:true
            })
        }
        message.success("请求成功")
        this.setModalVisible(false)
    }

    login() {
        this.setModalVisible(true)
    }

    callback(key) {
        if (key == 1) {
            this.setState({
                action:"login"
            })
        }
        else if (key == 2) {
            this.setState({
                action:"register"
            })
        }
    }

    logout() {
        localStorage.userid = ''
        localStorage.nickName = ''
        this.setState({
            hasLogined:false
        })
    }

    render() {

        let {getFieldProps} = this.props.form;

        const userShow = this.state.hasLogined?
        // <Link>
        <Icon type="inbox" />
        // </Link>
        :
        <Icon type="setting" onClick={this.login.bind(this)} />

        return (
            <div id="mobileheader">
                <header>
                    <img src='./src/image/logo.png' alt='logo' />
                    <span> React App </span>
                    {userShow}
                </header>

                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel = {()=>this.setModalVisible(false)}
                            onOk={()=>this.setModalVisible(false)} okText="关闭">
                    <Tabs type="card" onChange={this.callback.bind(this)}>

                        <Tabs.TabPane tab="登录" key="1" >
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}> 
                                <Form.Item label="账户">
                                    <Input placeholder="请输入账号" {...getFieldProps('username')} />
                                </Form.Item>
                                    <Form.Item label="设置密码">
                                    <Input type="password" placeholder="请输入密码" {...getFieldProps('password')} />
                                </Form.Item>
                                <Button type="primary" htmlType="submit"> 登录 </Button>
                            </Form>
                        </Tabs.TabPane>


                        <Tabs.TabPane tab="注册" key="2" >
                            <Form horizontal onSubmit={this.handleSubmit.bind(this)}> 
                                <Form.Item label="账户">
                                    <Input placeholder="请输入账号" {...getFieldProps('r_username')} />
                                </Form.Item>
                                    <Form.Item label="设置密码">
                                    <Input type="password" placeholder="请输入密码" {...getFieldProps('r_password')} />
                                </Form.Item>
                                <Form.Item label="确认密码">
                                    <Input type="password" placeholder="请再次输入密码" {...getFieldProps('r_confirm')} />
                                </Form.Item>
                                <Button type="primary" htmlType="submit"> 注册 </Button>
                            </Form>
                        </Tabs.TabPane>
                    </Tabs>

                </Modal>

            </div>
        )
    }
}

export default MobileHeader = Form.create({})(MobileHeader);