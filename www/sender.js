/*
 * Tropo Learning Lab - Basic CSV Dialer
 * Level: Beginner
 */


// load an external json file with settings.
//var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));
var csvFile = loadFile("http://hosting.tropo.com/5055259/www/data/dialerNumbers.csv");
log("csv file: " + csvFile);

var numbersToDial = csvJSON(csvFile);

// for now, just pretend we've already loaded the CSV into an object.
/*var numbersToDial = [
                    {"name":"Chris","number":myConfig.numbers[0]},
                    {"name":"Eva","number":myConfig.numbers[1]}
                    ];*/
log("json file: " + numbersToDial);
for (var i = 0; i<2; i++){
var callee = numbersToDial[i];
    log("callee " + i + ": " + callee.name + " number: " + callee.number + " - end-line");
//call(callee.number);
//say("Hi, " + callee.name);
//hangup();
}

//file loading function.
function load_json(url){
    var line;
    var returnJSON = "";
    connection = new java.net.URL(url).openConnection();
    connection.setDoOutput(false);
    connection.setDoInput(true);
    connection.setInstanceFollowRedirects(false);
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Content-Type", "text/plain");
    connection.setRequestProperty("charset", "utf-8");
    connection.connect();

    dis = new java.io.DataInputStream(connection.getInputStream());
    while (dis.available() != 0) {
        line = dis.readLine();
        returnJSON += line;
    }
    return returnJSON;
}

//file loading function.
function loadFile(url){
    var line;
    var returnFile = "";
    connection = new java.net.URL(url).openConnection();
    connection.setDoOutput(false);
    connection.setDoInput(true);
    connection.setInstanceFollowRedirects(false);
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Content-Type", "text/plain");
    connection.setRequestProperty("charset", "utf-8");
    connection.connect();

    dis = new java.io.DataInputStream(connection.getInputStream());
    while (dis.available() != 0) {
        line = dis.readLine();
        returnFile += line + "#end";
    }
    return returnFile;
}

function csvJSON(csv){

    var lines=csv.split("#end");

    var returnJSON = [];

    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){

        var obj = {};
        var currentline=lines[i].split(",");

        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }

        returnJSON.push(obj);
    }
    return returnJSON;
}