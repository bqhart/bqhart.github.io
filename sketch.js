let bubbles = [];
let temperatureData = [];
let holdupData = [];
let vaporFlowData = [];
let timeData = [];
let trays = 0;
let liquidLevelData = [];
let timeSeries = [];
let trayCount = [];
let timeIndex = 0;
let headerUnits = [];
let vaporUnits = [];
let temperatureUnits = [];
let arrowSize = 10;
let pressureUnits = [];
let reliefRateUnits = [];
let columnPressure = [];
let reliefRate = [];

function preload(){

}

function setup() {
  createCanvas(600, 600);
  frameRate(50);

}

function draw() {

  background(220);


  liquidLevelData = window.liquidLevelData || [];
  timeSeries = window.liquidLevelDataTimeSeries || [];
  trayCount = window.liquidLevelDataTrayCount || 0; // Assuming this is a number
  temperatureData = window.trayTempData || [];
  vaporFlowData = window.vapourFlowData || [];
  headerUnits = window.liquidLevelDataHeaderUnits || [];
  vaporUnits = window.vapourFlowDataHeaderUnits || [];
  temperatureUnits = window.trayTempDataHeaderUnits || [];
  columnPressure = window.columnPressure || [];
  reliefRate = window.reliefRate || [];
  pressureUnits = window.pressureUnits || [];
  reliefRateUnits = window.reliefRateUnits || [];

  trays = trayCount; // Set trays to the correct count

  console.log(reliefRate);

  // Print the first value to the console (for testing)
  // Check if we have data to display
  if (liquidLevelData.length === 0 || temperatureData.length === 0) {
    console.warn("Liquid level or temperature data is empty.");
    return;
  }

  // Check if timeIndex exceeds available data
  if (timeIndex >= liquidLevelData.length) {
    timeIndex = 0; // Reset to 0 if we exceed the length
  }

  // Print the current time value and data for debugging
  let currentTime = timeSeries[timeIndex]; // Get the current time value
  let currentVaporFlow = vaporFlowData[timeIndex] || [];
  let currentTemperature = temperatureData[timeIndex] || [];
  let currentLiquidLevel = liquidLevelData[timeIndex] || [];
  let currentPressure = columnPressure[timeIndex] || [];
  let currentReliefRate = reliefRate[timeIndex];

  console.log(`Time: ${currentTime}`);
  console.log(`Vapour Flow: ${currentVaporFlow}`);
  console.log(`Temperature: ${currentTemperature}`);
  console.log(`Liquid Level: ${currentLiquidLevel}`);
  console.log(`vapourUnits: ${vaporUnits[1]}`);
  console.log(`Pressure: ${currentPressure}`);
  console.log(`Pressure Units:${pressureUnits}`);
  console.log(`Relief Rate: ${currentReliefRate}`);
  console.log(`Relief Rate Units:${reliefRateUnits}`);

  // Display the time value on the canvas
  fill(0); // Set text color to black
  textSize(16);
  textAlign(LEFT, TOP);
  text(`Time: ${currentTime} ${headerUnits[0] || ''}`, 10, 10);
  text(`Relief Rate: ${currentReliefRate} ${reliefRateUnits || ''}`, 400, 25);
  textAlign(RIGHT,TOP);
  text(`Pressure: ${currentPressure} ${pressureUnits || ''}`, width-10, 10);
  

  if (timeIndex === 0) {
    bubbles = []; // Empty the bubbles array
  }


  // Print the current time frame for debugging
  console.log(`Time Index: ${timeIndex}`);
  console.log(`Liquid Level Entry:`, liquidLevelData[timeIndex]);
  console.log(`Temperature Entry:`, temperatureData[timeIndex]);
  console.log(`Time series units:`, headerUnits[0]);
  console.log(typeof headerUnits);
  console.log(Array.isArray(headerUnits));
  console.log((headerUnits));

  //noStroke(); // Disables the stroke
  stroke(0);
  //drawing the distillation column
  noFill();

  //fill(255, 0, 0); // Set fill color to red
  arc(width/2, height/8, width/5, height/10, PI, 2*PI);
  arc(width/2, 7*height/8, width/5, height/10, 0, PI);
  
  line(width/2-width/10, height/8, width/2-width/10, 7*height/8);
  line(width/2+width/10, height/8, width/2+width/10, 7*height/8);

  //Drawing Steam Line in
  fill(0);
  line(0,7*height/8-5,width/2-width/10,7*height/8-5);
  triangle(width/2-width/10, 7*height/8-5, width/2-width/10-arrowSize, 7*height/8-5+arrowSize/2, width/2-width/10-arrowSize, 7*height/8-5-arrowSize/2);
  
  
  if(currentReliefRate>0){
    fill(255,0,0);
  }
  //Drawing PSV
  line(width/2+width/10-3, height/8-5, width/2+width/10-3, height/16-5);
  triangle(width/2+width/10-3, height/16-5, width/2+width/10+arrowSize/2-3, height/16+arrowSize-5, width/2+width/10-arrowSize/2-3, height/16+arrowSize-5);
  
  line(width/2+width/10-3, height/16-5, width/2+width/10+30, height/16-5);
  triangle(width/2+width/10-3, height/16-5,width/2+width/10+arrowSize-3, height/16-arrowSize/2-5,width/2+width/10+arrowSize-3, height/16+arrowSize/2-5)
  noFill();

  // Draw trays and their corresponding vapor flow data
  let traySpacing = (3 * height / 4) / trays; // Calculate tray spacing

  let maxFlow = -Infinity;
  for (let row of vaporFlowData) {
    for (let value of row) {
      if (value > maxFlow) {
        maxFlow = value;
      }
    }
  }
  

  for (let i = 0; i < trayCount; i++) {
    let tempHeight = traySpacing * (i + 1) + (3 * height / 32); 
    let trayIndex = i; // Reverse the tray index

    // Draw the tray line
    line(width / 2 - width / 10, tempHeight, width / 2 + width / 10, tempHeight);

    // Display the vapor flow data next to each tray
    fill(0); // Black text color
    textSize(12);
    textAlign(RIGHT, CENTER);
    let vaporValue = currentVaporFlow[trayIndex] || 0;
    text(`Vapor Flow: ${vaporValue} ${vaporUnits[1]}`, width / 2 - width / 8, tempHeight);

    textAlign(LEFT, CENTER);
    let tempValue = currentTemperature[trayIndex] || 0;
    text(`Tray Temperature: ${tempValue} ${temperatureUnits[1]}`, width / 2 + width / 8, tempHeight);

    let levelValue = currentLiquidLevel[trayIndex] || 0;
    text(`Holdup Level: ${levelValue} ${headerUnits[1]}`, width / 2 + width / 8, tempHeight - 12);

    // Adjust the probability of bubble creation based on vapor flow
    let bubbleProbability = vaporValue / maxFlow; // Ratio of vapor flow to max flow
    
    if (frameCount % 3 ===0 && random() < bubbleProbability) { // Generate bubble based on probability
      let b = new Bubble(
        random(width / 2 - width / 12, width / 2 + width / 12), // Random x-position
        tempHeight, // Tray height
        Math.sqrt(bubbleProbability*100), // Random size
        bubbleProbability // Opacity or other factor proportional to vapor flow
      );
      bubbles.push(b);
    }
  }


  //Drawing liquid hold up and temperature
  let maxTemp = Math.max(...temperatureData.flat());
  let minTemp = Math.min(...temperatureData.flat());

  console.log(maxTemp);
 
  for (let i = 0; i < trayCount; i++) {
    let tempHeight = traySpacing * (i + 1) + (3 * height / 32); // Adjusted for top tray first
    let trayIndex = i; // Top tray is now first

    let liquidLevel = liquidLevelData[timeIndex][trayIndex]/10 || 0;
    let trayTemperature = temperatureData[timeIndex][trayIndex] || minTemp;

    
    let tempColor = map(trayTemperature, minTemp, maxTemp, 0, 255);
    // First rectangle for liquid level
    fill(tempColor, 0, 255 - tempColor);
    rect(
      width / 2 - width / 10,
      tempHeight - liquidLevel,
      width / 5,
      liquidLevel
    );
  // Second rectangle for tray spacing
    if (i === 0) {
      // Special case for the top tray's second rectangle
     fill(tempColor, 0, 255 - tempColor, 100);
     rect(
      width / 2 - width / 10, // x-position
      height/8, // Adjusted y-origin
      width / 5, // Width
      tempHeight-height/8 - liquidLevel // Height
      );
    } else {
      // Default case for all other trays
      fill(tempColor, 0, 255 - tempColor, 100);
      rect(
        width / 2 - width / 10, // x-position
        tempHeight - traySpacing, // y-position
        width / 5, // Width
        traySpacing - liquidLevel // Height
      );
    }
  }


  for(let i = bubbles.length-1; i>=0; i--){
    bubbles[i].move();
    bubbles[i].display();

    if(bubbles[i].isFinished()){
      bubbles.splice(i,1);
    }
  }

  timeIndex++;
}

class Bubble {
  constructor(x,y,r,speedRatio){
    this.x = x;
    this.y = y;
    this.r =r;
    this.opacity =255;
    this.speedRatio = speedRatio;
  }

  move(){
    this.y -=3*this.speedRatio;
    this.opacity-=10;
  }
  
  display(){
    noStroke();
    fill(255, this.opacity);
    ellipse(this.x, this.y, this.r*2);
  }

  isFinished(){
    return this.opacity <= 0;
  }
}

