import { useState } from 'react';
import { useFirebaseContext } from '../../contexts/FirebaseContext';
import { storage, db } from '../../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const NewPost = ({ closeModal }) => {
    const { user } = useFirebaseContext();
    const [imageUpload, setImageUpload] = useState(null);
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    console.log(user);

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsUploading(true);

        if (imageUpload === null) {
            return;
        }

        try {
            const imageRef = ref(storage, `/images/${imageUpload.name + v4()}`);
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const imageUrl = await getDownloadURL(snapshot.ref);
            await setDoc(doc(db, 'posts', v4()), {
                imageUrl,
                caption,
                owner: user.email,
                ownerPhoto: user.photoUrl,
                likes: 0,
            });

            closeModal();
            setIsUploading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Header>
                <Title>New Post</Title>
                <CloseButton onClick={closeModal}>
                    <AiOutlineClose />
                </CloseButton>
            </Header>
            <Form onSubmit={handleSubmit}>
                {/* <ImagePreview src={image} /> */}
                <ImageInput
                    type="file"
                    onChange={(event) => setImageUpload(event.target.files[0])}
                />
                <CaptionInput
                    type="text"
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={handleCaptionChange}
                />
                <Button type="submit" disabled={isUploading}>
                    Post
                </Button>
            </Form>
        </Container>
    );
};

export default NewPost;

const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    width: 500px;
    background-color: #fff;
    border-radius: 12px;
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ccc;
`;

const Title = styled.h3`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
`;

const CloseButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: #777;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 16px;
`;

const ImagePreview = styled.img`
    height: 300px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 16px;
`;

const ImageInput = styled.input`
    margin-bottom: 8px;
    padding: 12px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
`;

const CaptionInput = styled.textarea`
    margin-bottom: 16px;
    padding: 12px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    resize: none;
    height: 80px;
`;

const Button = styled.button`
    background-color: #0095f6;
    color: #fff;
    padding: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
        background-color: #9fcdeb;
        cursor: not-allowed;
    }
`;
