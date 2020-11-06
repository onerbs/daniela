# Daniela

Collection of customizable DOM dialogs.

> For usage, see the [example code](https://github.com/onerbs/daniela/blob/public/public.js).


# Installation

	npm i daniela

or

	<link rel="stylesheet" href="https://unpkg.com/daniela/dist/daniela.min.css">
	<script src="https://unpkg.com/daniela/dist/daniela.min.js"></script>


# Customization

You can override the following CSS variables:

`--daniela-background` (default: `#000`)

`--daniela-foreground` (default: `#EEE`)

`--daniela-z-dialog` (the dialog `z-index`, default: `20`)

`--daniela-z-toast` (the toast `z-index`, default: `30`)

`--daniela-radii` (for the `border-radius`, default: `4pt`)


# API

## toast `void`

> Display a message by the given time.

### message `string`

The message to be shown.

### time `?number`

The time on screen (ms)
<br/>*The default value is `3000`*

<br/>

## decide `Promise<boolean>`

> Ask the user a question.

### question `string`

The question to be asked (question mark not included).
<br/>*The only possible answers are `Yes` or `No`.*

<br/>

## input `Promise<string>`

> Read input from the user.

### headline `string`

The title of the dialog.

### hint `?string`

The input label.
<br/>*The default value is empty.*

### validate `?(value: string) => boolean`

The validation function take as parameter the input value and check if is valid or not.
<br/>*By default, it checks that the value is not empty.*
