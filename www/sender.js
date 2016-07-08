/*
 * Tropo Learning Lab - Basic CSV Dialer
 * Level: Beginner
 */

var csvFile = loadFile("http://hosting.tropo.com/5055259/www/data/dialerNumbers.csv");
log("csv file: " + csvFile);

var numbersToDial = csvJSON(csvFile);


log("json file: " + numbersToDial);
log("number of records: " + numbersToDial.length);

for (var i = 0; i<numbersToDial.length-1; i++){
    var callee = numbersToDial[i];
    log("callee " + i + ": " + callee.name + " number: " + callee.number + " - end-line");

    call(callee.number);
    wait(1000);
    say("Hi, " + callee.name);
    wait(1000);
    hangup();
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

    var dis = new java.io.DataInputStream(connection.getInputStream());
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