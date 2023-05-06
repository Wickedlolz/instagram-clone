import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase-config';
import { getDocs, collection } from 'firebase/firestore';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { useNotificationContext } from '../contexts/NotificationContext';
import styled from 'styled-components';

import Loader from '../components/Loader';

const UserProfile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [following, setFollowing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const { user, logOut } = useFirebaseContext();
    const { notifySuccess, notifyError } = useNotificationContext();
    const [isLoading, setIsLoading] = useState(true);
    const postsCollectionRef = collection(db, 'posts');

    useEffect(() => {
        const getMyPosts = async () => {
            setIsLoading(true);
            try {
                const data = await getDocs(postsCollectionRef);
                const filteredPosts = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                const myPosts = filteredPosts.filter(
                    (post) => post.owner === user.email
                );

                setUserPosts(myPosts);
            } catch (error) {
                console.log(error);
                notifyError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        getMyPosts();
    }, []);

    /**
     * Returns the capitalized initials of the email address provided.
     *
     * @param {string} email - The email address to extract initials from.
     * @returns {string} The capitalized initials of the email address.
     */
    const makeInitials = useCallback((email) => {
        const parts = email.split('@');
        const initials = parts[0].charAt(0).toLocaleUpperCase();
        return initials;
    }, []);

    /**
     * Handle the logout button click event.
     *
     * This function will call the log out function. If successful, the user will be
     * navigated to the home page. If an error occurs, an error notification will be
     * displayed.
     */
    const handleLogoutClick = () => {
        logOut()
            .then(() => {
                navigate('/', { replace: true });
            })
            .catch((error) => notifyError(error));
    };

    const handleFollowClick = () => {
        setFollowing((state) => !state);
        if (following) {
            notifySuccess('Successfully unfollow this person!');
        } else {
            notifySuccess('Successfully follow this person!');
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handlePreviewClose = () => {
        setSelectedImage(null);
    };

    if (isLoading) {
        return (
            <Container>
                <Loader />
            </Container>
        );
    }

    return (
        <Container>
            {user?.photoURL ? (
                <ProfilePicture src={user?.photoURL} />
            ) : (
                <InitialsAvatar>{makeInitials(user.email)}</InitialsAvatar>
            )}

            <Username>{user?.displayName}</Username>
            <Bio>{user.email}</Bio>
            <Stats>
                <Stat>
                    <Number>10</Number>
                    <Label>Posts</Label>
                </Stat>
                <Stat>
                    <Number>500</Number>
                    <Label>Followers</Label>
                </Stat>
                <Stat>
                    <Number>200</Number>
                    <Label>Following</Label>
                </Stat>
            </Stats>
            <ButtonWrapper>
                <Button following={following} onClick={handleFollowClick}>
                    {following ? 'Following' : 'Follow'}
                </Button>
                <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
            </ButtonWrapper>

            <Gallery>
                {userPosts?.map((post) => (
                    <Image
                        key={post.id}
                        src={post.imageUrl}
                        alt={post.caption}
                        onClick={() => handleImageClick(post.imageUrl)}
                    />
                ))}
            </Gallery>
            {selectedImage && (
                <PreviewOverlay onClick={handlePreviewClose}>
                    <PreviewImage src={selectedImage} />
                </PreviewOverlay>
            )}
        </Container>
    );
};

export default UserProfile;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfilePicture = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 50px;
`;

const Username = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-top: 20px;
`;

const Bio = styled.p`
    font-size: 16px;
    margin-top: 20px;
`;

const Stats = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const Stat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
`;

const Number = styled.span`
    font-size: 24px;
    font-weight: bold;
`;

const Label = styled.span`
    font-size: 16px;
    margin-top: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 30%;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => (props.following ? 'gray' : 'blue')};
    color: white;
    margin-top: 20px;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const Gallery = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    margin-top: 1rem;
    width: 100%;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
`;

const LogoutButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    background-color: red;
    color: white;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const PreviewOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

const PreviewImage = styled.img`
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
`;

const InitialsAvatar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #ddd;
    color: #333;
    font-weight: bold;
    font-size: 3rem;
    margin-top: 50px;
`;
