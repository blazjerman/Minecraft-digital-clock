

const day = {

    name: "Day",

    clockPath: "day/clock.png",
    backgroundPath: "day/background.webm",
    
    width: 3840,
    height: 2160,

    displays: [
        {
            A:[1772,1132,1726,1155],
            B:[1788,1152,1772,1212],
            C:[1788,1232,1772,1292],
            D:[1772,1292,1726,1315],
            E:[1728,1234,1710,1292],
            F:[1726,1152,1710,1214],
            G:[1772,1212,1726,1234]
        },
        {
            A:[1680,1130,1630,1154],
            B:[1696,1152,1680,1214],
            C:[1696,1234,1679,1294],
            D:[1680,1295,1632,1319],
            E:[1632,1234,1614,1298],
            F:[1632,1152,1614,1216],
            G:[1679,1212,1632,1236]
        },
        {
            A:[1548,1130,1496,1154],
            B:[1566,1152,1548,1217],
            C:[1566,1236,1548,1302],
            D:[1548,1300,1496,1326],
            E:[1496,1238,1476,1304],
            F:[1496,1152,1476,1219],
            G:[1548,1216,1496,1238]
        },
        {
            A:[1442,1130,1386,1154],
            B:[1462,1152,1442,1219],
            C:[1461,1238,1442,1306],
            D:[1442,1304,1304,1330],
            E:[1388,1242,1366,1306],
            F:[1388,1153,1367,1220],
            G:[1442,1218,1386,1241]
        },
    ],

    dot: [1601,1193,1579,1259]
    
}


const midnight = {

    name: "Midnight",

    clockPath: "midnight/clock.png",
    backgroundPath: "midnight/background.webm",
    
    width: day.width,
    height: day.height,

    displays: day.displays,
    dot: day.dot
    
}

const night = {

    name: "Night",

    clockPath: "night/clock.png",
    backgroundPath: "night/background.webm",
    
    width: day.width,
    height: day.height,

    displays: day.displays,
    dot: day.dot
    
}


const clocks = [day,midnight,night]