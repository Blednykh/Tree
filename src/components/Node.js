import React, { Component } from 'react';
import '../Node.css';



class NodeComponent extends Component {

    state = {
        buttonState: '+',
        visible: 'none',
        childVisible: 'none',

    };

    click = () =>{
        if (this.state.buttonState == '+')
            this.setState({buttonState: '-', childVisible: 'inherit' });
        else
            this.setState({buttonState: '+', childVisible: 'none'});

    };
    setVisibleButton = (root) =>{
        if(root.length==0)
            return (<button className="nonVisibleButton" onClick={this.click}>{this.state.buttonState}</button>);
        else
            return (<button className="visibleButton" onClick={this.click}>{this.state.buttonState}</button>);

    };

    setCheckbox = (node) =>{
        if(node.isChecked){
            if(node.isDisabled(this.props.tree))
                return ( <input type="checkbox" checked={false} disabled="true" onChange={this.props.handleInputChange(node.id)}/>);
            else
                return ( <input type="checkbox" checked={true} onChange={this.props.handleInputChange(node.id)}/>);

        } else {
            if(node.isDisabled(this.props.tree))
                return ( <input type="checkbox" checked={false} disabled="true" onChange={this.props.handleInputChange(node.id)}/>);
            else
                return ( <input type="checkbox" checked={false} onChange={this.props.handleInputChange(node.id)}/>);
        }

    };


    render() {
        const {tree,node,visible,handleInputChange} = this.props;

        const root = tree.getNodes().filter(function(item){
            return item.parent == node.id;
        });

        let button = this.setVisibleButton(root);
        let checkbox = this.setCheckbox(node);


        return (
            <div style={{display: visible}}>
                {button}
                {node.title}
                {checkbox}
                <div className="Node">
                    {root.map((node,index) => <NodeComponent key={index}
                                                     tree={tree}
                                                     node={node}
                                                     visible={this.state.childVisible}
                                                     handleInputChange={handleInputChange}
                    />)}
                </div>
            </div>
        );
    }
}

export default NodeComponent;