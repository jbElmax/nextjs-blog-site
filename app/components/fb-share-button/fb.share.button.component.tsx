import React from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';

interface FbShareProps{
    postId:string
}
const FbShareButton: React.FC<FbShareProps> = ({postId}) => {
    const url = process.env.baseUrl
    return(
        <>
            <FacebookShareButton
            url={`${url}${postId}`}
            hashtag="#muo">
            <FacebookIcon size={32} round />
            </FacebookShareButton>
        </>
    )
}

export default FbShareButton;