import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
import DeleteModal from './DeleteModal'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleClick (event) {
        if (!event.target.disabled) {
            store.createNewList();
        }
    }

    let listCard = "";
    let isDisabled = "false";
    let classNameButton = "top5-button";
    if(store.isListNameEditActive) {
        isDisabled = "true";
        classNameButton = "top5-button-disabled"
    }
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
                <input
                    disabled={isDisabled}
                    type="button"
                    id="add-list-button"
                    className={classNameButton}
                    value="+"
                    onClick={handleClick} />
                Your Lists
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <DeleteModal />
            </div>
        </div>)
}

export default ListSelector;