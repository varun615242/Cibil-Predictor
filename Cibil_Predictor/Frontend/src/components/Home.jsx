import Header from './Header';
import Footer from './Footer';
const Home = ()=> {
    return(
        <div>
      <Header /> {/* Display the Header here */}
      <main className="p-8">
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-5xl bg-white shadow-lg rounded-2xl p-8 flex flex-col md:flex-row items-center">
        
        {/* Left Side: Text */}
        <div className="md:w-1/2 md:mr-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-blue-600">What is a CIBIL Score?</h1>
          <p className="text-gray-700 mt-4">
            A <b>CIBIL score</b> is a three-digit number (300-900) representing an individual's creditworthiness. 
            It is calculated based on credit history, loan repayments, and financial behavior. A higher score 
            improves your chances of loan approval.
          </p>

          <h2 className="text-2xl font-semibold text-blue-500 mt-6">Why is it Important?</h2>
          <ul className="text-gray-700 mt-3 text-left">
            <li>✔️ A high CIBIL score <b>(750+)</b> increases loan approval chances.</li>
            <li>✔️ Helps secure loans at <b>lower interest rates</b>.</li>
            <li>✔️ Builds a strong financial profile for <b>credit cards & mortgages</b>.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-500 mt-6">Rules & Factors Affecting CIBIL Score</h2>
          <ul className="text-gray-700 mt-3 text-left">
            <li><b>📌 Payment History (35%)</b> – Late payments hurt your score.</li>
            <li><b>📌 Credit Utilization (30%)</b> – Keep usage below 30% of your limit.</li>
            <li><b>📌 Credit Mix (10%)</b> – A mix of secured & unsecured loans is better.</li>
            <li><b>📌 Credit Inquiries (10%)</b> – Too many loan applications can reduce your score.</li>
            <li><b>📌 Credit History Length (15%)</b> – Longer history improves score.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-blue-500 mt-6">How to Improve Your Score?</h2>
          <ul className="text-gray-700 mt-3 text-left">
            <li>✅ Pay EMIs and credit card bills <b>on time</b>.</li>
            <li>✅ Keep <b>credit utilization below 30%</b>.</li>
            <li>✅ Avoid multiple loan applications.</li>
            <li>✅ Regularly <b>check your CIBIL report</b> for errors.</li>
          </ul>

          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mx-auto">
            Check Your CIBIL Score Now
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img 
            src="https://www.dialabank.com/wp-content/uploads/2019/11/Cibil-Score-1.jpg" 
            alt="CIBIL Score" 
            className="rounded-lg shadow-md w-full"
          />
        </div>
        
      </div>
{/*<img src='https://img.freepik.com/free-vector/gradient-credit-assessment-concept_52683-76907.jpg?t=st=1740543595~exp=1740547195~hmac=86e33499fbbf40157288996dc8f0a57e8cc4fffb61a5c43603e280ed72976d54&w=1380' className='class="w-64 h-64 object-cover rounded-lg"'></img>*/}
    </div>
      </main>
      <Footer/>
    </div>
    );
};


export default Home;

