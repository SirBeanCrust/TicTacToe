import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";

const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };
  
function MyButtons() {
    return (
        <>
        <Link to="/app">
        <button className="btn">Go to Main Page</button>
         </Link>

        <Link to="/tic-tac-toe">
        <button className="btn">Try Tic-Tac-Toe</button>
        </Link>
        </>
    );
    }

function MyButton1({count, onClick}) {
    
    return (
        <button onClick={onClick}>
            Clicked {count} times
        </button>
    );
    
}

export default function SecondPage() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <>
           
            <div>
                <h1>Second Page</h1>
                <MyButtons/>
            </div>

            <>
                <h1>{user.name}</h1>
                <img
                    className="avatar"
                    src={user.imageUrl}
                    style={{
                        width: user.imageSize,
                        height: user.imageSize
                    }}
                 />
            </>
          
        <div>
            <h1>Counters that update separately</h1>
            <MyButton1 count={count} onClick={handleClick}/>
            <MyButton1 count={count} onClick={handleClick}/>
        </div>
    </>
    );
}