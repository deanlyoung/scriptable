// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: clock;
let countdown = importModule('countdown')


// instantiate widget
const data = await fetchData()
const widget = createWidget(data)
Script.setWidget(widget)
Script.complete()

function createWidget(data) {
// 	console.log(data)
	
	const lw = new ListWidget()
	const bgColor = new LinearGradient()
	bgColor.colors = [new Color("#000"), new Color("#000")]
	bgColor.locations = [0.0, 1.0]
	lw.backgroundGradient = bgColor
	
	lw.addSpacer()
// 	const textLine = lw.addText(`${data} 😫🌎`)
// 	textLine.font = new Font("SanFranciscoText-Regular", 25)
// 	textLine.textColor = new Color("#FF0000")
	
	var years = Math.round(data / (1000 * 60 * 60 * 24)) * (1000 * 60 * 60 * 24)
	years = new Date(years)
	const dateLine = lw.addDate(years)
	dateLine.applyRelativeStyle()
	dateLine.font = new Font("SanFranciscoText-Regular", 30)
	dateLine.textColor = new Color("#FF0000")
	
	var now = new Date()
	now = now.getTime()
	console.log("now: " + now)
	
	var days = (data - now) / (1000 * 60 * 60 * 24)
	days = Math.round((days - Math.floor(days)) * 365.25)
// 	days = days * (1000 * 60 * 60 * 24) + now
	var dayText = ""
	if (days == 1) {dayText = "day"} else {dayText = "days"}
	console.log("days: " + days)
	const dayLine = lw.addText(`${days} ${dayText}`)
	dayLine.rightAlignText()
	dayLine.font = new Font("SanFranciscoText-Regular", 25)
	dayLine.textColor = new Color("#FFF")
	
	var hours = (data - now) / (1000 * 60 * 60 * 24)
	hours = hours - Math.floor(hours)
	hours = hours * (1000 * 60 * 60 * 24) + now
	console.log("hours: " + hours)
	hours = new Date(hours)
	const timeLine = lw.addDate(hours)
	timeLine.applyTimerStyle()
	timeLine.rightAlignText()
	timeLine.font = new Font("SanFranciscoText-Regular", 20)
	timeLine.textColor = new Color("#FFF")
	
	lw.addSpacer()
	
	lw.presentMedium()
	
	return lw
}

async function fetchData() {
	const url = 'https://raw.githubusercontent.com/BeautifulTrouble/climate-clock-widget/master/src/clock.json'
	const request = new Request(url)
	const resp = await request.loadJSON()
	console.log(resp)
	
	var startDate = new Date(Date.UTC(...resp.startDateUTC))
	console.log("startDate: " + startDate)
	
// 	var tElapsed = now - startDate.getTime()
// 	console.log(tElapsed)
	
// 	var co2budget = resp.startDateCO2Budget - tElapsed / 1000 * resp.tonsPerSecond
// 	console.log(co2budget)
	
	var msRemainingAtStartDate = (resp.startDateCO2Budget / resp.tonsPerSecond * 1000)
	console.log("msRemainingAtStartDate: " + msRemainingAtStartDate)
	
	var deadlineMS = startDate.getTime() + msRemainingAtStartDate
	console.log("deadlineMS: " + deadlineMS)
	
// 	var deadline = new Date(startDate.getTime() + msRemainingAtStartDate)
// 	console.log(deadline)
	
// 	var now = new Date()
	
// 	var remaining = countdown(deadline, now, countdown.YEARS | countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS)
// 	console.log(remaining)
	
	return deadlineMS
}