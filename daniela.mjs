import fs from 'fs'
import { basename } from 'path'

function printUsage(exitCode = 0) {
	console.log(`
Usage: node ${basename(process.argv[1])} (-h | FILE ACTION)

    FILE    The file to be processed
  ACTION    Is one of the following:

    -k    Clean file (Remove semicolons and indent with tabs)
    -u    Remove 'export' keyword and clean file
`);
	process.exit(exitCode)
}

function isComment(s) {
	return s.startsWith('/*')
		|| s.startsWith(' *')
		|| s.startsWith('//')
}

/**
 * Remove semicolons and indent with tabs.
 * @param {string} line The input line
 * @return {string}
 */
function clean(line) {
	while (line.includes('    ')) {
		line = line.replace('    ', '\t')
	}
	if (line.endsWith(';')) {
		line = line.slice(0, line.length - 1)
	}
	return line
}

/**
 * Remove 'export' keyword and clean line.
 * @param {string} line The input line
 * @return {string}
 */
function unexport(line) {
	if (line.startsWith('export')) {
		line = line.slice(7)
	}
	return clean(line)
}



if (process.argv.length == 2) {
	console.error('ERROR: No input file')
	printUsage(1)
}

const FILE = process.argv[2]

if (FILE === '-h' || FILE === '--help') {
	console.log('Daniela (c) 2020  Alejandro Elí')
	console.log('Released under the MIT License.')
	printUsage()
}

if (process.argv.length == 3) {
	console.error('ERROR: No action provided')
	printUsage(1)
}

const ACTION = process.argv[3]

if (!['-k', '-u'].includes(ACTION)) {
	console.error(`ERROR: Unknown action ${ACTION}`)
	printUsage(1)
}

let _action = null
switch (ACTION) {
	case '-k':
		_action = clean
		break
	case '-u':
		_action = unexport
		break
}

if (fs.existsSync(FILE)) {
	const lines = fs.readFileSync(FILE).toString().split('\n')
	for (let line of lines) {
		if (line && !isComment(line)) {
			console.log(_action(line))
		}
	}
}
