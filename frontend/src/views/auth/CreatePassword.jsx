import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import apiInstance from '../../utils/axios'
import Swal from 'sweetalert2'


function CreatePassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const [searchParam] = useSearchParams()
    const otp = searchParam.get("otp")
    const uidb64 = searchParam.get("uidb64")

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if(password !== confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Password does not match',
            })
            setIsLoading(false)
        } else {
            const formdata = new FormData()
            formdata.append('password', password)
            formdata.append('otp', otp)
            formdata.append('uidb64', uidb64)

            try {
                await apiInstance.post(`user/password-change/`, formdata).then((res) => {
                    console.log(res.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Password changed successfully',
                    })
                    navigate('/login')
                    setIsLoading(false)
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An error occured while trying to change the password',
                })
                setIsLoading(false)
            }
        }
    }
    
  return (
    <>
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Create New Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <form onSubmit={handlePasswordSubmit}>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Enter New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            required
                                                            value={password}
                                                            name="password"
                                                            className="form-control"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Confirm New Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            id="password2"
                                                            required
                                                            name="confirmPassword"
                                                            value={confirmPassword}
                                                            className="form-control"
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                        />
                                                        {/* {error !== null &&
                                                            <>
                                                                {error === true

                                                                    ? <p className='text-danger fw-bold mt-2'>Password Does Not Match</p>
                                                                    : <p className='text-success fw-bold mt-2'>Password Matched</p>
                                                                }
                                                            </>
                                                        } */}
                                                    </div>


                                                    <div className="text-center">
                                                        <button type='submit' className='btn btn-primary w-100'>Reset Password</button>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    </>
  )
}

export default CreatePassword