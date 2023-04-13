import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { useNotificationContext } from '../contexts/NotificationContext';
import styled from 'styled-components';

const UserProfile = () => {
    const [userPhotos, setUserPhotos] = useState([]);
    const [following, setFollowing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const { user, logOut } = useFirebaseContext();
    const { notifySuccess, notifyError } = useNotificationContext();

    useEffect(() => {
        // Fetch user photos
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
            .then((response) => response.json())
            .then((data) => setUserPhotos(data.slice(0, 9)))
            .catch((error) => notifyError(error.message));
    }, []);

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

    return (
        <Container>
            <ProfilePicture src="https://www.w3schools.com/w3images/avatar2.png" />
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
                {userPhotos?.map((photo) => (
                    <Image
                        key={photo.id}
                        src={photo.thumbnailUrl}
                        alt={photo.title}
                        onClick={() => handleImageClick(photo.url)}
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
    width: 50%;
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

// const Gallery = styled.div`
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     grid-gap: 20px;
//     margin-top: 50px;
// `;
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
