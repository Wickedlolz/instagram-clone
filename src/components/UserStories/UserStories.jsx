import React from 'react';
import styled from 'styled-components';

const UserStories = () => {
    const stories = [
        {
            id: 1,
            name: 'John Doe',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 2,
            name: 'Jane Doe',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 3,
            name: 'Alice',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 4,
            name: 'Bob',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 5,
            name: 'Charlie',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 6,
            name: 'Dave',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 7,
            name: 'Eve',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 8,
            name: 'Frank',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 9,
            name: 'Grace',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 10,
            name: 'Harry',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 11,
            name: 'Isabella',
            image: 'https://via.placeholder.com/60x60',
        },
        {
            id: 12,
            name: 'Jack',
            image: 'https://via.placeholder.com/60x60',
        },
        // Add more stories here...
    ];

    return (
        <StoriesContainer>
            {stories.map((story) => (
                <Story key={story.id}>
                    <StoryImage src={story.image} />
                    <StoryName>{story.name}</StoryName>
                </Story>
            ))}
        </StoriesContainer>
    );
};

export default UserStories;

const StoriesContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    overflow-x: auto;
    -ms-overflow-style: none; /* hide scrollbar on IE and Edge */
    // hide scrollbar on Firefox
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none; /* hide scrollbar on Chrome, Safari, and Opera */
    }
`;

const Story = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 16px;
    flex-shrink: 0;
`;

const StoryImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 8px;
`;

const StoryName = styled.span`
    font-size: 12px;
`;
