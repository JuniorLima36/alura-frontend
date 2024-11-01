function playSound(seletorAudio) {
  const element = document.querySelector(seletorAudio);

  if (element && element.localName === 'audio') {
    element.play();
  } else {
    console.log('Elemento não encontrado ou seletor inválido');
  }
}

const keyList = document.querySelectorAll('.key');

for (let count = 0; count < keyList.length; count++) {
  const key = keyList[count];
  const idAudio = `#${key.id.replace("key-", "sound-")}`;

  key.onclick = function () {
    playSound(idAudio);
  }

  key.onkeydown = function (event) {
    if (event.code === 'Space' || event.code === 'Enter') {
      key.classList.add('active')
    }
  }

  key.onkeyup = function () {
    key.classList.remove('active')
  }
}