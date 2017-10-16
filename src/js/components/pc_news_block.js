import React from 'react';

import {Row, Col, Menu, Icon, Form, Card, Modal, Tabs, message, Carousel} from 'antd';

import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';

export default class PCNewsBlock extends React.Component {

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

        const {news} = this.state
        console.log(news)
        const newsList = news.length
        ?
        news.map((newsItem, index) => (
            <li key={index}> 
                 <Link to={`details/${newsItem.uniquekey}`} target="_blank">  
                    {newsItem.title}
                 </Link> 
            </li>
        ))
        :
        'No news accessiable'

        return <div className="topNewsList"> 
            <Card> 
                <ul> 
                     {newsList} 
                </ul>
            </Card>
        </div>
    }
}