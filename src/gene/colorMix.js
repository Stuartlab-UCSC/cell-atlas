
// Find the color of a continuous value using a gradiant between two colors.

function mix (a, b, amount) {
    // Mix between the numbers a and b, where an amount of -1 corresponds to a,
    // and an amount of +1 corresponds to b.
    // Convert to 0 to 1 range.
    //var i = (amount + 1);
    var i = (amount + 1) / 2;
    // Do the linear interpolation.
    return i * a + (1 - i) * b;
}

function mix2 (a, b, c, d, amount1, amount2) {
    // Mix between a and b (or c and d) on amount1, and then mix between the
    // results on amount2. Amounts are in range -1 to 1.
    return mix(mix(a, b, amount1), mix(c, d, amount1), amount2);
}

function parseColorPortions(hexStr){
    var portion_prefix = "0x";
    var red_portion = parseInt(portion_prefix + hexStr.slice(1,3), 16);
    var green_portion = parseInt(portion_prefix + hexStr.slice(3,5), 16);
    var blue_portion = parseInt(portion_prefix + hexStr.slice(5,7), 16);
    return {
        "red" : red_portion,
        "green" : green_portion,
        "blue" : blue_portion,
    };
}

function hex(val) {
    let r = Math.round(val)
    return ((r < 16) ? '0' + r.toString(16) : r.toString(16)).toString(16)
}

function colorify(red, green, blue){
    var color = "#" + hex(red) + hex(green) + hex(blue);
    return color;
}

function colorMix(val, lowColor, highColor) {
    // @param val: value between -1 and 1
    // @param
    var ignoreValue = -1;
    var ignoreColor = 0;
    var highColorParsed = parseColorPortions(highColor);
    var lowColorParsed = parseColorPortions(lowColor);

    var red = mix2(
        lowColorParsed["red"],
        highColorParsed["red"],
        ignoreColor, ignoreColor,
        -val, -ignoreValue
    );

    var green = mix2(
        lowColorParsed["green"],
        highColorParsed["green"],
        ignoreColor, ignoreColor,
        -val, -ignoreValue
    );

    var blue = mix2(
        lowColorParsed["blue"],
        highColorParsed["blue"],
        ignoreColor, ignoreColor,
        -val, -ignoreValue
    );

    var color = colorify(red, green, blue);

    return color;
}

export default colorMix
