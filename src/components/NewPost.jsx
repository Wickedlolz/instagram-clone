import { useState } from 'react';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { storage, db } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { usePostContext } from '../contexts/PostContext';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const NewPost = ({ closeModal }) => {
    const { user } = useFirebaseContext();
    const [imageUpload, setImageUpload] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const { addPost } = usePostContext();

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleImageUploadChange = (event) => {
        setImageUpload(event.target.files[0]);
        const url = URL.createObjectURL(event.target.files[0]);
        setImagePreview(url);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsUploading(true);

        if (imageUpload === null) {
            return;
        }

        // TODO: viktor - change likes to be array wich will contains user id who like the post
        try {
            const imageRef = ref(storage, `/images/${imageUpload.name + v4()}`);
            const snapshot = await uploadBytes(imageRef, imageUpload);
            const imageUrl = await getDownloadURL(snapshot.ref);
            const post = {
                imageUrl,
                caption,
                owner: user.email,
                ownerPhoto: user.photoURL || '',
                likes: 0,
                createdAt: new Date().toDateString(),
            };
            await addDoc(collection(db, 'posts'), post);
            addPost(post);
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
                {imagePreview && <ImagePreview src={imagePreview} />}
                <ImageInput type="file" onChange={handleImageUploadChange} />
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

    box-shadow: 0px 0px 22px -2px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px 0px 22px -2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 22px -2px rgba(0, 0, 0, 0.75);
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
