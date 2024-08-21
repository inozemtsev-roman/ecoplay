const downEvents = ['pointerdown']
const upEvents = [
	'pointerup',
	'mouseleave',
	'dragleave',
	'toucmmove',
	'touchend',
	'touchcancel'
]

export function ripple(element: HTMLElement) {
	if (!element.classList.contains('with-ripple')) {
		element.classList.add('with-ripple');
	}
	
	downEvents.forEach((event) => {
		element.addEventListener(event, (e) => {
			// e.preventDefault()
			createRipple(e as PointerEvent, element)
		})
	});
}


function createRipple(event: PointerEvent, parentElement: HTMLElement) {
	const rect = parentElement.getBoundingClientRect()
	const radius = findDistanceToFurthestPoint(
		rect.width,
		rect.height,
		event.clientX - rect.left,
		event.clientY - rect.top
	)

	const rippleElement = document.createElement('span')
	rippleElement.classList.add('ripple')

	const size = radius * 2
	const left = event.clientX - rect.left
	const top = event.clientY - rect.top

	rippleElement.style.left = left + 'px'
	rippleElement.style.top = top + 'px'

	rippleElement.style.width = size + 'px'

	parentElement.appendChild(rippleElement)

	upEvents.forEach((e) => {
		parentElement.addEventListener(e, () => {
			rippleElement.style.opacity = '0'

			setTimeout(() => rippleElement.remove(), 1000)
		})
	})
}


function findDistanceToFurthestPoint(
	elementWidth: number,
	elementHeight: number,
	clickX: number,
	clickY: number,
) {
	const x = clickX > elementWidth / 2 ? 0 : elementWidth
	const y = clickY > elementHeight / 2 ? 0 : elementHeight
	return Math.hypot(x - clickX, y - clickY)
}