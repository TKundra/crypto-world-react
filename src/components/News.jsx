import React, {useState} from 'react'
import moment from 'moment';
import {Select, Typography, Card, Row, Col, Avatar} from 'antd';
import {useGetCryptoNewsQuery} from '../services/cryptoNews';
import {useGetCryptosQuery} from '../services/cryptoApi';
import Loader from './Loader';

const {Text, Title} = Typography;
const {Option} = Select; 

const News = (props) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory: newsCategory, count: props.simplified ? 6 : 12});
    const {data} = useGetCryptosQuery(100);
    const demoImage = "";

    if (isFetching) return <Loader />;
    return (
        <Row gutter={[24,24]}>
            {!props.simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="select a crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins?.map((currency) => <Option key={currency.id} value={currency.name}>{currency.name}</Option>)}
                    
                    </Select>
                </Col>
            )}
            {cryptoNews?.value?.map((news, i) => (
                <Col xs={24} sm={12} lg={6} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <Title level={5}>{news.name}</Title>
                            <div className="flex justify-between">                                
                                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                            <p className="mt-4">
                                {news.description > 100 ? `${news.description.substring(0,100)}...` : `${news.description}`}
                            </p> 
                            <div className="flex justify-between">                                
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>  
                                <Text>{news.provider[0]?.name}</Text>
                            </div>
                                                                                  
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
