import React, {useState, useEffect} from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd';
import {useGetCryptosQuery} from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = (props) => {
    const count = props.simplified ? 10 : 100;
    const {data: cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins); 
    const [searched, setSearched] = useState('');

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((items) => items.name.toLowerCase().includes(searched));
        setCryptos(filteredData); // update fetch data parallely
    }, [cryptosList, searched]) // when to update

    if (isFetching) return <Loader />;
    return (
        <>
            {!props.simplified && (
                <div className="w-60 mx-auto my-5">
                    <Input placeholder="search cryptocurrencies" onChange={(e) => setSearched(e.target.value.toLowerCase())} />
                </div>
            )}
            <Row gutter={[32,32]} className="crypto-card-container">
                {cryptos?.map((currency, index)=> (
                <Col xs={24} sm={12} lg={6} className="crypto-card" key={index}>
                    <Link key={currency.id} to={`/crypto/${currency.id}`}>
                        <Card title={`${currency.rank}. ${currency.name}`} hoverable extra={<img className="crypto-image" src={currency.iconUrl} alt="i-crypto" />}>
                            <p>Price: {millify(currency.price)}</p>
                            <p>MarketCap: {millify(currency.marketCap)}</p>
                            <p>Daily Change: {millify(currency.change)}%</p>
                        </Card>
                    </Link>
                </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies;
