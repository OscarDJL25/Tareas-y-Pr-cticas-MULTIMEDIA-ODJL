# Práctica: Esquema Conversacional (NUI)

[cite_start]Este proyecto desarrolla una **Interfaz de Usuario Natural (NUI)** basada en voz, diseñada para asistir en el aprendizaje de conceptos de telecomunicaciones como la **Modulación** y **Demodulación**. [cite: 3, 169]

## 🛠️ Características
* [cite_start]**Máquina de Estados Finitos (FSM):** Gestión de navegación por niveles (Raíz, Mod/Demod, AM/FM). [cite: 63, 80, 176]
* [cite_start]**Reconocimiento de Voz:** Implementación de `webkitSpeechRecognition` para procesar comandos en español (es-MX). [cite: 24, 146]
* [cite_start]**Síntesis de Voz (TTS):** El sistema responde por audio utilizando la API de `speechSynthesis`. [cite: 51, 150]
* [cite_start]**Control de Flujo:** Incluye funciones de "volver" y "salir" para un control total de la sesión. [cite: 68, 177]

## 📂 Archivos en esta carpeta
* [cite_start]`index.html`: Interfaz visual con soporte para entrada de texto y botones de control. [cite: 181, 260]
* [cite_start]`script.js`: Lógica de la máquina de estados y procesamiento de audio. [cite: 267]
* [cite_start]`Reporte de Practica.pdf`: Documentación detallada del desarrollo y contexto. [cite: 6]

## 🚀 Uso
1. [cite_start]Abre `index.html` en un navegador basado en Chromium. [cite: 181]
2. [cite_start]Haz clic en **"Escuchar"** y di "Profesor" para iniciar la interacción. [cite: 165, 174]