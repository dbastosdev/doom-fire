// Linear array
const firePixelArray = []
// Width and Height of fire
const fireWidth = 40
const fireHeight = 40

// Fire colors palet
// array with information of rgb color
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

// main function
function start(){
    createFireDataStructure()
    createFireSource()
    renderFire()

    // loop of fire propagation
    setInterval(calculateFirePropagation, 50)
}

// Accessories functions
function createFireDataStructure(){
    // pixel matrix of fire
    const numberOfPixels = fireWidth * fireHeight

    for(let i = 0; i < numberOfPixels; i++){
        firePixelArray[i] = 0 // 0 intensity of fire
    }
}

// This function is a loop that calculate a fire propagation
// The algo is see the intensity of pixel below and subtract 1 in the fire intensity. Just it.
function calculateFirePropagation(){
    // going throw all cells - first columns one column for loop
    for(let column = 0; column < fireWidth; column++){
        // second rows
        for(let row = 0; row < fireHeight; row++){
            // identify the cell
            const pixelIndex = column + (fireWidth * row)
           
            // call the function that update fire intensity
            updateFireIntensityPerPixel(pixelIndex)
        }
    }

    // call the function render for update a view
    renderFire()

}

// function that update the pixel intensity
// Receive a current pixel and returns 
function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth // store the value of pixel below

    // we need ignore the final line
    if(belowPixelIndex >= fireHeight * fireWidth){
        return
    }

    // decay = is the velocity of cool down the fire intensity
    // decay needs be randomic to be more realistic
    // const decay = 1
    const decay = Math.floor(Math.random() * 3) // the number 3 is the height of fire

    const belowPixelFireIntensity = firePixelArray[belowPixelIndex] // store the intensity of fire in the cell above
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0 // create a intensity - 1 to current cell

    // now, with decay being discounted the uodate can be applyed in the current pixel or beside pixel
    firePixelArray[currentPixelIndex - decay] = newFireIntensity // update the fire intensity of current cell

}


function renderFire(){
    /* 
    Init a table in html variable
    cellpadding = internal space in the cell
    cellspacing = space between cells
    */
    let html = '<table cellpadding=0 cellspacing=0>' // start table

    // lines
    for(let row = 0; row < fireHeight; row++){ 

        // select debug mode
        const debug = false

        html += '<tr>' // start row
            // columns
            for(let column = 0; column < fireWidth; column++){ 
                // calculate actual pixel index
                // first horizontal position and second vertical position
                const pixelIndex = column + (fireWidth * row)

                // insert fire intensity inside cell
                // The value of fire intensity comes of createFireDataStructure()
                // Each fireIntensity is put inside each cell
                const fireIntensity = firePixelArray[pixelIndex]

                // debug mode
                // if true = render without color else render with color
                if(debug === true){
                    // insert index in the cell
                    html += '<td>' // start column
                    html += `<div class="pixel-index">${pixelIndex}</div>` // index of cell. Is a div inside the cell decorative
                    html += fireIntensity // is a cell value
                    html += '</td>' // end column
                } else {
                    // select the color palette in array according the fire intensity
                    const color = fireColorsPalette[fireIntensity]
                    // store the rgb data color
                    const colorString = `${color.r},${color.g},${color.b}`
                    // paint the baxkground dinamically with the colorString
                    html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                    html += '</td>'
                }

                
            }
        html += '</tr>' // end row
 
    }
    html += '</table>' // end table

    // insert table in html
    document.querySelector('#fireCanvas').innerHTML = html
}

// Function to create a fire source
// It means that the base of fire have the most intensity of fire the biggest value of table color
function createFireSource(){
    for(let column = 0; column <= fireWidth; column++){
        // with this code we access the last cell in each column
        const overflowPixelIndex = fireWidth * fireHeight // real columns + 1 outside array below the last line 
        const pixelIndex = (overflowPixelIndex - fireWidth) + column // calculate first position in the last line. The last pixel of first column

        firePixelArray[pixelIndex] = 36

    }
}

// init simulation
start()