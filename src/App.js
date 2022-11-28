// import React, {useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
// import Histogram from 'react-chart-histogram';
import Chart from "react-apexcharts";

const URL = "https://www.terriblytinytales.com/test.txt";


export const App = () => {
  const [state, setstate] = useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  });

  var arr;
   function count_occures(value, ans) {
     for (let i = 0; i < value.length; i++) {
       if (ans[value[i]] === undefined) {
        ans[value[i]] = 1;
       } else {
        ans[value[i]]++;
       }
     }
   }

   const getData = async () => {
      const response = await axios(URL);
      const body = await JSON.stringify(response);
      const value = body.split(" ");
      let ans = {};
      count_occures(value, ans);
      arr = Object.keys(ans).sort(function (a, b) { return ans[b] - ans[a]});
      // console.log(arr);
        
      for (let i = 0; i < 20; i++){
       const obj = {};
       obj.key = arr[i];
       obj.val = ans[arr[i]];
       output.push(obj);
      }
    
      console.log(output);
   };
    
    const onClickHandler = () => {
      getData();
    };
    
    var labels = [];
    var data = [];
    var options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };
    
    for (let i = 0; i < 20; i++){
      labels.push(arr[i]);
      data.push(output[arr[i]]);
    }
    
    return (
      <div>
        <button onClick={onClickHandler}>Click me for a Data</button>
        <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
        />
      </div>
    )
};