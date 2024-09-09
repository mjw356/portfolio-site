import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from "react";
import BlogAdminTable from './BlogAdminTable';
import FileUpload from './FileUpload';

function AdminPanel(props) {
    const backend = process.env.REACT_APP_BACKEND;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // this will fetch the blog posts only on the first time the component loads
        fetch(backend + '/posts/',
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
        <>
            <Row>
                <Col>
                    <FileUpload authToken={props.authToken}/>
                </Col>
            </Row>
            <Row>
                <Col className="my-auto">
                    <BlogAdminTable posts={posts} setPosts={setPosts} authToken={props.authToken}/>
                </Col>
            </Row>
        </>
    );
}

export default AdminPanel;
