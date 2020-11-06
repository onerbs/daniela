import { readFileSync, writeFileSync } from 'fs'
import { minify } from 'terser'
import csso from 'csso'

function saveFileSync(content, ext) {
	const path = 'dist/daniela.min.' + ext
	writeFileSync(path, content, { mode: 0o644 })
}

// Minify CSS
if (process.argv[2] === '-') {
	const chunks = []
	for await (const chunk of process.stdin) {
		chunks.push(chunk)
	}
	const source = Buffer.concat(chunks).toString('utf-8')
	const { css } = csso.minify(source, {restructure: false})
	saveFileSync(css, 'css')
	process.exit(1 - !!css)
}

// Minify JS
const file_name = 'index.js'
const content = readFileSync(file_name).toString()
const { code } = await minify(content, {
	keep_fnames: /^(decide|input|toast)$/,
	toplevel: true,
})
function unexport(s) {
	while (s.includes('export'))
	s = s.replace('export ', '')
	return s
}
saveFileSync(unexport(code), 'js')

// Reformat JS
function isValid(line) {
	return line &&
	!( line.startsWith('/*')
	|| line.startsWith(' *')
	|| line.startsWith('//'))
}
let buffer = ''
const lines = content.split(/\r?\n/)
for (let line of lines) {
	if (isValid(line)) {
		while (line.includes('    ')) {
			line = line.replace('    ', '\t')
		}
		if (line.endsWith(';')) {
			line = line.slice(0, line.length - 1)
		}
		buffer += `${line}\n`
	}
}
writeFileSync(file_name, buffer)
