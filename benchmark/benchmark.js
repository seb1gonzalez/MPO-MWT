/*jshint
    esversion: 6,
    quotmark: single,
    varstmt: true,
    trailingcomma: true,
    regexpu: true,
    eqeqeq: true,
    curly: true,
    loopfunc: true
*/
let id = 0;  //* reference to the different layouts
let benchmark_data; //* results of the data.
let benchmark_layout; //* rows and options for the each of the tables

$('#benchmarking').click(() => {
    //benchmark();
    load_benchmark_modal();
    let content = $('#benchmark-content');
    let table = $('#benchmark-table');
    let containers=$('#benchmark-containers');
    ////console.log('table length: '+table.length);
    if(table.length === 1 && containers.is(':empty')){ //* prevents duplicates

        if((benchmark_layout === undefined || null)|| ( benchmark_data === undefined || null) ){ //* prevents redundant requests
            get_benchmark_data('benchmark/benchmark_layout.json')
                .then(res=>{ 
                    console.log(res);
                    benchmark_layout = res;
                    create_benchmark_categories(res.pm_categories);
                    create_benchmark_column(res.corridors, res.pm_categories);        
                })
                .then(res=>{
                    get_benchmark_data('benchmark/benchmark_data.json')
                        .then(res =>{ //* get result data
                            console.log(res);
                            benchmark_data = res;
                        })
                        .catch(err=>console.log(err));
                }).catch(err=>console.log(err));

        }
        else{ //* reuse the loaded variables.
            create_benchmark_categories(benchmark_layout.pm_categories);
            create_benchmark_column(benchmark_layout.corridors, benchmark_layout.pm_categories);

        }
    }
});

function load_benchmark_modal(){
    //refresh
    clean();
    id= 0;
    let base_content = document.createElement('DIV');
    base_content.innerHTML = `
        <div class="modal fade in" id="benchmark">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <!-- Benchmarking Header -->
                    <div class="modal-header">
                        <h4 class="modal-title text-primary ">Benchmarking</h4>
                        <button type="button" class="close" data-dismiss="modal">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                    <!-- benchmarking body -->
                    <div class="modal-body">
                        <div class="container-fluid col-lg-12">
                            <div class="row">
                                <div id="benchmark-content" class="container-fluid">
                                    <div id="benchmark-table" class="row">
                                        <!--contains the left most column. this one displays the names of the categories of the PM's-->
                                        <div class="col-lg-7">
                                            <div id="benchmark-containers" class="row"></div>
                                        </div>
                                        <!--this one contains all the other cards that are held inside. 
                                                this will contain the data of each of the corridors.-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    $('#non-pm-content').append(base_content);
}

function tutorial(params) {
    load_benchmark_modal();
    //get references to  the  content divs
    buttons = $('#tut-categories');
    video = $('#tut-video');
    if (buttons.is(':empty')) { //* prevents duplicates.
        ////console.log('inside loading');
        if (tutorial_data === undefined || null) { //* prevents redundant requests.
            get_tut_data()
                .then(res => {
                    ////console.log(res);
                    tutorial_data = res;
                    load_tut_buttons(buttons, Object.keys(res));
                    change_tut_video('Multimodal Web Tool');
                })
                .catch(err => {
                    console.log(err);
                });
        } else { //*do not use data requests.
            load_tut_buttons(buttons, Object.keys(tutorial_data));
            change_tut_video('Multimodal Web Tool');
        }
    }
}

function create_benchmark_categories(categories) {
    let root = document.getElementById('benchmark-table');

    let bench_cat = document.createElement('DIV');
    bench_cat.id = 'benchmark-categories';
    bench_cat.className = 'card col-lg-4';

    //header
    let header = document.createElement('DIV');
    header.className = 'card-header row';
    header.innerHTML = ` 
        <div class="col-lg-10">
            <h2 class="text-primary text-center">Benchmarking</h2>
        </div>
        <div id="add-corridor" class="col-lg-2 text-right">
            <button class=" btn btn-outline-success" onclick="add_column();"id="add-button">&plus;</button>
        </div>`;
    //console.log(header);
    bench_cat.appendChild(header);

    //create the accordion
    let accordion = document.createElement('DIV');
    accordion.className = 'panel-group';
    accordion.id = 'cat-accordion';

    for (let category in categories) {
        console.log(category); // the keys
        let cat = document.createElement('DIV');
        let content = `
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h2 class="panel-title">
                                <a 
                                    class = "text-capitalize"
                                    data-toggle="collapse" 
                                    href=".${category}"> 
                                ${category}
                                </a>
                            </h2>
                        </div>
                        <div
                            class=" ${category} panel-collapse collapse"
                        >
                `;
        categories[category].forEach(pm => {
            //console.log('--'+pm);  //each of the categories
            content += `<li class="list-group-item">${pm}</li>`;
        });
        content += `
                        </ul>
                    </div>
                </div>
                `;
        cat.innerHTML = content;
        accordion.appendChild(cat);
    }
    bench_cat.appendChild(accordion);
    root.insertBefore(bench_cat, root.children[0]);
}
function create_benchmark_column(corridors, categories) {
    let target = document.getElementById('benchmark-containers');
    // create the container
    let root = document.createElement('DIV');
    root.id = 'benchmark_' + id;
    root.className = 'card col-lg-4';
    //root.style.width = '18rem';
    // create the header
    let header = document.createElement('DIV');
    header.className = 'card-header row text-primary';
    // create title
    let header_content = `
                <div class="col-lg-8">
                    <form action="" class="form-group"style="margin-bottom: 0.5rem;">
                        <select name="corridor" onChange="console.log('i changed');"id="corridor-select" class="form-control">
            `;
    
    // create title options
    corridors.forEach(corridor => {
        ////console.log(corridor);
        header_content += `<option value="${corridor.toUpperCase()}">${corridor}</option>`;
    });

    // create close button
    header_content += `
                        </select>
                    </form>
                </div>
                <div class="col-lg-2 text-right">
                    <button onclick ="remove_benchmark_column('benchmark_${id++}');"class="btn btn-outline-danger">&minus;</button>
                </div>`;

    header.innerHTML = header_content;
    root.appendChild(header);
    // create each of the categories with its content buttons.

    target.appendChild(root);
    console.log('new column added');

    //create the accordion
    let accordion = document.createElement('DIV');
    accordion.className = 'panel-group';
    accordion.id = 'cat-accordion';

    for (let category in categories) {
        ////console.log(category); // the keys
        let cat = document.createElement('DIV');
        let content = `
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h2 class="panel-title">
                                <a  
                                    class= "text-capitalize"
                                    data-toggle="collapse" 
                                    href=".${category}"> 
                                ${category}
                                </a>
                            </h2>
                        </div>
                        <div
                            class=" ${category} panel-collapse collapse"
                        >
                `;
        categories[category].forEach(pm => {
            ////console.log('--'+pm);  //each of the categories
            content += `<li onclick ="console.log('${pm}');"class="list-group-item btn btn-block btn-link">${pm}</li>`;
        });
        content += `
                        </ul>
                    </div>
                </div>
                `;
        cat.innerHTML = content;
        accordion.appendChild(cat);
    }
    root.appendChild(accordion);
    target.appendChild(root);
}


function remove_benchmark_column(id) {
    let target = document.getElementById(id);
    ////console.log(target);
    target.remove();
    ////console.log('current column removed');
}
function add_column() {
    parent = $('#benchmark-containers')[0];
    if (parent.children.length < 3) {
        create_benchmark_column(benchmark_layout.corridors, benchmark_layout.pm_categories);
    }
}

function get_benchmark_data(path) {
    return new Promise((resolve, reject) => {
        // //console.log('inside promise');
        //task
        let result;
        $.getJSON(path, data => {
            // console.log(data);
            resolve(data);
        });
        if ((result === undefined, result === null)) {
            error = new Error('couldn\'t load data');
            reject(error);
        }
    });
}
