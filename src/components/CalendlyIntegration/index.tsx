import { useEffect } from 'react';

export default function CalendlyIntegration() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget min-w-[280px] max-h-auto h-[500px] min-h mobileh:min-w-[320px] tablet:min-w-[500px]"
      data-url="https://calendly.com/debonne-agency/free-pitch-deck-review"
    />
  );
}
