import React, { useEffect } from 'react'
import "./Speech.scss"
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import mic from '../../assets/mic.png'

export default function Speech({ fetchData, input }) {

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    const startListening1 = () => SpeechRecognition.startListening();


    if (!browserSupportsSpeechRecognition) {
        return null
    }

    if (transcript.length > 0) {
        input.current.value = transcript;
        input.current.focus();
    }

    return (
        <div className='speech'>
            <img onClick={startListening1} src={mic} alt="" srcSet="" />
        </div>
    )
}
