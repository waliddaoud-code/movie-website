import { useEffect, useRef } from "react";

export default function NativeAd() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent duplicate loading
    if (!containerRef.current) return;
    if (containerRef.current.childNodes.length > 0) return;

    const script = document.createElement("script");
    script.src =
      "https://wraththreat.com/47c07c4e1d2c3eb3abaa13087179e0d3/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div id="container-47c07c4e1d2c3eb3abaa13087179e0d3" ref={containerRef} />
  );
}
