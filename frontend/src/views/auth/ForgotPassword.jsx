import { useState } from 'react'
import apiInstance from '../../utils/axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true);
    apiInstance.get(`user/password-reset/${email}`)
        .then((res) => {
            console.log(res.data);
            Swal.fire({
                icon: 'success',
                title: 'An email has been sent to you.',
            })
        })
        .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Email does not exist.',
            })
        })
        .finally(() => {
            setIsLoading(false);
        });
        
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
                                        <h3 className="text-center">Forgot Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <div>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="Full Name">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="email"
                                                            name="email"
                                                            className="form-control"
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>

                                                    {isLoading === true
                                                      ? <button disabled type='button' className='btn btn-primary w-100'>
                                                        Processing... <i className="fas fa-spinner fa-spin" />
                                                      </button>
                                                      : <button onClick={handleSubmit} type='button' className='btn btn-primary w-100'>
                                                        Reset Passowrd <i className='fas fa-paper-plane'/>
                                                      </button>
                                                    }
                                                    <div className="text-center">
                                                            <p className='mt-4'>
                                                                Want to sign in? <Link to="/login">Login</Link>
                                                            </p>
                                                        </div>
                                                </div>
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
    // <div>
    //   <h1>Forgot Password</h1>
    //   <input 
    //     onChange={(e) => setEmail(e.target.value)} 
    //     type="email" 
    //     placeholder='Enter Email' 
    //     name='' 
    //   id=''
    //   />
    //   <br />
    //   <br />
    //   <button onClick={handleSubmit}>Reset Password</button>
    // </div>
  )
}

export default ForgotPassword