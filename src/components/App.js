import React, { Component } from 'react';
import '../App.css';
import NodeComponent from "./Node";
import data from '../data.json';
import {Node,Tree} from './Classes';



const nodes = data.map(function(item){
    const node = new Node(item.id,item.title,item.parent);
    return node;
});
const tree= new Tree(nodes);


class App extends Component {
    constructor(props){
        super(props);
        this.buttonInfoClick = this.buttonInfoClick.bind(this);
        this.buttonSetTitle = this.buttonSetTitle.bind(this);
    }


    handleInputChange = (id) => (event) => {
        tree.setChecked(id);
        this.forceUpdate();
    };

    buttonInfoClick(){
        const checkedNodes = tree.getIdentifiersInChecked();
        let Info = "";
        checkedNodes.forEach(function(item){
           Info+="id: "+ item.id + "\t folder: "+ item.title + "\t parent: "+ item.parent+"\n";
        });
        alert(Info);
    }

    buttonSetTitle(){
        const checkedNodes = tree.getIdentifiersInChecked();
        checkedNodes.forEach(function(item){
            const newTitle = prompt("New Title for "+item.title, '');
            if(newTitle==!null){
                item.setTitle(newTitle)
                item.setChecked();
            }
        });
        this.forceUpdate();
    }

  render() {
      const root = tree.getNodes().filter(function(item){
          return item.parent === null;
      });

    return (
      <div className="App">
          <header>
              <button onClick={this.buttonInfoClick}>Info</button>
              <button onClick={this.buttonSetTitle}>Set title</button>
          </header>
          <div className="Body">
              <div className="Nodes">
                  {root.map((node,index) => <NodeComponent key={index}
                                                  tree={tree}
                                                  node={node}
                                                  visible={'inherit'}
                                                  handleInputChange={this.handleInputChange}
                  />)}
              </div>
          </div>
      </div>
    );
  }
}

export default App;

