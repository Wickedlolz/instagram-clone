import React from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import styled from 'styled-components';

import { HiOutlineHeart } from 'react-icons/hi';
import { FaRegComment, FaRegPaperPlane } from 'react-icons/fa';

const PostItem = ({ post }) => {
    const { user } = useFirebaseContext();

    return (
        <Post>
            <PostHeader>
                <PostAvatar
                    src={
                        post?.ownerPhoto ||
                        'https://www.w3schools.com/w3images/avatar2.png'
                    }
                />
                <PostUsername
                    to={
                        user.email === post.owner
                            ? '/profile'
                            : `/profile/${post.id}`
                    }
                >
                    {post?.owner}
                </PostUsername>
            </PostHeader>
            <PostImage
                src={post?.imageUrl}
                loading="lazy"
                alt={post?.caption}
            />
            <PostFooter>
                <PostFooterLeft>
                    <HiOutlineHeart fontSize={30} />
                    <FaRegComment fontSize={24} />
                    <FaRegPaperPlane fontSize={24} />
                </PostFooterLeft>
                <PostLikes>{post?.likes} likes</PostLikes>
                <PostCaption>{post?.caption}</PostCaption>
                <PostCaption>{post?.createdAt || 'No Date'}</PostCaption>
            </PostFooter>
        </Post>
    );
};

export default PostItem;

const Post = styled.div`
    margin-top: 15px;
    border: 1px solid var(--clr-primary-light-gray);
    border-radius: 3px;
    background-color: var(--clr-primary-white);
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

const PostUsername = styled(Link)`
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    text-decoration: none;
    color: inherit;
`;

const PostImage = styled.img`
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: center center;
`;

const PostFooter = styled.div`
    padding: 16px;
`;

const PostFooterLeft = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
    gap: 10px;
`;

const PostLikes = styled.p`
    font-size: 18px;
    font-weight: bold;
    vertical-align: middle;
    margin: 9px 8px 0 7px;
`;

const PostCaption = styled.p`
    font-size: 14px;
    margin: 10px 0 0 0;
`;
