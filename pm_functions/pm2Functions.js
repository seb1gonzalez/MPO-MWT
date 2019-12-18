/* Last Edited: Sebastian 12/18/2019 */

/**
 * Data only for pm2
 * [SOV, Walking, Biking, Transit, Non_SOV] 
 * For pie chart
 *  */
let for_pm2 = {
    'SOV':-1,
    'Walking':-1,
    'Biking':-1,
    'Transit':-1,
    'Non_SOV':-1
}


// ! ADD MODES

/**Creates graph data for PM2*/
function pm2Data(){ // gets valuesPm2 for pm2 graph, returns array with percent
    { 
        /**
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


 // ! change the handler and key if needed according to the MODE requested
    let key = {'key':'all_pm1'}
    let file = 'mwt_handler.php';

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
      // let SOV = 0;

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
       
        /** 
            valuesPm2[0] = transit
            valuesPm2[1] = biking
            valuesPm2[2] = walking
            valuesPm2[3] = other modes
        */
        var valuesPm2 = [];  // needed for SOV calculation
        valuesPm2.push(arrAvg(PM2_pct_PublicTrans_e));       //transit
        valuesPm2.push(arrAvg(PM2_pct_Biking_e));               //biking
        valuesPm2.push(arrAvg(PM2_pct_Walking_e));            //walking
        valuesPm2.push(arrAvg(PM1_pct_NonSOV_e));           //other
  
       
        for_pm2.Biking    =      arrAvg(PM2_pct_Biking_e);
        for_pm2.Walking =     arrAvg(PM2_pct_Walking_e);
        for_pm2.Transit   =      arrAvg(PM2_pct_PublicTrans_e);
        for_pm2.SOV = 100 - arrSum(valuesPm2);                      // Driving
        for_pm2.Non_SOV = arrAvg(PM1_pct_NonSOV_e);
      
        alert('Data ready'); // after operations

        //  */*/*/*/* Display polygons   /*/*/*/*/
        
        
        // */*/*/*/   */*/*/    /*/*/   */*/    */*
        

    }).fail(function(){//error
        alert('Whoops, we could not retrieve data from our database. Check your internet connection or contact MPO');
    });

    

            
document.getElementById("pm2-transit").innerHTML = for_pm2.Transit  + "%";
document.getElementById("pm2-biking").innerHTML =  for_pm2.Biking  + "%";
document.getElementById("pm2-walking").innerHTML = for_pm2.Walking+ "%";

           

}


/** Draws pie chart for pm2*/
function pm2chart2(g2){
    colors=[];
    colors = [
        'rgba(255,82,0,0.5)',
        'rgba(92,187,3,0.5)',
        'rgba(117,36,221,0.5)',
        'rgba(228,245,20,0.5)',
    ];

    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    for_pm2.Transit, 
                    for_pm2.Biking, 
                    for_pm2.Walking, 
                    for_pm2.Non_SOV
                ],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Transit',
                'Biking',
                'Walking',
                'Other Modes',
            ]
        },
        options: {
            responsive: true,
            legend:{
                labels: {
                    fontSize: 13,
                    boxWidth:15
                }
            },
           /* title: {
                display: true,
                text: 'Title 2'
            },*/
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


//  ----------------------- old ----------------------//


/** Draws bar chart for pm2*/
// function pm2chart1(g1, values){
//     myChart = new Chart(g1, {
//         type: 'bar',
//         data: {
//             labels: [''],
//             datasets: [
//             {
//                 label: 'No Data',
//                 data: [values[0]],
//                 backgroundColor: [
//                     'rgba(192,192,192 ,1 )',                     
//                 ],
//                 borderColor: [
//                     'rgba(192,192,192 ,1 )',
            
//                 ],
//                 borderWidth: 1
//             },
//             {
//                 label: 'Below Mean',
//                 data: [values[1]],
//                 backgroundColor: [
//                     'rgba(0,204,255,0.5)',                     
//                 ],
//                 borderColor: [
//                     'rgba(0,204,255,0.5)',
            
//                 ],
//                 borderWidth: 1
//             },
//             {
//                 label: 'Above Mean',
//                 data: [values[2]],
//                 backgroundColor: [
//                     'rgba(0,102,204,0.5)',                     
//                 ],
//                 borderColor: [
//                     'rgba(0,102,204,0.5)',
            
//                 ],
//                 borderWidth: 1
//             }]
//         },
    
//         options: {
//                 responsive: true,
//             legend:{
//                 labels: {
//                     fontSize: 12,
//                     boxWidth:15
//                 }
//             },
//             title: {
//                 display: true,
//                 text: 'Number in Each Census Block',
//                 fontSize:14,
//             },
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true,
			            
//                     }
//                 }]
//             }
//         }
//     });
// }



    

	