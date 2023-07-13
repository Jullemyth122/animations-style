import React, { useEffect } from 'react'

const GridLayoutFlips = () => {

    useEffect(() => {
        
    },[])

    return (
        <div className='gridlayout-component'>
            <div class="buttons-container">
                <div>Show:&nbsp;</div>
                <div>
                    <label for="all"><input type="checkbox" id="all" checked/> All</label>
                    <label for="green"><input type="checkbox" id="green" class="filter" checked/> Green</label>
                    <label for="orange"><input type="checkbox" id="orange" class="filter" checked/> Orange</label>
                    <label for="purple"><input type="checkbox" id="purple" class="filter" checked/> Purple</label>
                </div>
            </div>
            <div class="container">
                <div class="item green"></div>
                <div class="item orange"></div>
                <div class="item purple"></div>
                <div class="item orange"></div>
                <div class="item green"></div>
                <div class="item purple"></div>
                <div class="item green"></div>
                <div class="item purple"></div>
            </div>
        </div>
    )
}

export default GridLayoutFlips