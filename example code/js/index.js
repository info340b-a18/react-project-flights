'use strict';
var map = new Datamap({
    element: document.getElementById('map'),
    scope: 'world',
    geographyConfig: {
        popupOnHover: false,
        highlightOnHover: false
      },
    fills: {
        defaultFill: '#ABDDA4',
        color: '#003459'
    }

});


const dot = []
fetch("data/airports.json").then(function (res) {
    res.json().then(function (json) {
        for (let i = 0; i < json.features.length; i++) {
            dot.push({
                name: json.features[i].properties.name_en,
                code: json.features[i].properties.iata_code,
                radius: 10,
                fillKey: 'color',
                latitude: json.features[i].geometry.coordinates[1],
                longitude: json.features[i].geometry.coordinates[0],
                wiki: json.features[i].properties.wikipedia
            })


        }
        map.bubbles(dot, {
            popupTemplate: function (geo, data) {
                return '<div class="hoverinfo">' + data.name + ''
            }
        })
        map.svg.selectAll('.datamaps-bubble').on('click', async function(bubble) {
            const section = document.getElementById("selected-airport")
            document.getElementById('displaybox').style.display = 'table'
            section.getElementsByTagName('h2')[0].innerHTML = bubble.name
            section.getElementsByTagName('h3')[0].innerHTML = 'Airport Code: ' + bubble.code
            section.getElementsByTagName('a')[0].innerHTML = 'Learn more'
            section.getElementsByTagName('a')[0].href = bubble.wiki
        });
    })
})
