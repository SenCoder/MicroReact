import React from 'react';

import {Row, Col} from 'antd';

import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCNewsDetails extends React.Component {
    constructor() {
        super()
        this.state = {
            newsItem: ''
        }
    }



    componentDidMount() {
        var myFetchOptions = {
            method: 'GET'
        }
        console.log('>>>')
        console.log(this.props.params.uniquekey)
        
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFetchOptions)
        .then(response => response.json())
        .then(json => {
            this.setState({newsItem:json})
            document.title = this.state.newsItem.title + "React News"
        })
    }

    createMarkup() {
        console.log("=======" + this.props.params.uniquekey)
        console.log(this.state.newsItem)
        console.log(this.state.newsItem.pagecontent)
        return {__html: this.state.newsItem.pagecontent}
    }

    render() {
        return (
            <div> 
                <PCHeader />
                <Row> 
                    <Col span={2}> </Col>
                    <Col span={14} className="container"> 
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}> </div>
                    </Col>
                    <Col span={6}> </Col>
                    <Col span={2}> </Col>
                </Row>
                <PCHeader />
            </div>
        )
    }
}