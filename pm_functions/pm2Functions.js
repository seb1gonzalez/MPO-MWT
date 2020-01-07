/* Last Edited: Sebastian 12/18/2019 */
/* Last Edited: Brian 1/05/2019
	Added plotpm2 method
 */



function plotPM2(mode, ex) {
    alert("Debugging 2");
    let color = "#039BE5";
    let sum = 0;
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm1';
        data_for_php = { key: key };
    }
    if (mode == 2) {
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
    }
	
    $.get(php_handler, data_for_php, function (data) {
        let median = 0;
        //to get median for color coding
        for (index in data.shape_arr) {
            if (currentType == "transit") {
                if (data.shape_arr[index].pm_prcnt_1 > 0) {
                    sum += parseFloat(data.shape_arr[index].prcnt_publ);
                }
            } else if (currentType == "walking") {
                if (data.shape_arr[index].pm_prcnt_1 > 0) {
                    sum += parseFloat(data.shape_arr[index].prcnt_walk);
                }
            } else if (currentType == "biking") {
                if (data.shape_arr[index].pm_prcnt_1 > 0) {
                    sum += parseFloat(data.shape_arr[index].prcnt_bike);
                }
            }
      
        }

        median = (sum / data.shape_arr.length).toFixed(2); // for color coding

        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let to_visualize = [];
            let hooverValue = 0;

            if (currentType == "transit") {
                hooverValue = parseFloat(data.shape_arr[index].prcnt_publ).toFixed(2);
            } else if (currentType == "walking") {
                hooverValue = parseFloat(data.shape_arr[index].prcnt_walk).toFixed(2);
            } else if (currentType == "biking") {
                hooverValue = parseFloat(data.shape_arr[index].prcnt_bike).toFixed(2);
            }

            if (mode > 0) {
                for (let i = 0; i < temp.length; i++) {
                    if (hooverValue == 0) {
                        color = "#9E9E9E"; //gray
                    } else if (hooverValue < median) {
                        color = "#64B5F6"; // light blue
                    } else if (hooverValue == median) {
                        color = "#1565C0"; // blue
                    } else if (hooverValue > median) {
                        color = "#1A237E"; // dark blue
                    }
                    to_visualize.push(temp[i]);
                    polyToErase.plan.push();
                }
                let polygon = new google.maps.Polygon({
                    description: "",
                    description_value: '',
                    paths: to_visualize,
                    strokeColor: 'black', strokeOpacity: 0.60,
                    strokeWeight: 0.70,
                    fillColor: color,
                    fillOpacity: 0.60,
                    zIndex: -1,
                    title: hooverValue,
                });
                polyToErase.exist.push(polygon);

                //   Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
                google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
                google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

                polygon.setMap(map);
                polygons.push(polygon);
            }
        }

    });
}

// ! ADD MODES

/**Creates graph data for PM2*/
function pm2Data(mode, ex){ // gets valuesPm2 for pm2 graph, returns array with percent
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

	/**
 * Data only for pm2
 * [SOV, Walking, Biking, Transit, Non_SOV] 
 * For pie chart
 *  */


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

        for (let index = 0; index < data.shape_arr.length; index++) {

            NonSOV_e[index] = 
            parseInt((data.shape_arr[index].e1)) -  parseInt((data.shape_arr[index].e3));
            if(Number.isNaN(NonSOV_e[index])){
             NonSOV_e[index] = 0;
         }
        

         NonSOV_m[index] = (
           parseInt( (data.shape_arr[index].m1)) - parseInt((data.shape_arr[index].m3)));
           if(Number.isNaN(NonSOV_m[index])){
             NonSOV_m[index] = 0;
         }

        
         PM_RatioIN_e[index]=(
            NonSOV_e[index] * parseFloat((data.shape_arr[index].ratio_area)));
            if(Number.isNaN(PM_RatioIN_e[index])){
             PM_RatioIN_e[index] = 0;

         }
        
         PM_RatioIN_m[index] =(
            NonSOV_m[index] * parseFloat((data.shape_arr[index].ratio_area)));
            if(Number.isNaN(PM_RatioIN_m[index])){
             PM_RatioIN_m[index] = 0;

         }

         PM1_pct_NonSOV_e[index] =(
            NonSOV_e[index] / parseInt((data.shape_arr[index].e1)));
            if(Number.isNaN(PM1_pct_NonSOV_e[index])){
             PM1_pct_NonSOV_e[index] = 0;
            
         }
        
         PM1_pct_NonSOV_m[index] =(
             NonSOV_m[index] /  parseInt(data.shape_arr[index].m1));
             if(Number.isNaN(PM1_pct_NonSOV_m[index])){
                 PM1_pct_NonSOV_m[index] = 0;
                
             }

         PM2_pct_PublicTrans_e[index] =(
            parseInt(( data.shape_arr[index].e10)) / parseInt((data.shape_arr[index].e1)));
            if(Number.isNaN(PM2_pct_PublicTrans_e[index])){
             PM2_pct_PublicTrans_e[index] = 0;
            
         }


         PM2_pct_PublicTrans_m[index] = (
             parseInt(( data.shape_arr[index].m10)) / parseInt((data.shape_arr[index].m1)));
             if(Number.isNaN(PM2_pct_PublicTrans_m[index])){
                 PM2_pct_PublicTrans_m[index] = 0;
                
             }

         PM2_pct_Biking_e[index] = (
           parseInt( ( data.shape_arr[index].e18) ) / parseInt((data.shape_arr[index].e1)));
           if(Number.isNaN(PM2_pct_Biking_e[index])){
             PM2_pct_Biking_e[index] = 0;
            
         }

         PM2_pct_Biking_m[index] = (
           parseInt( ( data.shape_arr[index].m18)) /parseInt( (data.shape_arr[index].m1)));
           if(Number.isNaN(PM2_pct_Biking_m[index])){
             PM2_pct_Biking_m[index] = 0;
            
         }

         PM2_pct_Walking_e[index] = (
          parseInt(  ( data.shape_arr[index].e19) ) / parseInt((data.shape_arr[index].e1)));
          if(Number.isNaN(PM2_pct_Walking_e[index])){
             PM2_pct_Walking_e[index] = 0;
            
         }
        
         PM2_pct_Walking_m[index] = (
          parseInt( ( data.shape_arr[index].m19) ) /parseInt( (data.shape_arr[index].m1)));
          if(Number.isNaN(PM2_pct_Walking_m[index])){
             PM2_pct_Walking_m[index] = 0;  
         }
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
        
        let for_pm2 = {
            SOV:-1,
            Walking:-1,
            Biking:-1,
            Transit:-1,
            Non_SOV:-1
        };
       
        for_pm2.Biking    =      arrAvg(PM2_pct_Biking_e);
        for_pm2.Walking =     arrAvg(PM2_pct_Walking_e);
        for_pm2.Transit   =      arrAvg(PM2_pct_PublicTrans_e);
        for_pm2.SOV = 100 - arrSum(valuesPm2);                      // Driving
        for_pm2.Non_SOV = arrAvg(PM1_pct_NonSOV_e);
      
        alert('Data ready'); // after operations

        //  */*/*/*/* Display polygons   /*/*/*/*/
        plotPM2(mode,ex);
        
        // */*/*/*/   */*/*/    /*/*/   */*/    */*
        if (mode == 0) {
            document.getElementById("pm2-transit").innerHTML = for_pm2.Transit + "%";
            document.getElementById("pm2-biking").innerHTML = for_pm2.Biking + "%";
            document.getElementById("pm2-walking").innerHTML = for_pm2.Walking + "%";
        }
        if (mode == 1) {
            regionalText(for_pm2);
        }

    }).fail(function(){//error
        alert('Whoops, we could not retrieve data from our database. Check your internet connection or contact MPO');
    });

    

}


/** Draws pie chart for pm2*/
function piechartpm2(ctx,data){
    colors=[];
    colors = [
        'rgba(255,82,0,0.5)',
        'rgba(92,187,3,0.5)',
        'rgba(117,36,221,0.5)',
        'rgba(228,245,20,0.5)',
    ];

    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    data.Transit, 
                    data.Biking, 
                    data.Walking, 
                    data.Non_SOV
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



    

	