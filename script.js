
const weatherUpdateInterval = 1000 * 60 * 3     // In milliseconds
const timeUpdateInterval = 1                    // In milliseconds
const clockChangeDelayAfterSound = 200          // In milliseconds
const typeTransition = 5000                     // In milliseconds


const backgroundAudio = document.getElementById("backgroundAudio")
const clockChangeAudio = document.getElementById("clockChangeAudio")

const app = document.getElementById("app")
const weatherData = document.getElementById("weatherData")

const clockFullPath = "resources/clocks/"

const segmentNames = ["A","B","C","D","E","F","G"]

const displayChars = {
    0: ["A","B","C","D","E","F"],
    1: ["B","C"],
    2: ["A","B","D","E","G"],
    3: ["A","B","C","D","G"],
    4: ["B","C","F","G"],
    5: ["A","C","D","F","G"],
    6: ["A","C","D","E","F","G"],
    7: ["A","B","C"],
    8: ["A","B","C","D","E","F","G"],
    9: ["A","B","C","D","F","G"],
}

const defaultClock = clocks[0].types


let enableAnimation = true
let selectedClock = "Cycle"


function setupClock(clock) {

    function clipSeg(seg) {
        
        if (seg == null || seg.length < 4) return "100% 100% 100% 100%"

        return ((seg[1] / clock.height) * 100) + "% " + 
        (100 - (seg[0] / clock.width) * 100) + "% " + 
        (100 - (seg[3] / clock.height) * 100) + "% " + 
        ((seg[2] / clock.width) * 100) + "%"
 
    }

    
    let innerClock = '<video ' + (enableAnimation ? 'autoplay ' : '') + ' muted loop><source src="' + 
    clockFullPath + clock.backgroundPath + '">Error loading video.</video>'

    for (const displayIndex in clock.displays) {

        for (const segmentName of segmentNames) {

            innerClock +=  '<img style="clip-path: inset(' + clipSeg(clock.displays[displayIndex][segmentName]) + 
            ');' + clock.imgStyle + '" class="display_' + displayIndex + '_segment_' + segmentName + '" src="' + clockFullPath + clock.clockPath + '" alt="">';
    
        }
    
    }

    const clockObject = document.createElement("div")

    clockObject.innerHTML = innerClock + '<img style="clip-path: inset(' + clipSeg(clock.dot) + 
    ');' + clock.imgStyle + '" class="dot" src="' + clockFullPath + clock.clockPath + '" alt="">'

    app.append(clockObject)

    setTimeout(() => {

        const appChildren = Array.from(app.children)

        if (appChildren[appChildren.length - 1] !== clockObject) return;
        
        for (const child of appChildren) {
            if (child !== clockObject) app.removeChild(child)
        }

    }, typeTransition)

    clockDisplayed = clock

}


function changeObjectsVisibility(className, visible) {
    for (object of document.getElementsByClassName(className)) {
        if (visible) object.style.display = "block"
        else object.style.display = "none"
    }
}


function changeDisplay(displayIndex, segments) {
    for (const segment of segmentNames) {
        changeObjectsVisibility("display_" + displayIndex + "_segment_" + segment, segments.includes(segment))
    }
}


let clockTypes = defaultClock
let clockDisplayed
let lastMinutes

function updateClock(force) {

    const date = new Date()
    const minutes = date.getMinutes()
    const hours = date.getHours()

    if (force) changeClock()

    if (lastMinutes != minutes) {
        lastMinutes = minutes
        setTimeout(() => {changeClock()}, clockChangeDelayAfterSound)
        console.log("jao: " + lastMinutes)
        clockChangeAudio.play()
    }

    function changeClock() {


        if (selectedClock == "Cycle") {
            
            let closestHour = 0
            let closestClock
    
            for (const type of clockTypes) {
                if (type.startingHour > closestHour) {
                    closestClock = type
                    closestHour = type.startingHour
                }
            }
    
            closestHour = 0
    
            for (const type of clockTypes) {
                if (type.startingHour <= hours && type.startingHour > closestHour) {
                    closestClock = type
                    closestHour = type.startingHour
                }
            }
    
            if (clockDisplayed != closestClock || force) {
                setupClock(closestClock)
                clockDisplayed = closestClock
                console.log("Clock displayed: " + closestClock.name)
            }
        
        } else {

            for (const clock of clocks) {
                for (const type of clock.types) {
                    if (type.name == selectedClock) setupClock(type)
                }
            }

        }

        changeDisplay(0,displayChars[minutes % 10])
        changeDisplay(1,displayChars[(minutes / 10) >> 0])
        changeDisplay(2,displayChars[hours % 10])
        changeDisplay(3,displayChars[((hours / 10) >> 0)])   

    }

}


let enableWeather = false
let city = ""
let api = ""
let enableWeatherLog = false
let requests = 0

function updateWeather() {

    weatherData.innerHTML = ""

    if (!enableWeather || city == "" || api == "" || selectedClock != "Cycle") {
        clockTypes = defaultClock
        updateClock(true)
        return
    }
    

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api)
    .then(response => response.json())
    .then(resp => {
       
        requests++

        if (enableWeatherLog) weatherData.innerHTML = JSON.stringify(resp) + " Session requests count: " + requests

        const weatherNow = resp.weather[0].main

        for (const clock of clocks) {
            for (const weather of clock.weather) {
                if (weather == weatherNow) {
                    clockTypes = clock.types
                    updateClock(true)
                    console.log("Current weather: " + weatherNow)
                    break
                }
            }
        }

        

    })
    .catch(error => {
        console.error('Error:', error)
        weatherData.innerHTML += " " + error
        updateClock(true)
    })

}




setInterval(function () {updateClock(false)}, timeUpdateInterval)
setInterval(function () {updateWeather()}, weatherUpdateInterval)



window.wallpaperPropertyListener = { 
    applyUserProperties: function(properties) { 
        
        if (properties.audioVolume) {
            backgroundAudio.volume = properties.audioVolume.value / 100
        } 

        if (properties.pistonVolume) {
            clockChangeAudio.volume = properties.pistonVolume.value / 100
        } 

        if (properties.selectedClock) {
            selectedClock = properties.selectedClock.value
            updateWeather()
        }

        if (properties.enableAnimation) {
            enableAnimation = properties.enableAnimation.value
            updateClock(true)
        }

        if (properties.enableWeather) {
            enableWeather = properties.enableWeather.value
            updateWeather()
        }

        if (properties.api) {
            api = properties.api.value
            updateWeather()
        }

        if (properties.city) {
            city = properties.city.value
            updateWeather()
        }

        if (properties.enableWeatherLog) {
            enableWeatherLog = properties.enableWeatherLog.value
            updateWeather()
        }

    } 
} 







