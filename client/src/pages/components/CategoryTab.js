const CategoryTab = ({ categoryId, categoryName, changeTab }) => {
    return (
        <div className='categoryBtn' tabId={categoryId} onClick={changeTab}>{categoryName}</div>
    )
};

export default CategoryTab;