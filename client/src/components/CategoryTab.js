const CategoryTab = ({ categoryId, categoryName, changeCategory }) => {
    return (
        <div className='categoryBtn' tab-id={categoryId} onClick={changeCategory}>{categoryName}</div>
    )
};

export default CategoryTab;