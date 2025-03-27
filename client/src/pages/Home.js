import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryTab from './components/CategoryTab';
import Modal from './components/Modal';
import Question from './components/Question';

const Home = ({ uname, categories, categoriesSetter, questions, questionsSetter }) => {
    const navigate = useNavigate();
    const [currCategory, currCategorySetter] = useState(1);     // active category
    const modalInputRef = useRef();

    // redirect if user isn't logged in
    useEffect(() => {
        if (!uname) {
            navigate('/login');
        }
    }, [uname, navigate]);

    // change categories
    const changeCategory = (event) => {
        const tab = event.target.getAttribute('tab-id');
        currCategorySetter(tab);
    };

    // open and close modal window
    const handleModal = (content) => {
        const overlay = document.querySelector('.overlay');
        const modalBox = document.querySelector('.modalBox');
        const modalText = document.querySelector('.modalText');
        overlay.classList.toggle('hidden');
        modalBox.classList.toggle('hidden');
        modalText.innerHTML = 'Add new ' + content;
        modalInputRef.current.value = '';
    }

    // add new category
    const handleAdd = () => {
        const modalInput = modalInputRef.current.value;
        const newId = categories.length + 1;
        const url = 'http://localhost:5000/categories';
        const parameters = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({categoryId: newId, categoryName: modalInput})
        }
        fetch(url, parameters);
        categoriesSetter([...categories, {categoryId: newId, categoryName: modalInput}]);
        modalInputRef.current.value = '';
        handleModal();
    }

    // render category menu
    let categoryList = categories.map(category => 
        <CategoryTab key={category.categoryId} categoryId={category.categoryId} categoryName={category.categoryName} changeCategory={changeCategory} />
    );

    // get questions by category
    useEffect(() => {
        const url = 'http://localhost:5000/questions/' + currCategory;
        const parameters = {
            method: 'GET'
        }
        
        fetch(url, parameters)
            .then(res => res.json())
            .then(json => questionsSetter(json.questions))
    }, [currCategory]);

    // render questions
    let questionList = questions.map(question => <Question key={question.questionId} questionId={question.questionId} questionText={question.question} />);


    return (
        <div>
            <h1>Home</h1>
            <h3>Login Successful {uname}</h3>
            {categoryList}
            <div onClick={() => handleModal('category')}>+</div>
            <Modal modalInputRef={modalInputRef} handleModal={handleModal} handleAdd={handleAdd} />
            <div>{questionList}</div>
        </div>
    );
};

export default Home;