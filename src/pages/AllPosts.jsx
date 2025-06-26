import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import postService             from "../appwrite/post";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {}, []);

    postService.getPosts([]).then(
        (posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        }
    )
    
    return (
        <div className = "w-full py-8">
            <Container>
                <div className = "flex flex-wrap">
                    {
                        posts.map((post) => (
                            <PostCard 
                                key  = {post.$id}
                                post = {post}
                            />
                        ))
                    }
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;