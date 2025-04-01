const CategoryTab = ({ categoryId, categoryName, changeCategory }) => {
    return (
        <div className={categoryId === 1 ? 'categoryBtn current' : 'categoryBtn'} tab-id={categoryId} onClick={changeCategory}>{categoryName}</div>
    )
};

export default CategoryTab;