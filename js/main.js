//var menuItems = [
//    {key: 1, name: "Beer-braised Lime & Sheltered Artichoke Pate"},
//    {key: 2, name: "Artisanal Farfalle Croquettes", price: "15", gluten_free: true},
//    {key: 3, name: "Sardine Panini With Oyster Puree & Quickened Monkfish", price: "25", description: "A panini bread made with fresh Atlantic sardines garnished with fresh Prince Edward Island oysters puree and drizzled with Monkfish sauce."}
//];
////////////////////////////////////////////////
//var menuItem = {
//    name: '',
//    price: ''
//};

var AddNewForm = React.createClass({
    propTypes: {
        menuItem: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },
    
    onNameChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.menuItem, {name: e.target.value}));
    },
    onPriceChange: function(e) {
        this.props.onChange(Object.assign({}, this.props.menuItem, {price: e.target.value}));
    },
    onSubmit: function(){
        this.props.onSubmit(this.props.menuItem);
    },
    render: function() {
        return (
                
                
            React.createElement('form', {},
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'Name',
                    value: this.props.menuItem.name,
                    onChange: this.onNameChange
                }),
                React.createElement('input', {
                    type: 'text',
                    placeholder: 'Price',
                    value: this.props.menuItem.price,
                    onChange: this.onPriceChange
                }),
                React.createElement('button', {type: 'button',onClick:this.onSubmit}, 'Submit')
            )
        );
    }
});

let FormView = React.createClass({
    propTypes: {
        menuItem: React.PropTypes.object.isRequired,
        onNewMenuItemChange: React.PropTypes.func.isRequired,
        onSubmitBut: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            React.createElement('div', {},
                React.createElement(AddNewForm, {menuItem: this.props.menuItem, onChange: this.props.onNewMenuItemChange,
                    onSubmit: this.props.onSubmitBut})
            )
        );
    }
});    

var AddNewItemPage = React.createClass({
    propTypes:{
        newItem: React.PropTypes.object,
        onNewItemChange:React.PropTypes.func,
        onSubmitButton:React.PropTypes.func
    },
    render: function(){
        return(
            React.createElement('div', {},
                React.createElement(NavMenu, {}),        
                React.createElement(FormView, {menuItem: this.props.newItem, onNewMenuItemChange: this.props.onNewItemChange,
                    onSubmitBut: this.props.onSubmitButton
                }
                )
            ));
    }
});


var MenuItem = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        key: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.string.isRequired,
    },
    
    /* 
    React.createElement("li", {},
                    React.createElement("a", {href: "#item/2"}, "Item #2")
                )
    
    
    */
    //menuItems.map((i)=>i)
 
    render: function() {
        return (
            //React.createElement("li", {},
        //                React.createElement("a", {href: this["props"]}, "hey"),
            React.createElement('a', {href:'#item/'+this.props.id}, this.props.name,
                React.createElement('div', {className: 'price'}, this.props.price)
            ) );
    }      
            
});
var MenuItems = React.createClass({
    propTypes: {
        items: React.PropTypes.array.isRequired
    },
    render: function() {
        return (
            React.createElement('ul', {className: 'foodItems'}, this.props.items.map(i => React.createElement(MenuItem, i)
            )
            )
        );
    }
});
 
let ItemPage = React.createClass({
    render: function() {
        return (
            React.createElement('div', {},
                React.createElement(NavMenu, {}),
                React.createElement('h2', {className: 'itemz'}, this.props.name),
                React.createElement('p', {className: 'itemz1'}, this.props.price)
            )
        //                React.createElement("li", {},
        //                    React.createElement("a", {href: "#item/2"}, "Item #2")
               
        );
            
    }
});
  
        
        

    ///////////////////////////////////
let NavMenu = React.createClass({
    render: function() {
        return (
            React.createElement('ul', {className: 'nav-menu'},
                //                React.createElement("li", {},
                //                    React.createElement("a", {href: "#menu"}, "Menu")
                //                ),
                React.createElement('li', {},
                    React.createElement('a', {href: '#'}, 'Main View')
                ),
                React.createElement('li', {},
                    React.createElement('a', {href: '#newitem'}, 'Add new item')

                )
            )
        );
    }
});
let MainPage = React.createClass({
    render: function () {
        return (
            React.createElement('div', {},
                React.createElement(NavMenu, {}),
                React.createElement(MenuItems,{items:menuItems} )
                                
            )
        );
    }
});      
     
        
state = {
};
        
function updateFrom(newItem){
    setState({item:newItem});
}
function addNewItem(newItem){
    menuItems.push(Object.assign({},{id:menuItems.length+1,key:menuItems.length+1},newItem));
    alert('You\'ve added a new item to the menu');
}
function setState(changes) {
    let component;
    let componentProperties = {};
    Object.assign(state, changes);
    let splittedUrl = state.location.replace(/^#\/?|\/$/g, '').split('/');
    switch(splittedUrl[0]) {
    //        case "menu":
    //            component = MenuPage;
    //            break;
    case 'newitem':
        component = AddNewItemPage;
        componentProperties = {
            newItem: state.item,
            onNewItemChange: updateFrom,
            onSubmitButton: addNewItem
        };
           
        break;
    case 'item':
        component = ItemPage;
        componentProperties = menuItems.find(i => i.key == splittedUrl[1]);
        break;
    default:
        component = MainPage;
    }
    ReactDOM.render(React.createElement(component, componentProperties), document.getElementById('react-app'));
}
window.addEventListener('hashchange', ()=>setState({location: location.hash}));
//Start the app by declaring the initial state
setState(
    {location: location.hash,
        item:{name:'',price:''}})
;
    