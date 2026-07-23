import { useEffect, useRef } from "react";

export default function BannerAd() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = "";

    const ins = document.createElement("ins");
    ins.className = "eas6a97888e2";
    ins.setAttribute("data-zoneid", "5984142");

    adRef.current.appendChild(ins);

    window.AdProvider = window.AdProvider || [];
    window.AdProvider.push({
      serve: {},
    });
  }, []);

  return <div ref={adRef}></div>;
}
