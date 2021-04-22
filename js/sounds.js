HTMLAudioElement.prototype.playIncludingVolume = function(volume){
	this.currentTime = 0
	this.volume = volume
	this.play()
}

hhoffSound      = query('#hhoff-sound')
hhonSound       = query('#hhon-sound')
orbSound        = query('#orb-sound')
eraseSound      = query('#erase-sound')
write1Sound     = query('#write1-sound')
write2Sound     = query('#write2-sound')
learnSound      = query('#learn-sound')
openSound       = query('#open-sound')
closeSound      = query('#close-sound')
changePageSound = query('#change-page-sound')
click1Sound     = query('#click-1-sound')
click2Sound     = query('#click-2-sound')
click3Sound     = query('#click-3-sound')
initialSound    = query('#started-sound') 

soundVolume = .2

function playWriteSound(){
	switch (randInt(1, 2)) {
		case 1:
			write1Sound.playIncludingVolume(soundVolume)
			break
		case 2: 
			write2Sound.playIncludingVolume(soundVolume)
			break
	}
}

function playClickSound(){
	switch (randInt(1, 3)) {
		case 1:
			click1Sound.playIncludingVolume(soundVolume)
			break
		case 2: 
			click2Sound.playIncludingVolume(soundVolume)
			break
		case 3: 
			click3Sound.playIncludingVolume(soundVolume)
			break
	}
}