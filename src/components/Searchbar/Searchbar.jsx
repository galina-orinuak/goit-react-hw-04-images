import { useState } from 'react';
import styles from './Searchbar.module.css';
import {BsSearch} from "react-icons/bs";

export const Searchbar=({onSubmitForm})=>{
  const [query, setQuery] = useState('');
  

const  handleInputChange = evt => {
    setQuery( evt.target.value );
  };

const  handleSubmitForm = evt => {
    evt.preventDefault();
   onSubmitForm(query);
   setQuery('');
  };


  
    return (
      <header className={styles.searchbar}>
        <form className={styles.form} onSubmit={handleSubmitForm}>
          <button type="submit" className={styles.button}>
            <BsSearch/>
          </button>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
            value={query}
          />
        </form>
      </header>
    );
  }

