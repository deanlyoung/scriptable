// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: feather-alt;
// change these
const token = ""
const device_type = ""
const device_id = ""

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
	const datetime = new Date()
	const dfTime = new DateFormatter()
	dfTime.locale = "gb"
	dfTime.useShortDateStyle()
	dfTime.useShortTimeStyle()
	const datetimeLine = lw.addText(`${dfTime.string(datetime)}`)
	datetimeLine.font = new Font("SanFranciscoText-Regular", 12)
	datetimeLine.textColor = new Color("#ccc")
	const temperatureLine = lw.addText(`[🌡] ${Number(data.temp).toFixed(2)}°F`)
	temperatureLine.font = new Font("SanFranciscoText-Regular", 12)
	temperatureLine.textColor = new Color("#ccc")
	const humidityLine = lw.addText(`[️☔️] ${Number(data.humid).toFixed(2)}%`)
	humidityLine.font = new Font("SanFranciscoText-Regular", 12)
	humidityLine.textColor = new Color("#ccc")
	const co2Line = lw.addText(`[🌬] ${Number(data.co2).toFixed(0)} ppm`)
	co2Line.font = new Font("SanFranciscoText-Regular", 12)
	co2Line.textColor = new Color("#ccc")
	const tvocLine = lw.addText(`[♨️] ${Number(data.voc).toFixed(0)} ppb`)
	tvocLine.font = new Font("SanFranciscoText-Regular", 12)
	tvocLine.textColor = new Color("#ccc")
	const pm25Line = lw.addText(`[🚬] ${Number(data.pm25).toFixed(0)} μg/m³`)
	pm25Line.font = new Font("SanFranciscoText-Regular", 12)
	pm25Line.textColor = new Color("#ccc")
	lw.addSpacer()
	lw.presentSmall()
	return lw
}

async function fetchData() {
	const bearer_token = "Bearer " + token
	const headers = {"Authorization": bearer_token}
	const url = `https://developer-apis.awair.is/v1/users/self/devices/${device_type}/${device_id}/air-data/raw?limit=12&desc=true&fahrenheit=true`
	const request = new Request(url)
	request.headers = headers
	const resp = await request.loadJSON()
	const data = resp.data
	const sensors = data
			.map(sensor => sensor.sensors)
			.reduce((a, b) => a.concat(b))
			.reduce((a, b) => {a[b.comp] = a[b.comp] ? 0.5*(a[b.comp] + b.value) : b.value; return a}, {});
// 	const score = data.reduce((a, b) => {return a + b.score}, 0) / data.length;
	return sensors
}