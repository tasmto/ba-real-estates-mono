import React from 'react'

type Props = {
    images: string[],
    defaultIndex?: number;
    onClose: () => void;
    isopen: boolean;
}

const PhotosModal = ({
    images,
    defaultIndex,
    onClose,
    isopen,
}: Props) => {
    return (
        <div>PhotosModal</div>
    )
}

export default PhotosModal