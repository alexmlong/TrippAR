try {
    var blipp = require('blippar').blipp;

    var blippInfoVariations = {
        sic: {
            title: "Stamford Innovation Center",
            description: "The original purpose of this building was to house the office of the mayor, city officials, the police station, courthouse, and even a horse stable. After World War II though, this building simply could not accommodate the increasing demand for municipal services and offices in the growing City of Stamford. In 2008, the city of Stamford began a program to restore the building and put it into good use. The Stamford Innovation Center and our community are the fortunate recipients of the hard work of OTHRA and the City of Stamford and we appreciate, love and leverage this remarkable building almost every day."
          },
        lou: {
            title: "Former Mayor Louis Clapes",
            description: "In 1963, Louis Clapes was elected Town Clerk and remained in that job until 1975, when he defeated the Democratic incumbent Mayor. As Mayor, Mr. Clapes worked to weed out corruption and increase professionalism. He was elected Mayor in 1975 and remained in that post until his retirement in 1983. It was a period of revival for the city, which attracted corporations and thousands of employees from New Haven and New York.  According to his granddaughter, Mr. Clapes was known for his signature whistle. 'Residents learned to listen for Lou’s whistling that proceeded him as he walked on his way. To many, it signaled the mayor was on his way.' According to local historian and friend, Don Russell, 'he was the people’s mayor for sure.'"
          },
        lincoln: {
            title: "Abraham Lincoln and Veteran's Park",
            description: "Stamford honors its veterans with a collection of monuments in a downtown plaza dedicated in 1977.  Veterans Park, near the intersection of Main and Atlantic streets, features a bronze Doughboy figure, several large granite slabs, a statue of Abraham Lincoln, and a monument honoring the founders of Stamford.  At the eastern end of the park, a granite 'In Memoriam' monument lists, arranged by service branch, Stamford residents killed in World War II, Korea and Vietnam. More than 200 names are listed in the World War II section. Sixteen names are listed for the Korean War, and 26 heroes are listed for Vietnam.  'Let us, the living, be here dedicated to the great task remaining before us — that from these honored dead we take increased devotion to that cause for which they gave their last full measure of devotion.' - Abraham Lincoln."
          },
        hackathon: {
            title: "Stamford Hackathon!!!",
            description: "Thank you to Hugh, everyone else to made this hackathon so awesome, and of course, our sponsors! Thank you Pitney Bowes, Uber, Blippar, and Scriptr.io!"
          },
    };
    blipp.log("Hackathon!!!");
    blipp.log(JSON.stringify({"key": "value"}));
    blipp.log(JSON.parse('{"key": "value"}'));
    scene = blipp.addScene();

    // Global variables
    var mW = blipp.getMarker().getWidth();
    var mH = blipp.getMarker().getHeight();
    var sW = blipp.getScreenWidth() * 1.003;
    var sH = blipp.getScreenHeight() * 1.003; 

    // Scene creation
    scene.onCreate = function() {

        var locationKey = "sic";
        var locationTitle = blippInfoVariations[locationKey].title;
        scene.addText(locationTitle)
          .setFontSize(100)
          //.setBgColor([1, 1, 1, .5])
          .setTranslationY(450);

        var locationInfo = blippInfoVariations[locationKey].description;

        scene.addText(locationInfo)
          .setFontSize(40)
          .setBgColor([1, 1, 1, 0.2])
          .setLayout( {position:[-0.5, 0], size:[.4, 1]} )
          .setTextMargins([20, 5]);
        //scene.addText(locationInfo)
        //  .setFontSize(30)
        //  .setTextMargins([1, 1])
        //  //.setBgColor([1, 1, 1, .5])
        //  .setTranslationX(-800)
        //  .setTranslationY(300);
        //var defaultLight    = scene.addLight('light');
        //var defaultMaterial = scene.addMaterial('material');

        //var logoPane = scene.addSprite()
        //    .setTexture('logo.png')
        //    .setScale(mW, mH, 0.7)
        //    .setLight(defaultLight)
        //    .setMaterial(defaultMaterial);

        //var poisFile = "pbHistoricLocations.json";
        //scene.addRequiredAssets(poisFile);
        //var pois = JSON.parse(blipp.loadJson(poisFile, true));

        //var poi1Name = pois.location[0].poi.name;
        //var nearbyPoiText = scene.addText(poi1Name)
        //  .setFontSize(50)
        //  .setTranslationY(400)
        //  .setBgColor([1, 0, 0, 0]);

        //logoPane.onTouchEnd = function() {

        var geo = blipp.getGeo();
        var lat = geo.getLat();
        var lng = geo.getLon();
        //var url = "https://img.buzzfeed.com/buzzfeed-static/static/2013-10/enhanced/webdr06/15/10/anigif_enhanced-buzz-25498-1381845743-9_preview.gif";
        var urlUpToFile = "https://api.scriptrapps.io/";
        var file = "test";
        var getParams = "lat=" + lat + "&lng=" + lng;

        var url = urlUpToFile + file + "?" + getParams;
        //var url = "https://192.168.1.70/alert.png";
        blipp.log('Downloading ' + url + '...')

        var self = this;

        blipp.log(blipp.downloadAssets.toString());
        blipp.downloadAssets(
            url, 
            [file], 
            "get",
            function (status, info) {
                if (status == 'OK') {
                    blipp.log('Done!');

                    var poiResponse = blipp.loadJson(file);

                    blipp.log(JSON.stringify(poiResponse));
                    var pois = poiResponse.response.result;

                    for (var i = 0; i < pois.length; i++) {
                        var poi = pois[i];
                        var poiName = poi.name;
                        blipp.log(poiName);
                        var poiUberCost = poi.uberCost;
                        blipp.log(poiUberCost);
                        var poiText = scene.addText(poiName + " - " + poiUberCost)
                          .setFontSize(75)
                          .setBgColor([1, 1, 1, .5])
                          .setTranslationX(800 + (10 * poiName.length))
                          .setTranslationY(250 - (i * 100));

                        poiText.onTouchEnd = function() {
                            this.setTranslationX(800);
                            this.setText("Calling your uber...");
                            blipp.log(poi.uberLink);
                            blipp.openURL(poi.uberLink);
                        };
                    };
                    //blipp.log(typeof poiResponse);
                    //blipp.log(poiResponse.substring(0, 10));
                    //blipp.log(poiResponse.substring(0, 40));
                    //var escapedFileContents = 
                    //    poiResponse.replace(/\\n/g, "\\n")
                    //      .replace(/\'/g, "")
                    //      .replace(/\"/g, "")
                    //      .replace(/\&/g, "")
                    //      .replace(/\r/g, "")
                    //      .replace(/\t/g, "")
                    //      .replace(/\b/g, "")
                    //      .replace(/\f/g, "");

                    //blipp.log(escapedFileContents);
                    //blipp.log("x" + escapedFileContents + "x");
                    //blipp.log("x" + escapedFileContents.trim() + "x");
                    //blipp.log(escapedFileContents.replace(/(\r\n|\n|\r)/gm,""));
                    //blipp.log("x" + escapedFileContents.replace(/(\r\n|\n|\r)/gm,"") + "x");
                    //blipp.log("x" + escapedFileContents.replace(/(\r\n|\n|\r)/gm,"").trim() + "x");
                    //blipp.log(JSON.parse(escapedFileContents.replace(/(\r\n|\n|\r)/gm,"")));
                    //blipp.log(JSON.parse(escapedFileContents));
                    //blipp.log(JSON.parse(escapedFileContents).result);
                    //blipp.log(JSON.parse(poiResponse));
                } else {
                    blipp.log('loaded ' + info + '%');
                }
              }, 
              ["Authorization", "bearer QTA2Q0IwMzg4ODpzY3JpcHRyOkM4RTI0MjNEMzIyMDQxNkE2MTM4RTBBQjQ4NkIzNzA3"],
              true);
        //};
     
    }

    scene.onShow = function() {
        blipp.log("Marker: " + blipp.getMarker().getWidth() + "*" + blipp.getMarker().getHeight() + " px");
        blipp.log("Screen: " + blipp.getScreenWidth() + "*" + blipp.getScreenHeight() + " px");
    }
} catch (e) {
    blipp.log("Error: " + e.message);
}
