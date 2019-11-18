import React, { Component,useState,useEffect } from 'react';
import { Row,Button,Col,Container,Modal,ModalHeader,ModalBody,ModalFooter } from 'reactstrap';
import { MdInfo } from 'react-icons/md';
import { CSSTransition } from 'react-transition-group';
import AppContent from './AppContent';

export default function App(props) {
    const [isAbout,toggleAbout] = useState(false);
    const [isMobile,toggleMobile] = useState(window.innerWidth > 900);

    const handleAboutClick = () => toggleAbout(!isAbout);

    window.addEventListener("resize", ()=>{
        let curWindowState = (window.innerWidth > 900)
        if(isMobile !== curWindowState)
            toggleMobile(curWindowState);
    });


    return(
        <div className={isMobile ? "background" : ""}>
            <Header handleAboutClick={handleAboutClick} isAbout={isAbout} isMobile={isMobile}/>
            <AppContent />
            <CSSTransition
                in={isAbout}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >                    
                <AboutPopup handleAboutClick={handleAboutClick} isAbout={isAbout}/>
            </CSSTransition>                 
        </div>
    );
}

/**
* Header/Top Banner for the webpage
**/
function Header(props){
    const { isMobile,handleAboutClick } = props;
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
                                <Button className="ml-auto" onClick={handleAboutClick}>
                                    About
                                </Button>
                            :
                                <MdInfo className="ml-auto h1" onClick={handleAboutClick}/> 
                        }    
                    </Col>      
                </Row>
            </Container>  
        </div>      
    );
}

function AboutPopup(props){
    return(
        <Modal isOpen={props.isAbout} onClick={props.handleAboutClick}>
            <ModalHeader>
                <p> This is the about page </p>
            </ModalHeader>
            <ModalBody>
                <p> My name is Pekka Mattinen, I have decided to accept this challenge </p>
                <p> This is the prelude exercise for EuroSkills 2020 Finnish pruning trials </p>
            </ModalBody>
            <ModalFooter>
                <Button className="play-btn" onClick={props.handleAboutClick}> Close </Button>
            </ModalFooter>
        </Modal>        
    );
}