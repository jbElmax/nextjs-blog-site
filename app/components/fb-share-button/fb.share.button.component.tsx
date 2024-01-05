import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';

interface FbShareProps{
    postId:string
}
const FbShareButton: React.FC<FbShareProps> = ({postId}) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL
    return(
        <>
            <FacebookShareButton
            url={`${url}post/${postId}`}
            hashtag="#CodeCraftersBlog">
            <FacebookIcon size={32} round />
            </FacebookShareButton>
        </>
    )
}

export default FbShareButton;