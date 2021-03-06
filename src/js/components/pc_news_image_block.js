import React from 'react';

import {Row, Col, Menu, Icon, Form, Card, Modal, Tabs, message, Carousel} from 'antd';


export default class PCNewsImageBlock extends React.Component {

    constructor() {
        super()
        this.state = {
            news: ''
        }
    }

    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
        .then(response=>response.json())
        .then(json=>this.setState({news:json}))
        
    }

    render() {

        const styleImage = {
            display: "block",
            width: this.props.imageWidth,
            height: "90px"
        }

        const styleH3 = {
            width: this.props.imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }

        const {news} = this.state
        console.log(news)
        const newsList = news.length
        ?
        news.map((newsItem, index) => (
            <div key={index} className="imageblock">
                <div className="custom-image"> 
                    <img alt="" style={styleImage} src={newsItem.thumbnail_pic_s} />
                </div>
                <div className="custom-card"> 
                    <h3 style={styleH3}> {newsItem.title} </h3>
                    <p> {newsItem.author_name} </p>
                </div>
            </div>
        ))
        :
        'No news accessiable'

        return <div className="topNewsList"> 
            <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}> 
                {newsList}
            </Card>
        </div>
    }
}