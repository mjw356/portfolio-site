import Form from 'react-bootstrap/Form';
import CategorySelector from './CategorySelector';
import { useState, useEffect } from 'react';
import CategoriesContainer from './CategoriesContainer';

function BlogAdminTableRows({posts, setPosts, authToken}){
    const [categories, setCategories] = useState([]);

    // get a list of the current category objects upon load
    useEffect(() => {
        // this will fetch the blog posts only on the first time the component loads
        let url = 'http://localhost:8000/categories/';
        FetchCategories(url, []);
      }, [])

    function FetchCategories(url, previousCategories){
        fetch(url,
            {
                headers: new Headers({'content-type': 'application/json'}),
                method: "GET"
            })
        .then((res) => { return res.json(); })
        .then((jsonResp) => {
            console.log(jsonResp);
            let newCategories = previousCategories.slice();
            jsonResp.results.forEach(element => {
                let index = newCategories.findIndex(category => category.id == element.id);
                if(index == -1) {
                    newCategories.push(element);
                }
            });
            if(jsonResp.next){
                FetchCategories(jsonResp.next, newCategories);
            } else {
                setCategories(newCategories);
            }
        })
    }

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

    function HandlePublishing(blogItem){
        blogItem.isPublished = !blogItem.isPublished;
        UpdateExistingPost(blogItem);
    }

    function UpdateExistingPost(changedBlogItem){
        let url = `http://localhost:8000/posts/${changedBlogItem.id}/`;
        let method = "PUT"

        fetch(url,
            {
                headers: new Headers({'content-type': 'application/json', 'Authorization': 'Token ' + authToken}),
                method: method,
                body: JSON.stringify({"title": changedBlogItem.title, "body": changedBlogItem.body, "isPublished": changedBlogItem.isPublished, "categories": changedBlogItem.categories})
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
                        <CategoriesContainer
                            blogItem={blogItem}
                            categories={categories}
                            posts={posts}
                            setPosts={setPosts}
                        />
                        { blogItem.isEditable ?
                            <CategorySelector
                                blogItem={blogItem}
                                posts={posts}
                                setPosts={setPosts}
                                categories={categories}
                                setCategories={setCategories}
                                authToken={authToken}
                            /> : ""
                        }
                    </td>
                    <td>
                        <div className='btn-group'>
                            { blogItem.hasChanged ? 
                                <button type="button" onClick={() => SaveChanges(blogItem)} className="btn btn-sm btn-success mr-1">Save Changes</button> :
                                <button type="button" onClick={() => MakeFieldsEditable(blogItem.id)} className="btn btn-sm btn-warning mr-1">Edit</button>
                            }
                            <button type="button" className="btn btn-sm btn-primary mr-1" onClick={() => HandlePublishing(blogItem)}>{blogItem.isPublished ? "UnPublish" : "Publish"}</button>
                            <button type="button" className="btn btn-sm btn-danger mr-1" onClick={() => HandleDeletePost(blogItem.id)}>Delete</button>
                        </div>
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