import React = require("react");

import './lifeBar.scss';

import { useStore } from "effector-react";
import { PlayerLives as PlayerLivesState } from '../../../../stores/playerLives';

import { Container, Row, Col } from 'react-grid-system';
import { LifeIcon } from "./lifeIcon";

interface LifeBarComponentProps{
    livesStore: any;
}

class LifeBarComponent extends React.Component<LifeBarComponentProps>{

    private _maxLives = 5;

    constructor(props: any){
        super(props);
    }


    render(){
        const livesCount = this.props.livesStore[0];
        return (
            <Container>
                <Row className="lives">
                    {[...Array(this._maxLives)].map((value, key) => {
                        return <Col sm={2} key={key}><LifeIcon status={livesCount > key}/></Col>
                    }
                        
                    )}
                </Row>
            </Container>
        );
    }
}

export const LifeBar = () => {
    const livesStore : any = useStore(PlayerLivesState.store);
   
    return (<LifeBarComponent livesStore={livesStore} />)
}