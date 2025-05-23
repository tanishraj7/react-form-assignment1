import { useLocation, useNavigate } from "react-router";
import './Submitted.css';

function SubmittedData(){
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return (
        <>
            <p>No data submitted.</p>
            <button onClick={()=> navigate('/')}>Submit data here</button>
        </>
    )

    return (
        <>
        <div>
            <h2>submitted details</h2>
            <ul>
                {Object.entries(state).map(([key , value]) => (
                    key !== 'showPassword' && (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                    )
                ))}
            </ul>
            <button onClick={()=>navigate('/')}>Back to form</button>
        </div>
        <h6>created by Tanish Raj Singh.</h6>
        </>
    );
}
export default SubmittedData;