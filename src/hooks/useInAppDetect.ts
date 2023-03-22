import { useState } from 'react';

const useInAppDetect = () => {
  const [inApp] = useState<'ios' | 'android' | null>(() => {
    const isInApp = (ua: string) => {
      const rules = [
        'WebView',
        '(iPhone|iPod|iPad)(?!.*Safari\\/)',
        'Android.*wv',
        'Android.*Safari\\S+\\s',
        'Zalo',
        'Viber',
        'WhatsApp',
        'SkypeUriPreview',
        'Teams',
      ];
      const regex = new RegExp(`(${rules.join('|')})`, 'ig');
      return !!ua.match(regex);
    };

    if (isInApp(navigator.userAgent)) {
      return navigator.userAgent.match(/iPhone|iPod|iPad/gi)
        ? 'ios'
        : 'android';
    }

    return null;
  });

  return inApp;
};

export default useInAppDetect;
