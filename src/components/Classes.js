function Node(id,title,parent) {
    this.id = id;
    this.title = title;
    this.parent = parent;
    this.isChecked = false;

    this.setIdentifiers = function(id,title,parent) {
        this.id = id;
        this.title = title;
        this.parent = parent;
    }
    this.setTitle = function(title) {
        this.title = title;
    }
    this.getIdentifiers = function() {
        var nodeInfo = {};
        nodeInfo.id = id;
        nodeInfo.title = title;
        nodeInfo.parent = parent;
        return nodeInfo;
    }
    this.printIdentifiers = function(){
        alert("folder: "+ title + " id: "+ id+ " parent: "+ parent);
    }
    this.setChecked = function() {
        this.isChecked = !this.isChecked;
    }.bind(this);

    this.isDisabled = function(tree){
        let parentNode = tree.nodes.filter(function(item){
            return item.id == parent;
        });
        if (parentNode[0]==undefined)
            return false;
        while (parentNode[0].parent!=null) {
            if(parentNode[0].isChecked==true)
                break;
            parentNode = tree.nodes.filter(function(item){
                return item.id == parentNode[0].parent;
            });
        }
        if(parentNode[0].isChecked==true){
            if(this.isChecked==true)
                this.setChecked();
            return true;
        }
        else
            return false;

    }.bind(this);
}
function Tree(nodes) {
    this.nodes = nodes;

    this.setNodes = function(nodes) {
        this.nodes = nodes;
    }

    this.getNodes = function() {
        return nodes;
    }

    this.setNodeById = function(id,title) {
        this.nodes[id].setTitle(title);
    }
    this.printNodes = function(){
        nodes.forEach((item)=> item.printIdentifiers());
    }

    this.getIdentifiersInChecked = function(){
        const checkedNodes = nodes.filter(function(item){
            return item.isChecked == true;
        });
        return checkedNodes;
    }
    this.setChecked = function(id){
        const checkedNode = nodes.filter(function(item){
            return item.id == id;
        });
        checkedNode[0].setChecked();
    }

}
export {Node,Tree};
