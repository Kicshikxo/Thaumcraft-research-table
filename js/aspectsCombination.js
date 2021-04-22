var firstCombineAspect = null
var secondCombineAspect = null

var firstAspectToCombineBlock = query('#first-aspect-to-combine')
var secondAspectToCombineBlock = query('#second-aspect-to-combine')

var aspectsCombineButton = query('#aspects-combine-button')

$('.aspect').click(function(){
	if (isShiftPressed)
		$(this).contextmenu()
	else 
		addAspectForCombine(this.dataset.title.toLowerCase())
})

$('.aspect').contextmenu(function(){
	thisAspectName = this.dataset.title.toLowerCase()
	if (!aspectsQuantity[thisAspectName].isInfinite){
		firstCombineAspect = aspects[thisAspectName][0]
		secondCombineAspect = aspects[thisAspectName][1]
		combineAspects()
	}
})

function decreaseAspect(aspectName){
	if (aspectsQuantity[aspectName].isInfinite) return
	aspectsQuantity[aspectName].quantity = Math.min(Math.max(0, aspectsQuantity[aspectName].quantity - 1), 99999)
	checkAspects()
	setAspectsQuantity(aspectsQuantity)
}

function increaseAspect(aspectName){
	if (aspectsQuantity[aspectName].isInfinite) return
	if (aspectsQuantity[aspectName].opened){
		aspectsQuantity[aspectName].quantity = Math.min(Math.max(0, aspectsQuantity[aspectName].quantity + 1), 99999)
	}
	else {
		aspectsQuantity[aspectName].opened = true
		aspectsQuantity[aspectName].quantity = Math.min(Math.max(0, aspectsQuantity[aspectName].quantity + 3), 99999)
	}
	checkAspects()
	changePage(currentPage, false)
	setAspectsQuantity(aspectsQuantity)
}

function combineAspects(){
	if ((aspectsQuantity[firstCombineAspect].isInfinite  || aspectsQuantity[firstCombineAspect].quantity  > 0) && 
		(aspectsQuantity[secondCombineAspect].isInfinite || aspectsQuantity[secondCombineAspect].quantity > 0)){

		hhonSound.playIncludingVolume(soundVolume)

		decreaseAspect(firstCombineAspect)
		decreaseAspect(secondCombineAspect)
		checkAspectsToCombine()

		for (aspect in aspects){
			if (aspects[aspect][0] == firstCombineAspect && aspects[aspect][1] == secondCombineAspect ||
				aspects[aspect][1] == firstCombineAspect && aspects[aspect][0] == secondCombineAspect) {
				orbSound.playIncludingVolume(soundVolume)
				increaseAspect(aspect)
				checkForUnknownAspects()
				if (!mainBlock.classList.contains('research-completed')) reset()
				return 
			}
		}
	}
}

function checkAspectsToCombine(){
	firstAspectToCombineBlock.className = 'aspect-to-combine'
	if (firstCombineAspect){
		firstAspectToCombineBlock.addClassIfNotContains(firstCombineAspect)
		if (query(`.aspect.${firstCombineAspect}`).classList.contains('not-enough'))
			firstAspectToCombineBlock.addClassIfNotContains('not-enough')
	}
			
	secondAspectToCombineBlock.className = 'aspect-to-combine'	
	if (secondCombineAspect){
		secondAspectToCombineBlock.addClassIfNotContains(secondCombineAspect)
		if (query(`.aspect.${secondCombineAspect}`).classList.contains('not-enough'))
			secondAspectToCombineBlock.addClassIfNotContains('not-enough')
	}

	if (firstCombineAspect && secondCombineAspect)
		aspectsCombineButton.removeClassIfContains('hidden')
	else 
		aspectsCombineButton.addClassIfNotContains('hidden')
}

function cleanAspectForCombine(combineAspectNumber){

	if (combineAspectNumber == 1 && firstCombineAspect == null) return 
	if (combineAspectNumber == 2 && secondCombineAspect == null) return 
		
	(combineAspectNumber == 1) ? firstCombineAspect = null : secondCombineAspect = null
	hhoffSound.playIncludingVolume(soundVolume)
	checkAspectsToCombine()
}

function addAspectForCombine(aspect){
	if (!firstCombineAspect || !secondCombineAspect){
		if (!firstCombineAspect) firstCombineAspect = aspect
		else if (!secondCombineAspect) secondCombineAspect = aspect
		hhonSound.playIncludingVolume(soundVolume)
		checkAspectsToCombine()
	}
	else return
}