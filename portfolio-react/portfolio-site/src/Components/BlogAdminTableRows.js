import Form from 'react-bootstrap/Form';

function BlogAdminTableRows({posts, setPosts, authToken}){

    function MakeFieldsEditable(id){
        console.log(`${id} is now editable`);
        const newPostState = posts.map((post) => {
            if(post.id !== id) {return post};
            post.isEditable = true;
            return post;
        })
        setPosts(newPostState)
    }

    function HandleChange(event){
        const blogId = event.target.getAttribute('data-key');
        const newPostState = posts.map((post) => {
            if(post.id != blogId) {return post};
            post.hasChanged = true;
            post[event.target.name] = event.target.value
            return post;
        })
        setPosts(newPostState)
    }

    function SaveChanges(changedBlogItem){
        changedBlogItem.id == "new" ? CreateNewPost(changedBlogItem) : UpdateExistingPost(changedBlogItem);
    }

    function UpdateExistingPost(changedBlogItem){
        let url = `http://localhost:8000/posts/${changedBlogItem.id}/`;
        let method = "PUT"

        fetch(url,
            {
                headers: new Headers({'content-type': 'application/json', 'Authorization': 'Token ' + authToken}),
                method: method,
                body: JSON.stringify({"title": changedBlogItem.title, "body": changedBlogItem.body, "categories": changedBlogItem.categories})
            })
        .then((res) => {
            if(res.status == 200){
                const newPostState = posts.map((post) => {
                    if(post.id != changedBlogItem.id) {return post};
                    post.hasChanged = false;
                    post.isEditable = false;
                    return post;
                })
                setPosts(newPostState);
            }
        })
    }

    function CreateNewPost(blogItem){
        let url = "http://localhost:8000/posts/";
        let method = "POST";

        fetch(url,
            {
                headers: new Headers({'content-type': 'application/json', 'Authorization': 'Token ' + authToken}),
                method: method,
                body: JSON.stringify({"title": blogItem.title, "body": blogItem.body, "categories": blogItem.categories})
            })
        .then((res) => {
            if(res.status == 201){
                return res.json();
            }
        })
        .then((json) => {
            console.log(json);
            const newPostState = posts.slice();
            newPostState.shift();
            newPostState.push(json);
            setPosts(newPostState);
        })
    }

    function HandleDeletePost(postId){
        fetch(`http://localhost:8000/posts/${postId}/`,
            {
                headers: new Headers({'content-type': 'application/json', 'Authorization': 'Token ' + authToken}),
                method: "DELETE"
            })
        .then((res) => {
            if(res.status == 204){
                const isDeletedElement = (element) => element.id == postId;
                const newPostState = posts.toSpliced(posts.findIndex(isDeletedElement), 1);
                setPosts(newPostState);
            }
        })
    }

    const tableRows = posts.map((blogItem) => {
        console.log(blogItem);
        return (
            <>
                <tr key={blogItem.id}>
                    <td>{ blogItem.id }</td>
                    <td>{ blogItem.isEditable ?
                            <Form.Control
                                type="text"
                                name="title"
                                key={blogItem.id}
                                data-key={blogItem.id}
                                value={blogItem.title}
                                onChange={HandleChange}
                            />  :
                            blogItem.title
                        }
                    </td>
                    <td>{ blogItem.owner }</td>
                    <td>
                        { blogItem.hasChanged ? 
                            <button type="button" onClick={() => SaveChanges(blogItem)} className="btn btn-success mr-1">Save Changes</button> :
                            <button type="button" onClick={() => MakeFieldsEditable(blogItem.id)} className="btn btn-warning mr-1">Edit</button>
                        }
                        <button type="button" className="btn btn-primary mr-1">Post</button>
                        <button type="button" className="btn btn-danger mr-1" onClick={() => HandleDeletePost(blogItem.id)}>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td colSpan="12">
                        { blogItem.isEditable ?
                            <Form.Control
                                as="textarea"
                                name="body"
                                rows={3}
                                data-key={blogItem.id}
                                onChange={HandleChange}>
                                    {blogItem.body}
                            </Form.Control>  :
                            blogItem.body
                        }
                    </td>
                </tr>
            </>
        )
    })

    return(
        <tbody>
            {tableRows}
        </tbody>
    );
}

export default BlogAdminTableRows;