
/*jshint
    esversion: 6,
    quotmark: single,
    varstmt: true,
    trailingcomma: true,
    regexpu: true,
    eqeqeq: true,
    curly: true

*/  //contains all the data about the repositories and the gui assets.
let repos;
function data_repo() {//
    load_repo_modal();
    //get the buttons JSON file 
    $.getJSON('data_repository/repo.json', (data)=> {
        ////console.log(data);
        repos = data;
    });

    // set the modal into the container div,
    let list = document.getElementById('repo-list');
    let legend = document.getElementById('repo-legend');
    let disclaimer = document.getElementById('repo-disclaimer');
    let description = document.getElementById('repo-description');
    ////console.log(repos);  

    if (list.innerHTML === ''){ //prevent duplicate loading.
        try {
            load_repo_list(list, Object.keys(repos.buttons));    
        } catch (TypeError) {
            setTimeout(function() {
                load_repo_list(list, Object.keys(repos.buttons));
            }, 2000);
        }
        //load_legend(legend, description,'btn');
        load_disclaimer(disclaimer);
        
    }
}

function change_repo_info(btn_name){
    ////console.log(btn_name);
    //delete description & legend
    let description = document.getElementById('repo-description');
    description.innerHTML='';
    //let new_description = document.createElement('P').outerHTML =`<p class="col-lg-12">${repos.buttons[btn_name].description}</p>`;
    let new_description = document.createElement('P');
    new_description.className="col-lg-12"
    new_description.innerHTML = repos.buttons[btn_name].description;
    $(description).append(new_description);

    let legend = document.getElementById('repo-legend');
    legend.innerHTML = '';
    load_legend(legend,description,btn_name);

}

function load_legend(location, description, btn_name) {

    let legend = repos.buttons[btn_name].legend;
    ////console.log(legend)
    // load the legend keys
    for(let i in legend){
        //// console.log(legend[i]);
        //let l = document.createElement('P').outerHTML = `<p class="col-lg-4"> <span style="color: ${legend[i].color};font-size: 3em;">■</span>${legend[i].name}</p>`;
        let l = document.createElement('P');
        l.className = 'col-lg-3';
        let box = document.createElement('SPAN');
        box.innerHTML= '■';
        box.style.color = legend[i].color;
        box.style.fontSize= '3em';
        let name = document.createElement('SPAN');
        name.innerHTML = legend[i].name;
        $(l).append(box,name);
        $(location).append(l);
    }
   
}

function load_repo_list(location, btn_names) {
    for(let btn in btn_names){
        let name = btn_names[btn];
        let button = document.createElement('BUTTON');
        button.className = 'col-lg-3 btn btn-info';
        button.innerHTML = name;
        button.setAttribute('value', name );
        button.addEventListener('click', () =>{get_repo_data();});
        button.addEventListener('mouseover', () => {change_repo_info(name);});
        ////let button = document.createElement('BUTTON').outerHTML = `<button class=" col-lg-offset-1 btn btn-info" onmouseover="change_repo_info('${name}');" onclick="get_repo_data();" value="${name}">${name}</button>`;
        $(location).append(button);

    }

}

function load_disclaimer(location) {
    let disclaimer = document.createElement('P');
    disclaimer.className = 'text-right col-lg-12';

    disclaimer.innerHTML = 'If you wanna add new data to the repository please contact sonia at the MPO';
    $(location).append(disclaimer);

}

$.get('./data_repository/repo_handler.php', function(data) {
    //console.log('this is running');
   //// mtp_project_data.innerHTML = data;
});


function load_repo_modal() {
    //refresh
    clean();
    let base_content = document.createElement('DIV');
    base_content.innerHTML = `
        <div id="data-repo" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title text-center">Data Repository</h4>
                        <button type="button"class="close" data-dismiss="modal"> &times; </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12 text-center">
                                <p class="text-primary">Repositories</p> 
                            </div>
                        </div>
                        <div class="row" id="repo-list"></div>
                        <div class="row" id="repo-description"></div>
                        <div class="row" id="repo-legend"></div>
                        <div class="row" id="repo-disclaimer"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>  
            </div>
        </div>`;

    document.getElementById('non-pm-content').appendChild(base_content);
}
function get_repo_data() {
    $.get(
        './data_repository/repo_handler.php',
        function(data) {
            let reader = new jsts.io.WKTReader();
            for (let item in data) {
                //console.log(data[item].shape);
                let shape = reader.read(data[item].shape);
                //console.log(shape);
                if ('points' in shape) {
                    // LINESTRING
                    to_visualize = line_geojson_formatter(shape);
                    let component = new google.maps.Polyline({
                        path: to_visualize,
                        strokeColor: '#9999FF',
                        strokeOpacity: 1.0,
                        strokeWeight: 5,
                    });
                    //components[component.id] = component;
                    component.setMap(map);
                    polygons.push(component);
                } else {
                    console.log('no location');
                }
            }
        },
        'json',
    );
}
$('#data-repository').click(()=>{
    data_repo();

})
