function calculateAeroPress(element) {

    let form = getFormElement(element);
    let coffeePerLiter = 55;
    liquidAndGrounds(form, element, coffeePerLiter);


    let amountLiquid = parseFloat(form.targetLiquid.value);
    setWaterToBoil(form, amountLiquid);

}

function calculateFrenchPress(element) {

    let form = getFormElement(element);
    let coffeePerLiter = 60;
    liquidAndGrounds(form, element, coffeePerLiter);


    let amountLiquid = parseFloat(form.targetLiquid.value);
    setWaterToBoil(form, amountLiquid);

}

function calculateCleverDripper(element) {
    let coffeePerLiter = 65;
    let form = getFormElement(element);

    liquidAndGrounds(form, element, coffeePerLiter);

    let amountLiquid = parseFloat(form.targetLiquid.value);

    form.pour1total.value = amountLiquid ? amountLiquid.toFixed(1) : +0;
    setWaterToBoil(form, amountLiquid);
}

function calculateV60(element) {
    let coffeePerLiter = 60;
    let form = getFormElement(element);

    liquidAndGrounds(form, element, coffeePerLiter);

    let amountLiquid = parseFloat(form.targetLiquid.value);
    calculateBloom(form, amountLiquid, coffeePerLiter);
    calculatePour(form, amountLiquid);
    setWaterToBoil(form, amountLiquid);
}

function calculateIcedCoffee(element) {
    let coffeePerLiter = 65;
    let form = getFormElement(element, coffeePerLiter);
    liquidAndGrounds(form, element, coffeePerLiter);
    let icePercent = parseFloat(form.icePercentInput.value);
    let goalLiquid = parseFloat(form.targetLiquid.value);
    let amountLiquid = ((1 - icePercent / 100) * goalLiquid);
    calculateBloom(form, goalLiquid, coffeePerLiter);
    calculatePour(form, amountLiquid);
    setWaterToBoil(form, amountLiquid);

    form.amountIcePercent.value = icePercent;
    form.amountIce.value = ((icePercent / 100) * goalLiquid || 0).toFixed(1);
    form.amountIce2.value = ((icePercent / 100) * goalLiquid || 0).toFixed(1);
}

function calculateMokaPot(element) {

    let form = getFormElement(element);
    let coffeePerLiter = 100;
    liquidAndGrounds(form, element, coffeePerLiter);
    
    let amountLiquid = parseFloat(form.targetLiquid.value);
    setWaterToBoil(form, amountLiquid);
    form.potLiquid.value = amountLiquid ? amountLiquid.toFixed(1) : 0;
}

function liquidAndGrounds(form, element, coffeePerLiter) {
    if (element.name == "groundCoffee") {
        calculateLiquidSize(form, parseFloat(element.value), coffeePerLiter);
    } else {
        let goalLiquid = parseFloat(form.targetLiquid.value);
        calculateGroundCoffee(form, goalLiquid, coffeePerLiter);
    }
}

function calculateLiquidSize(element, groundCoffee, coffeePerLiter = 60) {
    let targetLiquid = groundCoffee * 1000 / coffeePerLiter;
    element.targetLiquid.value = targetLiquid.toFixed(1);
}

function calculateGroundCoffee(element, amountLiquid, coffeePerLiter = 60) {
    let ground = (amountLiquid / 1000 * coffeePerLiter);
    element.groundCoffee.value = ground.toFixed(1);
}

function calculateBloom(element, amountLiquid, coffeePerLiter = 60) {
    let blooming = (amountLiquid || 0 / 500 * coffeePerLiter);
    element.amountBloom.value = blooming.toFixed(1);
    element.amountBloom2.value = blooming.toFixed(1);
}

function calculatePour(element, amountLiquid) {
    let blooming = parseFloat(element.amountBloom.value);
    let pour1total = amountLiquid || 0 * 0.6;
    let pour1 = pour1total - blooming;

    element.pour1total.value = pour1total.toFixed(1);
    element.pour1.value = pour1.toFixed(1);
    element.pour2total.value = amountLiquid ? (amountLiquid).toFixed(1): 0;
    element.pour2.value = (amountLiquid || 0 - pour1total).toFixed(1);
}

function setWaterToBoil(element, amountLiquid) {
    element.amountWater.value = amountLiquid ? amountLiquid.toFixed(1) : 0;
}

function getFormElement(element) {
    let form = element.closest("form");
    return form;
}
