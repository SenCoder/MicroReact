import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

import {Row, Col, Icon, Tabs, Carousel} from 'antd';

import MobileNewsList from './mobile_list';

const TabPane = Tabs.TabPane

export default class MobileIndex extends React.Component {

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
                <MobileHeader />
                <Tabs> 
                    <TabPane tab="头条" key="1">
                            <div className="carousel"> 
                                <Carousel {...settings}>
                                    <div> <img src="./src/image/carousel_1.jpg" /> </div>
                                    <div> <img src="./src/image/carousel_2.jpg" /> </div>
                                    <div> <img src="./src/image/carousel_3.jpg" /> </div>
                                    <div> <img src="./src/image/carousel_4.jpg" /> </div>
                                </Carousel>
                            </div>
                        <MobileNewsList count={20} type="top" />
                    </TabPane>

                    <TabPane tab="社会" key="2">
                        <MobileNewsList count={20} type="shehui" />
                    </TabPane>

                    <TabPane tab="国际" key="3">
                        <MobileNewsList count={20} type="guoji" />
                    </TabPane>

                    <TabPane tab="娱乐" key="4">
                        <MobileNewsList count={20} type="yule" />
                    </TabPane>

                    <TabPane tab="财经" key="5">
                        <MobileNewsList count={20} type="caijing" />
                    </TabPane>

                    <TabPane tab="体育" key="6">
                        <MobileNewsList count={20} type="tiyu" />
                    </TabPane>

                </Tabs>
                 <MobileFooter /> 
            </div>
        )
    }
}