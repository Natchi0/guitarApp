function polarToCartesian(theta, radius){
    return {
        x : radius * Math.cos(theta),
        y : radius * Math.sin(theta)
    };
}

const innerRadius = 0.66; //radio del circulo entre mayores y menores
const threshold = 0.1; //umbral para saber si un acorde es mayor o menor

export function getPositionsCircle(notes) {

    const majorOrder = [];
    const minorOrder = [];
    const majorCoords = [];
    const minorCoords = [];
    //obtener los acordes de forma dinamica segun si es # o b
    for (let i = 0; i < 12; i++) {
        majorOrder.push( notes[(i * 7) % 12]);
        minorOrder.push( notes[(i * 7 + 9) % 12]);
    }

    let archSize = Math.PI *2 / majorOrder.length; //circunferencia del circulo dividida entre la cantidad de acordes
    let startAngle =  0 - archSize / 2 - Math.PI / 2; //angulo inicial del primer acorde

    //CALULAR PRIMERO LOS MAYORES
    for (let i = 0; i < majorOrder.length; i++){
        let coord = {
            startAngle: startAngle - threshold,
            endAngle: startAngle + archSize + threshold,
            innerRadius: innerRadius,
            outerRadius: 1,
        }

        coord.center = polarToCartesian((coord.endAngle + coord.startAngle) / 2, (coord.outerRadius + coord.innerRadius) / 2)

        majorCoords[majorOrder[i]] = coord;
        startAngle += archSize;
    }

    //CALULAR LOS MENORES
    for (let i = 0; i < minorOrder.length; i++){
        let minCoord = {
            startAngle: startAngle - threshold,
            endAngle: startAngle + archSize + threshold,
            innerRadius: 0,
            outerRadius: innerRadius,
        }

        minCoord.center = polarToCartesian((minCoord.endAngle + minCoord.startAngle) / 2, minCoord.outerRadius * 3/4);

        minorCoords[minorOrder[i]] = minCoord;
        startAngle += archSize;
    }

    return {
        major : majorCoords,
        minor: minorCoords,
        majorOrder : majorOrder,
        minorOrder : minorOrder,
        innerRadius : innerRadius
    };
}