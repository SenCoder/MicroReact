import React from 'react';
import ReactDOM from 'react-dom';

import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import PCNewsDetails from './components/pc_news_details';

import MediaQuery from 'react-responsive';

import 'antd/dist/antd.css';

import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';

 
class Root extends React.Component {
    render() {
        return (
            <div>

                <MediaQuery query='(min-device-width: 1224px)'>
                    <Router>
                        <div>
                            <ul>
                                <li><Link to="/"> 首页 </Link></li>
                                <li><Link to="/list"> 列表 </Link></li>
                                <li><Link to="/report/666"> 报告 </Link></li>
                            </ul>

                            <Route exact path="/" component={PCIndex} />
                            <Route path="/details/:uniquekey" component={PCNewsDetails} />
                            {/* <Route path="/report/:id" component={ComponentReport} />  */}
                        </div>
                    </Router>
                    {/* <PCIndex /> */}
                </MediaQuery>

                <MediaQuery query='(max-device-width: 1224px)'>
                    <MobileIndex />
                </MediaQuery>

            </div>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById('app')
)