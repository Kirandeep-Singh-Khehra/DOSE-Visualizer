/**### CustNode
 * This class represents a node of tree.
 * 
 * Its structure is compatible with both ***Huffman Tree*** and Tree for ***Optimal Merge Pattern***.
 * 
 * @author Kirandeep Singh
 */
class CustNode{

    /**Represents the type of node. Weather it is a **Intermediate node** or **Leaf node**.
     * 
     * Its values are :
     * 1. 'I' - Intermediate Node
     * 2. 'L' - Leaf Node
     * 
     * @type {string}
     */
    nodeType

    /**Stores the label for node
     * 
     * @type {string}
     */    
    nodeLabel

    /**Holds integer value for the node to perform operations on
     * 
     * @type {number}
     */
    nodeValue

    /**Holds reference to left child in tree
     * 
     * @type {CustNode}
     */
    nodeLeft

    /**Holds reference to right child in tree
     * 
     * @type {CustNode}
     */
    nodeRight

    /**Holds depth of node
     * 
     * @type {number}
     */
    depth

    /**Holds the value of huffman code
     * 
     * @type {string}
     */
    huffCode

    /**Constructor to initialise the Node
     * 
     * @class Node
     * 
     * @param {string}  nodeType  : Type of node
     * @param {string}  nodeData  : String value to represent the node
     * @param {number}  nodeValue : Integer value for node
     */
    constructor(nodeType, nodeLabel, nodeValue){
        this.nodeType  = nodeType
        this.nodeLabel = nodeLabel
        this.nodeValue = nodeValue

        this.nodeLeft  = null
        this.nodeRight = null
        this.depth     = 0
        this.huffCode  = ""
    }

    /**Comparing function to compare the two nodes.Good as an input to `sort(?compareFn)` to `Node[]`
     * 
     * @return {function(CustNode, CustNode):number} value of comparison(i.e. `arg0.nodeValue - arg1.nodeValue`)
     */
    static getRevCompareFunction(){
        return function(arg0, arg1){return arg1.nodeValue - arg0.nodeValue}
    }

    /**Updates the depth
     * 
     * @param {number} depth : Value of depth to be set
     */
    updateDepth(depth){
        this.depth = depth

        TreeUtil.maxDepth = (TreeUtil.maxDepth < depth)?depth:TreeUtil.maxDepth

        if(this.nodeRight != null)
            this.nodeRight.updateDepth(this.depth + 1)

        if(this.nodeLeft != null)
            this.nodeLeft.updateDepth(this.depth + 1)
    }

    /**Converts the node to visualisable format of HTML. It generates a code for `span` element of class name as `node_view_I` for nodes with node type `'I'` and `node_view_L` for nodes with node type `'L'`.
     * 
     * Example :
     * ```
     * <span class='node_view_I'>
     *      <p class='node_label'>Label to Node</p>
     *      <p class='node_value'>Value to Node</p>
     * </span>
     * ```
     * @return {string} HTML code to show
     */
    toHtml(){
        if(this.nodeType == "L")
            return '<span class=\'node_view_L\'><div class=\'node_label\'>' + this.nodeLabel + '</div><div class=\'node_value\'>' + this.nodeValue + '</div></span>'
        else
            return '<span class=\'node_view_I\'><div class=\'node_value\'>' + this.nodeValue + '</div></span>'
    }
}

/**### List
 * This class represents the list of nodes and generate an HTML code to display the nodes
 * 
 * @author Kirandeep Singh
 */
class List{
    /**Stores nodes for a single array representation
     * 
     * @type {CustNode[]}
     */
    nodes

    /**Constructor to initialise a list of nodes.
     */
    constructor(){
        this.nodes = [];
    }

    /**Converts the list of node to visualisable format of HTML.
     * It generates a code for `div` element of class name as `node_list`.
     * 
     * Example :
     * ```
     * <div class='node_list'>
     *      <!-- Nodes Here (Reffer to CustNode.toHtml()) -->
     * </div>
     * ```
     * 
     * @returns {string} HTML code to show
    */
    toHtml(){
        let HTML_code = '<div class=\'node_list\'>'

        for(let i = this.nodes.length - 1; i >= 0; i--){
            HTML_code += this.nodes[i].toHtml()
        }

        return HTML_code.concat('</div>')
    }
}

/**Utility definitions for tree
 * 
 * ***Important : All varible declarations are static and serve an internal perpose. Hence prevent to write(or update) the values of these
 * varibles. Function calls can be done with no issues.***
 */
class TreeUtil{

    /**Stores inorder traversal
     * 
     * Important : Not to be used outside **(for internal use only)**
     * 
     * @type {CustNode[]}
     */
    static inorderTraversal

    /**Stores content of svg element
     * 
     * Important : Not to be used outside **(for internal use only)**
     * 
     * @type {string}
     */
    static svg

    /**Stores scale for content of svg element
     * 
     * Important : Not to be used outside **(for internal use only)**
     * 
     * @type {number}
     */
    static scale

    /**Stores maximum depth of tree
     * 
     * Important : Not to be used outside **(for internal use only)**
     * 
     * @type {number}
     */
    static maxDepth

    /**Generates a inorder traversal of tree
     * 
     * @param {CustNode} root : Root of tree
     * 
     * @return {CustNode[]} Pre order traversal of tree
     */
    static genInorderTraversal(root){
        if(root == null){
            return
        } else {
            TreeUtil.genInorderTraversal(root.nodeLeft)
            TreeUtil.inorderTraversal.push(root)
            TreeUtil.genInorderTraversal(root.nodeRight)
        }
    }

    /**Set up for generation of SVG from tree
     * 
     * @param {CustNode[]} inorderTraversal : Inorder traversal of tree
     */
    static genSVG(){
        let node
        for(let i = 0; i < TreeUtil.inorderTraversal.length; i++){
            node = TreeUtil.inorderTraversal[i]
            if(node.nodeType == "I"){
                TreeUtil.svg += "<line stroke=\"black\" x1=\"" + ((i + 1)*TreeUtil.scale) + "px\" y1=\"" + ((node.depth + 1) * TreeUtil.scale) + "px\" x2=\"" + ((TreeUtil.inorderTraversal.indexOf(node.nodeLeft) + 1) * TreeUtil.scale) + "px\" y2=\"" + ((node.depth + 2) * TreeUtil.scale) + "px\" />"
                TreeUtil.svg += "<line stroke=\"black\" x1=\"" + ((i + 1)*TreeUtil.scale) + "px\" y1=\"" + ((node.depth + 1) * TreeUtil.scale) + "px\" x2=\"" + ((TreeUtil.inorderTraversal.indexOf(node.nodeRight) + 1) * TreeUtil.scale) + "px\" y2=\"" + ((node.depth + 2) * TreeUtil.scale) + "px\" />"
            }
        }

        for(let i = 0; i < TreeUtil.inorderTraversal.length; i++){
            node = TreeUtil.inorderTraversal[i]
            console.log(i,((i + 1)*TreeUtil.scale),((node.depth + 1) * TreeUtil.scale))

            if(node.nodeType == "L"){
                TreeUtil.svg += "<rect fill=\"coral\" stroke=\"black\" stroke-width=\"0.5px\" x=\"" + (((i + 1)*TreeUtil.scale) - 5) + "px\" y=\"" + (((node.depth + 1) * TreeUtil.scale) - 5) + "px\" width=\"10px\" height=\"10px\" rx=\"2px\" ry=\"2px\"/>" 
                TreeUtil.svg += "<text font-family=\"monospace\" fill=\"white\" font-size=\"4px\" x=\"" + (((i + 1)*TreeUtil.scale) - 2) + "px\" y=\"" + (((node.depth + 1) * TreeUtil.scale) - 1) + "px\">" + node.nodeLabel + "</text>"
                TreeUtil.svg += "<text font-family=\"monospace\" fill=\"white\" font-size=\"4px\" x=\"" + (((i + 1)*TreeUtil.scale) - 2) + "px\" y=\"" + (((node.depth + 1) * TreeUtil.scale) + 4) + "px\">" + node.nodeValue + "</text>"
                TreeUtil.svg += "<line stroke=\"white\" stroke-width=\"0.5px\" x1=\"" + (((i + 1)*TreeUtil.scale) - 3) + "px\" y1=\"" + (((node.depth + 1) * TreeUtil.scale)) + "px\" x2=\"" + (((i + 1)*TreeUtil.scale) + 3) + "px\" y2=\"" + (((node.depth + 1) * TreeUtil.scale)) + "px\"/>"
            }else{
                TreeUtil.svg += "<circle fill=\"coral\" stroke=\"black\" stroke-width=\"0.5px\" cx=\"" + ((i + 1)*TreeUtil.scale) + "px\" cy=\"" + ((node.depth + 1) * TreeUtil.scale) + "px\" r=\"5px\"/>" 
                TreeUtil.svg += "<text font-family=\"monospace\" fill=\"white\" font-size=\"6px\" x=\"" + (((i + 1)*TreeUtil.scale) - 2) + "px\" y=\"" + (((node.depth + 1) * TreeUtil.scale) + 2) + "px\">" + node.nodeValue + "</text>"
            }
        }
    }

    /**Constructs svg from tree
     * 
     * @param {CustNode} root : Root of Tree
     */
    static drawTree(root){

        TreeUtil.maxDepth = 0;
        root.updateDepth(0)

        TreeUtil.inorderTraversal = []
        TreeUtil.genInorderTraversal(root)
        TreeUtil.svg = ""
        TreeUtil.scale = 20
        TreeUtil.genSVG()
    }

    /**Creates complete HTML code for svg element
     * 
     * @return {string} HTML code for SVG element(ready ro be embedded)
     */
    static getSVG(){
        return "<svg id=\"forestView\" viewBox=\"0 0 " + ((TreeUtil.inorderTraversal.length + 2) * TreeUtil.scale) + " " + ((TreeUtil.maxDepth + 2) * TreeUtil.scale) + "\">" + TreeUtil.svg + "</svg>"
    }

    /**Constructs svg from forest
     * 
     * @param {CustNode[]} forest : Array of trees to draw
     */
    static drawForest(forest){
        TreeUtil.maxDepth = 0;
        for(let node of forest)
            node.updateDepth(0)

        TreeUtil.inorderTraversal = []

        for(let i = forest.length - 1; i >= 0; i--){
            TreeUtil.genInorderTraversal(forest[i])
        }

        TreeUtil.svg = ""
        TreeUtil.scale = 20
        TreeUtil.genSVG()
    }

    /**Finds the Huffman code for all leaf nodes
     * 
     * @param {CustNode} node : Root node
     * @param {string?}  code : Huffman code of node entered
     */
    static findHuffman(node, code = ""){
        if(node.nodeType == "I"){
            TreeUtil.findHuffman(node.nodeLeft , code + "0")
            TreeUtil.findHuffman(node.nodeRight, code + "1")
        }else{
            node.huffCode = code
        }
    }
}

/**List of all the nodes in input for Huffman tree.
 * 
 * Important : Not to be used outside **(for internal use only and will be edited with executions)**. Use `TreeUtil.inorderTraversal` for read only.
 * 
 * @type {List}
 */
var list

/**Stores HTML code Output for explanation along with final svg
 * 
 * @type {string}
 */
var output

/**Generates the explanation for Huffman Tree or Optimal Merge Pattern tree
 * 
 * @param {string[]}  labels : Labels for each node
 * @param {number[]}  values : Values for nodes
 * 
 * @return {string}  HTML code for step by step tree construction ond explanation
 */
function generateExplanation(labels, values, isHuff = false){

    list = new List()
    let newNode
    let nodeleft
    let nodeRight

    output = ""
    console.log(output)

    for(let i = 0; i < labels.length; i++){
        list.nodes.push(new CustNode('L', labels[i], values[i]))
    }

    list.nodes.sort(CustNode.getRevCompareFunction())

    output += "Arrange the given input in an array form."

/////////////////////////////////////
    TreeUtil.drawForest(list.nodes)
    output += TreeUtil.getSVG()
///////////////////////
    while(list.nodes.length > 1){
        nodeLeft  = list.nodes.pop()
        nodeRight = list.nodes.pop()

        console.log("LeftNode : \n")
        console.log(nodeLeft)
        console.log("RightNode : \n");
        console.log(nodeRight)

        newNode           = new CustNode('I', '', nodeLeft.nodeValue + nodeRight.nodeValue)
        newNode.nodeLeft  = nodeLeft
        newNode.nodeRight = nodeRight

        list.nodes.push(newNode)
        list.nodes.sort(CustNode.getRevCompareFunction())

        output += "Now pick two nodes with minimum values (i.e. " + nodeLeft.toHtml() + " and " + nodeRight.toHtml() + ")<br>Find the sum of its values (i.e. <b>" + nodeLeft.nodeValue + " + " + nodeRight.nodeValue + " = " + newNode.nodeValue + "</b>) and put the sum in a new Intermediate Node. Now the new node created is " + newNode.toHtml() + "<br>Make the two nodes its child. Such that the node with smaller value(here " + nodeLeft.toHtml() + ") is its left child and one with bigger value(here " + nodeRight.toHtml() + ") is its right child.<br><br><br> Now our new node is,<br>"
        
        TreeUtil.drawTree(newNode)
        output += TreeUtil.getSVG() + "<br><br><br>Finally push it into the array and we get,"

        //////////////////////////
        TreeUtil.drawForest(list.nodes)
        output += TreeUtil.getSVG()
        /////////////////////////
    }

    output += "<br><hr><br/><h2>Final " + ((isHuff)?"Huffman":"Optimal Merge Pattern") + " Tree</h2>"
    document.getElementById('output').innerHTML = output

    TreeUtil.drawTree(list.nodes[0])
    document.getElementById('output').innerHTML += TreeUtil.getSVG()

    // __T_A_B_L_E__
    TreeUtil.findHuffman(list.nodes[0])
    let resultTable = "<table><tr>" + (isHuff? "<th>Character</th><th>Frequency</th><th>Huffman Code</th><th>Code Length</th><th>Weighted Code Length</th>" : "<th>File Name</th><th>Size</th><th>Path Length</th><th>Weighted Path Length</th>") + "</tr>"

    let weighted_external_path_length = 0

    for(let node of TreeUtil.inorderTraversal){
        if(node.nodeType == "L")
            resultTable += "<tr><td>" + node.nodeLabel + "</td><td>" + node.nodeValue + "</td>" + (isHuff? "<td>" +  node.huffCode + "</td>" : "") + "<td>" + node.huffCode.length + "</td><td>" + (node.huffCode.length * node.nodeValue) + "</td></tr>"
            weighted_external_path_length += node.huffCode.length * node.nodeValue
    }

    resultTable += "<tr><td colspan='" + (isHuff?4:3) + "'>Total Weighted External " + (isHuff? "Code" : "Path") + " Length</td><td>" + weighted_external_path_length + "</td></tr></table>"

    document.getElementById("output").innerHTML += "<br><hr><h2>Resulting Data Table</h2>" + resultTable

}

var inputList
var noOfInputs
function generateList(){
    list = document.getElementById("inputList")
    noOfInputs = Number(document.getElementById("noOfInputs").value)

    list.innerHTML = "<div class=\"label\">" + (isHuff?"Character":"File Name") + "</div><div class=\"label\">" + (isHuff?"Frequency":"Size") + "</div>"
    for (let i = 0; i < noOfInputs; i++){
        list.innerHTML += "<input type=\"text\" id=\"label" + i + "\"> <input type=\"number\" id=\"value" + i + "\"><br>"
    }

    list.innerHTML += "<input type=\"button\" value=\"Explain\" onclick=\"explain()\"></div>"

}

/**Variable to store weather the screen is for hasse or Not
 * 
 * @type {boolean}
 */
var isHuff

/**Initiate every requirement */
function setup(){
    isHuff = Boolean(new URLSearchParams(window.location.search).get("isHuff"))
}

function explain(){
    let labels = []
    let values = []

    for (let i = 0; i < noOfInputs; i++){
        labels.push(document.getElementById("label" + i).value)
        values.push(Number(document.getElementById("value" + i).value))

        generateExplanation(labels, values, isHuff)
    }
}