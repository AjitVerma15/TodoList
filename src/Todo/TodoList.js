import React, { Component } from 'react'
import Validation from './Validation';

export default class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            listItem: [],
            newItem: "",
        }
        this.value = 0;
    }

    valueChange(event) {
        this.setState({
            newItem: event.target.value
        })
    }

    keyHandler(event) {
        if (event.key === 'Enter') {
            if (this.state.newItem.trim() !== '') {
                this.setState({
                    listItem: [...this.state.listItem, this.state.newItem],
                    newItem: "",
                });
            }
        }
    }
    updateList() {
        if (this.state.newItem.trim() !== '') {
            this.setState({
                listItem: [...this.state.listItem, this.state.newItem],
                newItem: "",
            });
        }
    }

    removeElement(event) {
        const Elementvalue = event.target.previousElementSibling.innerHTML;
        this.setState({
            listItem: this.state.listItem.filter((value) => value !== Elementvalue)
        })
    }

    componentDidMount() {
        if (window.sessionStorage.getItem('data')) {
            const data = JSON.parse(window.sessionStorage.getItem('data'));
            this.setState({
                listItem: data.listItem,
                newItem: data.newItem
            })
        }
    }

    componentDidUpdate() {
        window.sessionStorage.setItem('data', JSON.stringify(this.state));
    }

    render() {
        return (
            <div className="container">
                <h1>Todo List</h1>
                    <div className="col-6 d-flex justify-content-between my-3">
                    <input value={this.state.newItem} onKeyPress={this.keyHandler.bind(this)} onChange={this.valueChange.bind(this)}/>
                    <button className="btn btn-primary" onClick={this.updateList.bind(this)}>Add New Item</button>
                    </div>
                    {<Validation length={this.state.newItem.length} />}
                <div className="row-2 d-grid gap-3">
                {this.state.listItem.map((newItem, index) => 
                    {return <FillItem 
                            key={index} 
                            item={newItem} 
                            handler={this.removeElement.bind(this)}/>})}
                </div>
            </div>
        )
    }
}

function FillItem(props) {
    function removeHandler(event) {
        props.handler(event);
    }
 return (
        <div className="col-6 
                    bg-secondary bg-gradient 
                    text-white 
                    d-flex 
                    justify-content-between">
        { (props?.item.trim() !== '') &&
            <>
            <span className="mx-4 my-2">{props.item}</span>
            <button className="btn btn-warning" onClick={removeHandler}>Remove</button>
            </>
        }
        </div>
 );
}
