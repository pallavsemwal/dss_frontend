import React, {useEffect, useState} from 'react'
import { getBaseUrl } from '../../utils';
import ReactApexChart from 'react-apexcharts';
import DatamapsIndia from 'react-datamaps-india'
export const SchemeDetail = () => {
    const [timeSeries, setSeries] = useState();
    const data=[];
    const [curr, setCurr]= useState(0);
    const select =(value)=>{
        console.log(value);
        setCurr(1);

    }
    useEffect(()=>{
        fetch(getBaseUrl() + "schemes/getData", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "JWT " + localStorage.getItem('token')
            }
          }).then((data) => {
            // console.log(data.json());
            return data.json();
          })
            .then((d) => {
                console.log(d);
                const dt=[]
                d.map((item)=>{
                    dt.push(
                    {x:new Date(item.fields.date).getTime(),
                     y : item.fields.enrollments}
                    );
                })
                setSeries(dt);
                console.log(timeSeries)
            })
            .catch((err)=>{
                console.log(err);
            })
          
    },[]);
    const series = [{
        data:timeSeries
        // [{
        //   x: new Date('2018-02-12').getTime(),
        //   y: 76
        // }, {
        //   x: new Date('2018-02-12').getTime(),
        //   y: 76
        // }]
      }];
    const series1= [{
        data: [21, 22, 10, 28, 16, 21, 13, 30]
      }];
      const options1={chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: ['#26A0FC','#26E7A6','#FEBC3B','#FF6178','#8B75D7','#6D848E','#46B3A9','#D830EB'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      yaxis:{
        style:{
            fontSize:'24px'
        }
      },
      xaxis: {
        categories: [
          ['Uttar', 'Pradesh'],
          ['Karnataka'],
          ['Tamil', 'Nadu'],
          'Rajasthan',
          ['Chattisghar'],
          ['West', 'Bengal'],
          ['Uttrakhand'],
          ['Haryana'], 
        ],
        labels: {
          style: {
            colors: ['#1d3d4d','#1d3d4d','#1d3d4d','#1d3d4d','#1d3d4d','#1d3d4d','#1d3d4d','#1d3d4d'],
            fontSize: '24px'
          }
        }
      }
    };
    const options= {
        chart: {
          type: 'area',
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Number Of Enrollments ',
          align: 'left'
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        yaxis: {
          title: {
            text: 'Number Of Enrollments'
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
          y: {
          }
        }
      };
    return (
        <div>
            <div id="chart" style={{marginTop:'50px'}}>
                <ReactApexChart options={options} series={series} type="area" height={350} />
            </div>
            <div style={{scale:'0.45', marginBottom:'250px',marginTop:'-190px', marginLeft:'-600px'}} >
            <DatamapsIndia
      regionData={{
        "Andaman & Nicobar Island": {
          value: 150,
          id:0
        },
        "Andhra Pradesh": {
          value: 470,
          id:1
        },
        "Arunanchal Pradesh": {
          value: 248,
          id:2
        },
        Assam: {
          value: 528,
          id:3
        },
        Bihar: {
          value: 755,
          id:4
        },
        Chandigarh: {
          value: 95,
          id:5
        },
        Chhattisgarh: {
          value: 1700,
          id:6
        },
        Delhi: {
          value: 1823,
          id:7
        },
        Goa: {
          value: 508,
          id:8
        },
        Gujarat: {
          value: 624,
          id:0
        },
        Haryana: {
          value: 1244,
          id:0
        },
        "Himachal Pradesh": {
          value: 640,
          id:0
        },
        "Jammu & Kashmir": {
          value: 566,
          id:0
        },
        Jharkhand: {
          value: 814,
          id:0
        },
        Karnataka: {
          value: 2482,
          id:0
        },
        Kerala: {
          value: 899,
          id:0
        },
        Lakshadweep: {
          value: 15,id:0
        },
        "Madhya Pradesh": {
          value: 1176,id:0
        },
        Maharashtra: {
          value: 727,id:0
        },
        Manipur: {
          value: 314,id:0
        },
        Meghalaya: {
          value: 273,id:0
        },
        Mizoram: {
          value: 306,id:0
        },
        Nagaland: {
          value: 374,id:0
        },
        Odisha: {
          value: 395,id:0
        },
        Puducherry: {
          value: 245,id:0
        },
        Punjab: {
          value: 786,id:0
        },
        Rajasthan: {
          value: 1819,id:0
        },
        Sikkim: {
          value: 152,id:0
        },
        "Tamil Nadu": {
          value: 2296,id:0
        },
        Telangana: {
          value: 467,id:0
        },
        Tripura: {
          value: 194,id:0
        },
        "Uttar Pradesh": {
          value: 2944,id:0
        },
        Uttarakhand: {
          value: 1439,id:0
        },
        "West Bengal": {
          value: 1321,id:0
        }
      }}

      hoverComponent={({ value }) => {
        console.log(value);
        return (
          <div style={{scale:'2', width:'180px', translate:'(-100px,100px)', padding:'10px', marginLeft:'100px'}}>
            <p>{value.name}</p>{value.value}
          </div>
        )
      }}
      mapLayout={{
        title: 'Statewise Data',
        legendTitle: 'Number Of Enrollments',
        startColor: '#FFDAB9',
        endColor: '#FF6347',
        hoverTitle: 'Count',
        noDataColor: '#f5f5f5',
        borderColor: '#8D8D8D',
        hoverBorderColor: '#8D8D8D',
        hoverColor: 'green',
      }}
    />
    <div style={{width:'1400px', position:'relative', top:'100px', left:'1800px'}}>
    <div id="chart">
        <p style={{fontSize:'65px'}}>Statewise Graph</p>
                <ReactApexChart options={options1} series={series1} type="bar" height={750} />
            </div>
    </div>
            </div>
        </div>
    )
}
