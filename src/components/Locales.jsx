import { useEffect, useState, useCallback } from 'react';
import { IntlProvider } from 'react-intl';

// import useConfig from 'hooks/useConfig';

const Locales = ({ children }) => {
    // const { i18n } = useConfig();

    const [messages, setMessages] = useState();

    useEffect(() => {
        loadLocaleData(navigator.language).then((d) => {
            setMessages(d.default);
        });
    }, []);

    const loadLocaleData = useCallback((locale) => {
        switch (locale) {
            case 'bg-BG':
            case 'en-US':
            default:
                return import('../utils/localization/en.json');
        }
    }, []);

    return (
        <>
            {messages && (
                <IntlProvider
                    locale={navigator.language}
                    defaultLocale="en-US"
                    messages={messages}
                >
                    {children}
                </IntlProvider>
            )}
        </>
    );
};

export default Locales;
