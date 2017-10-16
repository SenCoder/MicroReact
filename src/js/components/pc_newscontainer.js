import React from 'react';
import {Row, Col, Carousel} from 'antd';
import {Menu, Icon, Form, Input, Button, CheckBox, Modal, Tabs, message} from 'antd';

import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';

const TabPane = Tabs.TabPane

export default class PCNewsContainer extends React.Component {

    render() {

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToSdhow:1,
            autoplay:true
        }

        return (
            <div> 
                <Row>
                    <Col span={2}> </Col>
                    <Col span={20}> 
                        <div className="leftContainer"> 
                            <div className="carousel"> 
                                <Carousel {...settings}>
                                    <div> <img src="./src/image/carousel_1.jpg" /> </div>
                                    <div> <img src="./src/image/carousel_2.jpg" /> </div>
                                    <div> <img src="./src/image/carousel_3.jpg" /> </div>
                                    <div> <img src="./src/image/carousel_4.jpg" /> </div>
                                </Carousel>
                            </div>
                            <PCNewsImageBlock count={6} type="guoji" width="400px" imageWith="112px" cartTitle="国际头条" />
                        </div>


                        <Tabs className="tabs_news"> 
                            <TabPane tab="新闻" key="1"> 
                                <PCNewsBlock count={20} type="top" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="国际" key="2"> 
                                <PCNewsBlock count={20} type="guoji" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="娱乐" key="3"> 
                                <PCNewsBlock count={20} type="yule" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="社会" key="4"> 
                                <PCNewsBlock count={20} type="shehui" width="100%" bordered="false"/>
                            </TabPane>
                            <TabPane tab="财经" key="5"> 
                                <PCNewsBlock count={20} type="caijing" width="100%" bordered="false"/>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={2}> </Col>
                </Row>
            </div>
        )
    }
}