import { readFileSync, writeFileSync } from 'fs'

function format(line) {
	while (line.includes('    ')) {
		line = line.replace('    ', '\t')
	}
	if (line.endsWith(';')) {
		line = line.slice(0, line.length - 1)
	}
	return line
}

function isValid(line) {
	return line &&
		!( line.startsWith('/*')
		|| line.startsWith(' *')
		|| line.startsWith('//'))
}

const FILE = 'index.js'
const lines = readFileSync(FILE).toString().split('\n')
let buffer = ''

for (let line of lines) {
	if (isValid(line)) {
		line = format(line)
		buffer += `${line}\n`
		if (line.startsWith('export')) {
			line = line.slice(7)
		}
		console.log(line)
	}
}

writeFileSync(FILE, buffer)
