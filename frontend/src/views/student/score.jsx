import React from 'react'
import { useState, useEffect } from 'react'
import apiInstance from '../../utils/axios'
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Score() {

    const [code, setCode] = useState('')
    const [full_name, setFull_name] = useState('')
    const [score1, setScore1] = useState('')
  
    const [score2, setScore2] = useState('')
    const [midterm, setMidterm] = useState('')
    const [final, setFinal] = useState('')
    const [score, setScore] = useState()
    const [loading, setLoading] = useState()

    const customRound = (number) => {
        if (number < 4) {
          return Math.floor(number * 2) / 2;
        } else {
          return Math.round(number);
        }
    }

    const fetchScore = () => {
        apiInstance.get(`student-score/`).then((res) => {
            setScore(res.data)
        })
    }

    useEffect(() => {
        fetchScore()
    }, [loading])

    
    const handleChange = (event) => {
        const {name, value} = event.target
        
        switch (name) {
        case 'code':
            setCode(value)
            break

        case 'full_name':
            setFull_name(value)
            break

        case 'score1':
            setScore1(value)
            break

        case 'score2':
            setScore2(value)
            break

        case 'midterm':
            setMidterm(value)
            break

        case 'final':
            setFinal(value)
            break

        default:
            break
        }
    }

    const createScore = async () => {
        if (!code || !full_name || !score1 || !score2 || !midterm || !final ) {
          Swal.fire({
              icon: 'warning',
              title: 'Missing Fields!',
              text: "All fields are required before checkout",
          })
        } else {
    
          try {
    
            const formData = new FormData();
            formData.append('code', code);
            formData.append('full_name', full_name);
            formData.append('score1', score1);
            formData.append('score2', score2);
            formData.append('midterm', midterm);
            formData.append('final', final);
            
            await apiInstance.post('student-score-create/', formData).then((res) => {
              console.log(res.data);
              setLoading(res)
            Swal.fire({
                icon: 'success',
                title: 'Student Score Created',
            })
            })
            } catch (error) {
              console.log(error);
            }
          }
        }

  return (
    <div className="container-fluid " id="main" >
            <div className="row row-offcanvas row-offcanvas-left h-100">
                <div className="col-md-9 col-lg-12 main mt-4" >
                    <div className='col-lg-4 ' >
                        <div>
                            <h5 className="mb-4 mt-4">Personal Score</h5>
                            {/* 2 column grid layout with text inputs for the first and last names */}
                            <div className="row mb-4">
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="full_name"> Mã Sinh Viên</label>
                                    <input
                                    type="text"
                                    id=""
                                    name='code'
                                    className="form-control"
                                    onChange={handleChange}
                                    />
                                </div>
                                </div>

                            </div>

                        </div>

                        <div>
                            {/* 2 column grid layout with text inputs for the first and last names */}
                            <div className="row mb-4">
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="full_name">Họ và Tên</label>
                                    <input
                                    type="text"
                                    id=""
                                    name='full_name'
                                    className="form-control"
                                    onChange={handleChange}
                                    />
                                </div>
                                </div>

                            </div>

                        </div>

                        <div>
                            {/* 2 column grid layout with text inputs for the first and last names */}
                            <div className="row mb-4">
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="score1">Thường Xuyên 1</label>
                                    <input
                                    type="number"
                                    id=""
                                    name='score1'
                                    className="form-control"
                                    onChange={handleChange}
                                    />
                                </div>
                                </div>

                            </div>

                        </div>

                        <div>
                            {/* 2 column grid layout with text inputs for the first and last names */}
                            <div className="row mb-4">
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="full_name">Thường xuyên 2</label>
                                    <input
                                    type="number"
                                    id=""
                                    name='score2'
                                    className="form-control"
                                    onChange={handleChange}
                                    />
                                </div>
                                </div>

                            </div>

                        </div>

                        <div>
                            {/* 2 column grid layout with text inputs for the first and last names */}
                            <div className="row mb-4">
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="full_name">Giữa kỳ</label>
                                    <input
                                    type="number"
                                    id=""
                                    name='midterm'
                                    className="form-control"
                                    onChange={handleChange}
                                    />
                                </div>
                                </div>

                            </div>

                        </div>

                        <div>
                            {/* 2 column grid layout with text inputs for the first and last names */}
                            <div className="row mb-4">
                                <div className="col">
                                <div className="form-outline">
                                    <label className="form-label" htmlFor="full_name">Cuối kỳ</label>
                                    <input
                                    type="number"
                                    id=""
                                    name='final'
                                    className="form-control"
                                    onChange={handleChange}
                                    />
                                </div>
                                </div>

                            </div>

                        </div>
                        <button onClick={createScore} className="btn btn-primary btn-rounded w-100" >
                            Submit
                        </button>
                    </div>
                    
                    <br />
                    <br />
                    <br />
                    <>
                        <h4>
                            <i className="bi bi-grid" /> Score Table
                        </h4>

                    </>
                    <div className="mb-3 mt-2">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">#Msv</th>
                                    <th scope="col">Họ và tên</th>
                                    <th scope="col">Thường xuyên 1</th>
                                    <th scope="col">Thường xuyên 2</th>
                                    <th scope="col">Giữa kỳ</th>
                                    <th scope="col">Cuối kỳ</th>
                                    <th scope="col">Kết quả(10)</th>
                                    <th scope="col">Kết quả(4)</th>
                                    <th scope="col">Điểm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {score?.map((c, index) => (
                                    <tr key={index}>
                                        <th scope="row">#{c.code}</th>
                                        <td>{c.full_name}</td>
                                        <td>{c.score1}</td>
                                        <td>{c.score2}</td>
                                        <td>{c.midterm}</td>
                                        <td>{c.final}</td>
                                        <td>{c.average}</td>
                                        <td>{customRound(c.average * 4 / 10)}</td>
                                        {customRound(c.average * 4 / 10) === 4 && <td>A</td>}
                                        {customRound(c.average * 4 / 10) === 3.5 && <td>A</td>}
                                        {customRound(c.average * 4 / 10) === 3.0 && <td>B+</td>}
                                        {customRound(c.average * 4 / 10) === 2.5 && <td>B</td>}
                                        {customRound(c.average * 4 / 10) === 2.0 && <td>C++</td>}
                                        {customRound(c.average * 4 / 10) === 1.5 && <td>C</td>}
                                        {customRound(c.average * 4 / 10) < 1.5 && <td>D</td>}

                                    </tr>
                                ))}

                                {score?.length < 1 &&
                                    <h4 className='p-3 mt-4'>No Record</h4>
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Score