import React from 'react';
import styled from 'styled-components';

const PostItem = () => {
    return (
        <Post>
            <PostHeader>
                <PostAvatar src="https://www.w3schools.com/w3images/avatar2.png" />
                <PostUsername>username</PostUsername>
            </PostHeader>
            <PostImage src="https://www.w3schools.com/w3images/nature.jpg" />
            <PostFooter>
                <PostFooterLeft>
                    <img
                        src="https://www.w3schools.com/w3images/heart.png"
                        alt="like"
                    />
                    <PostLikes>10 likes</PostLikes>
                </PostFooterLeft>
                <PostCaption>This is a caption for the post.</PostCaption>
            </PostFooter>
        </Post>
    );
};

export default PostItem;

const Post = styled.div`
    /* margin: 20px 0; */
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    background-color: #fff;
    max-width: 600px;

    &:not(:first-of-type) {
        margin: 20px 0;
    }
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
`;

const PostAvatar = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 16px;
`;

const PostUsername = styled.h4`
    font-size: 14px;
    font-weight: 600;
    margin: 0;
`;

const PostImage = styled.img`
    width: 100%;
`;

const PostFooter = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
`;

const PostFooterLeft = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
`;

const PostLikes = styled.p`
    font-size: 14px;
    margin: 0 8px 0 0;
`;

const PostCaption = styled.p`
    font-size: 14px;
    margin: 0;
`;
