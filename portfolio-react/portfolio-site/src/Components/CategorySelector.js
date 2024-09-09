import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, InputGroup } from 'react-bootstrap';

function CategorySelector({blogItem, posts, setPosts, categories, setCategories, authToken}) {
    const [currentCat, setCurrentCat] = useState(-1);
    const [newCatName, setNewCatName] = useState("");

    function OnClickHandler(){
        if(currentCat == 0) {
            CreateNewCategory();
        } else{
            const currentCatIndex = blogItem.categories.findIndex((element) => element == currentCat);
            if(currentCatIndex == -1 && currentCat != 0){
                AddNewCategoryToBlogItem(currentCat);
            }
        }
    }

    function AddNewCategoryToBlogItem(catId){
        console.log(`current catgories: ${blogItem.categories} cat to be added: ${catId}`);
        blogItem.categories.push(catId);
        blogItem.hasChanged = true;
        const newPostState = posts.map((post) => {
            if(post.id != blogItem.id) {return post};
            return blogItem;
        })
        setPosts(newPostState)
    }

    function CreateNewCategory(){
        const backend = process.env.BACKEND;
        fetch(backend + '/categories/',
            {
                headers: new Headers({'content-type': 'application/json', 'Authorization': 'Token ' + authToken}),
                method: "POST",
                body: JSON.stringify({"name": newCatName})
            })
        .then((res) => { return res.json(); })
        .then((jsonResp) => {
            let newCategories = categories.slice();
            newCategories.push(jsonResp)
            console.log(jsonResp);
            setCategories(newCategories);
            setCurrentCat(jsonResp.id);
            AddNewCategoryToBlogItem(jsonResp.id);
        })
    }

    function UpdateNewCategoryName(e){
        setNewCatName(e.target.value);
    }

    function ChangeCategory(e){
        console.log(e.target.value);
        setCurrentCat(e.target.value);
    }

    const categoryOptions = categories.map((category) => {
        return <option value={category.id}>{category.name}</option>
    })

    categoryOptions.push(<option value='0'>Add New...</option>)

    return (
        <InputGroup>
            {
                currentCat == 0 ? <Form.Control size="sm" type="text" placeholder="new category" onChange={UpdateNewCategoryName}/> : <Form.Select size="sm" onChange={ChangeCategory}> {categoryOptions} </Form.Select>
            }
            <Button className="btn btn-success btn-sm" onClick={OnClickHandler}>add</Button>
        </InputGroup>
    );
}

export default CategorySelector;