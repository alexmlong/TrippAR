try {
    var blipp = require('blippar').blipp;




    /* Hack to deal with the fact that you can't share code between blipps. */
    var blippName = "hackathon";
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
            description: "Thank you to our awesome sponsors!"
          },
    };
    blipp.log("Hackathon!!!");
    scene = blipp.addScene();

    // Global variables
    var mW = blipp.getMarker().getWidth();
    var mH = blipp.getMarker().getHeight();
    var sW = blipp.getScreenWidth() * 1.003;
    var sH = blipp.getScreenHeight() * 1.003; 

    // Scene creation
    scene.onCreate = function() {

        var defaultLight = 
            scene.addLight('light')
                .setIntensity(0.2);
        var defaultMaterial = scene.addMaterial('material');

        var logoPane = scene.addSprite()
            .setTexture('tripparLogo.jpg')
            .setScale(mW, mH, 0.7)
            .setLight(defaultLight)
            .setMaterial(defaultMaterial);

        logoPane.onTouchEnd = function() {
            this.setHidden(true);

            var locationTitle = blippInfoVariations[blippName].title;
            scene.addText(locationTitle)
              .setFontSize(100)
              .setTranslationY(450);

            var locationInfo = blippInfoVariations[blippName].description;

            if (blippName !== "hackathon") {
                /* The info for non-hackathon blipps is left-aligned. */
                scene.addText(locationInfo)
                  .setFontSize(40)
                  .setBgColor([1, 1, 1, 0.9])
                  .setLayout( {position:[-0.5, 0], size:[.4, 1]} )
                  .setTextMargins([20, 5]);
            } else {
                /* The info for the hackathon blipp is centered
                 * and styled differently. */
                var infoText = scene
                  .addText(locationInfo)
                  .setFontSize(40)
                  .setColor(1, 1, 1)
                  .setBgColor([0, 0, 0, 0.9])
                  .setLayout( {position:[0, 0], size:[1, 1]} )
                  .setTextMargins([20, 5]);
            }

            if (blippName !== "hackathon") {
                /* Non-hackathon blipps display point-of-interest (POI)
                 * info on the right side. */
                var geo = blipp.getGeo();
                var lat = geo.getLat();
                var lng = geo.getLon();

                /* Failed attempt to play some audio from IBM's Watson.
                 * Left in for future efforts to get it working. */
                //var urlUpToFile = "https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?accept=audio/wav&text=hello%20mundo";
                

                /* This is our Scriptr backend. */
                var urlUpToFile = "https://api.scriptrapps.io/";
                var file = "test";

                /* More Watson failure */
                //var file = "synthesize";

                var getParams = "lat=" + lat + "&lng=" + lng;

                var url = urlUpToFile + file + "?" + getParams;

                /* More Watson */
                //var url = "https://archive.org/download/testmp3testfile/mpthreetest.mp3";
                //file = "mpthreetest.mp3";
                //var url = "https://192.168.1.70/alert.png";

                blipp.log('Downloading ' + url + '...')

                var self = this;

                blipp.log(blipp.downloadAssets.toString());

                var headers = [
                    "Authorization", 
                    "Basic NjZhMGQzNGQtMGVlNy00ZmM3LWJmMTYtZDlhNjIxMTNhN2FkOklOb1NhVW9LeGF1Qw==",
                ];
                blipp.downloadAssets(
                    url, 
                    [file], 
                    "get",
                    function (status, info) {
                        if (status == 'OK') {
                            blipp.log('Done!');

                            /* Lots of attempts to play audio
                             * so we could get Watson working. */
                            //blipp.log("Asset status:");
                            //blipp.log(blipp.getAssetStat(file));
                            //scene.playSound(file);

                            /*var node = new Blippar.Node();
                            var assets = node.getAssets();
                            blipp.log(JSON.stringify(assets));

                            var localFile = "pleasehold.mp3";
                            scene.addRequiredAssets(localFile);
                            var temp = blipp.loadData(localFile, false);
                            blipp.log(temp);
                            blipp.log(JSON.stringify(temp));
                            //scene.prepareSound(localFile, 10);
                            //scene.playSound("", false, 10);
                            scene.playSound(localFile);*/
                            /* Y U NO PLAY??? :( */
                            



                            var poiResponse = blipp.loadData(file, false);

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
                        } else {
                            blipp.log('loaded ' + info + '%');
                        }
                      }, 
                      headers,
                      true);
            }
        }
    }

    scene.onShow = function() {
        blipp.log("Marker: " + blipp.getMarker().getWidth() + "*" + blipp.getMarker().getHeight() + " px");
        blipp.log("Screen: " + blipp.getScreenWidth() + "*" + blipp.getScreenHeight() + " px");
    }
} catch (e) {
    /* Catch and log all the errors, otherwise they just disappear silently */
    blipp.log("Error: " + e.message);
}
