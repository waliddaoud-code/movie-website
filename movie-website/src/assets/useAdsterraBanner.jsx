import { useEffect, useRef } from "react";

export default function AdsterraBanner({
  adKey,
  width,
  height,
  format = "iframe",
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    window.atOptions = {
      key: adKey,
      format,
      width,
      height,
      params: {},
    };

    const script = document.createElement("script");
    script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = true;

    ref.current.appendChild(script);

    return () => {
      ref.current.innerHTML = "";
    };
  }, [adKey, width, height, format]);

  return <div ref={ref} style={{ width, height, margin: "20px auto" }} />;
}
