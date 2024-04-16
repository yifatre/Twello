import { useState, useEffect } from 'react'
import { logo, logo_no_icon } from '../cmps/UtilCmps/SVGs'
import { userServiceHttp } from '../services/user.service'
import { useNavigate } from 'react-router'
// import { ImgUploader } from '../cmps/UtilCmps/ImgUploader'

export function LoginSignUp(props) {
    const [credentials, setCredentials] = useState({ email: '', username: '', password: '', fullName: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])
    const [login, setLogin] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    //todo delete on production
    async function loadUsers() {
        const users = await userServiceHttp.getUsers()
        console.log(users);
        setUsers(users)
    }

    async function onContinue() {
        try {
            const user = await userServiceHttp.login(login)
            console.log(user);
            // showSuccessMsg(`Welcome: ${user.fullName}`)
            navigate('/board')
        } catch (err) {
            console.log('Cannot login', err)
        }
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullName: '', email: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        if (field === 'email' || field === 'password') setLogin({ ...login, [field]: value })
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        Login(credentials)
        clearState()
    }

    async function Login(credentials) {
        try {
            const user = await userServiceHttp.login(credentials)
            // showSuccessMsg(`Welcome: ${user.fullName}`)
            // navigate('/')
        } catch (err) {
            // showErrorMsg('Cannot login')
            console.log('Cannot login')
        }
    }

    async function SignUp(credentials) {
        try {
            const user = await userServiceHttp.signup(credentials)
            navigate('/board')
        } catch (err) {
            console.log('Cannot signup')
        }
    }

    function onSignUp(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullName) return
        SignUp(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <section className="login-page-layout">
            <img className='left-login-img' src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/trello-left.4f52d13c.svg" alt="" />
            <img className='right-login-img' src="https://id-frontend.prod-east.frontend.public.atl-paas.net/assets/trello-right.3ee60d6f.svg" alt="" />
            <main className='login-logout-container flex column'>
                <div className='logo-login flex justify-center'>
                    <img src="/src/assets/img/logo-home.png" alt="" />
                    {logo_no_icon}</div>
                {!isSignup && <div className='login'>
                    <h3>Log in to continue</h3>
                    <input
                        type="email"
                        name="email"
                        value={login.email}
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="password"
                        value={login.password}
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button onClick={onContinue} className='continue'>Continue</button>
                    <hr />

                    <p>
                        <button className="btn-link" onClick={toggleSignup}>Create an account</button>
                    </p>
                </div>}

                {isSignup && <form className="signup-form" onSubmit={onSignUp}>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="fullName"
                        value={credentials.fullName}
                        placeholder="FullName"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    {/* <ImgUploader onUploaded={onUploaded} /> */}
                    <button className='continue'>Signup</button>
                </form>}

                {!isSignup && <form className="login-form" onSubmit={onLogin}>
                    <select
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    >
                        <option value="">Select User</option>
                        {users.map(user => <option key={user._id} value={user.username}>{user.fullName}</option>)}
                    </select>
                    {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    /> */}
                    <button>Login!</button>
                </form>}
                <div className="signup-section">
                    {/* {isSignup && <form className="signup-form" onSubmit={onSignUp}>
                        <input
                            type="email"
                            name="email"
                            value={credentials.email}
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="fullName"
                            value={credentials.fullName}
                            placeholder="FullName"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <ImgUploader onUploaded={onUploaded} />
                        <button >Signup!</button>
                    </form>} */}
                </div>
            </main>
        </section>
    )
}