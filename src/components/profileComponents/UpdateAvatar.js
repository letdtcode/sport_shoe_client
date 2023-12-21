import { Box, Modal, Slider, SliderThumb, SliderFilledTrack, SliderTrack, Button, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { updateAvatar } from '../../redux/actions/UserAction';
import { useDispatch, useSelector } from "react-redux";
// import { updateAvatarRequest } from "~/services/API/authAPI";

export default function UpdateAvatar({ imageFile, modalOpen, setModalOpen, setImageFile }) {
    const dispatch = useDispatch();
    const [slideValue, setSlideValue] = useState(10);

    const cropRef = useRef(null);

    const handleSave = async () => {
        if (imageFile) {
            const scaledImage = cropRef.current.getImageScaledToCanvas().toDataURL();
            const scaledImageFile = await fetch(scaledImage)
                .then(res => res.blob())
                .then(blob => new File([blob], 'scaledImage.jpg', { type: 'image/jpeg' }));
    
            setModalOpen(false);
            dispatch(updateAvatar(scaledImageFile));
        }
    };

    const handleCancel = () => {
        setImageFile(null);
        setModalOpen(false);
    };
    return (
        <Modal isOpen={modalOpen} onClose={setModalOpen} className="modal-update-avatar" size="xl">
            <ModalOverlay />
            <ModalContent className="box-update-avatar">
                <ModalHeader>Select avatar</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <AvatarEditor
                        className="avatar-editor"
                        ref={cropRef}
                        borderRadius={100}
                        scale={slideValue / 10}
                        rotate={0}
                        image={imageFile}
                    />
                    <Slider className="avatar-editor-slider" aria-label='slider-ex-1' min={10} max={30} defaultValue={slideValue} value={slideValue} onChange={(val) => setSlideValue(val)}>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>

                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' onClick={handleCancel}>Cancel</Button>
                    <Button colorScheme='blue' mr={3} onClick={handleSave}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    );
};
