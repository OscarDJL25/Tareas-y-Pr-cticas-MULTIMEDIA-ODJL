// Estado global siguiendo el diagrama: PA (Profesor) -> PP (Enseñame comus)
let conversationState = {
  level: 0,       // 0: Raíz, 1: Mod/Demod, 2: AM/FM
  context: null   // 'Modulacion' o 'Demodulacion'
};

function processTranscript(transcript) {
  const outputArea = document.getElementById('output-area');
  let response = "";

  // 1. Lógica Global (Salir o Volver)
  if (transcript.includes('salir') || transcript.includes('terminar')) {
    // Reset total del estado
    conversationState.level = 0;
    conversationState.context = null;
    response = "Sesión finalizada. Di 'Profesor' si necesitas ayuda de nuevo.";
  } 
  else if (transcript.includes('volver') || transcript.includes('atrás')) {
    goBack();
    response = "Regresando. " + getGreetingByLevel();
  } 
  else {
    // 2. Máquina de Estados (Niveles)
    switch (conversationState.level) {
      case 0:
        if (transcript.includes('profesor') || transcript.includes('enseñame')) {
          conversationState.level = 1;
          response = "¡Hola! Soy tu profesor de Comunicaciónes Digitales. ¿Qué quieres aprender: Demodulación o Modulación?";
        } else {
          response = "Di 'Profesor' para comenzar la lección.";
        }
        break;

      case 1:
        // Priorizamos "demodulación" por ser la palabra más larga
        if (transcript.includes('demodulación')) {
          conversationState.context = 'Demodulación';
          conversationState.level = 2;
          response = "Elegiste Demodulación. ¿Quieres ver AM o FM?";
        } else if (transcript.includes('modulación')) {
          conversationState.context = 'Modulación';
          conversationState.level = 2;
          response = "Elegiste Modulación. ¿Quieres ver AM o FM?";
        } else {
          response = "Por favor, elige entre 'Modulación' o 'Demodulación'.";
        }
        break;

      case 2:
        if (transcript.includes('am')) {
          response = `Explicación de AM en ${conversationState.context}: La amplitud varía proporcional a la señal. ¿Deseas volver, salir o ver FM?`;
        } else if (transcript.includes('fm')) {
          response = `Explicación de FM en ${conversationState.context}: La frecuencia varía proporcional a la señal. ¿Deseas volver, salir o ver AM?`;
        } else {
          response = `En ${conversationState.context} solo puedo explicarte AM o FM.`;
        }
        break;
    }
  }

  // Actualizar UI y Voz
  if (outputArea) {
    outputArea.innerHTML = `<strong>Nivel ${conversationState.level} (${conversationState.context || 'Inicio'}):</strong> <br> ${response}`;
  }
  speak(response);
}
function goBack() {
  if (conversationState.level > 0) {
    conversationState.level--;
    if (conversationState.level === 0) conversationState.context = null;
  }
}

function getGreetingByLevel() {
  if (conversationState.level === 0) return "Di 'Profesor' para iniciar.";
  if (conversationState.level === 1) return "¿Modulación o Demodulación?";
  return `Estamos en ${conversationState.context}. ¿AM o FM?`;
}

// --- Funciones de soporte (Limpias) ---

function listen() {
  const inputArea = document.getElementById('input-area');
  const textValue = inputArea ? inputArea.value.trim() : '';
  
  if (textValue) {
    processTranscript(textValue.toLowerCase());
    inputArea.value = ""; // Limpiar tras procesar
    return;
  }

  if (!('webkitSpeechRecognition' in window)) {
    alert("Navegador no soportado");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-MX';
  recognition.onresult = (e) => processTranscript(e.results[0][0].transcript.toLowerCase());
  recognition.start();
}

function speak(text) {
  if (!text || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); // Detiene audios previos
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-MX';
  window.speechSynthesis.speak(utterance);
}