const Signs = require("../models/Signs");
const Years = require("../models/Years");

// Récupération des signes. ( GET api/signs/:type/:id )
exports.getSigns = (req,res) => {
    const typeSign = req.params.type;
    const idSign = req.params.id;

    console.log("[INFO] New get request for Signs.");
    // Renvoi les données de tous les signes.
    if(!idSign) {
        Signs.find({ typeSign: typeSign }).then( (signs) => {
            if(!signs.length) {
                res.status(204).json({message: 'Empty!'});
                console.log(`[SUCCESS] Get Signs '${typeSign}' is empty!`);
            }
            else {
                res.status(200).json({signs});
                console.log(`[SUCCESS] Get Signs '${typeSign}' complete!`);
            }
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json({message: 'GET SIGNS : ERROR!'});
            console.log(`[ERROR] In Get Request All Signs!`);
        });
    }
    // Renvoi les données du signe selon son id.
    else {
        Signs.findOne({ _id: idSign }).then( (sign) => {
            res.status(200).json({sign});
            console.log(`[SUCCESS] Get Sign chinese : '${sign.name}' complete!`);
        })
        .catch( (err) => {
            console.log(err);
            res.status(400).json({message: 'GET SIGN : ERROR!'});
            console.log(`[ERROR] In Get Request Sign!`);
        });
    }
};

// Récupération des années. ( GET api/signs/years )
exports.getChineseYears = (req,res) => {
    console.log("[INFO] New get request for Years.");
    Years.find().sort({year: 1}).then( (years) => {
        console.log(years);
        if(!years.length) {
            res.status(204).json({message: 'Empty!'});
            console.log(`[SUCCESS] Get Years is empty!`);
        }
        else {
            res.status(200).json({years});
            console.log(`[SUCCESS] Get Years complete!`);
        }
    })
    .catch( (err) => {
        console.log(err);
        res.status(400).json({message: 'GET YEARS : ERROR!'});
        console.log(`[ERROR] In Get Request All Years!`);
    });
};

// ADMIN
exports.setChineseYears = (req,res) => {
    let chineseNewYear = [
        "1/1/1900","19/2/1901","8/2/1902","29/1/1903","16/2/1904","4/2/1905","25/1/1906","13/2/1907","2/2/1908","22/1/1909","10/2/1910","30/1/1911",
        "18/2/1912","6/2/1913","26/1/1914","14/2/1915","4/2/1916","23/1/1917","11/2/1918","1/2/1919","20/2/1920","8/2/1921","28/1/1922","16/2/1923",
        "5/2/1924","24/1/1925","12/2/1926","2/2/1927","23/1/1928","10/2/1929","30/1/1930","17/2/1931","6/2/1932","26/1/1933","14/2/1934","4/2/1935",
        "24/1/1936","11/2/1937","1/2/1938","19/2/1939","8/2/1940","27/1/1941","15/2/1942","5/2/1943","25/1/1944","13/2/1945","2/2/1946","22/1/1947",
        "10/2/1948","29/1/1949","17/2/1950","6/2/1951","27/1/1952","14/2/1953","3/2/1954","24/1/1955","12/2/1956","1/2/1957","18/2/1958","8/2/1959",
        "28/1/1960","15/2/1961","5/2/1962","25/1/1963","13/2/1964","2/2/1965","21/1/1966","9/2/1967","30/1/1968","17/2/1969","6/2/1970","27/1/1971",
        "15/2/1972","3/2/1973","23/1/1974","11/2/1975","1/2/1976","18/2/1977","7/2/1978","28/1/1979","16/2/1980","5/2/1981","24/1/1982","13/2/1983",
        "2/2/1984","20/2/1985","9/2/1986","29/1/1987","17/2/1988","6/2/1989","27/1/1990","15/2/1991","4/2/1992","23/1/1993","10/2/1994","1/2/1995",
        "19/2/1996","7/2/1997","28/1/1998","16/2/1999","5/2/2000","24/1/2001","12/2/2002","1/2/2003","22/1/2004","9/2/2005","29/1/2006","18/2/2007",
        "7/2/2008","26/1/2009","14/2/2010","3/2/2011","23/1/2012","10/2/2013","1/2/2014","19/2/2015","8/2/2016","28/1/2017","16/2/2018","5/2/2019",
        "25/1/2020","12/2/2021","1/2/2022","22/2/2023","10/2/2024","29/1/2025","17/2/2026","6/2/2027","26/1/2028","13/2/2029","3/2/2030","1/1/2031"
    ];
    
    function decodeDate(mode, date) {
        var value = date.toString();
        var res = value.split("/");
        // Decode the Day.
        if(mode == "D") return parseInt(res[0]);
        // Decode the Month.
        if(mode == "M") return parseInt(res[1]);
        // Decode the Year.
        if(mode == "Y") return parseInt(res[2]);
    }

    chineseNewYear.forEach(year => {
        let Day = decodeDate("D", year);
        let Month = decodeDate("M", year);
        let Year = decodeDate("Y", year);
        let myDate = new Date(Year,Month-1,Day,01,00,00,000);
        console.log(myDate);
        Years.create({ year: myDate });
    });
    res.status(201).json({ message: 'OK' });
}
