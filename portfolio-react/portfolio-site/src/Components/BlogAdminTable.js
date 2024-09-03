import BlogAdminTableRows from "./BlogAdminTableRows";

function BlogAdminTable({posts, setPosts, authToken}){

    function HandleCreatePost(){
        let newPostItem = {id: "new", title: "", body: "", categories: [], isEditable: true, hasChanged: true}
        let newPostState = posts.slice();
        newPostState.unshift(newPostItem);
        setPosts(newPostState);
    }

    return(
        <table className="table">
              <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">title</th>
                    <th scope="col">author</th>
                    <th scope="col">categories</th>
                    <th scope="col">
                        <button type="button" className="btn btn-success btn-sm mx-auto" onClick={HandleCreatePost}>Create New Post</button>
                    </th>
                </tr>
            </thead>
            <BlogAdminTableRows posts={posts} setPosts={setPosts} authToken={authToken}/>
        </table>
    )
}

export default BlogAdminTable;