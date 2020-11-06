export function toast(message: string, time = 3000) {
	const wrapper = _toast(message)
	setTimeout(() => _unplug(wrapper), time)
}

export function decide(question: string) {
	const buttonGroup = _buttonGroup('No', 'Yes')
	const wrapper = _wrapper([_title(question), buttonGroup])
	const [deny, allow] = buttonGroup.children
	return new Promise<boolean>(resolve => {
		function respond(value: boolean) {
			resolve(value)
			_unplug(wrapper)
		}
		deny.addEventListener('click', () => respond(false))
		allow.addEventListener('click', () => respond(true))
	})
}

export function input(headline: string, hint = '', validate = (value: string) => !!value) {
	const buttonGroup = _buttonGroup('Cancel', 'Accept')
	const { label, input } = _input(hint)
	const wrapper = _wrapper([_title(headline), label, buttonGroup])
	const [deny, allow] = buttonGroup.children
	return new Promise<string>(resolve => {
		function respond(value: string) {
			resolve(value)
			_unplug(wrapper)
		}
		deny.addEventListener('click', () => respond(''))
		allow.addEventListener('click', collectAndSend)
		function collectAndSend() {
			const { value } = input
			validate(value)
				? respond(value)
				: input.classList.add('error')
		}
		input.addEventListener('keypress', (ev: any) => {
			input.classList.remove('error')
			if (ev.key == 'Enter') {
				collectAndSend()
			}
		})
	})
}


// ---------- PRIVATE ----------

function _unplug(wrapper: HTMLElement) {
	wrapper.classList.toggle('__Dn_fadeIn')
	wrapper.classList.toggle('__Dn_fadeOut')
	setTimeout(() => document.body.removeChild(wrapper), 250)
}

function _element<E extends HTMLElement>(kind: string) {
	return document.createElement(kind) as E
}

function _textElement(kind: string, text: string) {
	const element = _element(kind)
	element.innerText = text
	return element
}

function _wrapper(children: HTMLElement[], kind = 'Dialog', overlay = true) {
	const element = _element('div')
	const classes = ['__Dn_fadeIn', '__Dn_' + kind]
	overlay && classes.push('__Dn_Overlay')
	element.classList.add(...classes)
	element.append(...children)
	document.body.insertBefore(element, document.body.children[0])
	return element
}

function _toast(text: string) {
	return _wrapper([_textElement('p', text)], 'Toast', false)
}

function _title(text: string) {
	return _textElement('h2', text)
}

function _button(text: string) {
	return _textElement('button', text)
}

function _input(hint: string) {
	const label = _textElement('label', hint)
	const input = _element<HTMLInputElement>('input')
	label.appendChild(input)
	return { label, input }
}

/**
 * @param n The negative label
 * @param y The affirmative label
 */
function _buttonGroup(n: string, y: string) {
	const n_element = _button(n)
	const y_element = _button(y)
	const group = _element('span')
	group.append(n_element, y_element)
	return group
}
