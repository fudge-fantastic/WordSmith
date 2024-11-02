import { useEffect } from "react";

const AdsBanner = () => {
  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error: ", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5038091624857202"
      data-ad-slot="4334451588"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdsBanner;
