import { Link } from 'react-router';

import fileService from '../appwrite/file';

function PostCard(
    {
        $id,
        title,
        featured_image
    }
) {
    return (
        <Link to = {`/post/${$id}`}>
            <div className = 'w-full bg-gray-100 rounded-xl p-4'>
                <div className = 'w-full justify-center mb-4'>
                    <img 
                        src       = {fileService.getFilePreview(featured_image)} 
                        alt       = {title}
                        className = 'rounded-xl'
                    />
                </div>
                <h2 className = 'text-xl font-bold'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard;