// import '../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Button } from 'bootstrap';
import { json } from 'react-router';
import BlogAdminTable from './BlogAdminTable';

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

    return (
        <Row className="h-100">
            <Col className="my-auto">
                <BlogAdminTable posts={posts} setPosts={setPosts} authToken={props.authToken}/>
            </Col>
        </Row>
    );
}

export default AdminPanel;
