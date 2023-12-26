import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { mediaWidth } from '~lib/styles/Theme/media';
import { isClient } from '~utils/lodash/isServer';

export type MediaQueryStatus = 'mobile' | 'tablet' | 'desktop';

export default function useMedia() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [status, setStatus] = useState<MediaQueryStatus>();
  const [isReady, setIsReady] = useState(false);

  const mobile = useMediaQuery({ query: mediaWidth.mobile });
  const tablet = useMediaQuery({ query: mediaWidth.tablet });
  const desktop = useMediaQuery({ query: mediaWidth.pc });

  useEffect(() => {
    if (isClient) {
      setIsReady(true);
      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);

      if (mobile) {
        setStatus('mobile');

        return;
      }

      if (tablet) {
        setStatus('tablet');

        return;
      }

      setStatus('desktop');
    }
  }, [mobile, tablet, desktop]);

  return { isMobile, isTablet, isDesktop, status, isReady };
}
