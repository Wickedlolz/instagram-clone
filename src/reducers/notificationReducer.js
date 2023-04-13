import { toast } from 'react-hot-toast';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SUCCESS':
            toast.success(action.payload.text);
            return { text: action.payload.text };
        case 'ERROR':
            toast.error(action.payload.text);
            return { text: action.payload.text };
        default:
            return {
                ...state,
            };
    }
};

export default notificationReducer;
