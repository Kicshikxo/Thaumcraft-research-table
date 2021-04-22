 function getCompletedResearches(){
	if (!localStorage.getItem('completedResearches')){
		completedResearchesJSON = '{'
		for (let category in researches){
			for (let research in researches[category]){
				if (research == 'categoryTitle') continue
				completedResearchesJSON += `"${research}":false,`
			}
		}
		completedResearchesJSON = completedResearchesJSON.slice(0, -1) + '}'
		localStorage.setItem('completedResearches', completedResearchesJSON)
	}
	return JSON.parse(localStorage.getItem('completedResearches'))
}

function setCompletedResearches(completedResearches){
	localStorage.setItem('completedResearches', JSON.stringify(completedResearches))
}

function getAspectsQuantity(){
	if (!localStorage.getItem('aspectsQuantity')){
		localStorage.setItem('aspectsQuantity', '{"aer":{"quantity":0,"isInfinite":true,"opened":true},"alienis":{"quantity":0,"opened":false},"aqua":{"quantity":0,"isInfinite":true,"opened":true},"arbor":{"quantity":0,"opened":false},"auram":{"quantity":0,"opened":false},"bestia":{"quantity":0,"opened":false},"cognitio":{"quantity":0,"opened":false},"corpus":{"quantity":0,"opened":false},"exanimis":{"quantity":0,"opened":false},"fabrico":{"quantity":0,"opened":false},"fames":{"quantity":0,"opened":false},"gelum":{"quantity":0,"opened":false},"herba":{"quantity":0,"opened":false},"humanus":{"quantity":0,"opened":false},"ignis":{"quantity":0,"isInfinite":true,"opened":true},"instrumentum":{"quantity":0,"opened":false},"iter":{"quantity":0,"opened":false},"limus":{"quantity":0,"opened":false},"lucrum":{"quantity":0,"opened":false},"lux":{"quantity":0,"opened":false},"machina":{"quantity":0,"opened":false},"messis":{"quantity":0,"opened":false},"metallum":{"quantity":0,"opened":false},"meto":{"quantity":0,"opened":false},"mortuus":{"quantity":0,"opened":false},"motus":{"quantity":0,"opened":false},"ordo":{"quantity":0,"isInfinite":true,"opened":true},"pannus":{"quantity":0,"opened":false},"perditio":{"quantity":0,"isInfinite":true,"opened":true},"perfodio":{"quantity":0,"opened":false},"permutatio":{"quantity":0,"opened":false},"potentia":{"quantity":0,"opened":false},"praecantatio":{"quantity":0,"opened":false},"sano":{"quantity":0,"opened":false},"sensus":{"quantity":0,"opened":false},"spiritus":{"quantity":0,"opened":false},"telum":{"quantity":0,"opened":false},"tempestas":{"quantity":0,"opened":false},"tenebrae":{"quantity":0,"opened":false},"terra":{"quantity":0,"isInfinite":true,"opened":true},"tutamen":{"quantity":0,"opened":false},"vacuos":{"quantity":0,"opened":false},"venenum":{"quantity":0,"opened":false},"victus":{"quantity":0,"opened":false},"vinculum":{"quantity":0,"opened":false},"vitium":{"quantity":0,"opened":false},"vitreus":{"quantity":0,"opened":false},"volatus":{"quantity":0,"opened":false}}')
	}
	return JSON.parse(localStorage.getItem('aspectsQuantity'))
}

function setAspectsQuantity(aspectsQuantity){
	localStorage.setItem('aspectsQuantity', JSON.stringify(aspectsQuantity))
}
