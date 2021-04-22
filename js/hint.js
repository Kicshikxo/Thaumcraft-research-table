hint = query('#hint')
hintTitle = query('#hint #hint-title')
hintDescription = query('#hint #hint-description')

firstDescriptionAspect = query('#first-description-aspect')
secondDescriptionAspect = query('#second-description-aspect')

$('.category-item, #research-note').mouseover(function(e){
	hint.className = 'research-hint'
	hint.style.display = 'block'

	if (this.dataset.researchCategory && this.dataset.researchName){
		hintTitle.innerText = researches[this.dataset.researchCategory][this.dataset.researchName].title
		hintDescription.innerText = researches[this.dataset.researchCategory][this.dataset.researchName].description
	}
	else {
		hintTitle.innerText = 'Ничего не выбрано'
		hintDescription.innerText = ''
	}

	this.onmousemove = function(e){
		hintRect = hint.getBoundingClientRect()
		if (e.pageX + 20 + hintRect.width > 768) 
			hint.style.left = e.pageX - 10 - hintRect.width + 'px'
		else 
			hint.style.left = e.pageX + 20 + 'px'
		hint.style.top  = e.pageY - 40 + 'px'
	}

	this.onmousemove(e)
})

$('#aspects-block .aspect').mouseover(function(e){
	hint.className = 'aspect-hint'
	hint.style.display = 'block'

	hintTitle.innerText = this.dataset.title
	hintDescription.innerText = this.dataset.description

	let aspectName = (this.dataset.title || '').toLowerCase()

	if (aspects[aspectName] && aspects[aspectName][0] && aspects[aspectName][1]) {
		firstDescriptionAspect.addClassIfNotContains(aspects[aspectName][0])
		firstDescriptionAspect.addClassIfNotContains('with-aspect')
		secondDescriptionAspect.addClassIfNotContains(aspects[aspectName][1])
		secondDescriptionAspect.addClassIfNotContains('with-aspect')
	}

	this.onmousemove = function(e){
		hint.style.left = e.pageX + 20 + 'px'
		hint.style.top  = e.pageY - 55 + 'px'
	}

	this.onmousemove(e)
})

$('#thaumonomicon-block').mouseover(function(e){
	hint.style.display = 'block'

	hintTitle.innerText = this.dataset.title
	hintDescription.innerText = ''

	this.onmousemove = function(e){
		hint.style.left = e.pageX + 20 + 'px'
		hint.style.top  = e.pageY - 30 + 'px'
	}

	this.onmousemove(e)
})

$('#aspects-block .aspect, #research-note, .category-item, #thaumonomicon-block').mouseleave(function(){
	hint.style.display = 'none'
	hint.className = ''
	firstDescriptionAspect.className = 'description-aspect'
	secondDescriptionAspect.className = 'description-aspect'
	this.onmousemove = null
}) 
