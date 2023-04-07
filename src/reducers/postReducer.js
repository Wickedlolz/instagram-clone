const postReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_POSTS':
            const { posts } = action.payload;
            return [...posts];
        case 'ADD_POST':
            const { post } = action.payload;
            return [post, ...state];
        default:
            return {
                ...state,
            };
    }
};

export default postReducer;
