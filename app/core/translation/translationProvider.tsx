"use client";

import React, { PropsWithChildren } from "react";
import { I18nextProvider } from "react-i18next";
import { createInstance } from "i18next";
import initTranslations from "../../../i18n";

interface TranslationProviderProps {
  resources?: any;
}

// eslint-disable-next-line react/display-name
const TranslationProvider = React.memo<
  PropsWithChildren<TranslationProviderProps>
>(({ children, resources }) => {
  const i18n = createInstance();

  initTranslations(i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
});

export default TranslationProvider;
