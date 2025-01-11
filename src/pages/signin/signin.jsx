import {  useRef } from 'react';
import { TextInput } from '../../shared/components/textInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/store/AuthContext';

export function Signin() {



  const {
    // gender,
    setGender,
    signin
  } = useAuth()

  const formRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'
  

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = (e.currentTarget.elements.namedItem('name')).value;
    let nickname = e.currentTarget.nickname.value
    let email = e.currentTarget.email.value
    let gender = e.currentTarget.gender.value
    let password = e.currentTarget.password.value
    let confirmPassword = e.currentTarget.confirmPassword.value
    let signinData = { name, nickname, email, gender, password, confirmPassword }
    
    if (password === confirmPassword) {
      signin(signinData);
      navigate(from, {replace: true})
      formRef.current?.reset()
    } else {
      alert('Пароли не совпадают');
    }
  };

  return (
    <div className='signin_content'>
    <h1 className="title">Регистрация</h1>
    <form className='signin' onSubmit={handleSubmit} ref={formRef}>
      <TextInput
        label="Имя"
        placeHolder='Ваше Имя'
        name ='name'
        required
      />
      <TextInput
        label="Ваш Ник"
        name='nickname'
        placeHolder='никнейм'
        required
      />
      <TextInput
        label="Email"
        placeHolder='Ваш почтовый адрес'
        name='email'
        type="email"
        required
      />
      <div className='input_box'>
        <label>
          <input
            className='input'
            type="radio"
            name="gender"
            value="male"
            // checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
          />
          Муж.
        </label>
        <label>
          <input
            className='input'
            type="radio"
            name="gender"
            value="female"
            // checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
          />
          Жен.
        </label>
      </div>
      <TextInput
        label="Пароль"
        name='password'
        placeHolder='Ваш пароль'
        type="password"
        required
      />
      <TextInput
        label="Повторить пароль"
        placeHolder='Повторите ваш пароль'
        name='confirmPassword'
        type="password"
        required
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
    </div>
  );
}

