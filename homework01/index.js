const { readFile, writeFile } = require('fs');

const Read = (fileName) => {
    return new Promise((success, fail) => {
        readFile(fileName, (err, data) => {
            if (err) return fail(err);
            return success(data);
        })
    })
}

const Write = (fileName, content) => {
    return new Promise((success, fail) => {
        writeFile(fileName, content, (err) => {
            if (err) return fail(err);
            return success();
        })
    })
}

// barcode prefix starts with 5
const Barcodes = async () => {
    try {
        let data = await Read('data_countries/country-by-barcode-prefix.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.filter(data => (data.barcode !== null && data.barcode.charAt(0) === '5'))
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/barcode-prefix.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// Barcodes();

//Sort by avg-male-height => ascending order / top 5
const AvgHeight = async () => {
    try {
        let data = await Read('data_countries/country-by-avg-male-height.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.sort((data1, data2) => data1.calling_code - data2.calling_code)
        let outputString = JSON.stringify(output.slice(0, 5));
        await Write('new_data_countries/country-by-avg-male-height.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// AvgHeight();


// "-" in City name
const CapitalCity = async () => {
    try {
        let data = await Read('data_countries/country-by-capital-city.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.filter(data => (data.city !== null && data.city.includes('-')));
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-capital-city.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// CapitalCity();

//Independence year ends with 44
const IndependenceYear = async () => {
    try {
        let data = await Read('data_countries/country-by-independence-date.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.filter(c => {
            if (c.independence !== null && c.independence.toString().substr(2) === '44') {
                return true;
            }
        })
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-independence-date.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// IndependenceYear();

//Number of languages​​ for each country
const Languages = async () => {
    try {
        let data = await Read('data_countries/country-by-languages.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.map(c => {
            return {
                country: c.country,
                languages: c.languages.length
            }

        })
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-languages.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// Languages();

//Countries with two or more words
const Countries = async () => {
    try {
        let data = await Read('data_countries/country-by-name.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.filter(c => {
            let countries = c.country.split(" ");
            // console.log(countries);
            if (countries.length > 1) {
                return true
            }
        })
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-name.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// Countries();

// Count of every religion
const Religion = async () => {
    try {
        let data = await Read('data_countries/country-by-religion.json');
        let parsedData = JSON.parse(data);
        let count = {}
        parsedData.forEach(c => {
            if (count[c.religion]) {
                count[c.religion]++;
            }
            else {
                count[c.religion] = 1;
            }
        })
        let outputString = JSON.stringify(count);
        await Write('new_data_countries/country-by-religion.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// Religion();

// Smaller population info
const Population = async () => {
    try {
        let data = await Read('data_countries/country-by-population.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.map(p => {
            if (p.population < 2073894) {
                p.info = "Smaller population than Slovenia"
            }
            return p;
        });
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-population.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// Population();

// Add zero at the end
const LifeExpectancy = async () => {
    try {
        let data = await Read('data_countries/country-by-life-expectancy.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.map(data => {
            if (data.expectancy !== null) {
                data.expectancy = data.expectancy.toString().concat("0");
            }
            return data;
        }
        )
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-life-expectancy.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// LifeExpectancy();

//Countries with currency name Dollar
const Dollar = async () => {
    try {
        let data = await Read('data_countries/country-by-currency-name.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.filter(country => {
            if (country.currency_name !== null) {
                let cname = country.currency_name.split(" ");
                if (cname[1] === "Dollar" || cname[2] === "Dollar") {
                    return true;
                }
            }
        })
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-currency-name.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// Dollar();

// Countries with national symbol flower
const SymbolFlower = async () => {
    try {
        let data = await Read('data_countries/country-by-national-symbol.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.map(c => {
            if (c.symbol === "Flower") {
                c.symbol = c.symbol.replace("Flower", "🌸");
            }
            return c;
        })
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-national-symbol.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// SymbolFlower();


//Countries by alphabet letter A which end with letter N
const AlphabetLetter = async () => {
    try {
        let data = await Read('data_countries/country-by-alphabet-letters.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.map(d => d.A.countries.filter(c => c.country.slice(-1) === "n"))
        // console.log(output);
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-alphabet-letters.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
AlphabetLetter();


//Degrees to radians
const Radians = async () => {
    try {
        let data = await Read('data_countries/country-by-yearly-average-temperature.json');
        let parsedData = JSON.parse(data);
        let output = parsedData.map(c => {
            let pi = Math.PI;
            c.temperature = c.temperature * (pi / 180);
            return c;
        });
        let outputString = JSON.stringify(output);
        await Write('new_data_countries/country-by-yearly-average-temperature.json', outputString);
    }
    catch (err) {
        console.log(err);
    }
}
// Radians();