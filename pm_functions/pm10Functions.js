//******pm6 shares table with pm10 on database
//Handles 2 toggles of Exist/Plan for Polygons.

function pm10Data(mode, condition) {
    let pm10Data = {
        totPop: 0,
        peoplelivin: 0,
        totpeoplelivin:0
    };

    let key = 'all_pm10';
    let example = { key: key };
    let color = "#039BE5";
    let existing_ratio_pop = 0;
    let totRatioPop = 0;
    $.get('mwt_handler.php', example, function (data) {
        console.log(data);
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];
            let status = data.shape_arr[index].status;
            let pop = parseFloat(data.shape_arr[index].b00001e1); //B00001e1 
            let ratio_pop = parseFloat(data.shape_arr[index].ratio_pop);
            

            //update Text Data
            if (status == "existing") {
                existing_ratio_pop += ratio_pop;
            } 

            totRatioPop += ratio_pop;
            pm10Data.totPop += pop;
            
                              
            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                if (status == "existing" && condition == "e") {
                    color = "#039BE5"; //blue
                    to_visualize.push(temp[i]);
                    polyToErase.exist.push();
                } else if (status == "plan_exist" && condition == "p") {
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
                title: ratio_pop.toFixed(),
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

        pm10Data.peoplelivin = (existing_ratio_pop / pm10Data.totPop) * 100;
        pm10Data.totpeoplelivin = (totRatioPop / pm10Data.totPop) * 100; 


        if (mode == 0) {
            document.getElementById("pm10Text").innerHTML = String(pm10Data.peoplelivin.toFixed()) + "%"; // menu text
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
                data: [tot.toFixed(2), data.peoplelivin.toFixed()],
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

