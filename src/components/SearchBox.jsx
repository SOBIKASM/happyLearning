const SearchBox = ({value,onChange,onSearch,placeholder}) =>  {
  return (
    <div className='search-container'>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button onClick={onSearch}>Search</button>

      </div>
  )
}
export default SearchBox;