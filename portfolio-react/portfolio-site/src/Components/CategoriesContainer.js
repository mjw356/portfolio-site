import { Button } from 'react-bootstrap';

function CategoriesContainer({blogItem, categories, posts, setPosts}) {

    function handleDelete(e){
        if(!blogItem.isEditable) {return;}
        let newBlogItemCats = blogItem.categories.filter((catId) => catId != e.target.value);
        blogItem.categories = newBlogItemCats;
        blogItem.hasChanged = true;
        const newPostState = posts.map((post) => {
            if(post.id != blogItem.id) {return post};
            return blogItem;
        })
        setPosts(newPostState)
    }

    const blogCategories = blogItem.categories.map((catId) => {
        let index = categories.findIndex((category) => catId == category.id);
        if(index == -1) { return null;}
        let catName = categories[index].name;
        return <Button className="m-1" size="sm" variant="info" value={catId} onClick={handleDelete}>{catName}</Button>
    })

    return (
        <div>
            {blogCategories}
        </div>
    );
}

export default CategoriesContainer;