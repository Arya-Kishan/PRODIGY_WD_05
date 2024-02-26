import React, { useEffect, useRef } from 'react'
import "./Speech.scss"
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import mic from '../../assets/mic.png'
import listenGif from "../../assets/listen.gif"

export default function Speech({ fetchData, input }) {

    const { transcript, browserSupportsSpeechRecognition, finalTranscript, listening } = useSpeechRecognition();
    const ref = useRef()

    const startListening1 = () => {

        SpeechRecognition.startListening({
            continuous: false,
            language: 'en-GB',
        })

        ref.current.style.display = "flex"
    };


    if (!browserSupportsSpeechRecognition) {
        return null
    }

    if (transcript.length > 0) {
        input.current.value = transcript;
        input.current.focus();
    }


    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
            fetchData(finalTranscript)
            ref.current.style.display = "none"
        }


    }, [finalTranscript]);

    return (
        <>
            <div className='speech'>
                <img onClick={startListening1} src={mic} alt="" srcSet="" />
            </div>
            <img className='listenGirl' ref={ref} src={listenGif} alt="" srcSet="" />
        </>
    )
}
