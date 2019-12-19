
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
    //get the buttons JSON file 
    $.getJSON('./repo.json', (data)=> {
       // console.log(data);
        repos = data;
    });

    // set the modal into the container div,
    let list = document.getElementById('repo-list');
    let legend = document.getElementById('repo-legend');
    let disclaimer = document.getElementById('repo-disclaimer');
    let description = document.getElementById('repo-description');
    console.log(repos);  

    if (list.innerHTML === ''){ //prevent duplicate loading.
        try {
            load_repo_list(list, Object.keys(repos.buttons));    
        } catch (TypeError) {
            setTimeout(function() {
                load_repo_list(list, Object.keys(repos.buttons));
            }, 1000);
        }
        //load_legend(legend, description,'btn');
        load_disclaimer(disclaimer);
        
    }
    
}

function change_repo_info(btn_name){
    console.log(btn_name);
    //delete description & legend
    let description = document.getElementById('repo-description');
    description.innerHTML='';
    let new_description = document.createElement('P').outerHTML =`<p class="col-lg-12">${repos.buttons[btn_name].description}</p>`;
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
        console.log(legend[i]);
        let l = document.createElement('P').outerHTML = `<p class="col-lg-4"> <span style="color: ${legend[i].color};" class="glyphicon glyphicon-stop"></span>${legend[i].name}</p>`;
        $(location).append(l);
    }
}

function load_repo_list(location, btn_names) {
    for(let btn in btn_names){
        let name = btn_names[btn];
        let button = document.createElement('BUTTON').outerHTML = `<button class=" col-lg-offset-1 btn btn-info" onclick="change_repo_info('${name}');" value="${name}">${name}</button>`;
        $(location).append(button);
    }

}

function load_disclaimer(location) {
    let button = document.createElement('P').outerHTML = `<p class="text-right col-lg-12">if you wanna add new data to the repository please contact sonia at the MPO.</p> `;
    $(location).append(button);

}