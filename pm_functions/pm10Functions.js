//******pm6 shares table with pm10 on database
//Handles 2 toggles of Exist/Plan for Polygons.

function pm10Data(mode, condition) {
    let pm10Data = {
        totPop: 0,
        totRatioPop: 0,
        existingPop: 0,
        peoplelivin: 0,
        totpeoplelivinTot:0
    };

    let key = 'all_pm10';
    let example = { key: key };
    let color = "#039BE5";

    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];
            let status = data.shape_arr[index].status;
            let pop = parseFloat(data.shape_arr[index].ratio_pop);
          

            //update Text Data
            if (status == "exist") {
                pm10Data.existingPop += pop;
            } 

            pm10Data.totPop += pop;
           // pm10Data.totRatioPop += ;
                              
            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                if (status == "existing" && condition == "e") {
                    color = "#039BE5"; //blue
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
                title: pop.toFixed(2),
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

        // Calculations
        /* In EXISTING only, get the summation of all the values in the Ratio_Pop column.For the percentage, 
         * use this summation, then divide that by the total number of jobs 
         * ((Ratio_Pop/Total Population) *100)
         */

        pm10Data.peoplelivin = (pm10Data.existingPop / pm10Data.totPop) * 100;
        pm10Data.totpeoplelivinTot = (pm10Data.totRatioPop / pm10Data.totPop) * 100; 


        if (mode == 0) {
            document.getElementById("pm10Text").innerHTML = String(pm10Data.ratioPrim.toFixed(2)) + "%"; // menu text
        } else if (mode == 1) {
            regionalText(pm10Data);
        }

    });
}

function pm10chart(g2, data) {
    colors = [];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    let tot = 100 - (Math.round(data.peoplelivin));

    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                //  data: [tot, Math.round(data.ratioPrim)],
                data: [tot.toFixed(2), data.peoplelivin.toFixed(2)],
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

