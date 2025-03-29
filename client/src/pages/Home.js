import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryTab from '../components/CategoryTab';
import AddCategory from '../components/AddCategory';
import Question from '../components/Question';
import AddQuestion from '../components/AddQuestion';

const Home = ({ uname, categories, categoriesSetter, questions, questionsSetter }) => {
    const navigate = useNavigate();
    const [currCategory, currCategorySetter] = useState(1);     // active category
    const categoryRef = useRef();
    const questionRef = useRef();

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

    // render category menu
    let categoryList = categories.map(category => 
        <CategoryTab key={`c${category.categoryId}`} categoryId={category.categoryId} categoryName={category.categoryName} changeCategory={changeCategory} />
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
    let questionList = questions.map(question => 
        <Question key={`q${question.questionId}`} questionText={question.question} />
    );

    return (
        <div>
            <h1>Home</h1>
            <h3>Login Successful {uname}</h3>
            <div>{categoryList}</div>
            <AddCategory categoryRef={categoryRef} categories={categories} categoriesSetter={categoriesSetter} />
            <div>{questionList}</div>
            <AddQuestion questionRef={questionRef} questions={questions} questionsSetter={questionsSetter} currCategory={currCategory} />
        </div>
    );
};

export default Home;