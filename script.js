
const audio = document.getElementById("audio")
const app = document.getElementById("app")

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



let playVideo = true
let clocks = clocksClear





let clockDisplayed

function setupClock(clock) {

    if (clockDisplayed == clock) return

    console.log("Clock displayed: " + clock.name)

    function clipSeg(seg) {
        
        if (seg == null || seg.length < 4) return "100% 100% 100% 100%"

        return ((seg[1] / clock.height) * 100) + "% " + 
        (100 - (seg[0] / clock.width) * 100) + "% " + 
        (100 - (seg[3] / clock.height) * 100) + "% " + 
        ((seg[2] / clock.width) * 100) + "%"
 
    }

    
    let innerClock = '<video ' + (playVideo ? 'autoplay ' : '') + ' muted loop><source src="' + 
    clockFullPath + clock.backgroundPath + '">Error loading video.</video>'

    for (const displayIndex in clock.displays) {

        for (const segmentName of segmentNames) {

            innerClock +=  '<img style="clip-path: inset(' + clipSeg(clock.displays[displayIndex][segmentName]) + 
            ');' + clock.imgStyle + '" class="display_' + displayIndex + '_segment_' + segmentName + '" src="' + clockFullPath + clock.clockPath + '" alt="">';
    
        }
    
    }

    const clockObject = document.createElement("div")

    clockObject.innerHTML = innerClock + '<img style="clip-path: inset(' + clipSeg(clock.dot) + 
    ');" class="dot" src="' + clockFullPath + clock.clockPath + '" alt="">'

    app.append(clockObject)

    setTimeout(() => {

        const appChildren = Array.from(app.children)

        if (appChildren[appChildren.length - 1] !== clockObject) return;
        
        for (const child of appChildren) {
            if (child !== clockObject) app.removeChild(child)
        }

    }, 2000)

    clockDisplayed = clock
    updateClock(true)

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



let lastMinutes
let lastHours

function updateClock(force) {

    const date = new Date()
    const minutes = date.getMinutes()
    const hours = date.getHours()
    
    if (lastMinutes != minutes || force) {
        changeDisplay(0,displayChars[minutes % 10])
        changeDisplay(1,displayChars[(minutes / 10) >> 0])
        changeDisplay(2,displayChars[hours % 10])
        changeDisplay(3,displayChars[((hours / 10) >> 0)])
        lastMinutes = minutes
        lastHours = hours
    }
}


function updateWeather() {

    const hours = new Date().getHours()

    let closestHour = clocks[0].startingHour
    let closestClock = clocks[0]

    for (const clock of clocks) {
        if (clock.startingHour > hours) continue
        if (clock.startingHour <= closestHour) continue
        closestClock = clock
        closestHour = clock.startingHour
    }

    setupClock(closestClock)

}

setInterval(function () {updateClock(false)}, 1);
setInterval(function () {updateWeather()}, 1000 * 60 * 3);

updateWeather()
updateClock(true)


window.wallpaperPropertyListener = { 
    applyUserProperties: function(properties) { 
        if (properties.customSound) { 
            if (properties.customSound.value !== "") { 
                audio.volume = properties.customSound.value;
            } 
        } 
    } 
} 







