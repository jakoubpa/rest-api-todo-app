import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import moment from "moment/moment"

export default function TodoComponent() {

    const {id} = useParams()
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    const [description, setDescription] = useState()
    const [targetDate, setTargetDate] = useState()


    useEffect(() => retrieveTodos(), [id])

    function retrieveTodos() {
        document.getElementById("date").min = new Date().toISOString().split("T")[0]
        if(id != -1) {
            retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)})
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        const todo = {
            todoId: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        if(id == -1) {
            createTodoApi(username, todo)
                .then(response => {navigate('/todos')})
                .catch(error => console.log(error))
        } else {
            updateTodoApi(username, id, todo)
                .then(response => {navigate('/todos')})
                .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {}
        if(values.description.length < 5) {
            errors.description = "Enter at least 5 characters!"
        }
        if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid) {
            errors.targetDate = "Enter a target date!"
        }
        return errors
    }

    return (
        <div className="container-fluid">
            <h1>Enter Todo Details</h1>
            <div className="row justify-content-center">
                <div className="col-4">
                    <Formik initialValues={{description, targetDate}} 
                    enableReinitialize={true} 
                    onSubmit={onSubmit}
                    validate = {validate}
                    validateOnChange={false}
                    validateOnBlur={false}> 
                        {
                            (props) => (
                                <Form> 
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>

                                    <fieldset className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <Field name="description" className="form-control" type="text"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label htmlFor="targetDate">Target Date</label>
                                        <Field name="targetDate" className="form-control" type="date" id="date"/>
                                    </fieldset>
                                    <div>
                                        <button className="btn btn-success mt-2" type="submit">Save</button>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )

}