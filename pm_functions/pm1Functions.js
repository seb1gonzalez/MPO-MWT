
/**
 * Data only for pm1 [NonSOV, SOV] - builds pie chart
 *  */
let for_pm1 = {
    'SOV':[],
    'NonSOV':[]
}
// graph
var pm1Chart =0;
var pm1Chart2 = 0;

function pm1Data(mode, ex) {
    {
//     let pm1Data = {
//         jobs: 0,
//         ratioPrim: 0,
//         ratioPrimTot: 0
//     };

//     // let key = 'all_pm1';
//     // let example = { key: key };
//     // let color = "#039BE5";
//     // console.log('pm1 before db');
//     $.get('mwt_handler.php', example, function (data) {
//     //     console.log(data.shape_arr);
//     //     console.log('returned from db');
//     //     for (index in data.shape_arr) {
//     //         let temp = wktFormatter(data.shape_arr[index]['shape']);
//     //         let to_visualize = [];
//     //         // if the status of a shape exists, push to visualize
//     //         for (let i = 0; i < temp.length; i++) {
//     //                 color = "#9E9E9E"; //gray
//     //                 to_visualize.push(temp[i]);
//     //                 polyToErase.plan.push();
//     //         }
//     //         let polygon = new google.maps.Polygon({
//     //             description: "",
//     //             description_value: '',
//     //             paths: to_visualize,
//     //             strokeColor: 'black',
//     //             strokeOpacity: 0.60,
//     //             strokeWeight: 0.70,
//     //             fillColor: color,
//     //             fillOpacity: 0.60,
//     //             zIndex: -1,
//     //             title:'test',
//     //         });

//     //          polyToErase.exist.push(polygon);

// }
//             // Hover Effect for Google API Polygons
//             google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
//             google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
//             google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });
//             polygon.setMap(map);
//             polygons.push(polygon);
//         }
//         if (mode == 0) {
//         } else if (mode == 1) {
//             regionalText(pm1Data);
//         }
//     });
    }


}

function pm1chart(g2, data) {
    colors = [];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    //  let tot = 100 - (Math.round(data.ratioPrim));

    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                //  data: [tot, Math.round(data.ratioPrim)],
                data: [2, 1],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Total Jobs in the El Paso MPO region',
                'Percent of jobs 0.5 mi from existing high-quality rapid transit',
            ]
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontSize: 13,
                    boxWidth: 15
                }
            },
            /* title: {
                 display: true,
                 text: 'Title 2'
             },*/
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            }
        }

    });
}


var valsPm1 = []; // stores values for PM1 graph

function pm1Data2(){ // gets valuesPm2 for pm2 graph, returns array with percent
    let arr = [];
    let json = [
       "SOV",
    ];

    fetch('./results.json')
      .then(function (response) {
          return response.json();
       })
      .then(function (myJson) {
            for (let i = 0; i < json.length; i++) {
                arr.push(myJson[json[i]]);
            }
            
            valsPm1[0] = Math.round(avg(arr)*10)/10; // SOV
            valsPm1[1] = Math.round((100 -  valsPm1[0]) * 10)/10; // NON SOVDDD
            document.getElementById("pm1-sov").innerHTML = valsPm1[0] + "%";
        });
}



function safeDestroypm1(){
    if(isChartFilledpm1() == true){
        destroypm1charts();
    }
    pm1Chart =0;
    pm1Chart2 = 0;
}

function isChartFilledpm1(){
    if(pm1Chart == 0 || pm1Chart2 ==0)
        return false;
    return true;
}

function destroypm1charts(){
    pm1Chart.destroy();
    pm1Chart2.destroy();
}

function pieChartpm1(ctx){
    pm1Data();
    colors=[];
      colors = [
        'rgba(255,255,0,0.3)',
        'rgba(0, 0, 255, 0.3)',
      ]


      pm1Chart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: valsPm1,
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Non SOV',
                'SOV',
            ]
        },
        options: {
            responsive: true,
            tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                  }
                }
              }
        }
       
    });
}
    
function barchartPm1(g1){
    pm1Chart2 = new Chart(g1, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [
            {
                label: 'No Data',
                data:[10],
                backgroundColor: [
                    'rgba(192,192,192 ,1 )',                     
                ],
                borderColor: [
                    'rgba(192,192,192 ,1 )',
            
                ],
                borderWidth: 1
            },
            {
                label: 'Below Mean',
                data: [4],
                backgroundColor: [
                    'rgba(0,204,255,0.5)',                     
                ],
                borderColor: [
                    'rgba(0,204,255,0.5)',
            
                ],
                borderWidth: 1
            },
            {
                label: 'Above Mean',
                data: [3],
                backgroundColor: [
                    'rgba(0,102,204,0.5)',                     
                ],
                borderColor: [
                    'rgba(0,102,204,0.5)',
            
                ],
                borderWidth: 1
            }]
        },
    
        options: {
                responsive: true,
            legend:{
                labels: {
                    fontSize: 14,
                    boxWidth:15
                }
            },
           /* title: {
                display: true,
                text: 'Title 1'
            },*/
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
			            
                    }
                }]
            }
        }
    });
}


// ! this function will run at the beginning always
function fetch_data_pm1_pm2(){
    { /**
        * Stores calculations: 
        * Index # | Operation
        * 0       | NonSOV_e: b08301e1 - b08301e3
        * 1       | NonSOV_m: b08301m1 - b08301m3
        * 2       | PM_RatioIN_e: nonsov_e * ratio_area
        * 3       | PM_RatioIN_m: nonsov_m * ratio_area
        * 4       | PM1_pct_NonSOV_e: NonSOV_e  / B08301e1
        * 5       | PM1_pct_NonSOV_m: NonSOV_m  / B08301m1
        * 6       | PM2_pct_PublicTrans_e: B08301e10  / B08301e1
        * 7       | PM2_pct_PublicTrans_m: B08301m10  / B08301m1
        * 8       | PM2_pct_Biking_e: B08301e18  / B08301e1
        * 9       | PM2_pct_Biking_m B08301m18  / B08301m1
        * 10      | PM2_pct_Walking_e: B08301e19  / B08301e1
        * 11      | PM2_pct_Walking_m: B08301m19 / B08301m1
        * 12      | SOV = 100 - AVGs_sum[Indexes[4,6,8,10]]
        */
       }



    let key = {'key':'all_pm1'}
    let file = './mwt_handler.php';

    /** Fetch data from database */ 
    $.get(file,key).done(function(data) {//succesful
       //acknowledge fetch
       alert('Retrieving Data, this might take a minute to load');

        // All BELOW IS MODE INDEPENDENT..data comes from the variable 'file'; the specific handler [AOI,MWT,CORRIDOR]

       let NonSOV_e =[]
       let NonSOV_m = []
       let PM_RatioIN_e = []
       let PM_RatioIN_m = []
       let PM1_pct_NonSOV_e = []
       let PM1_pct_NonSOV_m = []
       let PM2_pct_PublicTrans_e =[]
       let PM2_pct_PublicTrans_m = []
       let PM2_pct_Biking_e = []
       let PM2_pct_Biking_m = []
       let PM2_pct_Walking_e = []
       let PM2_pct_Walking_m = []
       let SOV = 0;

        for (let index = 0; index < data.shape_arr.length; index++) {

            NonSOV_e.push(
              (data.shape_arr[index].b08301e1) -(data.shape_arr[index].b08301e3));
           
            NonSOV_m.push(
              (data.shape_arr[index].b08301m1) -(data.shape_arr[index].b08301m3));

            PM_RatioIN_e.push(
               NonSOV_e[index] *(data.shape_arr[index].ratio_area));
           
            PM_RatioIN_m.push(
               NonSOV_m[index] *(data.shape_arr[index].ratio_area));

            PM1_pct_NonSOV_e.push(
               NonSOV_e[index] /(data.shape_arr[index].b08301e1));
           
            PM1_pct_NonSOV_m.push(
                NonSOV_m[index] / data.shape_arr[index].b08301m1);

            PM2_pct_PublicTrans_e.push(
              ( data.shape_arr[index].b08301e10) /(data.shape_arr[index].b08301e1));
           
            PM2_pct_PublicTrans_m.push(
               ( data.shape_arr[index].b08301m10) /(data.shape_arr[index].b08301m1));

            PM2_pct_Biking_e.push(
              ( data.shape_arr[index].b08301e18 ) /(data.shape_arr[index].b08301e1));
           
            PM2_pct_Biking_m.push(
               ( data.shape_arr[index].b08301m18) /(data.shape_arr[index].b08301m1));

            PM2_pct_Walking_e.push(
               ( data.shape_arr[index].b08301e19 ) /(data.shape_arr[index].b08301e1));
           
            PM2_pct_Walking_m.push(
              ( data.shape_arr[index].b08301m19 ) /(data.shape_arr[index].b08301m1));

        }// end for loop
        valuesPm2 = []
        valuesPm2.push(arrAvg(PM2_pct_PublicTrans_e));
        valuesPm2.push(arrAvg(PM2_pct_Biking_e));
        valuesPm2.push(arrAvg(PM2_pct_Walking_e));
        valuesPm2.push(arrAvg(PM1_pct_NonSOV_e));
        SOV = 100 - arrSum(valuesPm2);
        
        // fill PM1 graph data 
        for_pm1.SOV = SOV;
        for_pm1.NonSOV = (arrAvg(PM1_pct_NonSOV_e));

        //fill PM2 data
        for_pm2.Biking = 
        

        alert('Data ready'); // after operations
        //  */*/*/*/* Display polygons   /*/*/*/*/
        
        
        // */*/*/*/   */*/*/    /*/*/   */*/    */*
        // let results = {
        //     1:NonSOV_e,  
        //     2:PM_RatioIN_e , 
        //     3:PM_RatioIN_m , 
        //     4:PM1_pct_NonSOV_e ,
        //     5:PM1_pct_NonSOV_m ,
        //     6:PM2_pct_PublicTrans_e  ,
        //     7:PM2_pct_Biking_e ,
        //     8:PM2_pct_Biking_m ,
        //     9:PM2_pct_Walking_e ,
        //     10:PM2_pct_Walking_m ,
        //     11:SOV 
        //     };

    }).fail(function(){//error
        alert('Whoops, we could not retrieve data from our database. Check your internet connection or contact MPO');
    });

}