import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { logo, logo_no_icon } from '../cmps/UtilCmps/SVGs'
// import { ImgUploader } from '../cmps/UtilCmps/ImgUploader'

export function LoginSignUp(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullName: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        console.log(users);
        setUsers(users)
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullName: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
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
            const user = await userService.login(credentials)
            // showSuccessMsg(`Welcome: ${user.fullName}`)
            // navigate('/')
        } catch (err) {
            // showErrorMsg('Cannot login')
            console.log('Cannot login')
        }
    }

    async function SignUp(credentials) {
        try {
            const user = await signup(credentials)
            // showSuccessMsg(`Welcome new user: ${user.fullname}`)
            // navigate('/')
        } catch (err) {
            // showErrorMsg('Cannot signup')
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
            <main className='login-logout-container flex column'>
                <div className='logo-login flex justify-center'>
                    <img src="/src/assets/img/logo-home.png" alt="" />
                    {logo_no_icon}</div>
                <h3>Log in to continue</h3>
                <button className='continue'>Continue</button>
                <p>
                    <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                </p>
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
                    {isSignup && <form className="signup-form" onSubmit={onSignUp}>
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
                        <button >Signup!</button>
                    </form>}
                </div>
            </main>
        </section>
    )
}