import ReactPlayer from "react-player";
import Button from "../../../re-ui/Button";

export default function OnBoardingVideo({ handleNext }) {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Video Player */}
      <div className="w-full max-w-[1440px] aspect-[16/9] h-[400px] lg:h-auto xl:w-[890px] my-4">
        <ReactPlayer
          src="https://www.youtube.com/watch?v=Io0fBr1XBUA"
          width="100%"
          height="100%"
          controls={true}

        />
      </div>

      {/* Next Button */}
      <div className="mt-4">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
