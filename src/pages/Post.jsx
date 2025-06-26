import { useEffect, useState }          from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useSelector }                  from "react-redux";
import parse                            from 'html-react-parser'
import { Button, Container }            from "../components";
import postService                      from "../appwrite/post";
import fileService from "../appwrite/file";

function Post() {
    const navigate        = useNavigate();
    const [post, setPost] = useState(null);
    const { slug }        = useParams();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && 
        userData ? 
            post.user_id === userData.$id : 
            false;

    useEffect(
        () => {
            if (slug) {
                postService.getPost(slug)
                .then(
                    (post) => {
                        if (post) {
                            setPost(post);
                        } else {
                            navigate('/');
                        } 
                    }
                )
            } else {
                navigate('/');
            }
        },
        [slug, navigate]
    );

    const Delete_Post = function() {
        postService.deletePost(post.$id).then(
            (staus) => {
                if (staus) {
                    fileService.deleteFile(post.featured_image);
                    navigate('/');
                }
            }
        );
    };

    return post ? (
        <div className = 'py-8'>
            <Container>
                <div className = 'w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                    <img 
                        src       = {fileService.getFilePreview(post.featured_image)}     
                        alt       = {post.title}
                        className = 'rounded-xl'
                    />

                    {
                        isAuthor && (
                            <div className = 'absolute right-6 top-6'>
                                <Link to = {`/edit-post/${post.$id}`}>
                                    <Button 
                                        bgColor = 'bg-green-500' 
                                        className = 'mr-3'
                                        text={`Edit`}
                                    />
                                </Link>

                                <Button 
                                    bgColor="bg-red-500" 
                                    onClick={Delete_Post} 
                                    text={`Delete`}
                                />
                            </div>
                        )
                    }
                </div>

                <div className = "w-full mb-6 bg-green-100">
                    <h1 className = "text-2xl font-bold px-2">
                        {post.title}
                    </h1>
                </div>

                <div className = "browser-css bg-green-100 px-2">
                    { parse(post.content) }
                </div>  

            </Container>
        </div>
    ) : null;
}

export default Post;
