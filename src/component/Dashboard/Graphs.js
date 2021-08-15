import React, { useEffect, useRef, useState } from 'react';
//fusionchart imports 
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import './Graph.css'
ReactFC.fcRoot(FusionCharts, Charts, Widgets, FusionTheme);

const Graphs = (props) => {
    const [base_url, setBaseUrl] = useState('https://api.cryptonator.com/api/ticker/');
    const [chartRef, setChartRef] = useState(null);
    const [btcusd, setBtcusd] = useState('-');
    const [ltcusd, setLtcusd] = useState('-');
    const [ethcusd, setEthcusd] = useState('-');
    const [showChart, setShowChart] = useState(false);
    const [initValue, setInitValue] = useState(0);
    const [lodaing, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState({
        "chart": {
            "caption": "Bitcoin Ticker",
            "subCaption": "",
            "xAxisName": "Local Time",
            "yAxisName": "USD",
            "numberPrefix": "$",
            "refreshinterval": "2",
            "slantLabels": "1",
            "numdisplaysets": "30",
            "labeldisplay": "rotate",
            "showValues": "0",
            "showRealTimeValue": "0",
            "theme": "fusion",
            "bgColor": "#006341",
            "bgAlpha": "100,100",
            "baseFontColor": "#000000",
            "numDivLines": "10",
            "divLineColor": "#6699cc",
            "anchorBorderColor": "#a32303",
            "anchorBgColor": "#ffb145",
            "lineColor": "#efff63"
        },
        "categories": [{
            "category": [{
                "label": clientDateTime().toString()
            }]
        }],
        "dataset": [{
            "data": [{
                "value": 0
            }]
        }]
    })


    const [chartConfigs, setChartConfig] = useState({
        type: 'realtimeline',
        renderAt: 'container',
        width: '100%',
        height: '100%',
        dataFormat: 'json'
    });
    useEffect(() => {
        getDataFor('btc-usd', 'btcusd');
        getDataFor('ltc-usd', 'ltcusd');
        getDataFor('eth-usd', 'ethcusd');
        return null;
    }, []);

    const getDataFor = ((conversion, prop) => {
        fetch(base_url + conversion, {
            mode: 'cors'
        })
            .then(res => res.json())
            .then(d => {
                if (prop === 'btcusd') {
                    setBtcusd(d.ticker.price)
                    const datasource = dataSource;
                    datasource.chart.yAxisMaxValue = parseInt(d.ticker.price) + 5;
                    datasource.chart.yAxisMinValue = parseInt(d.ticker.price) - 5;
                    datasource.dataset[0]['data'][0].value = d.ticker.price;
                    setShowChart(true);
                    setDataSource(datasource);
                    setInitValue(d.ticker.price);
                }
                else if (prop === 'ltcusd')
                    setLtcusd(d.ticker.price)
                else if (prop === 'ethcusd')
                    setEthcusd(d.ticker.price)
            })

    });


    const getChartRef = ((chart) => {
        setChartRef(chart);
    });
    const startUpdatingData = (() => {
        console.log('starting')
        var updater = setInterval(() => {
            fetch(base_url + 'btc-usd')
                .then(res => res.json())
                .then(d => {
                    let x_axis = clientDateTime();
                    let y_axis = d.ticker.price;
                    if (chartRef) {
                        setChartRef((prev) => {
                            var temp = prev;
                            temp.feedData("&label=" + x_axis + "&value=" + y_axis);
                            return temp;
                        })
                    }
                    else {
                        clearInterval(updater);
                    }
                });
        }, 2000);
    });


    function addLeadingZero(num) {
        return (num <= 9) ? ("0" + num) : num;
    }
    function clientDateTime() {
        var date_time = new Date();
        var curr_hour = date_time.getHours();
        var zero_added_curr_hour = addLeadingZero(curr_hour);
        var curr_min = date_time.getMinutes();
        var curr_sec = date_time.getSeconds();
        var curr_time = zero_added_curr_hour + ':' + curr_min + ':' + curr_sec;
        return curr_time
    }

    if (chartRef && !lodaing) {
        console.log(chartRef, 'BHA')
        setLoading(true);
        startUpdatingData();
    }
    return (
        <div className='mainGraph'>
            <div className='priceContainer'>
                <div className='priceCard'>
                    <p>BITCOIN PRICE </p>
                    {btcusd}
                </div>
                <div className='priceCard'>
                    <p> ETH PRICE</p>
                    {ethcusd}
                </div>
                <div className='priceCard'>
                    <p>LT PRICE</p>
                    {ltcusd}
                </div>
            </div>
            <div className='graphContainer'>
                {
                    showChart ?
                        <ReactFC
                            {...chartConfigs}
                            dataSource={dataSource}
                            onRender={getChartRef.bind(this)
                            }

                        />
                        : null
                }
            </div>
        </div>);
}

export default Graphs;