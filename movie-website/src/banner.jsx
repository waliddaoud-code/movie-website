import { useEffect } from "react";

export default function BannerAd() {
  useEffect(() => {
    // Prevent loading the script multiple times
    if (!document.querySelector('script[src="https://a.magsrv.com/ad-provider.js"]')) {
      const script = document.createElement("script");
      script.src = "https://a.magsrv.com/ad-provider.js";
      script.async = true;
      script.type = "application/javascript";
      document.body.appendChild(script);

      script.onload = () => {
        if (window.AdProvider) {
          window.AdProvider.push({
            serve: {},
          });
        }
      };
    } else {
      if (window.AdProvider) {
        window.AdProvider.push({
          serve: {},
        });
      }
    }
  }, []);

  return (
    <ins
      className="eas6a97888e2"
      data-zoneid="5984112"
    ></ins>
  );
}
