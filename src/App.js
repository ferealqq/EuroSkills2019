import React, { Component,useState,useEffect } from 'react';
import { Row,Button,Col,Container } from 'reactstrap';
import { MdInfo } from 'react-icons/md';
import AppContent from './AppContent';

export default class App extends Component {
    render() {
        return(
            <div>
                <Header />
                <AppContent />
            </div>
        );
    }
}

/**
* Header/Top Banner for the webpage
**/
function Header(){
    const [isMobile,toggleMobile] = useState(window.innerWidth > 850);

    window.addEventListener("resize", ()=>{
        let curWindowState = (window.innerWidth > 850)
        if(isMobile !== curWindowState)
            toggleMobile(curWindowState);
    });

    return(
        <div className="w-100 mw-100 top-banner">
            <Container className="py-3">
                <Row className="justify-content-inbetween w-100 mw-100">
                    <Col className="d-flex">
                        <p className="title h2 mr-auto">
                            EuroSkills
                        </p>
                    </Col>
                    <Col className="d-flex">
                        {
                            isMobile ?   
                                <Button className="ml-auto">
                                    About
                                </Button>
                            :
                                <MdInfo className="ml-auto h1"/> 
                        }    
                    </Col>      
                </Row>
            </Container>  
        </div>      
    );
}