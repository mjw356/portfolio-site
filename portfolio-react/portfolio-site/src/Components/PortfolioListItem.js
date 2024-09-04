import { Row, Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';

function PortfolioListItem({portfolioItem}){

    return (
    <Row className="mb-3">
        <Col className='col-3 offset-2 text-center'>
            <Image src={portfolioItem.featuredImage} fluid></Image>
        </Col>
        <Col className='col-5'>
            <Link
                to='#'
                className='link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'
            >
            {/* <a href={`blog/${blogItem.id}`} > */}
                <h2>{portfolioItem.title}</h2>
            </Link>            
            <div className='text-start fs-5' dangerouslySetInnerHTML={{__html: portfolioItem.body}} />
        </Col>
    </Row>
    )
}

export default PortfolioListItem;