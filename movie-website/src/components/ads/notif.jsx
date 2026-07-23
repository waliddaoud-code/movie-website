import { useEffect, useRef } from "react";

export default function Notif() {
  const adRef = useRef(null);

  useEffect(() => {
    if (!adRef.current) return;

    adRef.current.innerHTML = "";

    const ins = document.createElement("ins");
    ins.className = "eas6a97888e42";
    ins.setAttribute("data-zoneid", "5984164");

    adRef.current.appendChild(ins);

    window.AdProvider = window.AdProvider || [];
    window.AdProvider.push({
      serve: {},
    });
  }, []);

  return <div ref={adRef}></div>;
}
