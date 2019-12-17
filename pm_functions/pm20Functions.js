function pm20Data(mode, ex) {
    let pm20Data = {
        t:0
    }

    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    
    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm20_p';
        data_for_php = { key: key };
    } else if (mode == 2) { // if we want corridors
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
    }
    console.log("about to leave");
    console.log(php_handler);
    console.log(data_for_php);
    console.log(mode);
    /*
    $.get(php_handler, data_for_php, function (data) {
        let image = "./img/markers/crash.png";
        console.log('returned to earth');
        for (index in data.shape_arr) {
            let holder = [];

            let type = data.shape_arr[index]['type'];
            let ogrID = parseInt(data.shape_arr[index]['OGR_FID']);

            if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points 
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                   // title: type,
                    value: ogrID,
                    icon: image
                });


                if (type == "Pedestrian" && currentType == "walking") {
                    point.setMap(map);
                    points.push(point);
                } else if (type == "Pedcyclists" && currentType == "biking") {
                    point.setMap(map);
                    points.push(point);
                }
            }
        }

        if (mode == 1) {
            regionalText(pm20Data);
        }
        else if (mode == 2 || mode == 3) {
            let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?
            dynamicCorridorText(corr, pm20Data); // Send graph data and current corridor to dynamic text for corridors
        }
    });
    /*
    key = 'all_pm20_s';
    data_for_php = { key: key };
    console.log(data_for_php);
    console.log(php_handler);
    $.get(php_handler, data_for_php, function (data) {
        let image = "./img/markers/pink.png";
        console.log('returned to pink');
        //Stations
        for (index in data.shape_arr) {
            let holder = [];
            console.log("testing");
           // let ogrID = parseInt(data.shape_arr[index]['OGR_FID']);

            if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points 
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: "test",
                    icon: image
                });

                point.setMap(map);
                points.push(point);

            }
        }

    });*/
    //buffer
    console.log("About to add Buffer");
    key = 'all_pm20_b';
    data_for_php = { key: key };
    console.log(data_for_php);
    console.log(php_handler);
    $.get(php_handler, data_for_php, function (data) {
        console.log("returned from pluto");
        let color = "#039BE5";//blue
        for (index in data.shape_arr) {
            console.log("in here");
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let to_visualize = [];
          

            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                to_visualize.push(temp[i]);
                polyToErase.exist.push();
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
                title: "Testing",
       
            });

            polyToErase.exist.push(polygon);

            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
            google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
            google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

            polygon.setMap(map);
            polygons.push(polygon);
        }

        /*In EXISTING only, get the summation of all the values in the Ratio_Pop column. For the percentage, use this summation, 
         * then divide that by the total number of jobs((Ratio_Pop / Total Population) * 100) */
       // pm9Data.peopleLivingTransit = ((pm9Data.Ex_pop / pm9Data.totPop) * 100);

    });




}
function pm20Crashes(mode, php_handler, data_for_php) {
    //crashes
    $.get(php_handler, data_for_php, function (data) {
        let image = "./img/markers/crash.png";
        console.log('returned to earth');
        for (index in data.shape_arr) {
            let holder = [];

            let type = data.shape_arr[index]['type'];
            let ogrID = parseInt(data.shape_arr[index]['OGR_FID']);

            if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points 
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: "test",
                    value: ogrID,
                    icon: image
                });


                if (type == "Pedestrian" && currentType == "walking") {
                    point.setMap(map);
                    points.push(point);
                } else if (type == "Pedcyclists" && currentType == "biking") {
                    point.setMap(map);
                    points.push(point);
                }
            }



        }
    });

}
/*
// Pedestrians
var pm20_P = {
    lon: [], lat: [], count: [], txtCount:0, clon: [], clat:[], ctype:[], pedTxt:0, highCrashAdd:"temp", highCrashNum:0
};
//Bycicle
var pm20_B = {
    lon: [], lat: [], count:[],  txtCount:0, clon: [], clat:[], ctype:[], bikeTxt:0, highCrashAdd:"temp", highCrashNum:0, sameCrashNum:0
};
var pm20_points = {
    busses: [],
    pedCrash: [],
    bikeCrash: [],

}
function pm20DataT(){
    let key = 'all_pm20C';
    let example = {key: key};
    let image = "./img/markers/crash.png";
    //Crash Points
    $.get('mwt_handler.php', example, function(data) { 

       for(index in data.shape_arr){ 
           let holder = [];
          // let totCount = data.shape_arr[index]['total'];
           let type  = data.shape_arr[index]['type'];
           holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
           holder = holder[0][0]; // Fixes BLOB
        
           let to_visualize = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};

           let point  = new google.maps.Marker({
               position: to_visualize,
               title: "crash",
               value: '0',
               icon: image
           });
            //filter crashes/points
           if(type == "Pedestrian"){
              pm20_points.pedCrash.push(point);
           }else{
              pm20_points.bikeCrash.push(point);
           }
       }
    }); 
    key = 'all_pm20';
    example = {key: key};
    image = "./img/markers/red.png";
    //Crash Points
    $.get('mwt_handler.php', example, function(data) { 
       console.log("Buses");
       for(index in data.shape_arr){ 
           let holder = [];
        
           holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
           holder = holder[0][0]; // Fixes BLOB
        
           let to_visualize = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};

           let point  = new google.maps.Marker({
               position: to_visualize,
               title: "crash",
               value: '0',
               icon: image
           });
            
           pm20_points.busses.push(point);
        }
    }); 
    
}

function pm20Data(){ 
    fetch('./results.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            //calculation variables
            let psum = 0; //ped summation
            let bsum = 0; 

            let ptot = 0; //ped tot crashes
            let btot = 0;
            
            let pm20T =  new Array(12);
            for(let i =0; i <pm20T.length; i++) pm20T[i] =0; //set zero to array

            
            for(let i = 0; i < myJson.PM20.lat.length; i++){ 
                if(myJson.PM20.Type[i] == "PED"){
                    //stores coordinates with their count
                    if(myJson.PM20.count[i] < 12){// myJson.PM20.count[i] < 12 removes gray points or points with no data
                        pm20_P.lon.push(myJson.PM20.lon[i]);
                        pm20_P.lat.push(myJson.PM20.lat[i]);
                        pm20_P.count.push(parseInt(myJson.PM20.count[i]));
                        psum +=parseInt(myJson.PM20.count[i]);

                        //update greatest crash count and address
                        if(myJson.PM20.count[i] > pm20_P.highCrashNum){
                            pm20_P.highCrashNum = parseInt(myJson.PM20.count[i]);
                            pm20_P.highCrashAdd = modAddress(myJson.PM20.Address[i]);
                          
                        }
                    }
                    
                    ptot++; //add total crashes of PEDS
                }
               else if(myJson.PM20.Type[i] == "BIKE"){
                    if(myJson.PM20.count[i] < 12){
                        pm20_B.lon.push(myJson.PM20.lon[i]);
                        pm20_B.lat.push(myJson.PM20.lat[i]);
                        pm20_B.count.push(parseInt(myJson.PM20.count[i]));
                        bsum += parseInt(myJson.PM20.count[i]);

                        //update array
                        pm20T = countCrashes(pm20T, parseInt(myJson.PM20.count[i]));
                        
                        //update greatest crash count and address
                        if(myJson.PM20.count[i] > pm20_B.highCrashNum){
                            pm20_B.highCrashNum = parseInt(myJson.PM20.count[i]);
                            pm20_B.highCrashAdd = modAddress(myJson.PM20.Address[i]);
                           // console.log('current ' +    pm20_B.highCrashAdd);
                            //pm20_B.highCrashAdd = modAddress(pm20_B.highCrashAdd);
                        }
                    }
                    btot++;
                }
            }
            //For dynamic text. Gets the count of the greatest amount of crashes in a point
            pm20_B.sameCrashNum = checkGreatestVal(pm20T,pm20_B.highCrashNum);
    
            //calculations for dynamic text
            pm20_B.bikeTxt = ((bsum/btot)*100).toFixed(2);
            pm20_P.pedTxt = ((psum/ptot)*100).toFixed(2);

            //strores crash points
            for(let i = 0; i < myJson.PM20.crashLon.length; i++){ 
                if(myJson.PM20.crashType[i] == "Pedestrian"){
                    pm20_P.clon.push(myJson.PM20.crashLon[i]);
                    pm20_P.clat.push(myJson.PM20.crashLat[i]);                    
                }else if(myJson.PM20.crashType[i] == "Pedcyclists"){
                    pm20_B.clon.push(myJson.PM20.crashLon[i]);
                    pm20_B.clat.push(myJson.PM20.crashLat[i]);
                }
            }

            //for text
            for(let i = 0; i < pm20_P.count.length ; i++){ 
                if(pm20_P.count[i] > 0 && pm20_P.count[i] < 13){
                    pm20_P.txtCount += pm20_P.count[i];
                }
            }
            for(let i = 0; i < pm20_B.count.length ; i++){ 
                if(pm20_B.count[i] > 0 && pm20_B.count[i] < 13){
                    pm20_B.txtCount += pm20_B.count[i];
                }
            }
            //text
            document.getElementById("pm20-P").innerHTML = pm20_P.txtCount;
            document.getElementById("pm20-B").innerHTML = pm20_B.txtCount;
        });

}
//modify address
function modAddress(address){ 
    let tmp = "";
    if(address.includes('\\')){
        //   console.log("used this");
        tmp = address.replace(/\\/g, ' and ');
        return tmp;
    }else if(address.includes('/')){
        //.log(address.replace('/', ' and '));
        tmp = address.replace('/', ' and ');
        return tmp;
    }
//console.log("no change");
    return address;
}

//array (indexes) have the count of each crash. receives a num and goes to that index and adds. 
//EX: array[0] represents crashes with value 1, so everytime num 1 is received then array[0]++
function countCrashes(array, num){ 
    array[num-1]++;
    return array;
}
//receives greatest number of crashes, then sees the count for those crashes 
// ex: if greatest = 5 then we check the value on array[4] returning the count for crashes with value
function checkGreatestVal(array, greatest){
    return array[greatest-1];
}

*/