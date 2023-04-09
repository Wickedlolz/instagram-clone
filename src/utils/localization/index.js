import en from './en.json';

export const loadLocalization = (lang) => {
    switch (lang) {
        case 'en':
            return en;
        // case 'bg':
        //     return bg;
        default:
            return en;
    }
};
