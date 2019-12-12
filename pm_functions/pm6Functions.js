//**************************************************************** pm6 shares table with pm10 on database
//Handles 2 toggles of Exist/Plan for Polygons.

function pm6Data(mode, condition) {
    let pm6Data = {
        existingJobs: 0,
        totalJobs: 0,
        totalprims:0,
        percentLiving: 0,
        percentJobs:0
    };

    let key = 'all_pm10';
    let example = { key: key };
    let color = "#039BE5";

    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];
            let status = data.shape_arr[index].status;
            let prctprim = parseFloat(data.shape_arr[index].prcnt_prim);
            let ratioprim = parseFloat(data.shape_arr[index].ratio_prim);
            let primJobs = parseInt(data.shape_arr[index].prim_jobs_);

            if (status == "existing") {
                pm6Data.existingJobs += ratioprim;
            }

            pm6Data.totalJobs += primJobs;
            pm6Data.totalprims += ratioprim;
              
            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                if (status == "existing" && condition == "e") {
                    color = "#039BE5";//blue
                    to_visualize.push(temp[i]);
                    polyToErase.exist.push();
                } else if (status == "planned_exist" && condition == "p") {
                    color = "#9E9E9E"; //gray
                    to_visualize.push(temp[i]);
                    polyToErase.plan.push();
                }

            }
            let polygon = new google.maps.Polygon({
                description: "",
                description_value: '',
                paths: to_visualize,
                strokeColor: 'black',
                strokeOpacity: 0.60,
                strokeWeight: 0.70,
                fillColor: color,
                fillOpacity: 0.60,
                zIndex: -1,
                title: prctprim.toFixed(2) + "%",
            });

            if (condition == "e") polyToErase.exist.push(polygon);
            if (condition == "p") polyToErase.plan.push(polygon);

            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
            google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

            polygon.setMap(map);
            polygons.push(polygon);
        }

        // calculations
        /*In EXISTING only, get the summation of all the values in the Ratio_Prim_Jobs 
         * column from both TX& NM.For the percentage, use this summation, then divide 
         * that by the total number of jobs 
         * ((Ratio_Prim_Jobs /Total Jobs) *100).*/

        pm6Data.percentLiving = (pm6Data.existingJobs / pm6Data.totalJobs) * 100;
        pm6Data.percentJobs =   (pm6Data.totalprims / pm6Data.totalJobs) * 100;


        if (mode == 0) {
            document.getElementById("pm6Text").innerHTML = String(pm6Data.percentLiving.toFixed(2)) + "%"; // menu text
        } else if (mode == 1) {
            console.log(pm6Data);
            regionalText(pm6Data);
        }

    });
}

function pm6chart(g2, data) {
    let totJobs = 100 - data.percentLiving;
    colors = [];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];

    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
              //  data: [tot, Math.round(data.ratioPrim)],
                data: [totJobs.toFixed(2), data.percentLiving.toFixed(2)],
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

