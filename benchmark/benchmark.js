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
let id = 0;
const corridors = [
    'Regional',
    'Alameda',
    'Artcraft Dominici',
    'Doniphan',
    'Dyer',
    'Eastlake',
    'Horizon',
    'McNutt',
    'Mesa',
    'Montana',
    'Montwood',
    'Socorro',
    'Yarbrough',
    'Zaragoza',
];
const pm_categories = {
    driving: [
        'Bridges in Poor Condition',
        'Fatalities',
        'Serious Injuries',
        'Drive Alone',
        'Crashes on CMP Network',
        'Ozone',
        'Carbon Monoxide',
        'Particulate Manner',
        'Automobiles at POEs',
        'Average wait time at POEs',
    ],
    freight: [
        'Fatalities',
        'Serious Injuries',
        'truck at POEs',
        'Average wait times at POEs',
    ],
    transit: [
        'Commute by Transit',
        'Transit Riders',
        'Jobs Within ½ Mile',
        'Populations Within ½ Mile',
        'Key Destinations within ½ Mile',
    ],
    walking: [
        'commute by Walking',
        'Pedestrian fatalities',
        'Pedestrian serious injuries',
        'Northbound border Crossing',
        'Average wait time at POEs',
        'Walking Trips Recorded by Strava',
        'Sidewalks per Mile',
        'Number Crashes nearby bus stops',
    ],
    biking: [
        'Workers Commuting',
        'Fatalities',
        'Injuries',
        'Bikeway Network Buildout',
        'Biking Trips Recorded By Strava',
        'Key Destinations Within  ½ Mile',
        'Crashes Nearby Bus Stops',
        'Jobs Within ½ Mile',
        'Population within ½ Mile',
        'Corridor Test',
    ],
};
function benchmark() {
    clean();
    id = 0;
    let target = document.getElementById('non-pm-content');
    target.innerHTML = `
    <!-- benchmark_handler -->
        <div id="benchmark" class=" sidenav rounded-left mb-2 bg-light text-dark" ondblclick="openNavBenchmark();" data-toggle="tooltip" data-placement="left" title="Double click to Open">
            <a href="javascript:void(0)" href="javascript:void(0)" class="closebtn" onclick="closeNavBenchmark();">&times;</a>
            <div id="benchmark-content" class ="container-fluid">
                <div id="benchmark-table" class="row">
                <!--contains the left most column. this one displays the names of the categories of the PM's-->
                <div class="col-lg-7">
                    <div id="benchmark-containers" class="row"></div>
                </div>
                <!--this one contains all the other cards that are held insides. \
                this will contain the data of each of the corridors.-->
            </div>
            </div>
        </div>
    `;
}

$('#benchmarking').click(function() {
    benchmark();
    create_benchmark_categories(pm_categories);
    create_benchmark_column(corridors, pm_categories);
    openNavBenchmark();
});



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
                        <select name="corridor" id="corridor-select" class="form-control">
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
    console.log(target);
    target.remove();
    console.log('current column removed');
}
function add_column() {
    parent = document.getElementById('benchmark-containers');
    if (parent.children.length < 3) {
        create_benchmark_column(corridors, pm_categories);
    }
}
function openNavBenchmark() {
    let nav = document.getElementById('benchmark');
    nav.className = 'sidenav rounded-left mb-2 bg-light text-dark';
    // resizing for the table
    $(nav).tooltip('disable');
    $(nav).css('overflow', 'auto');
    nav.style.height = '60vh';
    $(nav).css('margin-top', '');
    $(nav).css('top', '20vh');

    nav.style.width = '80vw';
    nav.style.zIndex = 1;
    document.getElementById('sidebar').style.zIndex = 0;
}

function closeNavBenchmark() {
    let nav = document.getElementById('benchmark');
    // document.getElementById("mySidenav").style.width = "0%";
    nav.style.width = '1%';
    nav.style.height = '2%';
    nav.style.overflow = 'hidden';
    nav.className = 'sidenav rounded-left mb-2 bg-info text-dark';
    $(nav).tooltip('enable');
}
