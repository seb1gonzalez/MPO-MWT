/**
 * PM1 and PM2 have the same source table from database,
 * however, they are kept separate to ensure atomic requests, and avoid complexity
 * in sharing and keeping track of global variables
 *   
 * */

 /**
 * Data only for pm1 [NonSOV, SOV] - builds pie chart
 *  */



function plotPM1(mode, ex) {
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
            if (data.shape_arr[index].pm_prcnt_1 > 0) {
                sum += parseFloat(data.shape_arr[index].pm_prcnt_1);
            }
        }

        median = (sum / data.shape_arr.length).toFixed(2); // for color coding
        
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let pm_prcnt_n = parseFloat(data.shape_arr[index].pm_prcnt_1).toFixed(2);
            let nonsov_e = parseFloat(data.shape_arr[index].nonsov_e);
            let to_visualize = [];

            if (mode > 0){
                for (let i = 0; i < temp.length; i++) {
                    if (pm_prcnt_n == 0) {
                        color = "#9E9E9E"; //gray
                    } else if (pm_prcnt_n < median) {
                        color = "#64B5F6"; // light blue
                    } else if (pm_prcnt_n == median) {
                        color = "#1565C0"; // blue
                    } else if (pm_prcnt_n > median) {
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
                    title: pm_prcnt_n,
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


function pm1chart(g2, data) {

    colors = [];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    let tot = 100 - (Math.round(data.Sum_nonsov_e));
    console.log(tot);
    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                data: [tot, data.Sum_nonsov_e.toFixed(2)],
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
function pieChartpm1(ctx,data){
    console.log("inside PM1 graph");
    console.log(data);
    colors = [];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    let tot = 100 - (data.Sum_nonsov_e);

    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [data.NonSOV.toFixed(2), data.SOV.toFixed(2)],
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

const arrSum = arr => arr.reduce((a,b) => a + b, 0);

function arrAvg(arr){
    let sum = arrSum(arr);
    let avg = sum/arr.length;
    return avg;

}


/**Fetches pm1 data from Database and makes calculations on the fly  */
function pm1Data(mode, ex) { // ! Brian, this is ready for MODES
    let for_pm1 = {
        SOV: [],
        NonSOV:[]
    };
    /*
    let for_pm1 = {
        'SOV': [],
        'NonSOV': []
    }*/

    { 
        /**
        * Stores calculations: 
        * Index # | Operation
        * 0       | NonSOV_e: e1 - e3
        * 1       | NonSOV_m: m1 - m3
        * 2       | PM_RatioIN_e: nonsov_e * ratio_area
        * 3       | PM_RatioIN_m: nonsov_m * ratio_area
        * 4       | PM1_pct_NonSOV_e: NonSOV_e  / e1
        * 5       | PM1_pct_NonSOV_m: NonSOV_m  / m1
        * 6       | PM2_pct_PublicTrans_e: B08301e10  / e1
        * 7       | PM2_pct_PublicTrans_m: B08301m10  / m1
        * 8       | PM2_pct_Biking_e: B08301e18  / e1
        * 9       | PM2_pct_Biking_m B08301m18  / m1
        * 10      | PM2_pct_Walking_e: B08301e19  / e1
        * 11      | PM2_pct_Walking_m: B08301m19 / m1
        * 12      | SOV = 100 - AVGs_sum[Indexes[4,6,8,10]]
        */
       }


 // ! change the handler and key if needed according to the MODE requested
    let key = {'key':'all_pm1'}
    let file = './mwt_handler.php';

    /** Fetch data from database */ 
    $.get(file,key).done(function(data) {//succesful
       //acknowledge fetch
	   if(mode != 0){
		alert('Retrieving Data, this might take a minute to load');
	   }

        // All BELOW IS MODE INDEPENDENT..data comes from the variable 'file'; the specific handler [AOI,MWT,CORRIDOR]

       let NonSOV_e =[];
       let NonSOV_m = [];
       let PM_RatioIN_e = [];
       let PM_RatioIN_m = [];
       let PM1_pct_NonSOV_e = [];
       let PM1_pct_NonSOV_m = [];
       let PM2_pct_PublicTrans_e =[];
       let PM2_pct_PublicTrans_m = [];
       let PM2_pct_Biking_e = [];
       let PM2_pct_Biking_m =[];
       let PM2_pct_Walking_e = [];
       let PM2_pct_Walking_m =[];
       let SOV = 0;

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
        }
 
        // end for loop

        valuesPm1 = [];
        valuesPm1.push(arrAvg(PM2_pct_PublicTrans_e));
        valuesPm1.push(arrAvg(PM2_pct_Biking_e));
        valuesPm1.push(arrAvg(PM2_pct_Walking_e));
        valuesPm1.push(arrAvg(PM1_pct_NonSOV_e));
         SOV = (100 - arrSum(valuesPm1));                               //driving
        //console.table(valuesPm1);
        
        // fill PM1 graph data 
           let results = {
            1:NonSOV_e,  
            2:PM_RatioIN_e , 
            3:PM_RatioIN_m , 
            4:PM1_pct_NonSOV_e ,
            5:PM1_pct_NonSOV_m ,
            6:PM2_pct_PublicTrans_e  ,
            7:PM2_pct_Biking_e ,
            8:PM2_pct_Biking_m ,
            9:PM2_pct_Walking_e ,
            10:PM2_pct_Walking_m ,
            11:SOV 
            };
             //console.table(results);

        for_pm1.SOV = SOV;
        for_pm1.NonSOV = (arrSum(PM1_pct_NonSOV_e))/10;        
        console.table(for_pm1);

        if(mode != 0){
			alert('Data ready'); // after operations
		}
        //  */*/*/*/* Display polygons   /*/*/*/*/
        plotPM1(mode, ex);
        // */*/*/*/   */*/*/    /*/*/   */*/    */*
        //modes
        console.log("in here 1");
        if (mode == 0) {
			document.getElementById("pm1-sov").innerHTML = for_pm1.SOV.toFixed(2) + " %";
        } else if (mode == 1) {
            regionalText(for_pm1);
        } else if (mode == 2) {
			let corr = translateCorridor(ex.corridors_selected); // what corridor are we on?
            dynamicCorridorText(corr,for_pm1);
        }

    }).fail(function(){//error
        alert('Whoops, we could not retrieve data from our database. Check your internet connection or contact MPO');
    });

} 
