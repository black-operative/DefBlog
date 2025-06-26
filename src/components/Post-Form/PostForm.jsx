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

    const submit = async (data) => {
        // Update Post data
        if (post) {
            // Upload new image and delete old if provided
            const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null;
            if (file) fileService.deleteFile(post.featured_image);
            
            // Update post in backend
            const updatedPost = postService.updatePost(
                post.$id,
                {
                    ...data,
                    featured_image : file ? file.$id : undefined
                }
            );

            if (updatedPost) navigate(`/post/${updatedPost.$id}`);
        
        // New Post data
        } else {
            const file = data.image[0] ? await fileService.uploadFile(data.image[0]) : null;
            
            if (file) {
                const fileId = file.$id
                data.featured_image = fileId;

                const newPost = await postService.createPost(
                    {
                        ...data,
                        user_id : userData.$id
                    }
                );
                
                if (newPost) navigate(`/post/${newPost.$id}`);
            }
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