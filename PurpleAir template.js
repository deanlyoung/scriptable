// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: feather-alt;
// change this
const station_id = ""

const purple_air_url = "https://www.purpleair.com/json?show=" + station_id

// instantiate widget
const data = await fetchData()
const widget = createWidget(data)
Script.setWidget(widget)
Script.complete()

function createWidget(data) {
	console.log(data)
	const lw = new ListWidget()
	const bgColor = new LinearGradient()
	bgColor.colors = [new Color("#000"), new Color("#000")]
	bgColor.locations = [0.0, 1.0]
	lw.backgroundGradient = bgColor
	const datetimeLine = lw.addText(`${data.last_seen}`)
	datetimeLine.font = new Font("SanFranciscoText-Regular", 12)
	datetimeLine.textColor = new Color("#ccc")
	const temperatureLine = lw.addText(`[🌡] ${Number(data.temp).toFixed(0)}°F`)
	temperatureLine.font = new Font("SanFranciscoText-Regular", 12)
	temperatureLine.textColor = new Color("#ccc")
	const humidityLine = lw.addText(`[️☔️] ${Number(data.humid).toFixed(0)}%`)
	humidityLine.font = new Font("SanFranciscoText-Regular", 12)
	humidityLine.textColor = new Color("#ccc")
	const co2Line = lw.addText(`[🌬] `)
	co2Line.font = new Font("SanFranciscoText-Regular", 12)
	co2Line.textColor = new Color("#ccc")
	const tvocLine = lw.addText(`[♨️] `)
	tvocLine.font = new Font("SanFranciscoText-Regular", 12)
	tvocLine.textColor = new Color("#ccc")
	const pm25Line = lw.addText(`[🚬] ${Number(data.pm25).toFixed(2)} μg/m³`)
	pm25Line.font = new Font("SanFranciscoText-Regular", 12)
	pm25Line.textColor = new Color("#ccc")
	const pressureLine = lw.addText(`[🚩] ${Number(data.pressure).toFixed(2)} mbar`)
	pressureLine.font = new Font("SanFranciscoText-Regular", 12)
	pressureLine.textColor = new Color("#ccc")
	lw.addSpacer()
	lw.presentSmall()
	return lw
}

async function fetchData() {
	const request = new Request(purple_air_url)
	const resp = await request.loadJSON()
	const data = resp.results[0]
	const sensors = {}
	sensors.pm25 = data.PM2_5Value
	sensors.temp = data.temp_f
	sensors.humid = data.humidity
	sensors.pressure = data.pressure
	const datetime = new Date(data.LastSeen * 1000)
	const dfTime = new DateFormatter()
	dfTime.locale = "gb"
	dfTime.useShortDateStyle()
	dfTime.useShortTimeStyle()
	sensors.last_seen =  dfTime.string(datetime)
	return sensors
}