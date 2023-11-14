import React, { useState, useEffect } from 'react';
import './TodoList.css';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const TodoList = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [filter, setFilter] = useState('all');



    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (taskInput.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
            setTaskInput('');
        }
    };

    const completeTask = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const sortedTasks = [...tasks].sort((a, b) => a.text.localeCompare(b.text));

    const filteredTasks = filter === 'all'
        ? sortedTasks
        : filter === 'active'
            ? sortedTasks.filter(task => !task.completed)
            : sortedTasks.filter(task => task.completed);

    return (
        <>
            <div className='container'>
                <div className='todoList'>
                    <h1 className='todList_title'>You have {filteredTasks.length} task left !</h1>
                    <div className='todoList_nav'>
                    </div>

                    <ul className='todoList_list'>
                        {filteredTasks.map(task => (
                            <li className='list_item' key={task.id}>
                                <div className='list_item_right'>
                                    <input
                                        type="radio"
                                        checked={task.completed}
                                        onChange={() => completeTask(task.id)}
                                    />
                                    <span style={{ fontSize: '24px', color: 'rgb(97,97,97)' }} className={task.completed ? 'completed' : ''}>{task.text}</span>
                                    <hr style={{ width: '450px' }} />
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className='todoList_form'>
                        <input
                            type="text"
                            placeholder="Enter task...."
                            value={taskInput}
                            onChange={e => setTaskInput(e.target.value)}
                        />
                        <button className='btn_add' onClick={addTask}>Submit</button>
                    </div>
                </div>

            </div>
            <div className='language'>
                {/* <button onClick={() => i18n.changeLanguage('vi')}>VN</button>
                <button onClick={() => i18n.changeLanguage('en')}>US</button> */}
                <button onClick={() => changeLanguage('vi')}>vn</button>
                <button onClick={() => changeLanguage('en')}>en</button>
            </div>
        </>
    );
};

export default TodoList;
