import React, { Component,useState,useEffect } from 'react';
import { Row,Button,Col,Container } from 'reactstrap';
import { MdInfo } from 'react-icons/md';
import AppContent from './AppContent';

export default class App extends Component {
    state = {
        isAbout: false,
    };
    constructor(props){
        super(props);
        this.handleAboutClick = this.handleAboutClick.bind(this);
    }
    handleAboutClick(){
        this.setState({
            isAbout: !this.state.isAbout,
        })
    }
    render() {
        const { isAbout } = this.state;
        return(
            <div>
                <Header handleAboutClick={this.handleAboutClick} isAbout={isAbout}/>
                {
                    !isAbout ?
                        <div className="flipper">
                            <AppContent />
                        </div>
                    :
                        <div className="flipper">
                            <Container>
                                <p> this is the about page </p>
                                <p> My name is Pekka Mattinen, I have decided to accept this challenge </p>
                                <p> This is the prelude exercise for EuroSkills 2020 Finnish pruning trials </p>
                            </Container>
                        </div>
                }
            </div>
        );
    }
}

/**
* Header/Top Banner for the webpage
**/
function Header(props){
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
                                <Button className="ml-auto" onClick={props.handleAboutClick}>
                                    About
                                </Button>
                            :
                                <MdInfo className="ml-auto h1" onClick={props.handleAboutClick}/> 
                        }    
                    </Col>      
                </Row>
            </Container>  
        </div>      
    );
}