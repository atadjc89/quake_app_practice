import { Fragment } from "react";
let items = ['New York', 'San Francisco', 'Tokyo', 'London', 'Berlin'];
//items = [];
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'

const getMessage = () => {

    return items.length === 0 ? <p>No items found</p> : null;
}

    function ListGroup() {
    return (
        <Fragment>
            <h1>List</h1>
            {items.length === 0 && <p>No items found</p>}
            <ul className="list-group">
            {items.map((item, i) => 
            <li 
            key={item} 
            onClick={(e) => console.log(item, i)} 
            className="list-group-item">
                {item}
            </li>)}
            
        {/* <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>
        <li className="list-group-item">And a fifth one</li> */}
        </ul>
        </Fragment>
        )
    }

export default ListGroup;