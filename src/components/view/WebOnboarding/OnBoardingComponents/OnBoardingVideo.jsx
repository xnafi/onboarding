import React from "react";
import Button from "../../../re-ui/Button";

export default function OnBoardingVideo({ handleNext }) {
  return (
    <>
      <div className="flex justify-center my-4 w-full">
        <div className="aspect-[16/9] w-full xl:w-[800px] h-[400px] lg:h-full max-w-[1440px]">
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
      <div className="flex justify-center mt-4">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </>
  );
}
