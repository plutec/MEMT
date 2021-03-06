<script>
    colors = []
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    var mapData = [];

    var map;
    var minBulletSize = 10;
    var maxBulletSize = 40;
    var min = Infinity;
    var max = -Infinity;
    var dataProvider = null;
    /*
    although ammap has methos like getAreaCenterLatitude and getAreaCenterLongitude,
    they are not suitable in quite a lot of cases as the center of some countries
    is even outside the country itself (like US, because of Alaska and Hawaii)
    That's why wehave the coordinates stored here
    */
    function createCircles(mapData, dataProvider){
        for (var i = 0; i < mapData.length; i++) {
            var value = mapData[i].value;
            if (value < min) {
                min = value;
            }
            if (value > max) {
                max = value;
            }
        }
        // it's better to use circle square to show difference between values, not a radius
        var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
        var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;
        // create circle for each country
        for (var i = 0; i < mapData.length; i++) {
            var dataItem = mapData[i];
            var value = dataItem.value;
            // calculate size of a bubble
            var square = (value - min) / (max - min) * (maxSquare - minSquare) + minSquare;
            if (square < minSquare) {
                square = minSquare;
            }
            var size = Math.sqrt(square / (Math.PI * 2));
            var id = dataItem.code;

            dataProvider.images.push({
                type: "circle",
                width: size,
                height: size,
                color: dataItem.color,
                longitude: latlong[id].longitude,
                latitude: latlong[id].latitude,
                title: dataItem.name,
                value: value,
                selectable: true
            });
        }
        return dataProvider;
    }


    AmCharts.theme = AmCharts.themes.black;



    // build map
    AmCharts.ready(function() {
        map = new AmCharts.AmMap();


        map.areasSettings = {
            unlistedAreasColor: "#FFFFFF",
            unlistedAreasAlpha: 0.1
        };
        map.imagesSettings = {
            balloonText: "<span style='font-size:14px;'><b>[[title]]</b>: [[value]]</span>",
            alpha: 0.6
        }

        dataProvider = {
            mapVar: AmCharts.maps.worldLow,
            images: []
        }
        map.addListener("clickMapObject", function (event) {
            // console.log(event.mapObject);
            // $("#dialog").dialog();
        });
        map.dataProvider = createCircles(mapData,dataProvider);
        map.write("mapdiv");
    });
</script>
