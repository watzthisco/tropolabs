/*
 * Tropo Learning Lab - Auto Attendant with Data
 * Level: Intermediate
 * TODO: make it get data from a database to populate menu and get responses.
 * To Test: call 313-451-6844
 */
//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/dbconfig.json"));

var chemistJokes = findAll();

say("Thank you for calling the Chemistry Joke Hotline.");
say("Please hold on while I pick a joke for you.");
wait(1000);
say("Ok, here it is:");
var joke = chemistJokes[Math.floor(Math.random()*chemistJokes.length)];
wait(1000);
say(joke);
wait(3000);
say("Goodbye.");
wait(1000);

var DATABASE = {

    database: myConfig.dbconfig.dbname,
    host: myConfig.dbconfig.host,
    username: myConfig.dbconfig.user,
    password: myConfig.dbconfig.pass,

};

function findAll() {
    var results = [];

    var jsConnectionObj = new Packages.MysqlConnection();
    c = jsConnectionObj.open(DATABASE.host,
        DATABASE.database,
        DATABASE.username,
        DATABASE.password);

    if (c) {
        var s = c.createStatement();
        s.executeQuery("SELECT * FROM chemistry_jokes;");
        var rs = s.getResultSet();
        while (rs.next()) {
            results.push(new ArticleModel({
                id: rs.getInt("id"),
                joke: rs.getString("joke"),
            }));
        }
        rs.close();
        c.close();
        return results;
    }
}

//file loading function.
function load_json(url) {
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

    var dis = new java.io.DataInputStream(connection.getInputStream());
    while (dis.available() != 0) {
        line = dis.readLine();
        returnJSON += line;
    }
    return returnJSON;
}