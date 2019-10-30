import React = require("react");
import classNames from 'classnames';

import './lifeIcon.scss';

interface LifeIconProps{
    status: boolean;
}

export class LifeIcon extends React.Component<LifeIconProps>{
    status: boolean = true;

    constructor(props: any){
        super(props);
    }

    componentDidUpdate(){
        this.status = this.props.status;
    }

    render(){
        const classes = classNames([
            "color",
            {"lost": this.props.status !== true}
        ])
        return (
            <div className="grey">
                <div className={classes}>

                </div>
            </div>
        );
    }
}