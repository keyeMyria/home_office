let json = require('./../app/mock/calendar.json');

function teste() {
    json = json.exercicios.concat(json.provas, json.trabalhos, json.listasOnline);

    json = json.map((o) => {
        delete o._links; // eslint-disable-line
        return o;
    });

    console.log(JSON.stringify(json, null, 4));
}

teste();
