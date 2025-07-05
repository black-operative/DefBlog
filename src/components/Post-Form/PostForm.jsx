import { useForm }     from "react-hook-form";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import postService from '../../appwrite/post';
import fileService from "../../appwrite/file";

import {
    RTE,
    Input, 
    Button,
    Select
} from '../index';


function PostForm( { post } ) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues : {
                title   : post?.title   || '',
                slug    : post?.slug    || '',
                content : post?.content || '',
                status  : post?.status  || 'active',
            }
        }
    );
    
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth?.userData);
    const [error, setError] = useState("");

    const submit = async (data) => {
        setError("");
        try {
            if (!userData) {
                setError("You must be logged in to create or update a post.");
                return;
            }
            // Update Post data
            if (post) {
                // Upload new image and delete old if provided
                const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null;
                if (file) fileService.deleteFile(post.featured_image);
                
                // Update post in backend
                const updatedPost = await postService.updatePost(
                    post.$id,
                    {
                        ...data,
                        featured_image : file ? file.$id : undefined
                    }
                );
    
                if (updatedPost) navigate(`/post/${updatedPost.$id}`);
                else setError("Failed to update post. Please try again.");
            // New Post data
            } else {
                let fileId = null;

                if (data.image[0]) {
                    const file = await fileService.uploadFile(data.image[0]);
                    if (!file) {
                        setError("Failed to upload image. Please try again.");
                        return;
                    }
                    fileId = file.$id;
                }

                const newPost = await postService.createPost(
                    {
                        ...data,
                        featured_image : fileId,
                        user_id : userData.$id
                    }
                );
                
                if (newPost) navigate(`/post/${newPost.$id}`);
                else setError("Failed to create post. Please try again.");
            }
        } catch (error) {
            console.log("PostForm.jsx :: submit :: error", error);
            setError("Failed to submit post. Please try again.");
            return;
        }
        
    }

    const slugTransform = useCallback(
        (value) => {
            if (value && typeof value === 'string') {
                return value
                    .trim()
                    .toLowerCase()
                    .replaceAll(/\s+/g, '-');
            } else { 
                return '';
            }
        }, 
        []
    );

    const isSlugEdited = useRef(false);
    useEffect(
        () => {
            const subscription = watch((value, {name}) => {
                if (name === 'title' && !isSlugEdited.current) {
                    setValue(
                        'slug', 
                        slugTransform(value.title),
                        {shouldValidate : true}
                    );
                }
            }); 

            return () => subscription.unsubscribe()
        },
        [watch, slugTransform, setValue]
    );

    return (
        <form 
            onSubmit  = { handleSubmit(submit) } 
            className = "flex flex-wrap"
        >
            {
                error && (
                    <div className="w-full mb-4 p-2 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )
            }

            <div className = "w-2/3 px-2">

                <Input
                    label       = "Title :"
                    placeholder = "Title"
                    className   = "mb-4"
                    {...register(
                        "title", 
                        { required: true }
                    )}
                />

                <Input
                    label       = "Slug :"
                    placeholder = "Slug"
                    className   = "mb-4"
                    {...register(
                        "slug", 
                        { required: true }
                    )}
                    onInput = { 
                        (e) => {
                            setValue(
                                "slug", 
                                slugTransform(e.currentTarget.value), 
                                { shouldValidate: true }
                            );
                        }
                    }
                />

                <RTE 
                    label        = "Content :" 
                    name         = "content" 
                    control      = {control} 
                    defaultValue = { getValues("content") } 
                />

            </div>

            <div className="w-1/3 px-2">

                <Input
                    label     = "Featured Image :"
                    type      = "file"
                    className = "mb-4"
                    accept    = "image/png, image/jpg, image/jpeg, image/gif"
                    {...register(
                        "image", 
                        { required: !post }
                    )}
                />

                {
                    post && 
                    (
                        <div className="w-full mb-4">
                            <img
                                src       = {fileService.getFilePreview(post.featured_image)}
                                alt       = {post.title}
                                className = "rounded-lg"
                            />
                        </div>
                    )
                
                }

                <Select
                    options   = { ["active", "inactive"] }
                    label     = "Status"
                    className = "mb-4"
                    {...register(
                        "status", 
                        { required: true }
                    )}
                />

                <Button 
                    type      = "submit" 
                    bgColor   = { post ? "bg-green-500" : undefined } 
                    className = "w-full"
                    text      = { post ? "Update" : "Submit" }
                />
            
            </div>

        </form>
    );
}

export default PostForm;