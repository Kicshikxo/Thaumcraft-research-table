query = (query) => document.querySelector(query)
queryAll = (query) => document.querySelectorAll(query)
String.prototype.in = function(arr){return arr.indexOf(this.toString()) != -1}
function randInt(min, max){return ~~((Math.random() * (max - min + 1)) + min)}
function getHex(x, y){return query(`.cell[data-x="${parseInt(x)}"][data-y="${parseInt(y)}"]`)}
function getAspectFromHex(hex){return hex.children[0].children[0]}

completedResearches = getCompletedResearches()
aspectsQuantity = getAspectsQuantity()

mainBlock = query('#main-block')
researchesMenu = query('#researches-menu')
researchNote = query('#research-note')
previousPageButton = query('#previous-page-button')
nextPageButton = query('#next-page-button')

HTMLElement.prototype.removeClassIfContains = function(className){
	if (this.classList.contains(className))
		this.classList.remove(className)
}

HTMLElement.prototype.addClassIfNotContains = function(className){
	if (!this.classList.contains(className))
		this.classList.add(className)
}

function checkAspects(){
	for (aspect in aspectsQuantity){
		thisAspect = query(`#aspects-block .aspect.${aspect}`)
		if (aspectsQuantity[aspect].opened) {

			thisAspectQuantity = query(`#aspects-block .aspect.${aspect} .aspect-quantity`)

			thisAspect.addClassIfNotContains('opened')

			if (aspectsQuantity[aspect].isInfinite){
				thisAspectQuantity.innerHTML = ''
			}
			else if (aspectsQuantity[aspect].quantity == 0){
				thisAspectQuantity.innerHTML = ''
				thisAspect.addClassIfNotContains('not-enough')
			}
			else {
				thisAspectQuantity.innerHTML = aspectsQuantity[aspect].quantity
				thisAspect.removeClassIfContains('not-enough')
			}
		}
		else thisAspect.removeClassIfContains('opened')
	}
}

checkAspects()

function fillResearchesMenu(){
	researchesMenu.innerHTML = ''
	for (category in researches){
		researchesText = ''
		for (research in researches[category]){
			if (researches[category][research].field){
				researchesText += `
				<div class = 'category-item' data-research-category = '${category}' data-research-name = '${research}'>
	 				<div class = 'category-item-icon'></div>
	 				<div class = 'category-item-title'>${researches[category][research].title}</div>
	 			</div>`
			}
		}
		researchesMenu.innerHTML += `<div class="category"><div class = 'category-title' data-category-title = '${category}'><div class = 'category-title-image'></div>${researches[category].categoryTitle}</div>${researchesText}</div>`
	}
	$('.category-item').click(function(){
		openResearch(this.dataset.researchCategory, this.dataset.researchName)
	})
	checkCompletedResearches()
}

fillResearchesMenu()

function checkCompletedResearches() {
	for (researchName in completedResearches){
		if (completedResearches[researchName] == true)
			query(`.category-item[data-research-name="${researchName}"]`).addClassIfNotContains('completed')
		else if (completedResearches[researchName] == false)
			query(`.category-item[data-research-name="${researchName}"]`).removeClassIfContains('completed')
	}
}

function openResearch(category, name){
	researchNote.dataset.researchCategory = category
	researchNote.dataset.researchName = name
	createField(researches[category][name])
	toggleResearchesMenu()
	reset()
}

function toggleResearchesMenu(){
	if (researchesMenu.style.display == 'none'){
		openSound.playIncludingVolume(soundVolume)
		$(researchesMenu).fadeIn()
		$(mainBlock).fadeOut()
	}
	else {
		closeSound.playIncludingVolume(soundVolume)
		$(researchesMenu).fadeOut()
		$(mainBlock).fadeIn()
	}
}

currentPage = 0

function changePage(page, withSound = true){
	$(`#aspects-block .aspect.opened`).css({display:'none'})
	for (let aspect of $(`#aspects-block .aspect.opened`).slice(page * 5, page * 5 + 25)){
		aspect.style.display = 'flex'
	}

	if (withSound) changePageSound.playIncludingVolume(soundVolume)

	if (page == 0) 
		previousPageButton.style.display = 'none'
	else 
		previousPageButton.style.display = 'block'

	if (page >= Math.ceil(queryAll("#aspects-block .opened").length/5-5)) 
		nextPageButton.style.display = 'none'
	else 
		nextPageButton.style.display = 'block'
}

function previousPage(){
	(currentPage > 0) ? changePage(--currentPage) : null 
}

function nextPage(){
	(currentPage < Math.ceil(queryAll("#aspects-block .aspect.opened").length/5-5)) ? changePage(++currentPage) : null
}

changePage(currentPage, false)

query('#aspects-block').onmousewheel = function(e){
		 if (e.deltaY > 0) nextPageButton.click()
	else if (e.deltaY < 0) previousPageButton.click()
}

evenAround = [
	{x: 0, y:-1},
	{x: 1, y:-1},
	{x: 1, y: 0},
	{x: 0, y: 1},
	{x:-1, y: 0},
	{x:-1, y:-1}
]

oddAround = [
	{x: 0, y:-1},
	{x: 1, y: 0},
	{x: 1, y: 1},
	{x: 0, y: 1},
	{x:-1, y: 1},
	{x:-1, y: 0}
]

$('.aspect').draggable(
	{
		cursorAt: {left: 47/2, top: 47/2},
		scroll: false,
		distance: 5,
		revert: function(){
			let element = query('.hex.collided:not(.with-aspect)')
			if (element && !mainBlock.classList.contains('research-completed')){

				element.removeClassIfContains('collided')
				element.addClassIfNotContains('with-aspect')

				let aspect = $(`<div class="${this[0].className}"></div>`)
				aspect[0].style.left = Math.round(this[0].helper[0].getBoundingClientRect().left) - element.getBoundingClientRect().left
				aspect[0].style.top  = Math.round(this[0].helper[0].getBoundingClientRect().top)  - element.getBoundingClientRect().top

				$(element.children[0]).append(aspect)

				aspectName = this[0].className.split(' ')[1]

				let x = element.dataset.x
				let y = element.dataset.y

				field[y][x].aspectNumber = aspectsList.indexOf(aspectName)

				decreaseAspect(aspectName)

				aspect.animate({
					left: 0,
					top:  0
				}, 200, 'linear', reset)

				hhonSound.playIncludingVolume(soundVolume)

				playWriteSound()

				return false
			}

			return true
		},
		helper: function(){
			helper = $(`<div class="${this.className}"></div>`);
			this.helper = helper
		    return helper;
		},
		start: function(){
			if (this.classList.contains('not-enough')) {
				return false
			}
			hhoffSound.playIncludingVolume(soundVolume)
		},
		revertDuration: 200,
		containment: '.main-block'
	}
)

function reset(){
	for (let y = 0; y < field.length; y++){
		for (let x = 0; x < field[y].length; x++){
			if (!field[y][x].alwaysActive) field[y][x].active = false
		}
	}
	check()
	checkForWin()
}

function check(){
	let needToCheckAgain = false
	for (y = 0; y < field.length; y++){
		for (x = 0; x < field[y].length; x++){

			let thisHex = getHex(x, y)

			if (!thisHex.classList.contains('hex')) continue

			for (i = 0; i < 6; i++) thisHex.removeClassIfContains(`connect-${i}`)

			if ((checkableAspectNumber = field[y][x].aspectNumber) == null) continue

			checkableAspectName = aspectsList[checkableAspectNumber]

			isActive = false;

			pointsAround = (x % 2 == 0) ? evenAround : oddAround

			for (pointAround of pointsAround){

				let offsetX = x + pointAround.x
				let offsetY = y + pointAround.y

				if (offsetX < 0 || offsetX > 8 || 
					offsetY < 0 || offsetY > 8) continue

				if ((neighboringAspectNumber = field[offsetY][offsetX].aspectNumber) == null) continue

				if (!field[offsetY][offsetX].active) continue

				if (getHex(offsetX, offsetY).classList.contains('unknown')) continue

				neighboringAspectName = aspectsList[neighboringAspectNumber]

				if (isAspectsCompatible(checkableAspectName, neighboringAspectName)) {
					thisHex.addClassIfNotContains(`connect-${pointsAround.indexOf(pointAround)}`)
					isActive = true
				}
			}

			if (!field[y][x].alwaysActive){
				if (isActive) {
					thisHex.removeClassIfContains('inactive')

					if (!field[y][x].active) 
						needToCheckAgain = true

					field[y][x].active = true
				}
				else {
					thisHex.addClassIfNotContains('inactive')

					if (field[y][x].active) 
						needToCheckAgain = true

					field[y][x].active = false
				}
			}
		}
	}
	if (needToCheckAgain) return check()
}

function isAspectsCompatible(firstAspectName, secondAspectName){
	return (firstAspectName.in(aspects[secondAspectName]) ||
		   secondAspectName.in(aspects[firstAspectName]))
}

function checkConnections(x, y){
	let connectedWith = []
	let checkedNodes  = []
	function continueChain(x, y){
		pointsAround = (x % 2 == 0) ? evenAround : oddAround

		checkedNodes.push({x: x, y: y})

		for (pointAround of pointsAround){
			let offsetX = x + pointAround.x
			let offsetY = y + pointAround.y

			if (offsetX < 0 || offsetX > 8 || 
				offsetY < 0 || offsetY > 8) continue

			if (field[offsetY][offsetX].aspectNumber == null) continue

			if (checkedNodes.findIndex(el => el.x == offsetX && el.y == offsetY) != -1) continue

			checkableAspectName   = aspectsList[field[y][x].aspectNumber]
			neighboringAspectName = aspectsList[field[offsetY][offsetX].aspectNumber]

			if (isAspectsCompatible(checkableAspectName, neighboringAspectName)) {
				if (getHex(offsetX, offsetY).classList.contains('always-active')) {
					if (connectedWith.findIndex(el => el.x == offsetX && el.y == offsetY) == -1) 
						connectedWith.push({x: offsetX, y: offsetY})
				}
				continueChain(offsetX, offsetY)
			}
		}
	}
	continueChain(x, y)

	return connectedWith.length
}

function checkForWin(){
	let alwaysActives = queryAll('.always-active')

	if (alwaysActives.length <= 1) return

	completedNodes = 0

	for (i of alwaysActives){
		if (checkConnections(parseInt(i.dataset.x), parseInt(i.dataset.y)) == alwaysActives.length - 1){
			completedNodes++
		}
	}
	if (completedNodes == alwaysActives.length) {
		mainBlock.addClassIfNotContains('research-completed')

		learnSound.playIncludingVolume(soundVolume)

		completedResearches[researchNote.dataset.researchName] = true
		setCompletedResearches(completedResearches)
		checkCompletedResearches()
	}
	else {
		mainBlock.removeClassIfContains('research-completed')
	}
}

function checkForUnknownAspects(){
	for (alwaysActive of queryAll('.always-active')){
		thisAspect = aspectsList[field[alwaysActive.dataset.y][alwaysActive.dataset.x].aspectNumber]
		if (!aspectsQuantity[thisAspect].opened) {
			alwaysActive.addClassIfNotContains('unknown')
			alwaysActive.removeClassIfContains(thisAspect)
		}
		else {
			alwaysActive.removeClassIfContains('unknown')
			alwaysActive.addClassIfNotContains(thisAspect)
		}
	}
}

var field = []

function createField(template){
	field = []
	let fieldTemplate = template.field
	for (y = 0; y < fieldTemplate.length; y++){
		field.push([])
		for (x = 0; x < fieldTemplate[y].length; x++){

			currentHex = getHex(x, y)

			currentHex.className = 'cell'
			currentHex.firstElementChild.innerHTML = ''

			if (fieldTemplate[y][x] == '#'){
				field[y].push({
					active: false,
					aspectNumber: null,
					hex: true
				})
				currentHex.addClassIfNotContains('hex')
			}
			else if (parseInt(fieldTemplate[y][x]) >= 0){
				field[y].push({
					active: true,
					alwaysActive: true,
					aspectNumber: parseInt(fieldTemplate[y][x]),
					hex: false
				})
				currentHex.addClassIfNotContains('always-active')
				currentHex.addClassIfNotContains(aspectsList[field[y][x].aspectNumber])
			}
			else field[y].push({
				active: false,
				aspectNumber: null,
				hex: false
			})
		}
	}

	for (i = 0; i < ((template.fieldSize == 1) ? 0 : (template.fieldSize == 2) ? 4 : 6); i++){
		let x = randInt(0, 8)
		let y = randInt(0, 8)
		if (field[y][x].hex && !getHex(x, y).classList.contains('always-active')){
			field[y][x].hex = false
			getHex(x, y).removeClassIfContains('hex')
		}
		else i--
	}

	for (i = 0; i < randInt(10, 12); i++){
		hex = getHex(randInt(0, 8), randInt(0, 8))
		if (!hex.classList.contains('hex') && !hex.classList.contains('always-active') && !hex.classList.contains('script')){
			hex.addClassIfNotContains('script')
			hex.addClassIfNotContains(`script-${randInt(1, 16)}`)
		}
		else i--
	}
	mainBlock.removeClassIfContains('research-completed')
	checkForUnknownAspects()
}

$('.cell').on('click', function(){
	if (this.classList.contains('hex') && this.classList.contains('with-aspect') && !mainBlock.classList.contains('research-completed')){
		getAspectFromHex(this).addClassIfNotContains('remove')

		field[this.dataset.y][this.dataset.x].aspectNumber = null
		field[this.dataset.y][this.dataset.x].active = false

		this.removeClassIfContains('with-aspect')
		this.removeClassIfContains('full-active')

		reset()

		eraseSound.playIncludingVolume(soundVolume)
		hhonSound.playIncludingVolume(soundVolume)

		this.onanimationend = function(){
			this.children[0].innerHTML = ''
			this.removeClassIfContains('inactive')
		}.bind(this)
	}
})

$('.aspect-drop').droppable({
	accept: '.aspect',
	over: function() {
		if (this.parentElement.classList.contains('hex'))
       		this.parentElement.addClassIfNotContains('collided')
    },
    out: function() {
    	if (this.parentElement.classList.contains('hex'))
        	this.parentElement.removeClassIfContains('collided')
    }
})

isShiftPressed = false

window.onkeydown = function(e){
	if (e.keyCode == 16) isShiftPressed = true
	if (e.keyCode == 27 && !(researchesMenu.style.display == 'none')) toggleResearchesMenu()
}

window.onkeyup = function(e){
	if (e.keyCode == 16) isShiftPressed = false
}

window.onload = function(){
	initialSound.playIncludingVolume(soundVolume/3)
	query('#preloader').addClassIfNotContains('hidden')
}

window.oncontextmenu = function(){
	return false
}
