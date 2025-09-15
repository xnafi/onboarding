import React from 'react'
import Button from '../../../re-ui/Button'

export default function OnBoardingVideo() {
  return (
          <div className="flex justify-center my-4 w-full">
        <div className="w-full lg:min-w-4xl aspect-[16/9] h-[400px] lg:h-full">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/Io0fBr1XBUA?list=RDIo0fBr1XBUA"
            title="The Chainsmokers - Don't Let Me Down (Official Video) ft. Daya"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
  )
}
