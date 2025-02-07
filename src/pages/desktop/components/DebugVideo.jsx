import { useRef, useEffect } from "react";
import { socket } from "../../../providers/Desktop";

export default function DebugVideo() {
  const videoFeed = useRef(null);

  useEffect(() => {
    if (!socket) return;

    const updateFrame = (data) => {
      if (videoFeed.current) {
        videoFeed.current.src = `data:image/jpeg;base64,${data}`;
      }
    };

    socket.on("monitoring_result_frame", updateFrame);

    return () => {
      socket.off("monitoring_result_frame", updateFrame);
    };
  }, []);

  return <img ref={videoFeed} className="max-w-full max-h-full " alt="Debug Video Feed" />;
}
