
import { useEffect, useRef } from "react";

export function useAdsterraBanner({ key, width, height, format = "iframe" }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!bannerRef.current) return;

    window.atOptions = {
      key,
      format,
      height,
      width,
      params: {},
    };

    const script = document.createElement("script");
    script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
    script.async = true;

    bannerRef.current.appendChild(script);

    return () => {
      if (bannerRef.current) {
        bannerRef.current.innerHTML = "";
      }
    };
  }, [key, width, height, format]);

  return bannerRef;
}
