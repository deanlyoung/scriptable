// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: clock;
// include countdown.js as its own Scriptable script
let countdown = importModule('countdown')

// instantiate widget
const data = await fetchData()
const widget = createWidget(data)
Script.setWidget(widget)
Script.complete()

function createWidget(data) {
	const lw = new ListWidget()
	const bgColor = new LinearGradient()
	bgColor.colors = [new Color("#000"), new Color("#000")]
	bgColor.locations = [0.0, 1.0]
	lw.backgroundGradient = bgColor
	
	lw.addSpacer()
	
	let now = new Date()
	let utcOffset = now.getTimezoneOffset() * 60 * 1000
	now = now.getTime()
	
	let remaining = countdown(data, now, countdown.YEARS | countdown.DAYS)
	console.log(remaining)
	const dateLine = lw.addText(`${remaining}`)
	dateLine.font = new Font("SanFranciscoText-Regular", 27)
	dateLine.textColor = new Color("#FF0000")
	
	lw.addSpacer()
	
	let msInDay = 1000 * 60 * 60 * 24
	let hours = (data - now) / msInDay
	hours = ((hours - Math.floor(hours)) * msInDay) + utcOffset + now
	hours = new Date(hours)
	const timeLine = lw.addDate(hours)
	timeLine.applyTimerStyle()
	timeLine.rightAlignText()
	timeLine.font = new Font("SanFranciscoText-Regular", 23)
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
	
	var msRemainingAtStartDate = (resp.startDateCO2Budget / resp.tonsPerSecond * 1000)
	console.log("msRemainingAtStartDate: " + msRemainingAtStartDate)
	
	var deadlineMS = startDate.getTime() + msRemainingAtStartDate
	console.log("deadlineMS: " + deadlineMS)
	
	return deadlineMS
}