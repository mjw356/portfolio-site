// import '../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Button } from 'bootstrap';

function AdminPanel(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // this will fetch the blog posts only on the first time the component loads
        fetch('http://localhost:8000/posts/',
            {
                headers: new Headers({'content-type': 'application/json', 'Authorization': 'Token ' + props.authToken}),
                method: "GET"
            })
        .then((res) => { return res.json(); })
        .then((jsonResp) => {
            console.log(jsonResp);
            setPosts(jsonResp.results);
        })
    }, [])

    function MakeFieldsEditable(){
        console.log("making fields editable");
    }

    function BlogAdminTable(){
        return(
            <table className="table">
                  <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">title</th>
                        <th scope="col">author</th>
                        <th scope="col">
                            <button type="button" className="btn btn-success mx-auto">Create New Post</button>
                        </th>
                    </tr>
                </thead>
                <BlogAdminTableRows />
            </table>
        )
    }

    function BlogAdminTableRows(){
        const tableRows = posts.map(blogItem => {
            return (
                <>
                    <tr key={blogItem.id}>
                        <td>{ blogItem.id }</td>
                        <td>{ blogItem.title }</td>
                        <td>{ blogItem.owner }</td>
                        <td>
                            <button type="button" className="btn btn-warning mr-1">Edit</button>
                            <button type="button" className="btn btn-primary mr-1">Post</button>
                            <button type="button" className="btn btn-danger mr-1">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="12">
                            {blogItem.body}
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

    return (
        <Row className="h-100">
            <Col className="my-auto">
                <BlogAdminTable />
            </Col>
        </Row>
    );
}

export default AdminPanel;
