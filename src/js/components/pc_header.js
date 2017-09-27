import React from 'react';

import {Row, Col, Menu, Icon, Form, Input, Button, CheckBox, Modal, Tabs, message} from 'antd';

import {Link} from 'react-router';

class PCHeader extends React.Component {

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
        if (ev.key=="register") {
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
        + "&username=" + formData.username
        + "&password=" + formData.password
        + "&r_userName=" + formData.r_username 
        + "&r_password=" + formData.r_password 
        + "&r_confirmPassword=" + formData.r_confirm, myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                nickName:json.NickUserName, userid: json.UserId
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

        console.log(this.state)

        let {getFieldProps} = this.props.form;
        const userShow = this.state.hasLogined
        ?
        <Menu.Item key="logout" className="register">
            <Button type="primary" htmlType="button">{this.state.nickName}</Button>
            &nbsp;&nbsp;
             {/* <Link target="_blank">  */}
                <Button type="dashed" htmlType="button"> 个人中心 </Button>
             {/* </Link>  */}
            &nbsp;&nbsp;
            <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}> 退出 </Button>
        </Menu.Item>
        :
        <Menu.Item key="register" className="register">
           <Icon type="appstore" />注册/登录
        </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col span={2}> </Col>
                    <Col span={4}>
                        <a href="/" className="logo" >
                            <img src="./src/image/logo.png" alt="logo" />
                            <span> React App </span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}> 
                            <Menu.Item key="top">
                                <Icon type="appstore" /> 头条 
                            </Menu.Item>
                            <Menu.Item key="shehui"> 
                                <Icon type="appstore" /> 社会
                            </Menu.Item>
                            <Menu.Item key="guoji"> 
                                <Icon type="appstore" /> 国际 
                            </Menu.Item>
                            <Menu.Item key="yule"> 
                                <Icon type="appstore" /> 娱乐 
                            </Menu.Item>
                            <Menu.Item key="caijing"> 
                                <Icon type="appstore" /> 财经 
                            </Menu.Item>
                            <Menu.Item key="tiyu"> 
                                <Icon type="appstore" /> 体育 
                            </Menu.Item>
                            {userShow}
                        </Menu>

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

                    </Col>
                    <Col span={2}> </Col>
                </Row>
            </header>
        )
    }
}

export default PCHeader = Form.create({})(PCHeader);