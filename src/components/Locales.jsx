import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

const loadLocaleData = (locale) => {
    switch (locale) {
        case 'bg-BG':
            return import('../utils/localization/bg.json');
        case 'en-US':
            return import('../utils/localization/en.json');
        default:
            return import('../utils/localization/en.json');
    }
};

const Locales = ({ children }) => {
    const [messages, setMessages] = useState();

    useEffect(() => {
        loadLocaleData(navigator.language).then((d) => {
            setMessages(d.default);
        });
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
