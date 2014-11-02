// The model uses a simple scoring system where points are allocated on the basis of the
// nutrient content of 100g of a food or drink. Points are awarded for ‘A’ nutrients (energy,
// saturated fat, total sugar and sodium), and for ‘C’ nutrients (fruit, vegetables and nut content,
// fibre and protein). The score for ‘C’ nutrients is then subtracted from the score for ‘A’ nutrients
// to give the final nutrient profile score

var json = require('../../sampleAPIReturn');
var _ = require('lodash')
range = _.range

// Total 'A' points = (points for energy) + (points for saturated fat) + (points for sugars) + (points
// for sodium)


var points = range(0, 10);
var energy = [335, 335, 670, 1005, 1340, 1675, 2010, 2345, 2680, 3015, 3350]
var satFat = range(1, 10).unshift(1)
var totalSugar = [4.5, 4.5, 9, 13.5, 18, 22.5, 27, 31, 36, 40, 45];
var sodium = [90, 90, 180, 270, 360, 450, 540, 630, 720, 810]


function calculatePointsforNutrient(nutrientName, amount) {


}

function cleanUpNutrientArray(nutrientArray) {
    for (var i = nutrientArray.length - 1; i >= 0; i--) {
        nutrientArray[i]
    };
    _.chain(nutrientArray)
        .map(removeWhiteSpace)
        .map(lowerCaseThings)
        .map(calculateNumbersfromGrams)
}


function nutrientProfile() {
    var cleanedUp = cleanUpNutrientArray(json.Nutrients)
}
