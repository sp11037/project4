import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryTab from './components/CategoryTab';

const Home = ({ uname, categories, categoriesSetter }) => {
    const navigate = useNavigate();
    const [currCategory, currCategorySetter] = useState(1);

    // redirect if user isn't logged in
    useEffect(() => {
        if (!uname) {
            navigate('/login');
        }
    }, [uname, navigate]);

    // change categories
    const changeCategory = (event) => {
        const tab = event.target.getAttribute('tabId');
        currCategorySetter(tab);
    };

    // add new category
    const handleAdd = () => {
        const newId = categories.length + 1;
        const url = 'http://localhost:5000/categories';
        const parameters = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({categoryId: newId, categoryName: 'Category ' + newId})
        }
        fetch(url, parameters);
        categoriesSetter([...categories, {categoryId: newId, categoryName: 'Category ' + newId}]);
    }

    // render category menu
    let categoryList = categories.map(category => 
        <CategoryTab categoryId={category.categoryId} categoryName={category.categoryName} changeTab={changeCategory} />
    );

    // TODO: display questions for respoective category
    useEffect(() => {
        const contentArea = document.querySelector('.content');
        contentArea.innerHTML = 'Content for ' + currCategory;
    }, [currCategory]);

    return (
        <div>
            <h1>Home</h1>
            <h3>Login Successful {uname}</h3>
            {categoryList}
            <div onClick={handleAdd}>+</div>
            <div className='content'>content here</div>
        </div>
    );
};

export default Home;